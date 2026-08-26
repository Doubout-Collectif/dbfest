import ProgItem from "./ProgItem";

type ProgListProps = {
  date: string;
  items: {
    title: string;
    time: string;
    location: string;
    address: string;
  }[];
  colStart?: string;
};

const ProgList = ({ date, items, colStart }: ProgListProps) => {
  return (
    <ul className={`flex flex-col gap-12 md:col-span-2 ${colStart ?? ""}`}>
      <h4 className="text-2xl font-grindyBrush">{date}</h4>

      {items.map((item, index) => (
        <ProgItem key={index} {...item} />
      ))}
    </ul>
  );
};

export default ProgList;