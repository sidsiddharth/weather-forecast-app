import React, { Component } from 'react';
//import {browserRouter, Link, Route } from 'react-router-dom';
//import {browserHistory} from 'react-router';
//import { withRouter } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
import xhr from 'xhr';

import Plot from'./Display.js';
//import BarChart from './BarChart.js';
//import D3Setup from './D3Setup.js';
//import { LineChart } from 'react-d3-components';

class App extends Component {
  
  // set initial state
    constructor(){
      super();
      this.state = {
        location: '',
        //locationError: false,
        data: {},
        dates: [],
        temps: [],
        body: null,
        cityName: '',
        //margin: []
        searchedlocations: null
      };

       
    }
    
    

    fetchData = (evt) => {
    evt.preventDefault();
    //console.log('fetch data for the city', this.state.location);
    var location = encodeURIComponent(this.state.location);
    var searchType = 'q';
    if (parseInt(location)) {
      searchType = 'zip'
    }

    const onSetResult = (result, key) => {
      localStorage.setItem(key, JSON.stringify(result.body));
      this.setState({ searchedlocations: result.body });
    }


    // generate the url to fetch weather
    var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?';
    var apiPrefix = '&APPID=';
    var apiKey = '29348e57b95c8f3e0201ba5dfb8af631';
    var urlSuffix = '&units=imperial';
    var url = urlPrefix + searchType + '=' + location + apiPrefix + apiKey + urlSuffix;
    
    //store cache in localstorage
    var cachedLocations = localStorage.getItem(location);
    if (cachedLocations){
      alert('found');
      this.setState({ searchedlocations: JSON.parse(cachedLocations)});
    }
    else{
      alert('not found');
    }



    var self = this;



        var body;
        var list = [];
        var dates = [];
        var temps = [];
        var locationError = false;
        var cityName = '';
        
    if (cachedLocations){
      alert('found');
      // body = JSON.parse(cachedLocations);
      // list = body.list;
      // for (var i=0; i<list.length; i++){
      //   dates.push(list[i].dt_txt);
      //   temps.push(list[i].main.temp);
      // }
      // this.loadFromCache(body, dates, temps);





      //alert(cachedLocations);
      //this.setState({ searchedlocations: JSON.parse(cachedLocations)});

      // body = JSON.parse(cachedLocations);
      // list = body.list;
      // //data: {};
      //  dates: [];
      //  temps = [];
      //  locationError = false;
      //  cityName = '';

      // self.setState({
      //   data: {},
      //   dates: [],
      //   temps: [],
      //   cityName: body.city.name
      // });

      // for (var i=0; i<list.length; i++){
      //   dates.push(list[i].dt_txt);
      //   temps.push(list[i].main.temp);
      // }
      
      // self.setState({
      //   data: body,
      //   dates: dates,
      //   temps: temps
      // });
      // alert('trying to show');
      //localStorage.setItem(this.state.location, cachedLocations);
      // changeLocation = (evt) => {
      //   this.setState({
      //     location: evt.target.value
      //   });
      // };


      
      xhr({
        url: url
      }, function(err, data){
        body = JSON.parse(cachedLocations);
        list = body.list;
        //alert(typeof(cachedLocations));
        //alert(loc);
        //alert(data.statusCode);
        //check for successful requests
        if(true){
          self.setState({
            data: {},
            dates: [],
            temps: [],
            cityName: body.city.name
          });
          //locationError = false;
          for (var i=0; i<list.length; i++){
            dates.push(list[i].dt_txt);
            temps.push(list[i].main.temp);
          }
          //alert('trying to show0');
          self.setState({
            data: body,
            dates: dates,
            temps: temps
        });
  
        //alert('trying to show');
      }
      });
      
    }
    else{
      alert('not found');
      
      


      xhr({
        url: url
      }, function(err, data){
        body = JSON.parse(data.body);
        list = body.list;
        alert(typeof(data));
        //alert(loc);
        //alert(data.statusCode);
        //check for successful requests
        if(data.statusCode == 200){
          self.setState({
            data: {},
            dates: [],
            temps: [],
            cityName: body.city.name
          });
          //locationError = false;
          for (var i=0; i<list.length; i++){
            dates.push(list[i].dt_txt);
            temps.push(list[i].main.temp);
          }
          alert('trying to show0');
          self.setState({
            data: body,
            dates: dates,
            temps: temps
        });
  
        //add to local storage cache
        //this.setState({ loading: false, errors: null, zipSelected, data: cachedData.weatherData });
        // var result = this.setState({
        //     cachedLocations: this.onSetResult(result, location)
        //   });
  
        // this.onSetResult = (result, key) => {
        //   localStorage.setItem(key, JSON.stringify(result.body));
           //self.setState({ searchedlocations: location });
           localStorage.setItem(location, data.body);
        // }
        alert('trying to show');
        //add url params
        //var stateObj = { foo: "bar" };
        //window.history.pushState(stateObj,"page 2","?location=" + this.state.location)
        //this.br.push('?location=' + this.state.location)
        //location.href = "http://stackoverflow.com";
        //withRouter.push('/test')
        //browserRouter.push('/push');
        //context.browserHistory.push('/foo');
        //this.props.router.push('/foo');
        //this.history.push('/foo');
      }
      else//on error set values to null
      {
        //locationError = true;
        self.setState({
          data: {},
          dates: [],
          temps: []
        });
      }
      });
    };
    }


    

  changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    });
  };

  loadFromCache = (body, dates, temps) => {
    this.setState({
      //location: evt.target.value,
      //data: {},
      //dates: [],
      //temps: [],
      cityName: body.city.name,
      data: body,
      dates: dates,
      temps: temps
    });
  };
  //}
  // constructor() {
  //   super();
  //   this.state = {
  //     currentLocation: '',
  //     weather: {},
  //     error: ''
  //   };
    //this.setLocation = this.setLocation.bind(this);
    //this.setWeather = this.setWeather.bind(this);
    

  //}

  render() {
    var currentTemp = 'No city found';
    var locationError = 'None';
    if (this.state.data.list){
      currentTemp = this.state.data.list[0].main.temp;
      locationError = 'NoError';
    }
    else
    {
      locationError = 'Error';
    }
    return (
      // <body class="body-bright">
      <div>
        {/* <div id="top-nav-bar">Top Nav Bar</div> */}
        <h1 id="title">Weather Forecast Application</h1>
        <form onSubmit={this.fetchData}>
          <label>Please enter a city or zip:
            <input
              //placeholder={"City"}
              type="text"
              value={this.state.location}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        {(this.state.data.list) ? (
          <div className="wrapper">
            <p className="temp-wrapper">Current temperature for {this.state.cityName} is:
              <span className="temp">{currentTemp}</span>
              <span className="temp-symbol">°F</span>
            </p>
            <h3>5 Day Forecast for {this.state.cityName}</h3>
            <Plot id="graph"
              xData={this.state.dates}
              yData={this.state.temps}
              type="scatter"
            />
          </div>
        ) : null
        }
      {(locationError == "Error" && this.state.cityName != "") ? (
        <div className="wrapper">
        <p className="temp-wrapper">No location found.
        </p>
      </div>
      ) : null
    }
      
        
        <div className='App'>
          {/* <div className='App-header'>
            <h2>d3ia dashboard</h2>
          </div> */}
          {/* <div>
            <BarChart data={[5,10,1,3]} size={[500,500]} />
          </div> */}
          {/* <div>
            <BarChart
              data={this.state.dates}
              size={this.state.temps}
            />
          </div> */}
          {/* <div>
            {/* <D3Setup
            margins= {this.state.margin}
            data={this.state.data}
            width={600}
            height={300}
            chartSeries={this.state.temps}
            //x={x}
            //xScale={xScale}
              // data={this.state.dates}
              // size={this.state.temps}
            /> */}
            {/* <LineChart            
          data={this.state.data}
          width={1000}
          height={400}
          margin={{top: 10, bottom: 50, left: 50, right: 10}}
          
          xAxis={{label: "Date"}}
          yAxis={{label: "Temperature"}}
          /> */}
          {/* </div> */} 
        </div>
        
      </div>
      //   {/* <div className="App">
      //     <p id="pTitle">Weather forecast</p> 
      //       <p id="pLoc">Please enter a city or zipcode
      //         <input id="txtLoc"></input>
      //         <button id="btnSearch">Search</button>
      //       </p>
      //       <div className="top-navbar top-navbar-dark">Fun Weather App</div>
      //         <header className="App-header">
      //           <img src={logo} className="App-logo" alt="logo" />
      //           <h1 className="App-title">Welcome to React</h1>
      //         </header>
      //         <p className="App-intro">
      //           To get started, edit <code>src/App.js</code> and save to reload.
      //         </p>
      //  </div> */}
      // </body>
    );
  }
}

export default App;
