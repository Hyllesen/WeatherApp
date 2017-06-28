import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryArea } from 'victory-native';

const APIURL = 'http://api.openweathermap.org/data/2.5/forecast?APPID=227a9c82ccb5189be0fd776885c5d84c&q=Copenhagen&units=metric';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      responseJson: []
    };
  }
  
  async getApiData() {
      try {
        let response = await fetch(APIURL);
        let responseJson = await response.json();        
        responseJson.list.forEach((x) => {
          x.dt = new Date(x.dt * 1000);
        });        
        console.log(responseJson);          
        this.setState({responseJson});
        
      } catch(error) {
      console.error(error);
    }
  }

  componentWillMount() {
    this.getApiData();
  }

  render() {
    return (
      <View style={styles.container}>
        <VictoryChart 
          domainPadding={20}
          theme={VictoryTheme.material}
        >
        <VictoryAxis
          dependentAxis
         />
        <VictoryAxis
          scale="time"
        />
        <VictoryLine
          data={this.state.responseJson.list}          
          x="dt"
          y="main.temp"
        />

         </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
