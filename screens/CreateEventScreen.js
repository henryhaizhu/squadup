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
import { Card, SearchBar, FormInput, Button } from 'react-native-elements'

import { MonoText } from '../components/StyledText';

export default class CreateScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        console.log(navigation.state.params)
        return {
            headerTitle: "Create New Event",
            headerStyle: {
                backgroundColor: "#262228"
            },
            headerTitleStyle: {
                color: '#fff'
            }
        }
    }

    state = {
        title: null,
        description: null,
        location: null,
        image: null
    }

    _handleChangeName = (title) => {
       this.setState({title})
    }
    _handleChangeDescription = (description) => {
        this.setState({description})
    }
    _handleChangeLocation = (location) => {
        this.setState({location})
    }
    _handleChangeImage = (image) => {
        this.setState({image})
    }
    render() {
        console.log(this.state.title)
        const { navigation } = this.props
        const eventType = navigation.state.params
        return (
            <View style={styles.container}>
                <FormInput
                    onChangeText={this._handleChangeName}
                    placeholder='Name of Event'
                    value={this.state.title}
                />
                <FormInput
                    onChangeText={this._handleChangeDescription}
                    placeholder='Description'
                />
                <FormInput
                     onChangeText={this._handleChangeLocation}
                    placeholder='Location'
                />
                <FormInput
                    onChangeText={this._handleChangeImage}
                    placeholder='Image'
                />
                <Button
                    raised
                    title="Submit"
                    borderRadius={2}
                    onPress={()=>{navigation.navigate(eventType, {...this.state})}}
                    underlayColor='#007849'
                    backgroundColor='white'
                    color='gray'
                    containerViewStyle={{
                        width: "80%",
                        alignSelf: 'center',
                        borderWidth: 1,
                        borderBottomWidth: 3,
                        borderColor: "#0375b4",
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 10,
                        shadowColor: '#007849',
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: 0.8,
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
      }
})
