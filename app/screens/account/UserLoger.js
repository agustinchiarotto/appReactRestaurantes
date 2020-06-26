import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import * as firebase from 'firebase';

import Loading from '../../components/Loading';
import InfoUser from '../../components/account/InfoUser';
import AccounOption from "../../components/account/AccountOptions";

const UserLoger = () => {
	const toasRef = useRef();
	const [ loading, setLoading ] = useState(false);
    const [ loadingText, setLoadingText ] = useState('');
	const [userInfo, setUserInfo] = useState("");
	const [reloadUserInfo, setReloadUserInfo] = useState(false)

	//Doble parentesis para que la funcion se autoejecute
	// usa un estado para darle info de cuando quiero que se ejecute esto
	useEffect(() => {
		(async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
		})();
		setReloadUserInfo(false); //esto ahce para que se cambie el estado a true desde afuera y asi se pueda ejecutar
	}, [reloadUserInfo]);


    //entre { userInfo && } es un condicional tipo ngif

	return (
		<View style={styles.viewUserInfo}>
         <InfoUser toasRef={toasRef} userInfo={userInfo} setLoading ={setLoading} setLoadingText = {setLoadingText} />
			<AccounOption userInfo={userInfo} toasRef={toasRef} setReloadUserInfo={setReloadUserInfo} />

			<Button
				title="Cerrar sesion"
				titleStyle={styles.btnCloseSesionText}
				buttonStyle={styles.btnCloseSesion}
				onPress={() => firebase.auth().signOut()}
			/>
			<Toast ref={toasRef} position="center" opacity={0.9} />
			<Loading text={loadingText} isVisible={loading} />
		</View>
	);
};

const styles = StyleSheet.create({
	viewUserInfo: {
		minHeight: '100%',
		backgroundColor: '#f2f2f2'
	},
	btnCloseSesion: {
		marginTop: 30,
		borderRadius: 0,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: '#e3e3e3',
		borderWidth: 1,
		borderBottomColor: '#e3e3e3',
		paddingTop: 10,
		paddingBottom: 10
	},
	btnCloseSesionText: {
		color: '#00a680'
	}
});

export default UserLoger;
