import React from 'react';
import ReactDOM from 'react-dom';
import InitialUserInput from './InitialUserInput';
import Sidebar from './Sidebar';
import axios from 'axios';
import Modal from './Modal';
import Copyright from './Copyright';
import ReactMapboxGl, {
  Layer,
  Feature,
  Popup
} from "react-mapbox-gl";
import { resolveSoa } from 'dns';

// * MAPBOX access token - pk.eyJ1Ijoid2VzZGV2cyIsImEiOiJjamhtZTM5YWEwNjl1M2RvYmJ6bGNkNzZsIn0.J-xgf-_yYJLoLRoSfCMtTg
// Install
// npm install react - mapbox - gl mapbox - gl--save

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoid2VzZGV2cyIsImEiOiJjamhtZTM5YWEwNjl1M2RvYmJ6bGNkNzZsIn0.J-xgf-_yYJLoLRoSfCMtTg",
  movingMethod: "easeTo"
});


class App extends React.Component {

  constructor() {
    super();

    this.state = {
      coordinates: [],
      mass: Number.MAX_SAFE_INTEGER,
      searchResults: [],
      year: '2013',
      yearResults: [],
      massInput: [],
      selectedMarker: [],
      popupcords: [0, 0],
      showPopUp: false,
      meteorInfo: '',
      selectedMass: '',
      lat: '',
      long: '',
      meteorClass: '',
      parsedResults: []

    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.massHandleChange = this.massHandleChange.bind(this);
    this.generateInputMass = this.generateInputMass.bind(this);
    this.popupClick = this.popupClick.bind(this);
    this.popupHide = this.popupHide.bind(this);
    this.sideBarHandleChange = this.sideBarHandleChange.bind(this);
  }

  componentDidMount() {
    this.callToApi();
    this.callToApiForYears();
    this.generateInputMass();
   
    }

      callToApiForYears() {
        axios.get('https://data.nasa.gov/resource/y77d-th95.json', {

        })
          .then((res) => {

            const years = res.data.map((element) => {

              if (element.hasOwnProperty('year')) {
                return element.year.substring(0, 4)
              } else {
                return false;
              }

            });

            const sorted = years.sort().reverse();
            const noDupes = Array.from(new Set(sorted));
            this.setState({
              yearResults: noDupes
            });
          })
      }

      callToApi() {
        axios.get('https://data.nasa.gov/resource/y77d-th95.json', {

          params: {
            year: `${this.state.year}-01-01T00:00:00.000`,
          }
        })

          .then((res) => {

            const returnRocks = res.data;

            const geoLocations = []
            let meteorMass = this.state.mass;

            const parsedResults = []

            returnRocks.map((res)=> {

              if (res.hasOwnProperty('geolocation') && (res.mass <= meteorMass)) {

                geoLocations.push(res.geolocation.coordinates);
                parsedResults.push(res);

              } else {
                return false;
              }
            })

            this.setState({
              searchResults: returnRocks,
              coordinates: geoLocations,
              parsedResults: parsedResults
            })
          })
      }	 


     handleSubmit(e) {
       e.preventDefault();
       this.callToApi();
       document.getElementById('landingPage').classList.add('hide');
       document.getElementById('sidebar').classList.remove('hide');
       this.setState({
         popupcords: [-90, 90]
       })
    }

    handleChange(e) {
      e.preventDefault();
      this.setState({
        year: e.target.value,
        mass: Number.MAX_SAFE_INTEGER
      });    
    }

    sideBarHandleChange(e) {
      e.preventDefault();
      document.getElementById('mass').value = '0';
      this.setState({
        year: e.target.value,
        mass: Number.MAX_SAFE_INTEGER
      });
    }

    massHandleChange(e) {
      e.preventDefault();
      this.setState({
        mass: Math.floor(e.target.value)
      })
    }

    generateInputMass() {
      const counter = [];

      for(let i = 0; i < 1000; i = i + 100) {
        counter.push(i);
      }
      for(let i = 1000; i <= 1000000; i = i + 1000) {
        counter.push(i);
      }
      this.setState({
        massInput: counter
      })
    }
    
    popupHide() {
      this.setState({
        popupcords: [-90, 90]
      })
    }
    popupClick(latlong,i) {
      const text = this.state.parsedResults[i].name;
      const clickedMass = this.state.parsedResults[i].mass;
      const latitute = this.state.parsedResults[i].reclat;
      const longitude = this.state.parsedResults[i].reclong;
      const meteorClass = this.state.parsedResults[i].recclass;
      this.setState({
        popupcords: latlong,
        showPopUp: true,
        meteorInfo: text,
        selectedMass: clickedMass,
        lat: latitute,
        long: longitude,
        meteorClass: meteorClass
      })
    }


  renderPopUp() {
  
    return this.state.showPopUp ? (
      <Popup  
        coordinates={this.state.popupcords}
        id="pop"
      >
        <Modal 
          name = {this.state.meteorInfo}
          mass = {this.state.selectedMass}
          class = {this.state.meteorClass}
          lat = {this.state.lat}
          long = {this.state.long}
          function = {this.popupHide}
        />
      </Popup>
    ) : null
  }
    render() {

      return (
        <main>
          <div id="landingPage" className="landingPage">
            <InitialUserInput 
              yearOptions = {this.state.yearResults}
              handleSubmit = {this.handleSubmit}
              handleChange = {this.handleChange}
            />
          </div>
          <div id="sidebar" className="sidebar hide">
             <Sidebar 
              yearOptions = {this.state.yearResults}
              handleSubmit = {this.handleSubmit}
              sideBarHandleChange = {this.sideBarHandleChange}
              massHandleChange = {this.massHandleChange}
              generateInputMass = {this.generateInputMass}
              massInput = {this.state.massInput}
            />
          </div>

          <Map
            style = "mapbox://styles/wesdevs/cjhmbfapx0awm2so5nq0rj976"
            zoom = {[1.7]} 
            containerStyle={{
              height: "100vh",
              width: "100vw",
            }}
          >
            {this.renderPopUp()}
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15" }}>

                {
                  this.state.coordinates.map((latlong, i) => {
                    return <Feature
                    coordinates = {latlong}
                    key = {i}
                    onClick = {() => this.popupClick(latlong,i)}
                    />
                  })
                }
            </Layer>

          </Map>
               <Copyright />

        </main> 
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));