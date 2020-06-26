import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Overlay } from "react-native-elements";

export default function ModalComponent(props) {
//Children es el componente que queres que renderice el modal
    const {isVisible, setIsVisible, children} = props;

    const closeModal = () => setIsVisible(false)

    return (
        <Overlay
        isVisible ={isVisible}
        windowBackgroundColor ="rgba(0,0,0,0.5)"
        overlayBackgroundColor = "transparent"
        overlayStyle ={styles.overlay}
        onBackdropPress ={closeModal}
        >
            {children}
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height:'auto', //esto hace que ocupe solo su contenido.
        width: '90%',
        backgroundColor:"#fff"
    }
})

