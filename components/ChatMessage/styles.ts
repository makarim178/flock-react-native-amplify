import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        padding: 5,
        
    },
    messageBox: {
        borderRadius: 5,
        padding: 10,
    },
    name: {
        fontWeight: "bold",
        color: 'white',
        fontSize: 20,
        marginBottom: 5,
    },
    mesage: {
        color: 'white',
        marginVertical: 5,
        fontSize: 16
    },
    time: {
        color: 'gray',
        fontSize: 10,
        alignSelf: "flex-end"        
    },
})

export default styles