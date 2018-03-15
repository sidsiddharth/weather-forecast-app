import React, { Component } from 'react';
//import {browserHistory} from 'react-router';
//import logo from './logo.svg';
import './App.css';
import xhr from 'xhr';
import Plot from'./Display.js';

class App extends Component {
  
  // set initial state
    constructor(){
      super();
      this.state = {
        location: '',
        data: {}, //will store the response data from the open weather service
        days: [], //will store the days from the open weather service response
        temperatures: [], //will store the temps from the open weather service response
        body: null, //will store the body from the open weather service response
        cityName: '', ////will store the name of the city from the 
      };
    }
    
    fetchWeatherData = (event) => {
      event.preventDefault();//prevent default event behavior
      var location = encodeURIComponent(this.state.location); //url encode for cities with spaces
      var searchType = 'q'; //city name
      if (parseInt(location)) { // if int then user typed in zip
        searchType = 'zip'; //zip code 
      }

    // generate the url to fetch weather
    var urlOpenWeather = 'http://api.openweathermap.org/data/2.5/forecast?';
    var apiPrefix = '&APPID=';
    var apiKey = '29348e57b95c8f3e0201ba5dfb8af631'; // TODO: move key to config file
    var urlUnit = '&units=imperial'; //supporting only fahrenheit
    var url = urlOpenWeather + searchType + '=' + location + apiPrefix + apiKey + urlUnit;
    
    //store cache in localstorage
    /* const cachedLocations = localStorage.getItem(location);
    if (cachedLocations){
      alert('found');
      this.setState({ searchedlocations: JSON.parse(cachedLocations)});
    }
    else{
      alert('not found');
    } */
    var self = this;

    xhr({
      url: url
    }, function(err, data){
      var body = JSON.parse(data.body);
      var list = body.list; //stores list of temp info. for various times
      var days = [];
      var temperatures = [];
      var cityName = '';
      //check for successful requests
      if(data.statusCode == 200){
        self.setState({
          data: {},
          days: [],
          temperatures: [],
          cityName: body.city.name
        });

        //Convert dates to days
        //var d = new Date(list[0].dt_txt);
        //d.toLocaleString(window.navigator.language, {weekday: 'long'});
        for (var i=0; i<list.length; i++){
        days.push(list[i].dt_txt); 
        //days.push(new Date(list[0].dt_txt).toLocaleString(window.navigator.language, {weekday: 'short'}));
        temperatures.push(list[i].main.temp);
      }
      self.setState({
        data: body,
        days: days,
        temperatures: temperatures
      });

      //add to local storage cache
      //this.setState({ loading: false, errors: null, zipSelected, data: cachedData.weatherData });
      // var result = this.setState({
      //     cachedLocations: this.onSetResult(result, location)
      //   });

      //add url params
      //var stateObj = { foo: "bar" };
      //window.history.pushState(stateObj,"page 2","?location=" + this.state.location)
      //this.br.push('?location=' + this.state.location)
      //browserRouter.push('/push');
      //context.browserHistory.push('/foo');
      
    }
    else //on error set values to null
    {
      self.setState({
        data: {},
        days: [],
        temperatures: []
      });
    }
    });
  };

  changeLocation = (event) => {
    this.setState({
      location: event.target.value
    });
  };

  render() {
    var currentTemperature = '';
    var locationError = '';
    if (this.state.data.list){
      currentTemperature = this.state.data.list[0].main.temp;
      locationError = 'NoError';
    }
    else
    {
      locationError = 'Error';
    }
    return (
      <div>
        <h1 id="title">Weather Forecast App</h1>
        <form onSubmit={this.fetchWeatherData}>
          <label>Please enter a city or zip:
            <input
              type="text"
              value={this.state.location}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        {(this.state.data.list) ? (
          <div>
            <p>Current temperature for {this.state.cityName} is:
              <span>{currentTemperature}</span>
              <span>°F</span>
            </p>
            <h3>5 Day Forecast for {this.state.cityName}:</h3>
            <Plot id="graph" //Use plot to display the graph
              xData={this.state.days}
              yData={this.state.temperatures}
              type="scatter"
            />
          </div>
        ) : null
        }
        {(locationError == "Error" && this.state.cityName != "") ? (
          <div className="wrapper">
            <p className="temp-wrapper">No location found.</p>
          </div>
        ) : null
        }
      </div>
    );
  }
}

export default App;
