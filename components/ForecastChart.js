import React, {Component} from 'react';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryArea } from 'victory-native';
import { LinearGradient, Stop } from 'react-native-svg';
import {View } from 'react-native';

export default class ForecastChart extends Component {

    constructor(props) {
        super(props);

    }

    render() {
    //let colors = [ "red", "green",  "blue", ];
    //let linearGradient = new LinearGradient(colors, 0, 20, 0, 280);

    let linearGradient = (<LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
    <Stop offset="0%" stopColor="rgb(255,255,0)" stopOpacity="0" />
    <Stop offset="100%" stopColor="red" stopOpacity="1" />
</LinearGradient>);

    return (
        <VictoryChart
            animate={{duration: 1500}}
            theme={VictoryTheme.grayscale}
        >
    <VictoryAxis
        scale="time"
        label="Date"
    />
    <VictoryAxis
      dependentAxis
      label="Temp"
    />
    <VictoryStack
      style={{
        data: { stroke: "white", strokeWidth: 4 }
      }}
    >
      <VictoryArea
        style={{
          data: { fill: "#bbc1cc", opacity: 0.7 },
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
