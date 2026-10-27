import type { Metadata } from "next";
import { EventBrowser } from "@/components/event-browser";
import { images } from "@/content/images";
import { PageHero } from "@/components/media";
import { Container, Section } from "@/components/ui";
import { fullAddress } from "@/config/site";
import { events } from "@/content/events";

export const metadata: Metadata = {
  title: "Events & Tickets",
  description: "Performances, concerts, open houses, and the annual gala — browse the season and get tickets.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events & tickets"
        image={images.performances}
        title="The season on stage."
        intro={`Ballet, plays, musicals, and concerts — most performances are under $25, and many are free. All events take place at ${fullAddress} unless noted.`}
      />
      <Section>
        <Container>
          <EventBrowser events={events} />
        </Container>
      </Section>
    </>
  );
}
