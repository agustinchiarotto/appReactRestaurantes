import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';
import { validateEmail } from '../../utils/validation';
import Loading from '../Loading';

export default (LoginForm = (props) => {
	const [ showPass, setShowPas ] = useState(false);
	const [ formData, setFormData ] = useState({ email: '', password: '' });
	const { toastRef } = props;
	const navigation = useNavigation;
	//Para mostrar el loading mientras va a la bd se usa un estado
	const [ loading, setloading ] = useState(false);

	//Se encarga de escuchar los cambios del teclado en los inputs. Usa el event native event text para encontrar el cambio
	// Importante que esta entre corchetes para entrar a la propiedad type
	const onChange = (event, type) => {
       
		setFormData({ ...formData, [type]: event.nativeEvent.text });
	};

	//Se encarga cuando se toca el boton
	const onSubmit = () => {
		if (isEmpty(formData.email) || isEmpty(formData.password)) {
			toastRef.current.show('Todos los campos son obligatorios');
		} else if (!validateEmail(formData.email)) {
			toastRef.current.show('Email no valido');
		} else {
			setloading(true);
			firebase
				.auth()
				.signInWithEmailAndPassword(formData.email, formData.password)
				.then(() => {
					setloading(false);
					navigation.navigate('account');
				})
				.catch(() => {
					setloading(false);
					toastRef.current.show('Datos incorrectos');
				});
		}
	};

	return (
		<View style={style.formContainer}>
			<Input
				
				containerStyle={StyleSheet.imputForm}
				placeholder	="Nombre de Usuario"
				rightIcon={
					<Icon
						type="material-community"
						name="at"
						iconStyle={style.iconRight}
						
					/>
                }
                onChange={(e) => onChange(e, 'email')}
			/>
			<Input
				placeholder="Contraseña"
				containerStyle={StyleSheet.imputForm}
				password={true}
				secureTextEntry={!showPass}
				rightIcon={
					<Icon
						type="material-community"
						name={showPass ? 'eye-off-outline' : 'eye-outline'}
						iconStyle={style.iconRight}
						onPress={() => setShowPas(!showPass)}
					/>
				}
				onChange={(e) => onChange(e, 'password')}
			/>

			<Button
				title="iniciar sesion"
				containerStyle={style.btnContainerLogin}
				buttonStyle={style.btnLogin}
				onPress={() => onSubmit()}
			/>
			<Loading isVisible={loading} text="Iniciando sesion" />
		</View>
	);
});

const style = StyleSheet.create({
	formContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 30
	},
	imputForm: {
		width: '100%',
		marginTop: 20
	},
	btnContainerLogin: {
		marginTop: 20,
		width: '95%'
	},
	btnLogin: {
		backgroundColor: '#00a680'
	},
	iconRight: {
		color: '#c1c1c1'
	}
});
