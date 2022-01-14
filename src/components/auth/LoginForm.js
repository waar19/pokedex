import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Keyboard } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { user, userDetails } from '../../utils/userDB'
import useAuth from '../../hooks/useAuth'

export default function LoginForm() {

    const [error, setError] = useState('')
    const { login, logout } = useAuth()

    console.log(useAuth())

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object((validationSchema())),
        validateOnChange: false,
        onSubmit: (formValues)=>{
            setError('')
            const { username, password } = formValues
            if(username === user.username && password === user.password){
                login(userDetails)
                Keyboard.dismiss()
            }else{
                setError('Usuario o contraseña incorrectos')
            }
        }
    })

    return (
        <View>
            <Text style={styles.title}>Iniciar Sesion</Text>
            <TextInput style={styles.input} 
                placeholder="Nombre de Usuario" 
                autoCapitalize='none' 
                value={formik.values.username} 
                onChangeText={ (text) => formik.setFieldValue('username', text) }
                />
            <TextInput style={styles.input} 
                placeholder="Contraseña" 
                autoCapitalize='none' 
                secureTextEntry={true}
                value={formik.values.password}
                onChangeText={ (text) => formik.setFieldValue('password', text) } 
                />
            <Button title="Iniciar Sesion" onPress={formik.handleSubmit} />
            <Text style={styles.error}>{formik.errors.username}</Text>
            <Text style={styles.error}>{formik.errors.password}</Text>
            <Text style={styles.error}>{error}</Text>
        </View>
    )
}

function validationSchema(){
    return {
        username: Yup.string().required('El nombre de usuario es requerido'),
        password: Yup.string().required('La contraseña es requerida')
    }
}

function initialValues () {
    return {
        username: '',
        password: ''
    }
}

const styles = StyleSheet.create({
    title:{
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 15
    },
    input:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    error:{
        textAlign: 'center',
        color: 'red',
        marginTop: 20
    }
})
