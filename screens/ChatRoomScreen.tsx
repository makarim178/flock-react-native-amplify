import React, {useEffect, useState} from 'react'
import { View, FlatList, StyleSheet, Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native'
import ChatMessage from '../components/ChatMessage'
import { LinearGradient } from 'expo-linear-gradient'
import InputBox from '../components/InputBox'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { messagesByChatRoom } from '../src/graphql/queries'

const ChatRoomScreen = () => {
    const route = useRoute()
    const {height} = Dimensions.get("screen");
    const {width} = Dimensions.get("screen");

    const [messages, setMessages] = useState([])
    const [myId, setMyId] = useState(null)
    

    useEffect(() => {
        const fetchMessages = async () => {
            const messagesData = await API.graphql(
                graphqlOperation( 
                    messagesByChatRoom, {
                        chatRoomID: route.params.id,
                        sortDirection: "DESC",
                    }
                )
            )

            setMessages(messagesData.data.messagesByChatRoom.items);
            //console.log(messages);
        }

        fetchMessages();
    }, [messages])

    useEffect(()=> {
        const getMyId = async () =>{
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyId(userInfo.attributes.sub);
        }
        getMyId()
    },[])
    
    return (
        <View style={styles.container}>
            <LinearGradient colors={['purple', 'blue']} style={{
                position: "absolute", 
                height: height, 
                width: width,
            }} />
            <FlatList 
                data={messages}
                renderItem = {({item})=>(
                    <ChatMessage myId={myId} message = {item} />
                )}
                inverted
            />
            <InputBox  chatRoomID={route.params.id}  />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
})
export default ChatRoomScreen