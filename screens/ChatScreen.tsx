import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Dimensions} from 'react-native';
import { View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem';
import { LinearGradient} from 'expo-linear-gradient'
import {
  API,
  graphqlOperation,
  Auth,
} from 'aws-amplify';

import chatRooms from '../data/ChatRooms';
import NewMessageButton from "../components/NewMessageButton";

import { getUser } from './queries';


export default function ChatScreen() {
  const {height} = Dimensions.get("screen");
  const {width} = Dimensions.get("screen");

  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();

        const userData = await API.graphql(
          graphqlOperation(
            getUser, {
              id: userInfo.attributes.sub,
            }
          )
        )
        //console.log(userData);

        setChatRooms(userData.data.getUser.ChatRoomUser.items)
        
        
      } catch (e) {
        console.log(e);
      }
    }

    fetchChatRooms();
  },[]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['purple', 'blue']} style={{
                position: "absolute", 
                height: height, 
                width: width,
            }}></LinearGradient>
      <FlatList
        style={{width: '100%'}}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
      />

      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
