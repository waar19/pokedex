import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { addPokemonToFavorite, isFavoritePokemonApi, removePokemonFromFavoriteApi } from '../../api/favorite'

export default function Favorite(props) {

    const { id } = props
    const [isFavorite, setIsFavorite] = useState(undefined);
    const [reloadCheck, setReloadCheck] = useState(false);

    const Icon = isFavorite ? FontAwesome : FontAwesome5;

    useEffect(() => {
        (async()=>{
           try {
               const response = await isFavoritePokemonApi(id);
               setIsFavorite(response);
           } catch (error) {
               setIsFavorite(false)
           }
        })()
    }, [id, reloadCheck])

    const onReloadCheckFavorite = () =>{
        setReloadCheck((prev) => !prev);
    }

    const addToFavorite = async() =>{
        
        try {
            await addPokemonToFavorite(id)
            onReloadCheckFavorite()
        } catch (error) {
            console.log(error)
        }
    }

    const removeFavorite = async()=>{
       try {
            await removePokemonFromFavoriteApi(id)
            onReloadCheckFavorite()
       } catch (error) {
           console.log(error)
       }
    }

    return (
        <Icon 
        name='heart' 
        color='#fff' 
        size={20} 
        onPress={isFavorite ? removeFavorite : addToFavorite} 
        style={{marginRight: 20}}></Icon>
    )
}
