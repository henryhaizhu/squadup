import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import { WebBrowser } from 'expo';
import { Card, SearchBar, Icon } from 'react-native-elements'

import { MonoText } from '../components/StyledText';

export default class RecreationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Recreation",
      headerRight: (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => { navigation.navigate('Create', { eventType: "recreation" }) }}
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
      image: "http://cdn.decoist.com/wp-content/uploads/2013/10/Upscale-Halloween-decor.jpg",
      title: "Drinks with friends!",
      description: "Lorem Ipsum",
      location: ""
    }, {
      image: "http://cdn.decoist.com/wp-content/uploads/2013/10/Upscale-Halloween-decor.jpg",
      title: "Come see Incredibles 2 with us!",
      description: "Lorem Ipsum",
      location: ""
    }, {
      image: "https://cdn01.vulcanpost.com/wp-uploads/2016/06/angelhack2-e1465278280991.png",
      title: "AngelCity Hackathon!",
      description: "Lorem Ipsum",
      location: ""
    }],
    currView: "list",
    currLocation: null,

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.navigation.state.params && nextProps.navigation.state.params != this.props.navigation.state.params){
      const newItem = {...nextProps.navigation.state.params}
      this.setState({
        eventList: [...this.state.eventList, newItem]
      })
    }
  }
  
  render() {
    return (
      <View style={styles.container}>

        <FlatList
          data={this.state.eventList}
          keyExtractor={(item, index) => item.title + index}
          renderItem={({ item, index }) => {
            return (
              <Card
                title={item.title}
                containerStyle={styles.buttonStyle}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ resizeMode: "center", height: 100, width: 150 }}
                />
                <Text>{item.description}</Text>
              </Card>
            )
          }}
        />
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
  }
});
