import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { API, graphqlOperation} from 'aws-amplify'
import ContactListItem from '../components/ContactListItem'
import { LinearGradient } from 'expo-linear-gradient'

import { listUsers } from '../src/graphql/queries'


export default function ContactsScreen() {
  const {height} = Dimensions.get("screen");
  const {width} = Dimensions.get("screen");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(
          graphqlOperation(
            listUsers
          )
        )
        
        
        setUsers(usersData.data.listUsers.items)
        
      } catch (e) {
        console.log(e);
      }
    }

    fetchUsers()
  }, [])
  return (
    <View style={styles.container}>
      <LinearGradient colors={['purple', 'blue']} style={{
                position: "absolute", 
                height: height, 
                width: width,
            }}></LinearGradient>
      <FlatList 
        style={{width: '100%'}}
        data={users}
        renderItem={({item}) => (<ContactListItem user={item} />)}
        keyExtractor={(item) => item.id}
      />
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
