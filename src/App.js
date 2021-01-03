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
        listOfCountries: [
          "Russia",
          "Azerbaijan",
          "Turkey"
        ],
        listOfStats: [],
        listForRender: []
      };
      // this.onValueChanged = this.onValueChanged.bind(this);
      // this.onTabsSelectionChanged = this.onTabsSelectionChanged.bind(this);
    }
    componentDidMount() {
      this.handleFetch("Azerbaijan");
    }
  
    handleChange = (target) => {
      this.handleFetch(target);
    };
  
    handleFetch = async (target) => {
      // for(let i = 0; i<this.state.listOfCountries.length; i++){
      //   fetch(
      //     "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=" +
      //     this.state.listOfCountries[i],
      //     {
      //       method: "GET",
      //       headers: {
      //         "x-rapidapi-key": API_KEY,
      //         "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
      //       },
      //     }
      //   ).then((response) => response.json()).then((data) => {
      //     // console.log(data.data.covid19Stats[0].country);
      //     // console.log(this.state.listOfCountries[i]);
      //     this.state.listOfStats[i] =  data.data.covid19Stats[0].country;
      //     console.log("current list of stats: ", this.state.listOfStats);
      //   })
      // }
      // console.log("list of statistics: ",this.state.listOfStats)
      // console.log("countries", this.state.listOfCountries)
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
      const myList = this.state.listOfStats; 
      console.log("mylist",myList);
      
      return (
        <div className="App">
        {
          myList.map((item, i) => <li key={i}>{item}</li>)
        }
        <Button 
          onClick={(target) => this.handleChange("Azerbaijan", target)}
          width={120}
          text="Outlined"
          type="normal"
          stylingMode="outlined"
        >
            Azerbaijan
        </Button>
        <Button 
          onClick={(target) => this.handleChange("Russia", target)}
          width={120}
          text="Outlined"
          type="normal"
          stylingMode="outlined"
        >
          Russia
        </Button>
        <Button 
          onClick={(target) => this.handleChange("Turkey", target)}
          width={120}
          text="Outlined"
          type="normal"
          stylingMode="outlined"
        >
          Turkey
        </Button>
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
