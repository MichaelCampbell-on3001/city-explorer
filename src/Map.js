import axios from 'axios';
import React from 'react';

// getCityData = async (e) => {
//   e.preventDefault();
//   let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.city}&format=json`

//   let cityData = await axios.get(url);

//   console.log(cityData.data[0]);
//   this.setState({
//     cityData: cityData.data[0]
//   });
// }

// getMap = async (e) => {
//   e.preventDefault();
//   let url = `https://tiles.locationiq.com/v3/streets/vector.json?key=${process.env.REACT_APP_LOCATION_API_KEY}`

//   let mapData = await axios.get(url);
//   console.log(mapData.data[0]);
//   this.setState({
//     cityData: mapData.data[0]
//   });
// }

class Map extends React.Component {
  
  getMap = async (e) => {
    e.preventDefault();
    let url = `https://tiles.locationiq.com/v3/streets/vector.json?key=${process.env.REACT_APP_LOCATION_API_KEY}`
  
    let mapData = await axios.get(url);
    console.log(mapData.data[0]);
    this.setState({
      cityData: mapData.data[0]
    });
  }
  render() {
    console.log(this.props)
    return(
      <div id="map">
        <h3>Map of {this.props.location.search_query}</h3>
        {this.props.map && 
          <img src={this.props.map || ''} alt=''/>
        }
      </div>
    )
  }
}

export default Map;