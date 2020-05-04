import React, { useEffect } from 'react';
import axios from 'axios';
import Card from './UI/weatherCard';

const modeAtIndex = (arr) => {
  const modeFound = [...arr]
    .sort(
      (x, y) =>
        arr.filter((val) => val === x).length -
        arr.filter((val) => val === y).length
    )
    .pop();
  return [modeFound, arr.findIndex((x) => x === modeFound)];
};

const sum = (arr) => arr.reduce((x, y) => x + y, 0);
const avg = (arr) => sum(arr) / arr.length;

// getWeather, a consant function that only needs to be  assigned once
//getWeather, takes in api data and reduces into data that is managable + releavant
//Note: Trying more functional-style javascript lately but still want to make it readable. This is somewhat illustrated in the functions below
const getWeather = (date) => {
  console.log(date.city.name);
  const tzOffset = date.city.timezone; // in seconds
  //reduce the values to an array of days of week, with the relevant values I care about
  return date.list.reduce((acc, item) => {
    ///Setting the date below to the timezone of the city, and getting date and time
    const dateTzAdjustment = new Date((item.dt + tzOffset) * 1000);
    const day = dateTzAdjustment.toLocaleDateString(
      {},
      { timeZone: 'UTC', weekday: 'long' }
    );
    const time = dateTzAdjustment.toLocaleTimeString(
      {},
      { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
    );
    ///getting the count allows me to calculate how many 60 hour intervals are in the day (up to 8)
    const { temp } = item.main;
    const { main: weather, description, icon } = item.weather[0];
    const rain = item.rain ? item.rain['3h'] : 0;
    const snow = item.snow ? item.snow['3h'] : 0;
    const wind = item.wind ? item.wind.speed : 0;
    const clouds = item.clouds ? item.clouds.all : 0;
    const isDay = acc[day] ? true : false;
    return {
      ...acc,
      [day]: {
        count: isDay ? acc[day].count + 1 : 1,
        time: isDay ? [...acc[day].time, time] : [time],
        rain: isDay ? [...acc[day].rain, rain] : [rain],
        snow: isDay ? [...acc[day].snow, snow] : [snow],
        wind: isDay ? [...acc[day].wind, wind] : [wind],
        clouds: isDay ? [...acc[day].clouds, clouds] : [clouds],
        temp: isDay ? [...acc[day].temp, temp] : [temp],
        weather: isDay ? [...acc[day].weather, weather] : [weather],
        description: isDay
          ? [...acc[day].description, description]
          : [description],
        icon: isDay ? [...acc[day].icon, icon] : [icon],
      },
    };
  }, {});
};

//actionableWeather takes the weather data from getWeather that is easy to work with and relevant, and makes it actionable (setting state that will be displayed)
//I could possibily seperate this out into seprate functions after init state, but I dont plan on making any updatse to the weather state after it is initialized.
//also flatter state is better
const actionableWeather = (weather) => {
  const daysArray = Object.keys(weather);
  return (
    Object.values(weather)
      //Filter: With 6 days, the first and last day will have cut offs.
      //This means day 6 wont paint an accurate picture in a foreacst (vs the first day where any cut off time has already passed)
      .filter((x, i) => i < 5)
      .reduce((acc, day, ind, arr) => {
        //the most frequent weather forecast found will be the weather displayed
        const [mostFrequent, freqIndex] = modeAtIndex(day.description);
        const totalRain = Math.round(sum(day.rain));
        const totalSnow = Math.round(sum(day.snow));
        const rainStart =
          totalRain > 0
            ? day.time[day.rain.findIndex((val) => val > 0)]
            : false;
        const snowStart =
          totalSnow > 0
            ? day.time[day.snow.findIndex((val) => val > 0)]
            : false;

        return {
          ...acc,
          [daysArray[ind]]: {
            day: daysArray[ind],
            time: day.time[0],
            displayWeather: mostFrequent,
            high: Math.round(Math.max(...day.temp)),
            low: Math.round(Math.min(...day.temp)),
            wind: Math.round(avg(day.wind)),
            cloudiness: avg(day.clouds),
            icon: day.icon[freqIndex],
            totalRain,
            totalSnow,
            rainStart,
            snowStart,
          },
        };
      }, {})
  );
};

const Dashboard = React.memo((props) => {
  // const [weather, setweather] = setState(weather);
  useEffect(() => {
    (async () => {
      try {
        const weatherData = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?units=${props.unit}&q=${props.city}&appid=${process.env.REACT_APP_WEATHER_KEY}`
        );
        ///intentended to fix wrong name issue in city search
        const cityName = weatherData.data.city.name;
        props.setData(actionableWeather(getWeather(weatherData.data)));
      } catch (err) {
        alert('error in serach');
        console.log(err);
      }
    })();
  }, [actionableWeather, getWeather, props.setData, props.city, props.unit]);
  //only one search per search click per dependency above

  let userElement = null;

  const mapCards = (weather) => {
    //create cards
    return Object.keys(weather).map((day, index) => {
      return (
        <div key={index} className="column is-2">
          <Card index={index} data={weather[day]} />
        </div>
      );
    });
  };

  if (props.data) {
    userElement = mapCards(props.data);
  }
  console.log('render', props.city);
  return (
    <div className="columns is-centered is-0-mobile is-0-tablet is-0-desktop">
      {userElement}
      <br />
    </div>
  );
});

export default Dashboard;
