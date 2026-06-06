import { getChapters } from "@/lib/chapters";
import Notebook from "@/components/Notebook";

export default function Home() {
  const chapters = getChapters();
  return <Notebook chapters={chapters} />;
}
