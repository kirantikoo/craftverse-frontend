import { notFound } from "next/navigation";
import TutorialDetail from "@/components/tutorials/TutorialDetail";
import { getTutorialBySlug } from "@/src/data/tutorials";

export default function KurtiStitchingPage() {
  const tutorial = getTutorialBySlug("kurti-stitching");

  if (!tutorial) {
    notFound();
  }

  return <TutorialDetail tutorial={tutorial} />;
}
