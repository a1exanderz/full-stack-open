import { useState, useEffect } from "react";
import axios from "axios";

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        setCountry(response.data[0]);
      } catch {
        setCountry("");
        return;
      }
    };

    if (name) {
      fetchData();
    }
  }, [name]);

  return country;
};

export default useCountry;
