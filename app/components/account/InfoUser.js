import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const InfoUser = (props) => {
	//esta forma se llama descontruccion. Obtiene las propiedades de props.
	const { userInfo: {uid, photoURL, displayName, email }, toasRef, setLoading, setLoadingText } = props;

    //Pide los permisos y busca la imagen
	const changeAvatar = async () => {
		const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		const resultPermissionsCamera = await resultPermissions.permissions.cameraRoll.status;

		if (resultPermissionsCamera === 'denided') {
			toasRef.current.show('Es necesario aceptar los permisos de la galeria.');
		} else {
			const results = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [ 4, 3 ]
			});
			if (results.cancelled) toasRef.current.show('Has cerrado la galeria');
			else {
                //Aca hace el handling de la promesa con el .then --> Si sale bien hace una funcion u otra en caso contrario
                uploadImg(results.uri)
                    .then(()=>{
                        updatePhotoUrl();
                        toasRef.current.show('Avatar cargado correctamente');
                    })
                    .catch(()=>{
                        toasRef.current.show('Error al actualizar el avatar');
                    })
			}
		}
    };
    
    //guarda la imagen en firebase
    const uploadImg = async  (uri) =>{
		setLoading(true);
		setLoadingText("Actualizando avatar")

        const response = await fetch (uri); //esto devuelve mucha data
        const blob = await response.blob(); //este es el archivo que hay que subir

        const ref = firebase.storage().ref().child(`avatar/${uid}`); //aca arma la ruta 
        return  ref.put(blob); // aca finalmente lo sube y retorna una promesa
    }

    //update del valor en la bd de la url del avatar
    const updatePhotoUrl = () => {
        firebase
            .storage()
            .ref(`avatar/${uid}`)
            .getDownloadURL()
            .then(async(response)=>{
                const update = {
                    photoURL: response
                };
				await firebase.auth().currentUser.updateProfile(update);
				setLoading(false);
			})
			.catch(()=>{
				toasRef.current.show("Error al actualizar el avatar")
			})

    }

	return (
		<View style={styles.viewUsserInfo}>
			<Avatar
				rounded
				size="large"
				showAccessory
				onAccessoryPress={changeAvatar}
				containerStyle={styles.userInfoAvatar}
				source={photoURL ? { uri: photoURL } : require('../../../assets/img/avatar.jpg')}
			/>
			<View>
				<Text style={styles.displayName}>{displayName ? displayName : 'Anonimo'}</Text>
				<Text>{email ? email : 'Email Anonimo'}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	viewUsserInfo: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#f2f2f2',
		paddingTop: 30,
		paddingBottom: 30
	},
	userInfoAvatar: {
		marginRight: 20
	},
	displayName: {
		fontWeight: 'bold',
		paddingBottom: 5
	}
});

export default InfoUser;
