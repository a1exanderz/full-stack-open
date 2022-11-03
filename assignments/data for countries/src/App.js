import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterInput = (event) => {
    setCountryFilter(event.target.value);
  };

  const DisplayCountriesByFilter = () => {
    if (!countryFilter) {
      return;
    }

    const countryFilterList = countries.filter((country) =>
      country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
    );

    if (countryFilterList.length > 10) {
      return "Too many matches, specify another filter";
    } else if (countryFilterList.length > 1) {
      return countryFilterList.map((country) => (
        <div key={country.name.common}>
          <HandleDisplayInfoButton country={country} />
        </div>
      ));
    } else if (countryFilterList.length == 1) {
      return <DisplaySingleCountryInfo countryInfo={countryFilterList} />;
    } else {
      return "No countries found";
    }
  };

  const HandleDisplayInfoButton = ({ country }) => {
    const [displayInfo, setDisplayInfo] = useState(false);
    return (
      <div>
        {country.name.common}{" "}
        <button onClick={() => setDisplayInfo(!displayInfo)}>show</button>
        {displayInfo ? (
          <DisplaySingleCountryInfo countryInfo={[country]} />
        ) : null}
      </div>
    );
  };

  const DisplaySingleCountryInfo = ({ countryInfo }) => {
    return countryInfo.map((country) => {
      return (
        <div key={country.name.common}>
          <h1>{country.name.common}</h1>
          <div>capital {country.capital}</div>
          <div>area {country.area}</div>
          <h4>languages:</h4>
          <ul>
            {Object.values(country.languages).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
          <div style={{}}>{country.flag}</div>
        </div>
      );
    });
  };

  return (
    <div>
      <div>
        find countries <input onChange={handleFilterInput} />
      </div>
      <div>
        <DisplayCountriesByFilter />
      </div>
    </div>
  );
}

export default App;
