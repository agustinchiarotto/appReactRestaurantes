import  React  from "react";
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-elements';

const UserGuest = () => {
	return (
		<ScrollView centerContent={true} style={styles.viewBody}>
			<Image source={require('../../../assets/img/userGuest.jpg')} resizeMode="contain" style={styles.image}/>
		</ScrollView>
	);
};


const styles = StyleSheet.create( {
    viewBody:{
        marginLeft: 30,
        marginRight: 30,

    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 40
    }

})

export default UserGuest;
