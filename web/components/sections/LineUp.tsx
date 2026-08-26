import SectTitle from "../SectTitle";
import LineUpList from "@/components/LineUpList";
import type { LineUp as LineUpType } from "@/sanity.types";

const LineUp = ({ lineUp }: { lineUp: LineUpType | null }) => {
  if (!lineUp) return null;

  return (
    <section className="min-h-screen w-full flex flex-col justify-between">
      <SectTitle title={lineUp.title ?? "Line Up"} color="black" />
      <div className="flex-1 flex justify-around align-center flex-wrap content-center">
        {lineUp.columns?.map((column) => (
          <LineUpList
            key={column._key}
            artists={column.artists ?? []}
            isIllu={column.showIllustration ?? false}
          />
        ))}
      </div>
    </section>
  );
};

export default LineUp;