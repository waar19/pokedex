import React, { useState, useEffect} from "react";
import Icon from "react-native-vector-icons/FontAwesome5"
import { ScrollView, Text } from "react-native";
import { getPokemonDetailsByIdApi } from '../api/pokemon'
import Header from "../components/pokemon/Header";
import Type from "../components/pokemon/Type";
import Stats from "../components/pokemon/Stats";
import Favorite from "../components/pokemon/Favorite";
import useAuth from "../hooks/useAuth";

export default function Pokemon(props) {
  const { route: { params }, navigation } = props;
  
  const [pokemon, setPokemon] = useState(null);

  const { auth } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => auth && <Favorite id={pokemon?.id}/>,
      headerLeft: () => (
        <Icon 
          name='arrow-left' 
          color='white' size={20} 
          style={{ marginLeft: 20  }}
          onPress= { () => navigation.goBack() }
        ></Icon>
      )
    })
  },[navigation, params, pokemon])

  useEffect(() => {
    (async() =>{
      try {
        const response = await getPokemonDetailsByIdApi(params.id);
        setPokemon(response);

      } catch (error) {
        navigation.goBack();
      }
    })()
  }, [params])


  if(!pokemon) return null;

  return (
    <ScrollView>
      <Header 
        name={pokemon.name} 
        order={pokemon.order} 
        image={pokemon.sprites.other['official-artwork'].front_default} 
        type={pokemon.types[0].type.name}/>
      <Type types={pokemon.types}/>
      <Stats stats={pokemon.stats}/>
    </ScrollView>
  );
}
