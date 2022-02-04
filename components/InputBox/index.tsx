import React, {useState, useEffect } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { API, Auth, graphqlOperation, loadingBarFill} from 'aws-amplify';
import { createMessage } from '../../src/graphql/mutations'

import styles from './styles'

import { 
    MaterialCommunityIcons, 
    MaterialIcons,
    FontAwesome5,
    Entypo, 
    Fontisto,
} from '@expo/vector-icons'


const InputBox = (props) => {
    const { chatRoomID }  = props
    const [message, setMessage] = useState('')

    const [myUserId, setMyUserId] = useState(null);

    useEffect(() => {
        const fetchUser = async() => {
            const userInfo = await Auth.currentAuthenticatedUser();
            //console.log(userInfo);
            
            setMyUserId(userInfo.attributes.sub);
        }

        fetchUser()
    }, [])

    

    const onMicroPhonePress = () => {
        console.log('Microphone');        
    }

    const onSendPress = async () => {
        try {
            await API.graphql(
              graphqlOperation(
                createMessage, {
                  input: {
                    content: message,
                    userID: myUserId,
                    chatRoomID
                  }
                }
              )
            )
          } catch (e) {
            console.log(e);
            
        }

        // send the message to the backend
        
        setMessage('');
        
    }

    const onPress = () => {
        if (!message) {
            onMicroPhonePress();
        } else {
          onSendPress();
        }
      }

    return (
        <View style={styles.container}>
            <View style = {styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" size={28} color="white" />
                <TextInput 
                    placeholder={"Type a message"}
                    placeholderTextColor={"gray"}
                    style={styles.textInput} 
                    multiline ={true}
                    value={message} 
                    onChangeText = {setMessage} 
                />
                <Entypo name="attachment" size={28} color="white" style={styles.icon} />
                {!message && <Fontisto name="camera" size={28} color="white" style={styles.icon} />}
            </View>
            <TouchableOpacity onPress={onPress}>
                <View style = {styles.buttonContainer}>
                    {!message 
                        ? <MaterialCommunityIcons name="microphone" size={28} color="white" />
                        : <MaterialIcons name="send" size={28} color="white" />
                    }
                </View>

            </TouchableOpacity>
        </View>
    )
}

export default InputBox