import { notFound } from "next/navigation";
import TutorialDetail from "@/components/tutorials/TutorialDetail";
import { getTutorialBySlug } from "@/src/data/tutorials";

export default function EasyToteBagPage() {
  const tutorial = getTutorialBySlug("easy-tote-bag");

  if (!tutorial) {
    notFound();
  }

  return <TutorialDetail tutorial={tutorial} />;
}
