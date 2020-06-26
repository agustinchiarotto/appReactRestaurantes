import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import { validateEmail } from "../../utils/validation";
import { reauthenticate } from "../../utils/api";

export default function ChangeEmailForm(props) {
	const { email, setShowModal, toasRef, setReloadUserInfo } = props;
    const [ isLoading, setIsLoading ] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
    });
    const [error, setError] = useState({});


    //esto es para cambiar el estado con los valores del input
	const onChange = (e, type) => {
		setFormData({
			...formData,
			[type]: e.nativeEvent.text
		});
	};

	const onSubmit = () => {
		setError({});
		if (!formData.email || formData.email === email) setError({email:'El email no ha cambiado.'});
        else if (!validateEmail(formData.email))  setError({email:'El email es incorrecto.'});
        else if (!formData.password) setError({password:"Contrasena incorrecta"})
        else {
            setIsLoading(true);
            reauthenticate(formData.password)
            .then(response =>{
                firebase.auth()
                    .currentUser.updateEmail(formData.email)
                    .then(()=>{
                        setIsLoading(false);
                        setReloadUserInfo(true);
                        toasRef.current.show("Email actualizado correctamente");
                        setShowModal(false);
                    })
                    .catch ((error)=>{
                        setError({email:'Error al actualizar el email'});
                        toasRef.current.show("Error al actualizar el email");
                        setIsLoading(false);
                    })
            })
            .catch(error =>{
                setIsLoading(false)
                setError({password:"La password no es correcta"})
            })
			
		
		}
	};

	// errorMessage = {error} Imprime en rojito debajo del input. Buenisimo!
	// loading={isLoading} pone el circulito en el boton
	return (
		<View style={styles.view}>
			<Input
				placeholder="Correo Electronico"
				containerStyle={styles.input}
				rightIcon={{
					type: 'material-community',
					name: 'at',
					color: '#c2c2c2'
				}}
				defaultValue={email && email}
				onChange={(e) => onChange(e,"email")}
				errorMessage={error.email}
			/>
			<Input
				placeholder="Verificar contraseña"
				containerStyle={styles.input}
				password={true}
				secureTextEntry={!showPassword}
				rightIcon={{
					type: 'material-community',
					name: showPassword ? 'eye-off-outline':'eye-outline',
                    color: '#c2c2c2',
                    onPress: ()=>setShowPassword(!showPassword)
				}}
				onChange={(e) => onChange(e,"password")}
                errorMessage={error.password}
               
			/>
			<Button
				title="Cambiar Email"
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
