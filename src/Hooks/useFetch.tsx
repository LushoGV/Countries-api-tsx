import axios from "axios";
import { useState, useEffect } from "react";
import { Country } from "../types";

export const useFetch = () => {
  const [data, setData] = useState<Country[]>([]);
  let api = `https://restcountries.com/v3.1/all`;

  const getData = async () => {
    try {
      const res = await axios.get(api);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return data;
};

export const useFetchCountry = (param: string | undefined) :{data:Country, error:boolean} => {
    const [data, setData] = useState<Country>();
    const [error, setError] = useState<boolean>(false)
    let api = `https://restcountries.com/v3.1/name/${param}`;
  
    const getData = async () => {
      try {
        const res = await axios.get(api);
        setData(res.data[0])
      } catch (error) {
        setError(true)
      }
    };
  
    useEffect(() => {
      getData();
    },[param]);
  
    return {data, error};
  };

