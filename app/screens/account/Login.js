import React, {useRef} from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-easy-toast";
import LoginForm from "../../components/account/LoginForm";

export default Login = () => {

	const toastRef = useRef();
	
	return (
		<ScrollView>
			<Image source={require('../../../assets/img/original.png')} resizeMode="contain" style={styles.logo} />

			<View style={styles.viewContainer}>
				<LoginForm toastRef = {toastRef} />
				<CreateAccount/>
			</View>
			<Divider style={styles.dividir} />
			<Text>Social Log</Text>
			<Toast ref={toastRef} position ="center" opacity = {0.9} />
		</ScrollView>
	);
};

const CreateAccount = (props) => {
	const navigation = useNavigation();

	return (
		<Text style={styles.textRegister}>
			Aun no tienes una cuenta? {' '}
			<Text style={styles.btnRegister} onPress={() => navigation.navigate('register')}>
				Registrate
			</Text>
		</Text>
	);
};

const styles = StyleSheet.create({
	logo: {
		width: '100%',
		height: 150,
		marginTop: 20
	},
	viewContainer: {
		marginRight: 40,
		marginLeft: 40
	},
	textRegister: {
		marginTop: 15,
		marginLeft: 10,
		marginRight: 10
	},
	btnRegister: {
		color: '#00a680',
		fontWeight: 'bold'
	},
	dividir: {
		backgroundColor: '#00a680',
		margin: 40
	}
});
