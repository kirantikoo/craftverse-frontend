/* eslint-disable @typescript-eslint/no-require-imports */
const { after, before, beforeEach, test } = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} = require("@firebase/rules-unit-testing");
const { collection, doc, getDoc, getDocs, setDoc, updateDoc } = require("firebase/firestore");

let environment;

before(async () => {
  environment = await initializeTestEnvironment({
    projectId: "craftverse-rules-test",
    firestore: { rules: fs.readFileSync(path.join(__dirname, "..", "firestore.rules"), "utf8") },
  });
});

beforeEach(async () => {
  await environment.clearFirestore();
  await environment.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), "users", "alice"), {
      uid: "alice", role: "user", plan: "trial", subscriptionStatus: "trial",
      trialStartDate: new Date(), trialEndDate: new Date(Date.now() + 1000), name: "Alice",
    });
  });
});

after(async () => environment.cleanup());

test("unauthenticated access fails", async () => {
  await assertFails(getDoc(doc(environment.unauthenticatedContext().firestore(), "users", "alice")));
});

test("owner can get their document but not another user's document or list users", async () => {
  const db = environment.authenticatedContext("alice").firestore();
  await assertSucceeds(getDoc(doc(db, "users", "alice")));
  await assertFails(getDoc(doc(db, "users", "bob")));
  await assertFails(getDocs(collection(db, "users")));
});

test("owner can update safe profile fields", async () => {
  const ref = doc(environment.authenticatedContext("alice").firestore(), "users", "alice");
  await assertSucceeds(updateDoc(ref, { name: "Updated", onboardingCompleted: true }));
});

for (const [label, patch] of [
  ["role", { role: "admin" }], ["isAdmin", { isAdmin: true }], ["admin", { admin: true }],
  ["plan", { plan: "premium" }], ["subscriptionStatus", { subscriptionStatus: "premium" }],
  ["trialStartDate", { trialStartDate: new Date() }], ["trialEndDate", { trialEndDate: new Date() }],
]) {
  test(`owner cannot change ${label}`, async () => {
    const ref = doc(environment.authenticatedContext("alice").firestore(), "users", "alice");
    await assertFails(updateDoc(ref, patch));
  });
}

test("browser cannot create users or write admins", async () => {
  const db = environment.authenticatedContext("alice").firestore();
  await assertFails(setDoc(doc(db, "users", "new-user"), { role: "user" }));
  await assertFails(setDoc(doc(db, "admins", "alice"), { role: "admin" }));
});

test("Admin SDK fixture setup bypasses rules", async () => {
  await assertSucceeds(environment.withSecurityRulesDisabled((context) =>
    setDoc(doc(context.firestore(), "users", "backend-user"), { role: "user" })
  ));
});
