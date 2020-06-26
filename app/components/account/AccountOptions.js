import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { map } from 'lodash';
import ModalComponent from '../Modal';
import ChangeDisplayNameForm from "../account/ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

const AccountOptions = (props) => {
	const { toasRef, userInfo,setReloadUserInfo } = props;

	const [ showModal, setShowModal ] = useState(false);
	const [ renderComponent, setRenderComponent ] = useState(null);

	const selectComponent = (key) => {
		switch (key) {
			case 'displayName':
				setRenderComponent(<ChangeDisplayNameForm
					displayName={userInfo.displayName}
					setShowModal = {setShowModal}
					toasRef = {toasRef}
					setReloadUserInfo ={setReloadUserInfo}
				/>);
				setShowModal(true);
				break;
			case 'email':
				setRenderComponent(<ChangeEmailForm
					email={userInfo.email}
					setShowModal = {setShowModal}
					toasRef = {toasRef}
					setReloadUserInfo ={setReloadUserInfo}
				/>);
				setShowModal(true);
				break;
			case 'password':
				setRenderComponent(<ChangePasswordForm 
					password={userInfo.password}
					setShowModal = {setShowModal}
					toasRef = {toasRef}
					setReloadUserInfo ={setReloadUserInfo}
				/>);
				setShowModal(true);
				break;
			default:
				setRenderComponent(null);
				setShowModal(false);
				break;
		}
	};

	const menuOptions = generateOptions(selectComponent);

	//checar el list item como se usa. La funcion map nos devuelve cada item x iteracion junto con su index. Y es se renderiza en listitem.
	return (
		<View>
			{map(menuOptions, (menu, index) => (
				<ListItem
					key={index}
					title={menu.title}
					leftIcon={{
						type: menu.inconType,
						name: menu.inconNameLeft,
						color: menu.iconColorLeft
					}}
					rightIcon={{
						type: menu.inconType,
						name: menu.iconNameRight,
						color: menu.inconColorRight
					}}
					containerStyle={styles.menuItem}
					onPress={menu.onPress}
				/>
			))}

			{renderComponent && (
				<ModalComponent isVisible={showModal} setIsVisible={setShowModal}>
					{renderComponent}
				</ModalComponent>
			)}
		</View>
	);
};

//el prop children viaja todo lo que esta dentro de los <ModalCOmponent> ACA ES CHILDREN </ModalCOmponent>

const generateOptions = (selectComponent) => {
	return [
		{
			title: 'Cambiar nombre y apellidos',
			inconType: 'material-community',
			inconNameLeft: 'account-circle',
			iconColorLeft: '#ccc',
			iconNameRight: 'chevron-right',
			inconColorRight: '#ccc',
			onPress: () => selectComponent('displayName')
		},
		{
			title: 'Cambiar email',
			inconType: 'material-community',
			inconNameLeft: 'at',
			iconColorLeft: '#ccc',
			iconNameRight: 'chevron-right',
			inconColorRight: '#ccc',
			onPress: () => selectComponent('email')
		},
		{
			title: 'Cambiar contrasena',
			inconType: 'material-community',
			inconNameLeft: 'lock-reset',
			iconColorLeft: '#ccc',
			iconNameRight: 'chevron-right',
			inconColorRight: '#ccc',
			onPress: () => selectComponent('password')
		}
	];
};

const styles = StyleSheet.create({
	menuItem: {
		borderBottomWidth: 1,
		borderBottomColor: '#e3e3e3'
	}
});

export default AccountOptions;
