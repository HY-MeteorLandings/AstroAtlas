import React from 'react';
import ReactDOM from 'react-dom';
import InitialUserInput from './InitialUserInput';
import axios from 'axios';
import ReactMapboxGl, {
  Layer,
  Feature
} from "react-mapbox-gl";

// * MAPBOX access token - pk.eyJ1IjoiZmFsbGluZ3JvY2tzIiwiYSI6ImNqaGk1MXdlczIyMHgzZG03NHZpY3dndjIifQ.mxjjIpdUTjnfXfMtbQgIdQ

// Install

// * MAPBOX npm install - npm install mapbox - gl--save
// npm install react - mapbox - gl mapbox - gl--save
// * MAPBOX - adding the map - 


// Replace 'YOUR_CONTAINER_ELEMENT_ID' with the id of an element on your page where you would like your map.

// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');


// mapboxgl.accessToken = 'pk.eyJ1IjoiZmFsbGluZ3JvY2tzIiwiYSI6ImNqaGk1MXdlczIyMHgzZG03NHZpY3dndjIifQ.mxjjIpdUTjnfXfMtbQgIdQ';

// var map = new mapboxgl.Map({
//   container: 'YOUR_CONTAINER_ELEMENT_ID',
//   style: 'mapbox://styles/mapbox/streets-v10'
// });\


// Using the user input of “year”, we need to submit that to our Axios call
// Filter through the data with matching year
// Then mapping the data with long and lat into an array
//   (We may also need mass and name)
// For specifically the long and lat {
//   0 > geolocation > coordinates > [long, lat]
// }
// Our state will have
// Location Array: []
// We need to push all matching longitude and latitude into location array


// ** user input (defaulted to 2018 - showing on page load) to choose year to pull from NASA, sortable mass **
// 1. pull in NASA API - https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh
// 2. figure out data that MapBox needs from NASA API - coordinates (long, lat)
// 3. splice out that data/send to MapBox
// 4. Show a map of the earth with all of the locations as pins on a map. (how do we want map to show?)
// 5. when click on pin, show addt info/show list of all pins




class App extends React.Component {

  constructor() {
    super();

    this.state = {
      name: '',
      coordinates: [],
      mass: '',
      searchResults: [],
      year: '2018'
    }
  }

  componentDidMount() {
    axios.get('https://data.nasa.gov/resource/y77d-th95.json', {
      params: {
        year: `${this.state.year}-01-01T00:00:00.000`
      }
    })
      .then((res) => {
        // console.log(...res.data);
         const returnRocks = res.data;

        this.setState({
          searchResults: returnRocks
        });
      })
  }

    render() {

      const Map = ReactMapboxGl({
        accessToken: "pk.eyJ1IjoiZmFsbGluZ3JvY2tzIiwiYSI6ImNqaGk1MXdlczIyMHgzZG03NHZpY3dndjIifQ.mxjjIpdUTjnfXfMtbQgIdQ"
      });

      return (
        <main>
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "100vh",
              width: "100vw"
            }}>

            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15" }}>
              <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
            </Layer>
            
          </Map>
        </main> 
        
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
