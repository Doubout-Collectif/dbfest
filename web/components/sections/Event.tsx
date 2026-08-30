import SectTitle from "@/components/SectTitle";
import Prog from "@/components/prog/Prog";
import type { Event as EventType } from "@/sanity.types";

const Event = ({ event }: { event: EventType }) => {
  return (
    <section
      aria-label="Event"
      className="flex flex-col justify-between w-full min-h-screen p-4 sm:p-6 md:p-8 mt-8 sm:mt-12 md:mt-16"
    >
      <SectTitle title={event.title ?? "Conférence"} />
      <Prog schedule={event.schedule} />
      <div className="grid grid-cols-1 md:grid-cols-8 gap-8 md:gap-0 items-start md:items-end mt-8 md:mt-0">
        <div className="md:col-start-1 md:col-span-2 flex flex-col gap-2 h-fit">
          <h4 className="text-sm sm:text-base text-[#002518]/60 font-thunder font-medium tracking-[0.04em] uppercase">
            [ Description ]
          </h4>
          <p className="text-base sm:text-lg font-thunder font-light leading-5 tracking-[0.04em]">
            {event.description}
          </p>
        </div>
        <div className="md:col-start-4 md:col-span-2 flex flex-col gap-2 h-fit">
          <h4 className="text-sm sm:text-base text-[#002518]/60 font-thunder font-medium tracking-[0.04em] uppercase">
            [ Intervenants ]
          </h4>
          <p className="text-base sm:text-lg font-thunder font-light leading-5 tracking-[0.04em]">
            {event.speakers}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Event;