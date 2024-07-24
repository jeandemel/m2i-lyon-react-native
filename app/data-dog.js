import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, FlatList, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemDog from "../components/ItemDog";


export default function dataDog() {
    const [dogList, setDogList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const list = useRef();
    /**
     * Le useEffect contient une fonction qui se lance au chargement du component puis
     * à chaque fois que la ou les variables du tableau en deuxième arguments changent,
     * si le tableau ne contient aucune variable, comme ici, alors le useEffect ne
     * se lancera qu'une fois et on s'en sert pour initialiser des choses, comme par exemple
     * un appel serveur
     */
    useEffect(() => {


        fetchData();
    }, [page]);

    async function fetchData() {
        try {

            setIsLoading(true);
            const response = await axios.get('https://bunny-relaxing-quickly.ngrok-free.app/api/dog', {
                headers: {
                    'ngrok-skip-browser-warning': 'true' //Nécessaire uniquement pasqu'on utilise ngrok pour "héberger" le serveur, dans 99.99% des cas, on a pas besoin de ça
                },
                params: { page }
            });
            setDogList([
                ...dogList,
                ...response.data
            ]);
            setIsLoading(false);
        }catch(error) {
            alert(error);
        }

    }

    function refreshHandle(){
        setPage(1);
        setDogList([]);
        fetchData();
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text>The Dog List, current page = {page}</Text>
            {/* <Button onPress={() => setPage(page + 1)} title="Next Page" /> */}
            <Pressable onPress={() => list.scrollToIndex(0)} style={styles.floatingButton}>
                <Text style={{color:'white'}}>⤊</Text>
            </Pressable>
            <FlatList
                ref={list}
                style={{ width: '100%' }}
                refreshing={isLoading}
                onRefresh={refreshHandle}
                onEndReached={() => setPage(page+1)}
                // onEndReachedThreshold={3}
                data={dogList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ItemDog dog={item} />
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    floatingButton: {
        padding:20,
        borderRadius:100,
        backgroundColor: 'skyblue',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 10,
        right: 10
    }
})