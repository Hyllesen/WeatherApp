import React from 'react';
import { StyleSheet, Text, View,TextInput } from 'react-native';
import ForecastChart from './components/ForecastChart';
import CitySelection from './components/CitySelection';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      responseJson: [],
      city: 'Copenhagen',
      location: ''
    };
    this.onCitySelected = this.onCitySelected.bind(this);
  }
  
  async getApiData(city) {
      try {
        let apiUrl = `http://api.openweathermap.org/data/2.5/forecast?APPID=227a9c82ccb5189be0fd776885c5d84c&q=${city}&units=metric`        
        let response = await fetch(apiUrl);
        let responseJson = await response.json();  

        responseJson.list.forEach((x) => {
          x.dt = new Date(x.dt * 1000);
        });        
        console.log(responseJson);
        
        this.setState({
          responseJson,
          location: `${responseJson.city.name}, ${responseJson.city.country}`          
        });
        
      } catch(error) {
      console.error(error);
    }
  }

  onCitySelected(city) {
    console.log("City selected " + city);
    this.setState({city});
    console.log(this.state);
    this.getApiData(city);
  }

  componentWillMount() {
    this.getApiData(this.state.city);
  }

  render() {
    if (this.state.responseJson.length === 0)  {
      return null;
    }
    return (
      <View style={styles.container}> 
        <Text>{this.state.location}</Text>       
        <CitySelection onCitySelected={this.onCitySelected} />
        <ForecastChart data={this.state.responseJson.list}  />
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
