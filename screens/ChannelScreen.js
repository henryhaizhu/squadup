import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Switch, 
  ActivityIndicator,
  Modal,
  TouchableHighlight
} from 'react-native';
import { WebBrowser, MapView, Location, Marker, Constants } from 'expo';
import { Card, SearchBar, Icon, Divider, List, ListItem, Button } from 'react-native-elements'
import getRegionForCoordinates from './helper'

import { MonoText } from '../components/StyledText';

export default class ChannelScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "My Events",
      headerStyle: {
        backgroundColor: "#262228"
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: '#fff'
      },
    }
  }
  state = {
    eventList: [{
      image: "http://swvafarmersmarket.org/wp-content/uploads/2018/04/thankafarmer-1-e1524776143549.jpg",
      title: "Farmers Market",
      description: "Anyone want to go with me?",
      location: {
        latitude: "34.0043908", 
        longitude: "-118.43027510000002"
      },
      totalSpots: 10,
      spotsOpen: 4
    },{
      image: "http://www.liveatrunway.com/wp-content/uploads/2017/04/visit-jonis-coffee-shop-in-marina-del-rey-1024x683.jpg",
      title: "Coffee and code",
      description: "At the local coffee shop hacking away",
      location: {
        latitude: "33.9587657", 
        longitude: "-118.44804720000002"
      },
      totalSpots: 10,
      spotsOpen: 4
    },{
      image: "http://www.venicebeach.com/wp-content/uploads/2015/06/Muscle-Beach-Juice-Bar-2-1-552x414.jpg",
      title: "Pumping iron like Arnold",
      description: "Don't be a girly man.  Come to muscle beach and get pumped up.",
      location: {
        latitude: "33.9856771", 
        longitude: "-118.47276090000003"
      },
      totalSpots: 10,
      spotsOpen: 4
    }],
    mapViewOn: false,
    currLocation: null,
    currSearchTerm: null,
    currSearchResult: [],
    markers: [],
    modalVisible: false,
    currItemIndex: 0

  }

  componentWillMount(){

    this._getCurrLocation()
    
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.navigation.state.params && nextProps.navigation.state.params != this.props.navigation.state.params){
      const newItem = {...nextProps.navigation.state.params}
      this.setState({
        eventList: [...this.state.eventList, newItem]
      })
    }
  }

  setModalVisible = (visible, index) => {
    console.log(index)
    this.setState({
      modalVisible: visible,
      currItemIndex: index
    });
  }

  _getCurrLocation = async () => {
    let location = await Location.getCurrentPositionAsync({})
    console.log(location)
    const points = []
    this.state.eventList.forEach((event) => {
      points.push(event.location)
    })
    // const region = getRegionForCoordinates(points)
    const eventList = this.state.eventList
    const markers = this.state.eventList.map((event) => {
      return {
        title: event.title,
        subtitle: event.description,
        latitude: event.location.latitude,
        longitude: event.location.longitude
      }
    })
    this.setState({
      currLocation: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      },
      markers
    })
  }

  _doSearch = (text) => {
    text = text.toLowerCase()
    const searchResult = this.state.eventList.filter((event) => {
      return event.title.toLowerCase().indexOf(text) != -1
    })
    this.setState({
      currSearchTerm: text,
      currSearchResult: searchResult
    })
  }

  _clearSearch = () => {
    this.setState({
      currSearchTerm: null,
      currSearchResult: []
    })
  }

  _onSwitchMode = () => {
    this.setState({
      mapViewOn: !this.state.mapViewOn
    })
  }

  _handleOpenWithBrowser = (url) => {
    console.log("hello")
    WebBrowser.openBrowserAsync(url);
  }
  
  render() {
    console.log(this.state.markers)
    if(!this.state.currLocation) { 
      return (
        <View style={{flex: 1, justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    const { latitude, longitude } = this.state.currLocation
    return (
      <View style={styles.container}>
        <List containerStyle={{ marginTop: 0 }}>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
                <Card
                      title={this.state.eventList[this.state.currItemIndex].title}
                      containerStyle={styles.buttonStyle}   
                >
               
                    <Image
                      source={{ uri: this.state.eventList[this.state.currItemIndex].image }}
                      style={{ flex: 1, alignSelf: 'center', height: 120, width: 150, marginBottom: 5 }}
                    />
                    <Text style={{marginTop: 5, marginBottom: 30 }}>{this.state.eventList[this.state.currItemIndex].description}</Text>
                    <Button
                      containerStyle={styles.buttonStyle} 
                      title="Open Chat"
                      onPress={() => {
                        this._handleOpenWithBrowser("https://squadup-angelhack.herokuapp.com")
                      }}
                    />
                    <Button
                      containerStyle={styles.buttonStyle} 
                      title="Close"
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible, 0);
                      }}
                    />
              </Card> 
             
          </Modal>

          <ListItem
            hideChevron
            title={<SearchBar
              icon={{ type: 'font-awesome', name: 'search' }} 
              onChangeText={this._doSearch}
              onClearText={this._clearSearch}
              placeholder='Search...'
              style={{ backgroundColor: "#262228", flex: 1}}
            />}
          />
          <ListItem
            switchButton
            hideChevron
            title="Map Mode"
            avatar={
              <Icon
                name="map"
              />
            }
            onSwitch={this._onSwitchMode}
            switchOnTintColor="green"
            switched={this.state.mapViewOn}
          />
        </List>
        { !this.state.mapViewOn ?  
        
        <FlatList
          data={this.state.currSearchTerm ? this.state.currSearchResult: this.state.eventList}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item, index }) => {
            return (
              <TouchableHighlight onPress={()=>{this.setModalVisible(true, index)}}>
                <Card
                  title={item.title}
                  containerStyle={styles.buttonStyle}   
                >
                    <Image
                      source={{ uri: item.image }}
                      style={{ flex: 1, alignSelf: 'center', height: 120, width: 150, marginBottom: 5 }}
                    />
                    <Divider />
                    <Text style={{marginTop: 5 }}>{item.description}</Text>
                </Card>
              </TouchableHighlight>
            )
          }}
        /> :   
      
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
        annotation={this.state.markers}
      >
        {this.state.markers.map((marker, i) => {
          return (
          <MapView.Marker
            key={i}
            coordinate={{latitude: Number(marker.latitude), longitude: Number(marker.longitude)}}
            title={marker.title}
            description={marker.subtitle}
          />)
        })}
      </MapView>}

       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignSelf: "stretch",
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: "#0375b4",
    shadowColor: '#007849',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 0
    
  }, 
  marTop: {
    marginTop: 30
  }
});
