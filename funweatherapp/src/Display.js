/* global Plotly */
import React, { Component } from 'react';

class Plot extends Component {
    componentDidMount() {
        Plotly.newPlot('plot', [{
          x: this.props.xData,
          //x: new Date(this.props.xData).toLocaleString(window.navigator.language, {weekday: 'short'}),
          y: this.props.yData,
          type: 'scatter'//this.props.type
        }], {
          margin: {
            //t: 0, r: 0, l: 30
            l: 50,
        r:50,
        b:100,
        t:100,
        pad:4
          },
          xaxis: {
            gridcolor: 'transparent',
            title: 'Days',
            titlefont: {
              family: 'Roboto,Sans-Serif',
              size: 18,
              color: '#d26c22'
            }
          },
          yaxis: {
            title: 'Temp. in Fahrenheit',
            titlefont: {
              family: 'Roboto,Sans-Serif',
              size: 18,
              color: '#d26c22'
            }
          }
        }, {
          displayModeBar: false
        });
      }
    
      render(){
        return(
            <div id="plot"></div>
        );
    }
}
  
export default Plot;
    