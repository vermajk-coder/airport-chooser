import React from "react";
import PropTypes from "prop-types";
import "./dropdown.css";

function Dropdown(props) {
  const [visibleAirports, setVisibleAiports] = React.useState(
    props.airports.slice(0, props.datasize)
  );
  const selectRef = React.useRef(null);
  const buttonRef = React.useRef(null);

  function handleScroll(e) {
    const currentNode = e.currentTarget;
    const isBottomVisible =
      Math.round(currentNode.scrollHeight - currentNode.scrollTop) ===
      currentNode.clientHeight;
    if (isBottomVisible) {
      setVisibleAiports(
        props.airports.slice(0, visibleAirports.length + props.datasize)
      );
    }
  }

  function handleButtonClick(e) {
    selectRef.current.classList.toggle("show");
  }

  function setSelectedOption(airport) {
    buttonRef.current.value = airport.name;
    buttonRef.current.innerHTML = airport.name;
  }
  return (
    <div>
      <button
        className="drop-down-container"
        onClick={handleButtonClick}
        value={props.airports[0].name}
        ref={buttonRef}
      >
        <i className="down-caret"></i>
        {props.airports[0].name}
      </button>
      <div className="dropdown-content" ref={selectRef} onScroll={handleScroll}>
        {visibleAirports.map((airport, index) => (
          <div key={index} onClick={() => setSelectedOption(airport)}>
            <span>
              <strong>Name: </strong>
              {airport.name}
            </span>
            <span>
              <strong>City/Country: </strong>
              {airport.city}/{airport.country}
            </span>
            <span>
              <strong>Code: </strong>
              {airport.code}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

Dropdown.defaultProps = {
  datasize: 20,
  airports: []
};

Dropdown.propTypes = {
  datasize: PropTypes.number,
  airports: PropTypes.array
};

export default Dropdown;
