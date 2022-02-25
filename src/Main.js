import React from 'react';
import axios from 'axios';
import Error from "./Error"
// import {ListGroup, Item} from "react-bootstrap";


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      errorMessage: '',
      showModal: false

    };
  }

  handleCloseModal = () => this.setState({ showModal: false })

  handleCityInput = (e) => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  };

  getCityData = async (e) => {
    e.preventDefault();
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`;

    let cityData = await axios.get(url);

    console.log(cityData.data[0]);
    this.setState({
      cityData: cityData.data[0]
    });
    this.getWeatherData();
  }

  getWeatherData = async () => {
    let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}`;

    let weatherData = await axios.get(url);

    console.log(weatherData.data);
    this.setState({
      cityData: weatherData.data
    });
  }



  render() {
    console.log('app state:', this.state)
    let url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=[12]&size=<150>x<150>`
    return (
      <>
        <form onSubmit={this.getCityData}>
          <label>CITY EXPLORER
            <input type="text" onInput={this.handleCityInput} />
          </label>
          <button type="submit">Explore!</button>
        </form>

        {
          this.state.cityData.display_name &&
          <>
            <h1>{this.state.cityData.display_name}</h1>
            <img src={url} alt={'map of ' + this.state.cityData.display_name} />
            <h3>{this.state.cityData.lat}</h3>
            <h3>{this.state.cityData.lon}</h3>
          </>
        }
        {/* <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Error errorMessage={this.state.errorMessage}/>
        </Modal>  */}

      </>

    );
  }
}

export default Main;