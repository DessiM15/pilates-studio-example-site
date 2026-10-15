import { PageIntro } from "@/components/sections/PageIntro";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageIntro eyebrow="404" title="This page has drifted off the mat" lead="The page you were looking for is not here. Try one of these instead.">
      <Button href="/">Home</Button>
      <Button href="/classes" variant="outline">
        Classes
      </Button>
      <Button href="/schedule" variant="outline">
        Schedule
      </Button>
    </PageIntro>
  );
}
