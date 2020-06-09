import  React  from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search";

const Stack = createStackNavigator();

/**
 * Solo se renderiza el primer stack screen, los demas aparecen ocultos.
 */
const SearchStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="search" component={Search} options={{title: 'Buscar'}}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default SearchStack;