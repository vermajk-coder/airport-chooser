import axios from "axios";
import React from "react";
import "./App.css";

import Dropdown from "./component/dropdown";

function App() {
  const [airports, setAirports] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;
    axios.get("./airports.json").then(airport => {
      if (isMounted) {
        const airportData = airport.data.filter(_data => {
          return _data.type === "Airports" && _data.type && _data.name;
        });
        setAirports(airportData);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!airports.length) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Dropdown airports={airports} datasize={20} />
    </div>
  );
}

export default App;
