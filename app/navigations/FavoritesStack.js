import  React  from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Favorites from "../screens/Favorites";

const Stack = createStackNavigator();

/**
 * Solo se renderiza el primer stack screen, los demas aparecen ocultos.
 */
const FavoritesStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="favorites" component={Favorites} options={{title: 'Favoritos'}}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default FavoritesStack;