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
  static navigationOptions = ({navigation}) => {
        return {
            headerTitle: "Squad",
            headerRight: (
                <TouchableOpacity 
                    style={{marginRight: 15}}
                    onPress={()=>{navigation.navigate('Create')}}
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
        
        <FlatList
          data={this.state.eventList}
          keyExtractor={(item, index)=> item.title + index}
          renderItem={({item, index})=> {
            return (
              <Card
                title={item.title}
                containerStyle={styles.buttonStyle}
              >
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
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.8,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 0
  }
});
