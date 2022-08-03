import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchCountry } from "../Hooks/useFetch";
import { Country } from "../types";
import ListBorders from "./ListBorders";
import LoaderPage from "./LoaderPage";

const CountryPage = () => {
  const [countryData, setCountryData] = useState<Country>();
  const navigate = useNavigate();
  const { country } = useParams();
  const { data, error } = useFetchCountry(country);

  useEffect(() => {
    setCountryData(data);
    console.log(Object.entries(data.currencies)[0])

  }, [data]);

  useEffect(() => {
    setCountryData(undefined);
  }, [country]);

  return (
    <>
      {error ? (
        <>
          <div className="flex flex-col items-center w-full h-96">
            <h1 className="text-2xl mt-36 mb-6 font-bold text-black dark:text-white">
              Error 404
            </h1>
            <button
              onClick={() => navigate("/")}
              className="shadow-md ml-3 lg:ml-0 p-1 bg-white dark:bg-slate-700 dark:border-slate-700 text-black dark:text-white rounded-md w-32 border-2 border-gray-100 cursor-pointer"
            >
              Home
            </button>
          </div>
        </>
      ) : countryData ? (
        <>
          <header className="p-3 py-4 mt-5">
            <button
              onClick={() => navigate("/")}
              className="shadow-md ml-3 lg:ml-0 p-1 bg-white dark:bg-slate-700 dark:border-slate-700 text-black dark:text-white rounded-md w-32 border-2 border-gray-100 cursor-pointer"
            >
              Back
            </button>
          </header>
          <section className="p-3 flex flex-col items-start lg:flex-row min-h-screen">
            <img
              src={countryData.flags.svg}
              alt=""
              className="mb-5 lg:w-5/12 p-3 pb-0 lg:p-0 lg:pt-4 lg:mr-10 lg:h-96"
            />
            <div className="p-3 lg:p-5  w-w-2/4 text-black dark:text-white">
              <h3 className="font-bold text-2xl pb-4 md:pb-8">
                {countryData.name.common}
              </h3>
              <div className="flex flex-col lg:flex-row">
                <article className="flex flex-col pr-10 mb-5 lg:mb-0">
                  <span className="py-1 text-sm md:text-base">
                    <label
                      htmlFor="Native name"
                      className="font-semibold dark:font-medium pr-1"
                    >
                      Native name:
                    </label>
                    <span className="dark:text-gray-300">
                      {countryData.name.official}
                    </span>
                  </span>
                  <span className="py-1 text-sm md:text-base">
                    <label
                      htmlFor="Population"
                      className="font-semibold dark:font-medium pr-1"
                    >
                      Population:
                    </label>
                    <span className="dark:text-gray-300">
                      {countryData.population}
                    </span>
                  </span>
                  <span className="py-1 text-sm md:text-base">
                    <label
                      htmlFor="Region"
                      className="font-semibold dark:font-medium pr-1"
                    >
                      Region:
                    </label>
                    <span className="dark:text-gray-300">
                      {countryData.region}
                    </span>
                  </span>
                  <span className="py-1 text-sm md:text-base">
                    <label
                      htmlFor="sub Region"
                      className="font-semibold dark:font-medium pr-1"
                    >
                      Sub Region:
                    </label>
                    <span className="dark:text-gray-300">
                      {countryData.subregion}
                    </span>
                  </span>
                  <span className="py-1 text-sm md:text-base">
                    <label
                      htmlFor="Capital"
                      className="font-semibold  dark:font-medium pr-1"
                    >
                      Capital:
                    </label>
                    <span className="dark:text-gray-300">
                      {countryData.capital}
                    </span>
                  </span>
                </article>
                <article className="flex flex-col">
                  <span className="py-1 text-sm md:text-base">
                    <label
                      htmlFor="Top Level Domain"
                      className="font-semibold dark:font-medium pr-1"
                    >
                      Top Level Domain:
                    </label>
                    <span className="dark:text-gray-300">
                      {countryData.tld[0]}
                    </span>
                  </span>
                   <span className="py-1 text-sm md:text-base">
                    <label
                      htmlFor="Currencies"
                      className="font-semibold dark:font-medium pr-1"
                    >
                      Currencies:
                    </label>
                    <span className="dark:text-gray-300">
                       {Object.entries(data.currencies)[0][0]} 
                    </span>
                  </span>
                  <span className="flex py-1 text-sm md:text-base">
                    <label
                      htmlFor="Lenguages"
                      className="font-semibold dark:font-medium pr-1"
                    >
                      Lenguages:
                    </label>
                    <ul className="flex">
                      {Object.entries(data.languages).map((element, index) => {
                        if (
                          index + 1 ===
                          Object.entries(data.languages).length
                        ) {
                          return (
                            <li key={index} className="dark:text-gray-300">
                              {element[1]}
                            </li>
                          );
                        } else {
                          return (
                            <li
                              className="pr-1 dark:text-gray-300"
                              key={index}
                            >{`${element[1]},`}</li>
                          );
                        }
                      })}
                    </ul>
                  </span>
                </article>
              </div>
              {countryData.borders && <ListBorders data={data} />}
            </div>
          </section>
        </>
      ) : (
        <LoaderPage />
      )}
    </>
  );
};

export default CountryPage;
