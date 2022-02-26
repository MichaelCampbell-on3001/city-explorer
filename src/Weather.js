import React from 'react';

class Weather extends React.Component {
  render() {
    return (
      <div> {this.props.weatherData.map((day) => {
        return(
        <>
          <h3>{day.date}</h3>
          <h3>{day.description}</h3>
        </>
        )
      })}


      </div>
    )
  }
}
export default Weather