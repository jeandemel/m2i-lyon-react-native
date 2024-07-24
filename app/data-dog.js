import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function dataDog() {
    const [dogList, setDogList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    /**
     * Le useEffect contient une fonction qui se lance au chargement du component puis
     * à chaque fois que la ou les variables du tableau en deuxième arguments changent,
     * si le tableau ne contient aucune variable, comme ici, alors le useEffect ne
     * se lancera qu'une fois et on s'en sert pour initialiser des choses, comme par exemple
     * un appel serveur
     */
    useEffect(() => {
        

        fetchData();
    }, []);

    async function fetchData() {
        setIsLoading(true);
        const response = await axios.get('https://bunny-relaxing-quickly.ngrok-free.app/api/dog', {
            'ngrok-skip-browser-warning': 'true' //Nécessaire uniquement pasqu'on utilise ngrok pour "héberger" le serveur, dans 99.99% des cas, on a pas besoin de ça
        });
        setDogList(response.data);
        setIsLoading(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>The Dog List</Text>

            <FlatList
                refreshing={isLoading}
                onRefresh={() => fetchData()}
                data={dogList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Text>{item.name}</Text>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})