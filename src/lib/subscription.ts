const TRIAL_DAYS = 15;
const DAY_IN_MS = 24 * 60 * 60 * 1000;

type FirestoreTimestampLike = {
  toDate: () => Date;
};

export function getTrialEndDate(startDate = new Date()) {
  return new Date(startDate.getTime() + TRIAL_DAYS * DAY_IN_MS);
}

function toDate(value: Date | string | number | FirestoreTimestampLike | null | undefined) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "object" && "toDate" in value) {
    return value.toDate();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function isTrialActive(trialEndsAt: Date | string | number | FirestoreTimestampLike | null | undefined) {
  const endDate = toDate(trialEndsAt);
  return endDate ? endDate.getTime() > Date.now() : false;
}

export function getDaysLeft(trialEndsAt: Date | string | number | FirestoreTimestampLike | null | undefined) {
  const endDate = toDate(trialEndsAt);

  if (!endDate) {
    return 0;
  }

  return Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / DAY_IN_MS));
}
