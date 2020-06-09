import  React  from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Acount from "../screens/account/Account";


const Stack = createStackNavigator();

/**
 * Solo se renderiza el primer stack screen, los demas aparecen ocultos.
 */
const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="account" component={Acount} options={{title: 'Cuenta'}}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default AccountStack;