import React from 'react'
import { View, Text } from 'react-native'
import { Message } from '../../types'
import moment from 'moment'
import styles from './styles'


export type ChatMessageProps = {
    message: Message;
    myId: String;
}

const ChatMessage = (props: ChatMessageProps) => {
    const { message, myId } = props;

    const isMyMessage= () => {
        return message.user.id === myId
    }

    return(
        <View style={styles.container}>
            <View style={[
                    styles.messageBox,
                    {
                        backgroundColor: isMyMessage() ? 'rgba(255,255,255,0.1)': 'rgba(50,50,50,0.5)',
                        marginLeft: isMyMessage() ? 50 : 0,
                        marginRight: isMyMessage() ? 0 : 50,
                    },
                ]}
            >
                { !isMyMessage() && <Text style={styles.name}> {message.user.name} </Text>}
                <Text style={styles.mesage}> {message.content} </Text>
                <Text style={styles.time}> { moment(message.createdAt).fromNow() } </Text>
            </View>
        </View>
    )

}

export default ChatMessage