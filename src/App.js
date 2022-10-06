import logo from "./logo.svg";
import "./App.css";
import Table from "./component/table";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);

  const dataCountries = async () => {
    try {
      const { data } = await axios.get(`https://restcountries.com/v2/all`);

      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataCountries();
  }, []);

  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
    },
    {
      name: "Country NativeName",
      selector: (row) => row.nativeName,
    },
    {
      name: "Country Capital",
      selector: (row) => row.capital,
    },
    {
      name: "Country Flag",
      selector: (row) => <img width={50} height={50} src={row.flag} />,
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>React table component</h1>
      <Table />
    </div>
  );
}

export default App;
