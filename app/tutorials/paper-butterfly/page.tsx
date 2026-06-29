import { notFound } from "next/navigation";
import TutorialDetail from "@/components/tutorials/TutorialDetail";
import { getTutorialBySlug } from "@/src/data/tutorials";

export default function PaperButterflyPage() {
  const tutorial = getTutorialBySlug("paper-butterfly");

  if (!tutorial) {
    notFound();
  }

  return <TutorialDetail tutorial={tutorial} />;
}
