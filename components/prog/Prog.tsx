// Prog.tsx
import ProgList from "./ProgList";

const colStarts = ["md:col-start-1", "md:col-start-4", "md:col-start-7"];

const lists = [
  {
    date: "21 Oct",
    items: [
      {
        title: "Table ronde",
        time: "14h30",
        location: "Au village",
        address:
          "1, rue de l'Université Jiao Tong Résidence Awaras Cayenne, 97300, Guyane française",
      },
      {
        title: "Table ronde",
        time: "14h30",
        location: "Au village",
        address:
          "1, rue de l'Université Jiao Tong Résidence Awaras Cayenne, 97300, Guyane française",
      },
    ],
  },
  {
    date: "22 Oct",
    items: [
      {
        title: "Table ronde",
        time: "14h30",
        location: "Au village",
        address:
          "1, rue de l'Université Jiao Tong Résidence Awaras Cayenne, 97300, Guyane française",
      },
    ],
  },
  {
    date: "23 Oct",
    items: [
      {
        title: "Table ronde",
        time: "14h30",
        location: "Au village",
        address:
          "1, rue de l'Université Jiao Tong Résidence Awaras Cayenne, 97300, Guyane française",
      },
    ],
  },
];

const Prog = () => {
  return (
    <div
      aria-label="Prog"
      className="flex-1 grid grid-cols-1 md:grid-cols-8 w-full mt-16 gap-y-12"
    >
      {lists.map((list, index) => (
        <ProgList key={index} {...list} colStart={colStarts[index]} />
      ))}
    </div>
  );
};

export default Prog;