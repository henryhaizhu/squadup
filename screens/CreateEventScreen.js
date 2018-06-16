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
import { Card, SearchBar } from 'react-native-elements'

import { MonoText } from '../components/StyledText';

export default class CreateScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "Create New Event"
        }
}
  state = {
    eventList: [{
      title: "Drinks with friends!",
      description: "Lorem Ipsum",
      location: ""
    }, {
      title: "Come see Incredibles 2 with us!",
      description: "Lorem Ipsum",
      location: ""
    }, {
      title: "AngelCity Hackathon!",
      description: "Lorem Ipsum",
      location: ""
    }],
    currView: "list",
    currLocation: null,

  }
  render() {
    return (
      <View style={styles.container}>
        
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})
