import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Table = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");

  const dataCountries = async () => {
    try {
      const { data } = await axios.get(`https://restcountries.com/v2/all`);

      setCountries(data);
      setFilteredCountries(data);
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
      sortable: true,
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
    {
      name: "Action",
      cell: (row) => (
        <buton
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: ".5rem",
            cursor: "pointer",
          }}
          onClick={() => alert(`You clicked ${row.name}`)}
        >
          Edit
        </buton>
      ),
    },
  ];

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase()); //match like include
    });

    setFilteredCountries(result);
  }, [search]);

  return (
    <div>
      <DataTable
        title="countries"
        columns={columns}
        data={filteredCountries}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="500px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={
          <buton
            style={{
              backgroundColor: "red",
              color: "white",
              padding: ".5rem",
              cursor: "pointer",
            }}
          >
            Export
          </buton>
        }
        subHeader
        subHeaderComponent={
          <input
            type={"text"}
            placeholder="search here"
            style={{ padding: "4px 8px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
        subHeaderAlign="right"
      />
    </div>
  );
};

export default Table;
