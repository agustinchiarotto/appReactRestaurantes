import React, {useState, useEffect} from 'react'
import * as firebase from 'firebase'
import  UserGuest  from "./UserGuest";
import  UserLoger  from "./UserLoger";
import Loading from "../../components/Loading"
import firebaseApp from "../../utils/firebase";

const Acount = () => {

    const [login,setLogin] = useState(null);

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
                !user ? setLogin(false) : setLogin(true);  
            })
    }, [])

    if(login === null) return <Loading isVisible = {true} text= "Cargando..."></Loading>


    return login ? <UserLoger/> : <UserGuest/>
}


export default Acount