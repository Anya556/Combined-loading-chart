import React from "react";
import ReactEcharts from "echarts-for-react";
import './Chart.css';

const Chart = ({calculatedResult, needRefresh}) => {

  const {data, selectedPipeSize, selectedWeight, selectedSafetyFactor, selectedTorqueUnit, selectedTensionUnit} = calculatedResult;

  if (!data || !data.torqueOutputValue) {
    return <div>Calculations NOT up to date</div>;
  }

  const {
    torqueOutputValue,
    tensionOutputValue,
    tensionWithSafetyFactorOutputValue,
  } = data;
 
  const option = {
    title: {
      subtext: `(${selectedPipeSize})", (${selectedWeight})#, SS-105 \n DP COMBINEDLOAD CHART - NO BLOCK WEIGHT`,
      left: "center",
      top: "top",
      subtextStyle: {
        fontSize: 15,
        lineHeight: 20
      }
    },
    legend: {
      bottom: 0,
      padding: [0, 40],
      lineStyle: {
        type: "solid",
        width: 3,
      },
      emphasis: {
        lineStyle: {
          typr:'solid'
        }
      }
    },
    animation: false,
    xAxis: {
      name: `Torque (${selectedTorqueUnit})`,
      nameLocation: 'center', 
      nameGap: 35,
      splitLine: {
        lineStyle: {
          color: "#999"
        }
      },
      minorSplitLine: {
        show: true,
        lineStyle: {
          color: "#ddd"
        }
      }
    },
    yAxis: {
      name: `Tension (${selectedTensionUnit})`,
      nameRotate: 90, 
      nameLocation: 'middle', 
      nameGap: 60,
      textAlign: 'center',
      verticalAlign: 'middle',
      margin: 20,
      splitLine: {
        lineStyle: {
          color: "#999"
        }
      },
      minorSplitLine: {
        show: true,
        lineStyle: {
          color: "#ddd"
        }
      }
    },
    series: [
      {
        name: '100% Premium',
        type: "line",
        showSymbol: false,
        data: torqueOutputValue.map((value, index) => [value, tensionOutputValue[index]]),
        itemStyle: {
          color: '#148fb8' // blue
        }
      },
      {
        name: `${selectedSafetyFactor}% Premium`,
        type: "line",
        showSymbol: false,
        data: torqueOutputValue.map((value, index) => [value, tensionWithSafetyFactorOutputValue[index]]),
        itemStyle: {
          color: '#e32636' // red
        }
      }
    ]
  };

  return (
    <div className="output-form">
      <div className="up-to-date-container">
          {needRefresh ? 'Calculations up to date': 'Calculations NOT up to date'}
      </div>
      <div className="chart-drawing" >
        <ReactEcharts option={option} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default Chart;