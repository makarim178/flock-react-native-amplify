import { StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: 'rgba(20,20,20,0.2)',
        borderRadius: 5,
        marginVertical: 1,
    },
    leftContainer: {
        flexDirection: "row",
    },
    midContainer: {
        justifyContent: "space-around",
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 15,
    },
    userName: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 20,
    },
    status: {
        color: 'white',
        fontSize: 16,
        flexWrap: "wrap",
    },
})

export default styles