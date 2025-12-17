import Splash from "~/components/ui/Splash";
import { cn } from "~/utils/cn";

export default function About() {
  return (
    <>
      <Splash
        title="🚧 工事中"
        descriptions={[]}
        backgroundColor="bg-green-200"
      />
      <div className={cn("max-w-7xl p-6", "m-auto")}>WIP...</div>
    </>
  );
}
