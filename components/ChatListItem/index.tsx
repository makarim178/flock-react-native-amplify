import React, { useEffect, useState} from 'react'
import { 
    View, 
    Text, 
    Image, 
    TouchableWithoutFeedback 
} from 'react-native'

import { ChatRoom } from '../../types'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native'
import styles from './style'
import { Auth } from 'aws-amplify';

export type ChatListItemProps = {
    chatRoom : ChatRoom;
  }

const ChatListItem = (props: ChatListItemProps) => {
    const {chatRoom} = props;
    const [otherUser, setOtherUser] = useState(null);

    const navigation = useNavigation();

    const user = chatRoom.ChatRoomUsers.items[0].user;

    useEffect(() => {
        const getOtherUser =  async() => {
            const userInfo = await Auth.currentAuthenticatedUser();
            console.log("trying agian");
            
            
            
            if(chatRoom.ChatRoomUsers.items[0].user.id === userInfo.attributes.sub){
                setOtherUser(chatRoom.ChatRoomUsers.items[1].user) 
            }else {
                setOtherUser(chatRoom.ChatRoomUsers.items[0].user)
            }

            console.log(otherUser.imageUri);
            console.log(otherUser.name);

            
        }

        getOtherUser()
    },[])

    if (!otherUser) {
        return null;
    }
    
    const onClick = () => {
        // console.log( `Clicked on ${user.name}`);

        navigation.navigate('ChatRoom', {
            id: chatRoom.id,
            name: otherUser.name,
          })
    }

    return(
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                
            <View style={styles.leftContainer}>
          
            <Image source={{ uri: otherUser.imageUri }} style={styles.avatar}/>

            <View style={styles.midContainer}>
                <Text style={styles.userName}>{otherUser.name}</Text>
                <Text numberOfLines={2} style={styles.lastMessage}>{chatRoom.lastMessage ? chatRoom.lastMessage.content : ""}</Text>
            </View>

            <Text style={styles.time}>
            {chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format("DD/MM/YYYY")}
            </Text>
        
            </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default ChatListItem