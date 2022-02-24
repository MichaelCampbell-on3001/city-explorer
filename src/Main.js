import React from 'react';
import axios from 'axios';

import { Form, Button, Container, Card } from 'react-bootstrap';
import './App.css';


// class Main extends React.Component {
//   render() {
//    return<p>Hello from new main</p>

//   };
// }

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {}
    };
  }



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
  }


  render() {
    console.log('app state:', this.state)
    let url = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=[12]&size=<150>x<150>`
    return (
      <>
        <Container>
          <Form onSubmit={this.getCityData}>
            <label>CITY EXPLORER
              <input type="text" onInput={this.handleCityInput} />
            </label>
            <Button type="submit">Explore!</Button>
          </Form>
        </Container>

        {
          this.state.cityData &&
          <Card style={{ width: '22rem', margin: 'auto' }}>
            <Card.Body>

              <Card.Title>{this.state.cityData.display_name}</Card.Title>
              <Card.Img src={url} alt={'map of ' + this.state.cityData.display_name} />
              <Card.Text>{this.state.cityData.lat}
                {this.state.cityData.lon}</Card.Text>
            </Card.Body>

          </Card>
        }
      </>
    );
  }
}

export default Main;
