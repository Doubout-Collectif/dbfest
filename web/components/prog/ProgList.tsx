import ProgItem from "./ProgItem";
import type { Event as EventType } from "@/sanity.types";

type ScheduleDay = NonNullable<EventType["schedule"]>[number];

type ProgListProps = {
  date?: string;
  items?: ScheduleDay["items"];
  colStart?: string;
};

const ProgList = ({ date, items, colStart }: ProgListProps) => {
  return (
    <ul className={`flex flex-col gap-8 sm:gap-10 md:gap-12 md:col-span-2 ${colStart ?? ""}`}>
      <h4 className="text-xl sm:text-2xl font-grindyBrush">{date}</h4>

      {items?.map((item) => (
        <ProgItem key={item._key} {...item} />
      ))}
    </ul>
  );
};

export default ProgList;