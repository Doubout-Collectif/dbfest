import Image from "next/image";

type LineUpListeProps = {
  artists: string[],
  isIllu?: boolean,
  illuSrc?: string,
  color?: string
}

const LineUpList = ({ artists, isIllu = false, illuSrc = "/Illustrations/soloChara.png", color = "text-black" }: LineUpListeProps) => {
  return (
    <ul className="relative h-fit flex gap-x-4 flex-wrap justify-center max-w-3xs">
      {isIllu && (
        <Image src={illuSrc} alt="artist" width={272} height={397} className="-z-10 absolute top-1/2 left-1/2 -translate-1/2" />
      )}
      {artists.map((artist, index) => (
        <li key={`${artist}-${index}`} className={`font-thunder text-2xl font-normal uppercase ${color}`}>{artist}</li>
      ))}
    </ul>
  );
};

export default LineUpList;