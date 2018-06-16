import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { MapView, Location } from 'expo'
import { ExpoLinksView } from '@expo/samples';

import { getRegionForCoordinates } from './helper'

export default class VolunteerScreen extends React.Component {
  static navigationOptions = {
    title: 'Volunteer',
  };
  state = {
    location: null,
    markers: []
  }

  componentWillMount(){
    this._getCurrLocation()
    
  }

  _getCurrLocation = async () => {
    let location = await Location.getCurrentPositionAsync({})
    const points = [{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }]
    const region = getRegionForCoordinates(points)
    const markers = [...this.state.markers].push({
      title: "hello",
      description: "",
      coordinate: points[0]
    })
    this.setState({
      location: region,
      markers
    })
  }

  render() {
    const { location } = this.state
    if(!location) {
      return (
        <View style={{flex: 1, justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    console.log(this.state.location)
    const {latitude, longitude, latitudeDelta, longitudeDelta } = this.state.location
    return (
        <MapView 
          style={{ flex: 1 }}
          provider="google"
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04
          }}
          showsMyLocationButton={true}
          showsUserLocation
          showsPointsOfInterest
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
