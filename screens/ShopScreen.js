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
import { WebBrowser, MapView, Location, Marker } from 'expo';
import { Card, SearchBar, Icon, Divider, List, ListItem, Button } from 'react-native-elements'
import getRegionForCoordinates from './helper'

import { MonoText } from '../components/StyledText';

export default class ShopScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Shop",
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => { navigation.navigate('Create', { eventType: "Shop" }) }}
        >
          <Icon
            name='add-circle'
            size={25}
            color='white'
          />
        </TouchableOpacity>
      ),
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
      image: "https://face-assets.dollarshaveclub.com/images/logo.png",
      title: "Dollar Shave Club",
      description: "Get everything you need to look best.",
      location: {
          latitude: "33.9883764",
          longitude: "-118.43930019999999"
      }
  }, {
      image: "https://l9wcwz8bfc-flywheel.netdna-ssl.com/wp-content/uploads/2018/04/Bizhaus-El-Segundo.jpg",
      title: "Bizhaus",
      description: "Elevate the way you work",
      location: {
          latitude: "33.920612",
          longitude: "-118.3976533"
      }
  }, {
      image: "https://face-assets.dollarshaveclub.com/images/logo.png",
      title: "Blankspaces",
      description: "Work for yourself not by yourself.",
      location: {
          latitude: "34.0136619",
          longitude: "-118.4960901"
      }
  }, {
      image: "https://phasetwospace.com/wp-content/uploads/2017/08/whitelogo.png",
      title: "Phase Two",
      description: "Curated coworking space for tech, media, and entertainment.",
      location: {
          latitude: "34.0225645",
          longitude: "-118.37518490000002"
      }
  }, {
      image: "https://static1.squarespace.com/static/5543ac5de4b090e0afa9e665/t/55538f52e4b091ca6c3a4175/1519258349236/",
      title: "Maker City",
      description: "The Perfect place to to create and collaborate",
      location: {
          latitude: "34.0312446",
          longitude: "-118.26664060000002"
      }
  }, {
      image: "https://static1.squarespace.com/static/5543ac5de4b090e0afa9e665/t/55538f52e4b091ca6c3a4175/1519258349236/",
      title: "Maker City",
      description: "The Perfect place to to create and collaborate",
      location: {
          latitude: "34.0312446",
          longitude: "-118.26664060000002"
      }
  }, {
      image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F37428180%2F205877890341%2F1%2Foriginal.jpg?w=800&auto=compress&rect=0%2C197%2C2642%2C1321&s=2c57302fed957948d5d1f616f9c3f768",
      title: "Wags and Walks Volunteer Orientation",
      description: "To promote shelter dogs as the best dogs in the world through advocacy of our unique family-friendly foster and adoption programs.",
      location: {
          latitude: "34.034604",
          longitude: "-118.44490300000001"
      }
  }, {
      image: "http://snnla.org/wp-content/uploads/2017/07/B2S13web.jpg",
      description: "This fun-filled day for children with autism, special needs, their siblings, peer, families, and communities that serve them. We have 100 resource vendors, health and mental health screenings, activities, games, food and backpacks and school supplies for over 1000 kids who will attend",
      location: {
          latitude: "34.034604",
          longitude: "-118.44490300000001"
      }
  }, {
      image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F45533248%2F92997882961%2F1%2Foriginal.jpg?w=800&auto=compress&rect=0%2C2%2C1440%2C720&s=ceb0c08d6c0ff6403e048fc87c6ca573",
      title: "Volunteer at Women's Cancer Walk/Run",
      description: "The Valley Breast Cancer Foundation is a non-profit arm of valley Breast Care and Women's Health Center.",
      location: {
          latitude: "34.1837336",
          longitude: "-118.48283670000001"
      }
  }, {
      image: "https://static1.squarespace.com/static/5543ac5de4b090e0afa9e665/t/55538f52e4b091ca6c3a4175/1519258349236/",
      title: "PATH Volunteer Day - Senior Support",
      description: "This fun-filled day for children with autism, special needs, their siblings, peer, families, and communities that serve them. We have 100 resource vendors, health and mental health screenings, activities, games, food and backpacks and school supplies for over 1000 kids who will attend.",
      location: {
          latitude: "34.0402541",
          longitude: "-118.3210545"
      }
  }, {
      image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F36139809%2F10211347555%2F1%2Foriginal.jpg?w=800&auto=compress&rect=0%2C108%2C1300%2C650&s=48578105f0a492a2f7adc97d3b7596ff",
      title: "Nothin' But Sand Beach Cleanup",
      description: "This is a great opportunity for you and your family, friends or associates to get involved. All you need to do is show up...and bring a bucket if possible!",
      location: {
          latitude: "33.9567144",
          longitude: "-118.45167530000003"
      }
  }, {
      image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F42174077%2F144134489934%2F1%2Foriginal.jpg?w=800&auto=compress&rect=0%2C99%2C800%2C400&s=e8a05bde32617000a1a1b22046aa78d2",
      title: "Creating Your Own Path 2018 Teen Leadership Conference",
      description: "Be a part of this experience as we inspire young girls to become great leaders of tomorrow!",
      location: {
          latitude: "34.0120121",
          longitude: "-118.28950789999999"
      }
  }, {
      image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F45295377%2F139737231090%2F1%2Foriginal.jpg?w=800&auto=compress&rect=0%2C60%2C480%2C240&s=02a1ff32ca54aceb8ed26348bdea09e2",
      title: "Los Angeles LGBT Center: July Volunteer Information Session",
      description: "Thank you for your interest in volunteering at the Los Angeles LGBT Center! The information session will provide an overview of the Center's history, programs and services, events and the many ways that you can get involved.",
      location: {
          latitude: "34.0918673",
          longitude: "-118.33768939999999"
      }
  }, {
      image: "https://static1.squarespace.com/static/5543ac5de4b090e0afa9e665/t/55538f52e4b091ca6c3a4175/1519258349236/",
      title: "PATH Volunteer Day - Senior Support",
      description: "This fun-filled day for children with autism, special needs, their siblings, peer, families, and communities that serve them. We have 100 resource vendors, health and mental health screenings, activities, games, food and backpacks and school supplies for over 1000 kids who will attend.",
      location: {
          latitude: "34.0402541",
          longitude: "-118.3210545"
      }
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
                      title="Close "
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
