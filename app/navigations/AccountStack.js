import  React  from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Acount from "../screens/account/Account";
import Login from "../screens/account/Login";
import Register from "../screens/account/Register";


const Stack = createStackNavigator();

/**
 * Solo se renderiza el primer stack screen, los demas aparecen ocultos.
 */
const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="account" component={Acount} options={{title: 'Cuenta'}}></Stack.Screen>
            <Stack.Screen name="login" component={Login} options = {{title:'Iniciar Sesion'}}/>
            <Stack.Screen name="register" component={Register} options = {{title:'Registrate'}}/>
        </Stack.Navigator>
    )
}

export default AccountStack;