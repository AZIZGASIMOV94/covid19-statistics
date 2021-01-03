import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Button from 'devextreme-react/button';
import './App.css';
import React, { Component } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        res: "",
        confirmedCases: 0,
        targetCountry: "",
        deathNumber: 0,
        targetProvince: "",
      };
    }
    componentDidMount() {
      this.handleFetch("Azerbaijan");
    }
  
    handleChange = (target) => {
      this.handleFetch(target);
    };
  
    handleFetch = (target) => {
      fetch(
        "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=" +
          target,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            res: data.data.lastChecked,
            confirmedCases: data.data.covid19Stats[0].confirmed,
            targetCountry: data.data.covid19Stats[0].country,
            deathNumber: data.data.covid19Stats[0].deaths,
            targetProvince: data.data.covid19Stats[0].province,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    };

    
    render(){
      return (
        <div className="App">
        <Button onClick={(target) => this.handleChange("Azerbaijan", target)}>Azerbaijan</Button>
        <Button onClick={(target) => this.handleChange("Russia", target)}>Russia</Button>
        <Button onClick={(target) => this.handleChange("Turkey", target)}>Turkey</Button>
        <br></br>
        Last Updated:  {this.state.res}
          <br></br>
        Confirmed Cases:  {this.state.confirmedCases}
          <br></br>
        Country:  {this.state.targetCountry}
          <br></br>
        Number of Death:  {this.state.deathNumber}
          <br></br>
        Province:  {this.state.targetProvince}
        </div>
      );
    }
  }

export default App;
