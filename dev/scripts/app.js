import React from 'react';
import ReactDOM from 'react-dom';
import InitialUserInput from './InitialUserInput';

// * MAPBOX access token - pk.eyJ1IjoiZmFsbGluZ3JvY2tzIiwiYSI6ImNqaGk1MXdlczIyMHgzZG03NHZpY3dndjIifQ.mxjjIpdUTjnfXfMtbQgIdQ
// * MAPBOX npm install - npm install mapbox - gl--save
// * MAPBOX - adding the map - 

// Replace 'YOUR_CONTAINER_ELEMENT_ID' with the id of an element on your page where you would like your map.

// var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// mapboxgl.accessToken = 'pk.eyJ1IjoiZmFsbGluZ3JvY2tzIiwiYSI6ImNqaGk1MXdlczIyMHgzZG03NHZpY3dndjIifQ.mxjjIpdUTjnfXfMtbQgIdQ';
// var map = new mapboxgl.Map({
//   container: 'YOUR_CONTAINER_ELEMENT_ID',
//   style: 'mapbox://styles/mapbox/streets-v10'
// });

// ** user input (defaulted to 2018 - showing on page load) to choose year to pull from NASA, sortable mass **
// 1. pull in NASA API - https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh
// 2. figure out data that MapBox needs from NASA API - coordinates (long, lat)
// 3. splice out that data/send to MapBox
// 4. Show a map of the earth with all of the locations as pins on a map. (how do we want map to show?)
// 5. when click on pin, show addt info/show list of all pins




class App extends React.Component {
    render() {
      return (
        <InitialUserInput />
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
