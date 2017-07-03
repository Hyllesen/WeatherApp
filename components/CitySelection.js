import React, { Component } from 'react';
import { Text,TextInput, View, Button, Alert, TouchableOpacity } from 'react-native'; 

export default class CitySelection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: ''
        };
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
            <Button onPress={() => this.props.onCitySelected(this.state.city)} title="Submit" />              
        </View>    
        );
    }
}