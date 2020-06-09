import  React  from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopRestaurantes from "../screens/TopRestaurantes";

const Stack = createStackNavigator();

/**
 * Solo se renderiza el primer stack screen, los demas aparecen ocultos.
 */
const TopRestaurantesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="top-restaurantes" component={TopRestaurantes} options={{title: 'Top-5'}}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default TopRestaurantesStack;