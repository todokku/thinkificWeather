import React, { useState, useEffect } from 'react';
import WeatherList from './components/weather';
import SearchControl from './components/UI/searchControl';
import Hero from './components/UI/hero';
const App = () => {
  const [units, setUnits] = useState('metric');
  const [cityData, setCityData] = useState(null);
  const [secondCityData, setSecondCityData] = useState(null);
  const [city, setCity] = useState('toronto');
  const [secondCity, setSecondCity] = useState('vancouver');
  // const [winner, setWinner] = useState(null);

  const searchCity = (type, query) => {
    if (query) {
      type === 'first' ? setCity(query) : setSecondCity(query);
    }
  };

  ///my goal was to create a winner string,
  //I was most of the way through ( moved the state up to App, and adjusted for rerendering issues,
  //but ran out of time(need to refactor the reduce functions in weather.js, then i wouldnt need logic below, or to pass state up here)

  // useEffect(() => {
  //   if (cityData && secondCityData) {
  //     console.log(cityData);
  //     const objectState = Object.keys(cityData).reduce((datas, acc) => {
  //       console.log(datas);
  //       //     rain: totalRain,
  //       // }
  //     }, {});
  //     console.log(objectState);
  //   }
  // }, [winner, cityData, secondCityData]);

  return (
    <React.Fragment>
      <Hero />
      <SearchControl
        city={city}
        secondCity={secondCity}
        searchCity={searchCity}
      />
      <div className="columns is-centered is-0-mobile is-mobile is-multiline">
        <div className="column is-one-half-mobile is-full-tablet">
          <div className="title has-text-centered">{city}</div>
          <WeatherList
            unit={units}
            city={city}
            data={cityData}
            setData={setCityData}
          />
        </div>
        <div className="column is-half-mobile is-full-tablet">
          <div className="title has-text-centered">{secondCity}</div>
          <WeatherList
            unit={units}
            city={secondCity}
            data={secondCityData}
            setData={setSecondCityData}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
