type ProgItemProps = {
  title?: string;
  time?: string;
  location?: string;
  address?: string;
};

const ProgItem = ({ title, time, location, address }: ProgItemProps) => {
  return (
    <li className="flex flex-col gap-3 sm:gap-4 max-w-full sm:max-w-3xs">
      <div className="flex justify-between flex-wrap gap-2">
        <strong className="text-sm sm:text-base font-medium font-thunder uppercase text-figma tracking-[0.04em]">
          {title}
        </strong>
        <p className="text-sm sm:text-base font-medium font-thunder uppercase text-figma tracking-[0.04em]">
          {time}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs sm:text-sm font-medium font-thunder uppercase text-figma tracking-[0.04em]">
          {location}
        </p>
        <p className="text-xs sm:text-sm font-thunder text-figma tracking-[0.04em]">{address}</p>
      </div>
    </li>
  );
};

export default ProgItem;