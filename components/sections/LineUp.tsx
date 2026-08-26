import SectTitle from "../SectTitle";
import LineUpList from "@/components/LineUpList";

const lineUp1 = ["Vasko", "Néma", "Riko Blaze", "Krom", "Jasko", "Mirox", "Sanka", "Dreko", "Neyo K", "Zanko", "Lasko"];
const lineUp2 = ["Kairo V", "Noxem", "Slyko", "Raska", "Mavrik", "Zeyro", "Kenz", "Dasko"];
const lineUp3 = ["Néma", "Riko Blaze", "Krom", "Jasko", "Mirox", "Sanka", "Dreko"];

const LineUp = () => {
  return (
    <section className="min-h-screen w-full flex flex-col justify-between">
        <SectTitle title='Line Up' color="black" />
        <div className="flex-1 flex justify-around align-center flex-wrap content-center ">
            <LineUpList artists={lineUp1} isIllu />
            <LineUpList artists={lineUp2} />
            <LineUpList artists={lineUp3} isIllu />
        </div>
    </section>
  );
};

export default LineUp;