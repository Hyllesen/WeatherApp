import React, {Component} from 'react';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryArea } from 'victory-native';
import { LinearGradient, Stop } from 'react-native-svg';
import GradientArea from './GradientArea';
import {View } from 'react-native';

export default class ForecastChart extends Component {

    render() {
    return (
        <VictoryChart
            animate={{duration: 500}}
            theme={VictoryTheme.grayscale}
        >
    <VictoryAxis
        scale="time"  
        tickCount={3}

    />
    <VictoryAxis
      dependentAxis
      tickFormat={(x) => (`${x} °C`)}
    />
    <VictoryStack
      style={{
        data: { stroke: "white", strokeWidth: 4 }
      }}
    >
      <VictoryArea
        style={{
          data: { fill: "#ffdd89", opacity: 0.7, stroke: "#efc356" },
        }}
        data={this.props.data}
        x="dt"
        y="main.temp"
      />
    </VictoryStack>
  </VictoryChart>
  );        
    }
}
