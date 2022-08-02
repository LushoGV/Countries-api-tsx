import { useNavigate } from "react-router-dom";
import { CardProps } from "../types";

const Card = (props: CardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white dark:bg-slate-700 dark:border-slate-700 text-black dark:text-white shadow-sm m-2 flex flex-col rounded-md border-2 cursor-pointer overflow-hidden hover:shadow-lg"
      onClick={() => navigate(`/${props.name}`)}
    >
      <header className="flex flex-col">
        <img src={props.flag} alt="" className="h-44 object-fill" />
      </header>
      <section className="p-5">
        <h2 className="mb-2 font-bold text-xl">{props.name}</h2>
        <div className="flex flex-col">
          <span className="text-sm">
            <label
              htmlFor="Population"
              className="font-semibold dark:font-medium"
            >
              Population:
            </label>
            <span className="pl-1 dark:text-gray-300">{props.population}</span>
          </span>
          <span className="text-sm">
            <label htmlFor="Region" className="font-semibold dark:font-medium">
              Region:
            </label>
            <span className="pl-1 dark:text-gray-300">{props.region}</span>
          </span>
          <span className="text-sm">
            <label htmlFor="Capital" className="font-semibold dark:font-medium">
              Capital:
            </label>
            <span className="pl-1 dark:text-gray-300">{props.capital}</span>
          </span>
        </div>
      </section>
    </div>
  );
};

export default Card;
