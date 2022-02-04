import React from 'react'
import { 
    View, 
    Text, 
    Image, 
    TouchableWithoutFeedback 
} from 'react-native';

import { User } from '../../types';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

import { 
    API,
    graphqlOperation,
    Auth 
} from 'aws-amplify';
import { 
    createChatRoom, 
    createChatRoomUser
} from '../../src/graphql/mutations'
import { getUser } from '../../src/graphql/queries'
import { log } from 'react-native-reanimated';

export type ContactListItemProps = {
    user : User;
  }

const ContactListItem = (props: ContactListItemProps) => {
    const {user} = props;

    const navigation = useNavigation();

    const onClick = async () => {
        
        // /navigate to chatroom with this user
        try {
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom, {
                        input: {}
                    }
                )
            );

            if(!newChatRoomData.data) {
                console.log("Failed to create a Chat Room");
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;
            
            // 2. Add `user` to the Chat Room

            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                        input: {
                            userID: user.id,
                            chatRoomID: newChatRoom.id
                        }
                    }
                )
            )

            // 3. Add authenticated user to the Chat Room

            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                        input: {
                            userID: userInfo.attributes.sub,
                            chatRoomID: newChatRoom.id
                        }
                    }
                )
            )

            navigation.navigate('ChatRoom', {
                id: newChatRoom.id,
                name: "Hard coded name",
            })

        } catch (e) {
            console.log(e);
        }
    }

    return(
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{uri: user.imageUri}} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.status}>{user.status} </Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default ContactListItem