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

      {homePage?.events?.map((event, index) => (
        <div key={event._key}>
          <Event event={event} />

          {index < homePage.events.length - 1 && (
            <EventIllustration index={index} />
          )}
        </div>
      ))}

      <FestivalMap />

      <Footer />
    </div>
  );
}