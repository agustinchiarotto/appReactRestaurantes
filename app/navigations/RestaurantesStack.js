import  React  from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Restaurantes from "../screens/Restaurantes"

const Stack = createStackNavigator();

/**
 * Solo se renderiza el primer stack screen, los demas aparecen ocultos.
 */
const RestaurantesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="restaurantes" component={Restaurantes} options={{title: 'Restaurantes'}}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default RestaurantesStack;