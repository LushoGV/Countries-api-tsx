import { useEffect, useState } from "react";
import Card from "./Card";
import { useFetch } from "../Hooks/useFetch";
import { Country } from "../types";
import LoaderPage from "./LoaderPage";

const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [regionsActive, setRegionsActive] = useState<boolean>(false);
  const [regionSelected, setRegionSelected] = useState<number>(0);
  const data = useFetch();
  const Regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    setCountries(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      let newData = countries.filter((element: Country) =>
        element.name.common.toLowerCase().startsWith(e.target.value)
      );
      if (regionSelected > 0) {
        let region = Regions[regionSelected - 1];
        newData = countries.filter((element) => {
          if (
            element.region.toLowerCase().includes(region.toLowerCase()) &&
            element.name.common.toLowerCase().startsWith(e.target.value)
          )
            return element;
        });
      }
      setCountries(newData);
    } else {
      if (regionSelected > 0) {
        let region = Regions[regionSelected - 1];
        let newData = data.filter((element) =>
          element.region.toLowerCase().includes(region.toLowerCase())
        );
        setCountries(newData);
      } else setCountries(data);
    }
  };

  const ChangeRegion = (newRegion: string, newIndex: number) => {
    if (regionSelected - 1 === newIndex) {
      setCountries(data);
      setRegionSelected(0);
    } else {
      let newData = data.filter((element: Country) =>
        element.region.toLowerCase().includes(newRegion.toLowerCase())
      );
      setCountries(newData);
      setRegionSelected(newIndex + 1);
    }
    setRegionsActive(false);
  };

  return (
    <>
      <header className="p-3 py-4 lg:px-2 mt-4 flex flex-col md:flex-row justify-between">
        <input
          type="text"
          name=""
          id=""
          onChange={handleChange}
          className="bg-white dark:bg-slate-700 dark:border-slate-700 dark:text-white p-3 rounded-md max-w-md w-full border-2 border-gray-100 shadow-md mb-3 md:mb-0 outline-none"
          placeholder="Search for a country..."
        />
        <div>
          <button
            onClick={() => setRegionsActive(!regionsActive)}
            className="relative bg-white dark:bg-slate-700 dark:border-slate-700 dark:text-white p-3 rounded-md max-w-md w-40 mb-1 md:w-full border-2 border-gray-100 shadow-md md:mb-0"
          >
            Filter by Region
          </button>
          <div
            className={
              regionsActive
                ? "md:mt-1 absolute bg-white dark:bg-slate-700 dark:border-slate-700 dark:text-white p-3 rounded-md max-w-md w-40 md:w-36 border-2 border-gray-100 shadow-md mb-3 md:mb-0"
                : "hidden"
            }
          >
            <ul>
              {Regions.map((element, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => ChangeRegion(element, index)}
                    className={
                      regionSelected - 1 === index
                        ? "my-1 cursor-pointer font-semibold dark:font-normal hover:font-semibold hover:dark:font-normal"
                        : "bg-white dark:bg-slate-700 my-1 cursor-pointer  dark:text-gray-300 hover:font-semibold hover:dark:text-white hover:dark:font-normal"
                    }
                  >
                    {element}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>
      {countries.length ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-9 lg:gap-14 py-4 px-5 md:px-0">
          {countries &&
            countries.slice(0, 12).map((element, index) => {
              return (
                <li key={index}>
                  <Card
                    name={element.name.common}
                    population={element.population}
                    flag={element.flags.png}
                    region={element.region}
                    capital={element.capital}
                  />
                </li>
              );
            })}
        </ul>
      ) : (
        <LoaderPage />
      )}
    </>
  );
};

export default Home;
