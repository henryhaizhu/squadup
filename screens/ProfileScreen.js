import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

import { Button, Avatar, Icon } from "react-native-elements";
import { LinearGradient } from "expo";

import {
  APP_PRIMARY_COLOR,
  TITLE_FONT_SIZE,
  SECONDARY_FONT_SIZE,
  SUBTITLE_FONT_SIZE,
  SMALL_ICON,
  LARGE_ICON,
  OPAQUE_BACKGROUND,
  ICON_PRIMARY_COLOR,
  BUTTON_PRIMARY_COLOR,
  APP_SECONDARY_COLOR,
  DEFAULT_CONTAINER,
  CONTAINER_TWO,
  CONTAINER_THREE,
  INLINE_CONTAINER,
  TRANSPARENT_BACKGROUND
} from "./styles/common.js";

export default class CustomerProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Random Person",
    };
  }

  render() {
    const current = {
        stats: [{
            iconName: 'chat-bubble',
            description: 'Pending Applications',
            description_two: '',
        }, {
            iconName: 'event-available',
            description: 'Upcoming Events',
  
        }, {
            iconName: 'group',
            description: 'My Events',
            description_two: ''
        }]
    }
    const { navigate } = this.props.navigation.navigate
    return (
        
      <LinearGradient
      colors={[APP_SECONDARY_COLOR, '#14a49c']}
      start={[0.2, 0.1]}
      end={[0.9, 0.9]}
      style={{ flex: 1,}} 
     >
        <View style={[DEFAULT_CONTAINER, {marginTop: 40}]}>
          {/* circle has to be rendered first to be in background */}
          <View style={[styles.backCircle, styles.primaryBackground]} />

          <Avatar
            xlarge
            rounded
            source={{ uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=350" }}
            style={{flex: 1.6}}
          />

          <View style={[CONTAINER_THREE, {backgroundColor: 'transparent'}]}>
            <Text style={[TRANSPARENT_BACKGROUND, {color: "#eee", fontFamily: 'Avenir-Light', fontSize: 30, fontWeight: '700'}]}>
              {current.name}
            </Text>
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <Text style={[TRANSPARENT_BACKGROUND, {color: '#eee', fontFamily: 'Avenir-Light', fontWeight: '600', fontSize: 20}]}>
                Verified Host
              </Text>

              <Text style={[TRANSPARENT_BACKGROUND, {color: '#eee', fontFamily: 'Avenir-Light', marginBottom: 10}, SUBTITLE_FONT_SIZE]}>
                joined 6-18-2018
              </Text>
            </View>

            <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>

                {
                
                current.stats.map((l, i) => (
                <Button key={i + 'v'}
                    raised
                    fontSize={12}
                    title={l.description}
                  
                    containerStyle={{color: ICON_PRIMARY_COLOR, width: 50, fontSize: 12}}
                    icon={{name: l.iconName}}
                />
                
                ))}
            </View>

            <Button
              title="Log Out"
              containerViewStyle={[CONTAINER_TWO, {
              shadowColor: "#222222",
              shadowOffset: { width: 0, height: 3},
              shadowOpacity: 0.3,
              shadowRadius: 2}]}
              buttonStyle={styles.button}
              fontSize={16}
              fontFamily='Avenir-Light'
              borderRadius={50}
              backgroundColor={BUTTON_PRIMARY_COLOR}
              color={ICON_PRIMARY_COLOR}
              onPress={() => this.props.navigation.navigate('Channel')}
            />
          </View>

         
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  backCircle: {
    position: "absolute",
    top: 120,
    width: 325,
    height: 325,
    borderRadius: 325 / 2,
    borderWidth: 2,
    borderColor: "#1bdbd0"
  },
  button: {
    height: 50,
    width: 200,
    margin: 18,
  },
  primaryBackground: {
    backgroundColor: '#222222'
  }
});
