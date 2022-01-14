import React from 'react'
import { StyleSheet, FlatList, ActivityIndicator, Platform } from 'react-native'
import PokemonCard from '../components/PokemonCard'

export default function PokemonList(props) {

    const { pokemons, loadPokemons, isNext } = props;

    const loadMore = () => {
        loadPokemons();
    }

    return (
        <FlatList
            data={pokemons}
            numColumns={2}
            showVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) =>  <PokemonCard pokemon={item}/>}
            contentContainerStyle={styles.flatListContentContainer}
            onEndReached={isNext && loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent= { isNext && (<ActivityIndicator size="large" color="#AEAEAE" style={styles.spinner} />)}
        ></FlatList>
    )
}


const styles = StyleSheet.create({
    flatListContentContainer: {
        paddingHorizontal: 5,
        marginTop: Platform.OS === 'ios' ? 2 : 60
    },
    spinner: {
        marginTop: 20,
        marginBottom: Platform.OS === 'ios' ? 60 : 100
    }
})