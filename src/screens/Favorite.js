import React, { useState, useCallback } from 'react'
import { Text } from 'react-native'
import { useFocusEffect} from '@react-navigation/native'
import useAuth from '../hooks/useAuth'
import { getPokemonsFavoriteApi } from '../api/favorite'
import { getPokemonDetailsByIdApi } from '../api/pokemon'
import PokemonList from '../components/PokemonList'
import NoLogged from '../components/NoLogged'

export default function Favorite() {

    const [pokemons, setPokemons] = useState([])
    const { auth } = useAuth()

    useFocusEffect(
        useCallback(() => {

            if(auth){
                (async()=>{
                    const response = await getPokemonsFavoriteApi()
    
                    const pokemonsArray = [];
    
                    for await (const id of response) {
                        const pokemonDetails = await getPokemonDetailsByIdApi(id);
    
                        pokemonsArray.push({
                            id: pokemonDetails.id,
                            name: pokemonDetails.name,
                            type: pokemonDetails.types[0].type.name,
                            order: pokemonDetails.order,
                            image: pokemonDetails.sprites.other['official-artwork'].front_default
                        });
                    }
    
                    setPokemons(pokemonsArray)
                })()
            }
        }, [auth])
    )

    return (
        !auth ? <NoLogged/> :
        <PokemonList pokemons={pokemons} />
    )
}
