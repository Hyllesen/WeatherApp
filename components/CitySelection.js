import React, { Component } from 'react';
import { Text,TextInput, View, Button, Alert, TouchableOpacity } from 'react-native'; 

export default class CitySelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: ''
        };
        this.onCitySelected = this.onCitySelected.bind(this);
    }

    onCitySelected() {
        console.log('Cityselection onpress');
        console.log(this.props);
        this.props.onCitySelected(this.state.city);
    }

    render() {
        return (    
        <View style={{ height: 40, width: 150, borderWidth: 1, marginBottom: 50 }}>        
            <TextInput 
            placeholder="Enter city..."
            autoCapitalize='none'
            autoCorrect={false}           
            onChangeText={(city) => this.setState({city})}
            style={{height: 40, width: 150}}
            />        
            <Button onPress={this.onCitySelected} title="Submit" />              
        </View>    
        );
    }
}