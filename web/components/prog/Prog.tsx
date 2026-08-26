import ProgList from "./ProgList";
import type { Event as EventType } from "@/sanity.types";

const colStarts = ["md:col-start-1", "md:col-start-4", "md:col-start-7"];

const Prog = ({ schedule }: { schedule: EventType["schedule"] }) => {
  if (!schedule?.length) return null;

  return (
    <div aria-label="Prog" className="flex-1 grid grid-cols-1 md:grid-cols-8 w-full mt-16 gap-y-12">
      {schedule.map((day, index) => (
        <ProgList
          key={day._key}
          date={day.date}
          items={day.items}
          colStart={colStarts[index % colStarts.length]}
        />
      ))}
    </div>
  );
};

export default Prog;