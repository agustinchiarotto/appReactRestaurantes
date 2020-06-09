import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import RestaurantesStack from './RestaurantesStack';
import FavoritesStack from './FavoritesStack';
import TopRestaurantesStack from './TopRestaurantesStack';
import SearchStack from './SearchStack';
import AccountStack from './AccountStack';

const Tab = createBottomTabNavigator();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="restaurantes"
				tabBarOptions={{
					inactiveTinColor: '#646464',
					activeTintColor: '#00a680'
				}}
				screenOptions={({ route }) => ({
					tabBarIcon: ({ color }) => screenOptions(route, color)
				})}
			>
				<Tab.Screen name="restaurantes" component={RestaurantesStack} options={{ title: 'Restaurantes' }} />
				<Tab.Screen name="favorites" component={FavoritesStack} options={{ title: 'Favoritos' }} />
				<Tab.Screen name="top-restaurantes" component={TopRestaurantesStack} options={{ title: 'Top-5' }} />
				<Tab.Screen name="search" component={SearchStack} options={{ title: 'Buscar' }} />
				<Tab.Screen name="account" component={AccountStack} options={{ title: 'Cuenta' }} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

const screenOptions = (route, color) => {
	let icon;
	switch (route.name) {
		case 'restaurantes':
			icon = 'compass-outline';
            break;
         case 'favorites':
			icon = 'heart-outline';
            break;
         case 'top-restaurantes':
			icon = 'star-outline';
            break;
         case 'search':
			icon = 'magnify';
            break;
        case 'account':
                icon = 'home-outline';
                break;

		default:
			break;
	}
	return (<Icon type="material-community" name={icon} color={color} size={22}/>)
};

export default Navigation;
