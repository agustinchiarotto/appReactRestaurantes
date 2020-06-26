import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import { size } from 'lodash';
import { reauthenticate } from '../../utils/api';

export default function ChangePasswordForm(props) {
	const { setShowModal, toasRef, setReloadUserInfo } = props;
	const [ isLoading, setIsLoading ] = useState(false);
	const [ showOPassword, setShowOPassword ] = useState(false);
	const [ showPasswordR, setShowPasswordR ] = useState(false);
	const [ showPassword, setShowPassword ] = useState(false);
	const [ formData, setFormData ] = useState({
		newPassword: '',
		newPasswordR: '',
		oldPassword: ''
	});
	const [ error, setError ] = useState({});

	//esto es para cambiar el estado con los valores del input
	const onChange = (e, type) => {
		setFormData({
			...formData,
			[type]: e.nativeEvent.text
		});
	};

	const onSubmit = async () => {
		setError({});
		if (formData.newPasswordR !== formData.newPassword) setError({ password: 'Contrasenas no coinciden' });
		else if (!formData.newPassword || !formData.newPasswordR) setError({ password: 'Complete todos los campos' });
		else if (size(formData.newPassword) < 6) setError({ password: 'Se requiere minimo de 6 caracteres' });
		else {
			setIsLoading(true);
			await reauthenticate(formData.newPassword).then(() => {}).catch(() => {
				toasRef.current.show('La contrasena anterior no es correcta');
				setIsLoading(false);
			});
		}
	};

	// errorMessage = {error} Imprime en rojito debajo del input. Buenisimo!
	// loading={isLoading} pone el circulito en el boton
	return (
		<View style={styles.view}>
			<Input
				placeholder="Contraseña Anterior"
				containerStyle={styles.input}
				password={true}
				secureTextEntry={!showOPassword}
				rightIcon={{
					type: 'material-community',
					name: showOPassword ? 'eye-off-outline' : 'eye-outline',
					color: '#c2c2c2',
					onPress: () => setShowOPassword(!showOPassword)
				}}
				onChange={(e) => onChange(e, 'oldPassword')}
				errorMessage={error.oldPassword}
			/>
			<Input
				placeholder="Contraseña Nueva"
				containerStyle={styles.input}
				password={true}
				secureTextEntry={!showPassword}
				rightIcon={{
					type: 'material-community',
					name: showPassword ? 'eye-off-outline' : 'eye-outline',
					color: '#c2c2c2',
					onPress: () => setShowPassword(!showPassword)
				}}
				onChange={(e) => onChange(e, 'newPassword')}
				errorMessage={error.password}
			/>
			<Input
				placeholder="Repetir Contraseña Nueva"
				containerStyle={styles.input}
				password={true}
				secureTextEntry={!showPasswordR}
				rightIcon={{
					type: 'material-community',
					name: showPasswordR ? 'eye-off-outline' : 'eye-outline',
					color: '#c2c2c2',
					onPress: () => setShowPasswordR(!showPasswordR)
				}}
				onChange={(e) => onChange(e, 'newPasswordR')}
				errorMessage={error.password}
			/>
			<Button
				title="Cambiar Password"
				containerStyle={styles.btnContainer}
				buttonStyle={styles.btn}
				onPress={onSubmit}
				loading={isLoading}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10
	},
	input: {
		marginBottom: 10
	},
	btnContainer: {
		marginTop: 20,
		width: '95%'
	},
	btn: {
		backgroundColor: '#00a680'
	}
});
