import React, { useState, useContext } from "react";
import ReactCardFlip from "react-card-flip";
import useToday from "../utils/useToday";
import { AppContext } from "../App";
import ReactApexChart from 'apexcharts'
import ReactDOM from "react";

const ApexChart = () => {
      class ApexChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [
              {
                data: [
                  {
                    x: 'New Delhi',
                    y: 218
                  },
                  {
                    x: 'Kolkata',
                    y: 149
                  },
                  {
                    x: 'Mumbai',
                    y: 184
                  },
                  {
                    x: 'Ahmedabad',
                    y: 55
                  },
                  {
                    x: 'Bangaluru',
                    y: 84
                  },
                  {
                    x: 'Pune',
                    y: 31
                  },
                  {
                    x: 'Chennai',
                    y: 70
                  },
                  {
                    x: 'Jaipur',
                    y: 30
                  },
                  {
                    x: 'Surat',
                    y: 44
                  },
                  {
                    x: 'Hyderabad',
                    y: 68
                  },
                  {
                    x: 'Lucknow',
                    y: 28
                  },
                  {
                    x: 'Indore',
                    y: 19
                  },
                  {
                    x: 'Kanpur',
                    y: 29
                  }
                ]
              }
            ],
            options: {
              legend: {
                show: false
              },
              chart: {
                height: 350,
                type: 'treemap'
              },
              title: {
                text: 'Basic Treemap'
              }
            },
          
          
          };
        }

      

        render() {
          return (
            

      <div id="chart">
  <ReactApexChart options={this.state.options} series={this.state.series} type="treemap" height={350} />
</div>
    

          );
        }
      }

      const domContainer = document.querySelector('#app');
      ReactDOM.render(React.createElement(ApexChart), domContainer);
    
    }
    