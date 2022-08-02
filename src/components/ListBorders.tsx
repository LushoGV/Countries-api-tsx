import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
import { CountryListProps } from "../types";

const ListBorders = (props: CountryListProps) => {
  const [countriesList, setCountriesList] = useState<string[]>([]);
  const allCountries = useFetch();
  const navigate = useNavigate();

  const filterNames = (): string[] => {
    if (props.data.borders) {
      let newArr: string[] = [];
      props.data.borders.map((element: string) => {
        let completedName = allCountries.filter((item) => {
          if (item.cca3 === element) return item;
        });
        completedName[0] && newArr.push(completedName[0].name.common);
      });

      if (newArr.length > 5) newArr = newArr.slice(0, 5);

      return newArr;
    } else return [];
  };

  useEffect(() => {
    setCountriesList(filterNames());
  }, [props, allCountries]);

  return (
    <article className="flex flex-col lg:flex-row lg:items-center pt-8 text-sm md:text-base">
      <label
        htmlFor="Border Countries"
        className="pr-2 font-semibold dark:font-medium"
      >
        Border Countries:
      </label>
      <ul className="flex flex-wrap mt-2 lg:mt-0">
        {countriesList &&
          countriesList.map((element: string, index: number) => {
            return (
              <li
                onClick={() => navigate(`/${element}`)}
                className="h-7 shadow-md flex items-center p-3 mb-1 border-2 border-gray-100 bg-white dark:bg-slate-700 dark:border-slate-700 dark:text-gray-300 rounded-md mr-1 text-sm cursor-pointer"
                key={index}
              >
                {element}
              </li>
            );
          })}
      </ul>
    </article>
  );
};

export default ListBorders;
