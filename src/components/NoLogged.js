import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function NoLogged() {

    const navigation = useNavigation()

    return (
        <View style={styles.content}>
            <Text style={styles.text}>Para ver esta pantalla debes iniciar sesion</Text>
            <Button title='Ir a Login' onPress={() => navigation.navigate('Account')}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        marginVertical: 50,
        paddingHorizontal: 50
    },
    text: {
        textAlign: 'center',
        marginBottom: 20
    }
})