import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { validateEmail } from "../../utils/validation";
import {size, isEmpty} from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";

export default (RegisterForm = (props) => {
	const [ showPass, setShowPas ] = useState(false);
	const [ showRepite, setshowRepite ] = useState(false);
	const [ formData, setFormData ] = useState(defaultFormValue());
	const [loading, setloading] = useState(false)
	const navigation = useNavigation();

	const {toastRef} = props;	

	const onSubmit = () => {
		if(isEmpty(formData.email) || isEmpty(formData.password) || isEmpty(formData.repeatPassword)){
			toastRef.current.show("Todos los campos son obligatorios");
		}
		else {
			if(!validateEmail(formData.email)) {
				toastRef.current.show("Email no es correcto");
			}
			else if (formData.password !==	formData.repeatPassword){
				toastRef.current.show("Contrasenas no son iguales");
			}
			else if (size(formData.password)<6 ){
				toastRef.current.show("contrasena debe tener al menos 6 caracteres");
			}
		
			else{
				setloading(true);
				
				firebase.auth().createUserWithEmailAndPassword(formData.email,formData.password).then(
					response =>{
						setloading(false);
						navigation.navigate("account");
					}
				)
				.catch ( (error)=>{
					setloading(false);
					toastRef.current.show(error);
				})
			}
		}
	};

	//CUando le llega el type hay que ponerlo entre corchetes para que sea dinamico el valor. SI no le asigna el valor de type string
	const onChange = (event, type) => {
		setFormData({...formData, [type]: event.nativeEvent.text });

	};

	return (
		<View style={styles.formContainer}>
			<Input
				placeholder="Correo Electronico"
				containerStyle={styles.inputForm}
				rightIcon={
					<Icon
						type="material-community"
						name="at"
						iconStyle={styles.iconRight}
					
					/>
				}
				onChange={(e) => onChange(e, 'email')}
			/>

			<Input
				placeholder="Contrasena"
				containerStyle={styles.inputForm}
				password={true}
				secureTextEntry={!showPass}
				onChange={(e) => onChange(e, 'password')}
				rightIcon={
					<Icon
						type="material-community"
						name={showPass ? 'eye-off-outline' : 'eye-outline'}
						iconStyle={styles.iconRight}
						onPress={() => setShowPas(!showPass)}
					/>
				}
			/>
			<Input
				placeholder="Repita Contrasena"
				containerStyle={styles.inputForm}
				password={true}
				secureTextEntry={!showRepite}
				onChange={(e) => onChange(e, 'repeatPassword')}
				rightIcon={
					<Icon
						type="material-community"
						name={showRepite ? 'eye-off-outline' : 'eye-outline'}
						iconStyle={styles.iconRight}
						onPress={() => setshowRepite(!showRepite)}
					/>
				}
			/>

			<Button title="Unirse" containerStyle={styles.btnContainerRegister} buttonStyle={styles.btnRegister} onPress = {()=>onSubmit()} />
				<Loading isVisible={loading} text={"Creando cuenta"}  />
		</View>
	);		
});

const defaultFormValue = () => {
	return {
		email: '',
		password: '',
		repeatPassword: ''
	};
};

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 30
	},
	inputForm: {
		width: '100%',
		marginTop: 20
	},
	btnContainerRegister: {
		marginTop: 20,
		width: '95%'
	},
	btnRegister: {
		backgroundColor: '#00a680'
	},
	iconRight: {
		color: '#c1c1c1'
	}
});
