import React from 'react';

const cards = React.memo(({ data, index }) => {
  console.log(data);

  return (
    <div className="card">
      <div class="message-header">
        {data.day} {!index ? `From ${data.time}` : null}
      </div>
      <article class="message is-info">
        <div class="message-header is-info">
          {data.totalRain ? `Total Rain:${data.totalRain}MM` : 'No Rain :)'}
          {data.totalSnow ? `  Snow: ${data.totalSnow} CM` : null}
          {data.cloudiness > 25 ? ' - Cloudy :(' : null}
          {data.totalSnow ? ` Snow: ${data.totalSnow} CM` : null}
        </div>
      </article>
      <div className="has-background-blue">
        <div className="card-image has-background-blue">
          <figure className="image is-1by1">
            <img
              className="is-rounded has-backgorund-blue"
              src={`http://openweathermap.org/img/wn/${data.icon.replace(
                'n',
                'd'
              )}@2x.png`}
              alt="Placeholder image"
            />
          </figure>
        </div>
      </div>
      <div className="card-content">
        <p className="title is-4 is-capitalized">{data.displayWeather}</p>
        <p className="title is-4">{data.high} °C</p>
        <p className="subtitle is-6">Low: {data.low} °C</p>
        <p className="subtitle is-6">Wind: {data.wind * 3.6} km/h </p>
        <p className="subtitle is-6">
          {data.totalRain ? `Rain starts at ${data.rainStart}` : null}
          {data.totalSnow ? ` Snow starts at ${data.snowStart}` : null}
        </p>
      </div>
    </div>
  );
});

export default cards;
