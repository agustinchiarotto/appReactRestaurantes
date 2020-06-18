import React, {useRef} from 'react'
import { View, Text , StyleSheet, Image} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

import Toast from 'react-native-easy-toast'


import RegisterForm from "../../components/account/RegisterForm";

export default Register = () => {

    const toastRef = useRef()
    /** ese keyboradadware es para que cuando se mete el teclado en la pantalla no se tape el formulario */
    return (
        <KeyboardAwareScrollView>
            <Image source= {require("../../../assets/img/original.png")}
            resizeMode="contain"
            style={style.logo} />
            <View  style={style.viewForm} >
              <RegisterForm toastRef={toastRef}/>
            </View>
            <Toast ref={toastRef} position={'center'} opacity={0.9}/>
       </KeyboardAwareScrollView>
    )
}

const style = StyleSheet.create({
    logo: {
        width:'100%',
        height:150,
        marginTop:20
    },
    viewForm: {
        marginRight:40,
        marginLeft:40
    }
})