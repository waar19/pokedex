import React from 'react'
import { StyleSheet, View, SafeAreaView, Text, Image, Platform } from 'react-native'
import { capitalize } from 'lodash';
import getColorByPokemonType from '../../utils/getColorByPokemonType'

export default function Header(props) {
    const { name, order, image, type } = props;
    const color = getColorByPokemonType(type);
    const bgStyle = [{ backgroundColor: color, ...styles.bg }];


    return (
        <>
            <View style={bgStyle}/>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{capitalize(name)}</Text>
                    <Text style={styles.order}>#{`${order}`.padStart(3, 0)}</Text>
                </View>
                <View style={styles.contentImg}>
                    <Image style={styles.image} source={{ uri: image }} />
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    bg:{
        width: "100%",
        height: Platform.OS == 'ios' ? 400 : 420,
        position: "absolute",
        borderBottomEndRadius: 300,
        borderBottomLeftRadius: 300,
        transform: [{ scaleX: 2 }]
    },
    container: {
        marginHorizontal: 20,
        marginTop: Platform.OS == 'ios' ? 30 : 60,
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 40
    },
    title:{
        color: 'white',
        fontWeight: "bold",
        fontSize: 26
    },
    order:{
        color: 'white',
        fontWeight: "bold"
    },
    contentImg:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 30
    },
    image: {
        width: 250,
        height: 300,
        resizeMode: 'contain'
    }
})