import { notFound } from "next/navigation";
import TutorialDetail from "@/components/tutorials/TutorialDetail";
import { getTutorialBySlug } from "@/src/data/tutorials";

export default function CrochetFlowerPage() {
  const tutorial = getTutorialBySlug("crochet-flower");

  if (!tutorial) {
    notFound();
  }

  return <TutorialDetail tutorial={tutorial} />;
}
