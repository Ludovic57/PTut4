import React, { Component } from 'react'
import './App.css'
import logo from './logo.svg';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import logoIcon from './assets/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import mapIcon from './assets/Map_icon.png';
import MyMap from './App.js';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

class Monuments extends Component {

    constructor (prpos) {
      super(prpos)
      this.state = {
        lieux: [],
        lat:0,
        lng:0,  
      }
      
    }

    componentDidMount() {
      axios.get(`https://devweb.iutmetz.univ-lorraine.fr/~muller668u/projetS4/lieux.php`)
        .then(res => {
          this.setState({lieux: res.data})
          console.log(this.state.lieux);
        })
    }

    vibration = () => {
      navigator.vibrate(2000);
      if(navigator.vibrate){
        console.log("vibration activée");
      }
  
    }

MainPageMonu = () => {    
  return(     
    <div className="lieu-container">

      <div className="nav_menu">
        <Navbar bg="primary" variant="dark">
        <Navbar.Brand>
        
        <Nav className="mr-auto" >
        <Nav.Link href="/">Retourner à la Carte</Nav.Link>

        </Nav>
        </Navbar.Brand>
          <Form inline>
          <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
          <Button type="submit" variant="warning">Submit</Button>
          </Form>
        </Navbar> 
      </div>

          { 
          this.state.lieux.map(lieu => 
          <ListGroup>
            <ListGroup.Item className="lit" action   variant="info"><p className="p1">{lieu.NomLieu}</p></ListGroup.Item>          
          </ListGroup>          
                              )
          }

        <Button onClick={this.vibration}>Test de Vibration</Button>

        
                  
    </div>
        )
}

render() {
  
  return (  
    <Router>
      <Route exact path="/Monuments" component={this.MainPageMonu} />
      <Route exact path="/" component={MyMap} />
    </Router>
        );
        }
}
export default Monuments;