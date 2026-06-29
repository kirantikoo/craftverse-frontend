import { notFound } from "next/navigation";
import TutorialDetail from "@/components/tutorials/TutorialDetail";
import { getTutorialBySlug } from "@/src/data/tutorials";

export default function SewingMachineBasicsPage() {
  const tutorial = getTutorialBySlug("sewing-machine-basics");

  if (!tutorial) {
    notFound();
  }

  return <TutorialDetail tutorial={tutorial} />;
}
