
import './App.css';
import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
//import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import user from './assets/user.png';
import mapIcon from './assets/Map_icon.png';
import logoIcon from './assets/logo.png';
// import {Icon} from 'leaflet'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Monuments from './Monuments.js';
import { Nav } from 'react-bootstrap';
import monu from './assets/lieu.png';
 
class MyMap extends React.Component {
  constructor (prpos) {
    super(prpos)
    this.state = {
      lieux: [],
      lat:0,
      lng:0,
      zoom: 16,

    }
    
  }
  
  componentDidMount() {
    axios.get(`https://devweb.iutmetz.univ-lorraine.fr/~muller668u/projetS4/lieux.php`)
      .then(res => {
        this.setState({lieux: res.data})
        console.log(this.state.lieux);
      })
  }
    

  displayLocationInfo=(position)=> {
    let la=position.coords.latitude;
    let lo=position.coords.longitude;
    this.setState ({
      lat: la,
      lng: lo
      
  })
    
  }
  getLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
  }
  else {
    alert("Sorry, browser does not support geolocation!");
  }
}
refreshloc(){
  const watcher = navigator.geolocation.watchPosition(this.displayLocationInfo);
  setTimeout(() => {
    navigator.geolocation.clearWatch(watcher);
  }, 1000);
}

userIcon = L.icon({
  iconUrl: user,
  // shadowUrl: 'user.png',

  iconSize:     [60, 60], // size of the icon
  // shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [30, 60], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [0, -60] // point from which the popup should open relative to the iconAnchor
});

monuIcon = L.icon({
  iconUrl: monu,
  iconSize:     [40, 40],
  iconAnchor:   [20, 40],
  popupAnchor:  [0, -40]
});

MainPage = () => {
  this.getLocation();
    this.refreshloc();
    const pos = [this.state.lat, this.state.lng]
    


    return (
      <div className="map-container">
        

      <div className="center-navbar"> 
        <Navbar bg="primary" variant="dark">
        <Navbar.Brand>
        <img position= "center"  alt="" src={logoIcon} width="10%" height="10%" className="d-inline-block align-top"  />{' '} 
        <Nav className="mr-auto">
        </Nav>
        </Navbar.Brand>
        </Navbar>
      </div>


        
       <Map className="map" center={pos} zoom={this.state.zoom} maxZoom={19}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {
            this.state.lieux.map(lieu => <Marker position={[ lieu.LatLieu, lieu.LongLieu]} icon={this.monuIcon}>
              <Popup>
              <img className="img_monu" src={lieu.Photo1} alt="Monument" />
              <br/>
              <span className="titre_monu">{lieu.NomLieu}</span><br/><span className="desc_monu">>{lieu.DescLieu} </span>
             
              </Popup>
            </Marker>)
          }
          <Marker position={pos} icon={this.userIcon}>
            <Popup>
              <span>Vous êtes ici.</span>
            </Popup>
          </Marker>
        </Map>

      <div className="center-navbar"> 
        <Navbar fixed="bottom" bg="primary" variant="dark">
        <Navbar.Brand> 
        <Nav className="mr-auto" >
        <Nav.Link href="/Monuments">Liste des Monuments</Nav.Link>
        </Nav>
        </Navbar.Brand>
        </Navbar>
      </div>

      </div>
    )
}

render(){
  return (
      <Router>
          <Route exact path="/" component={this.MainPage} />
          <Route exact path="/Monuments" component={Monuments} />
      </Router>
);
}
}

export default MyMap
