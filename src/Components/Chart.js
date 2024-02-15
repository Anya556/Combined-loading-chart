import React from "react";
import ReactEcharts from "echarts-for-react";

const Chart = ({
  culculatedResult,
  selectedPipeSize,
  selectedWeight,
  selectedTorqueUnit,
  selectedTensionUnit,
}) => {
  if (!culculatedResult || !culculatedResult.torqueOutputValue) {
    return <div>No data available</div>;
  }

  const {
    torqueOutputValue,
    tensionOutputValue,
    tensionWithSafetyFactorOutputValue,
  } = culculatedResult;

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
    // legend: {
    //   data: ['Series A', 'Series B'] 
    // },
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
        name: 'tension',
        type: "line",
        showSymbol: false,
        smooth: true,
        data: torqueOutputValue.map((value, index) => [value, tensionOutputValue[index]]),
        itemStyle: {
          color: '#148fb8' // blue
        }
      },
      {
        name: 'tensionWithSafetyFactor',
        type: "line",
        showSymbol: false,
        smooth: true,
        data: torqueOutputValue.map((value, index) => [value, tensionWithSafetyFactorOutputValue[index]]),
        itemStyle: {
          color: '#e32636' // red
        }
      }
    ]
  };

  return (
    <div style={{ width: '800px', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
      <ReactEcharts option={option} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Chart;