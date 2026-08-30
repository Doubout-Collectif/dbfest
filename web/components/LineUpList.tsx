import Image from "next/image";

type LineUpListeProps = {
  artists: string[];
  isIllu?: boolean;
  illuSrc?: string;
  color?: string;
};

const LineUpList = ({
  artists,
  isIllu = false,
  illuSrc = "/Illustrations/soloChara.png",
  color = "text-black",
}: LineUpListeProps) => {
  return (
    <ul className="relative h-fit flex gap-x-3 sm:gap-x-4 gap-y-2 flex-wrap justify-center max-w-[240px] sm:max-w-3xs">
      {isIllu && (
        <Image
          src={illuSrc}
          alt="artist"
          width={272}
          height={397}
          className="-z-10 absolute top-1/2 left-1/2 -translate-1/2 w-32 sm:w-44 md:w-[272px] h-auto"
        />
      )}
      {artists.map((artist, index) => (
        <li
          key={`${artist}-${index}`}
          className={`font-thunder text-lg sm:text-xl md:text-2xl font-normal uppercase ${color}`}
        >
          {artist}
        </li>
      ))}
    </ul>
  );
};

export default LineUpList;