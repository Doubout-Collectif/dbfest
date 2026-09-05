import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/Footer";
import Background from "@/components/Background";
import HighlightedRichText from "@/components/sections/HighlightedRichText";
import LineUp from "@/components/sections/LineUp";
import Event from "@/components/sections/Event";
import EventIllustration from "@/components/sections/EventIllustration";
import FestivalMap from "@/components/sections/FestivalMap";

import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/queries";
import { hasScheduleItems } from "@/components/prog/prog-timing";

export default async function Home() {
  const { data: homePage } = await sanityFetch({
    query: HOME_PAGE_QUERY,
  });

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Background />

      <Hero hero={homePage?.hero ?? null} />

      <HighlightedRichText
        highlightedRichText={homePage?.highlightedRichText ?? null}
      />

      <LineUp lineUp={homePage?.lineUp ?? null} />

      {(() => {
        const visibleEvents =
          homePage?.events?.filter((event) => hasScheduleItems(event.schedule)) ?? [];

        return visibleEvents.map((event, index) => (
          <div key={event._key} className="w-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.8) 60%, transparent 100%)",
          }}
          >
            <Event event={event} />

            {index < visibleEvents.length - 1 && (
              <EventIllustration index={index ?? 0} />
            )}
          </div>
        ));
      })()}

      <FestivalMap />

      <Footer footer={homePage?.footer ?? null} />
    </div>
  );
}