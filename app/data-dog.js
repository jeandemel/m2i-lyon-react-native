import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemDog from "../components/ItemDog";


export default function dataDog() {
    const [dogList, setDogList] = useState([]);
    const [selectedDogs, setSelectedDogs] = useState([]);
    const [page, setPage] = useState(1);
    
    const [isLoading, setIsLoading] = useState(true);
    const [showFloating, setShowFloating] = useState(false);
    const list = useRef();
    /**
     * Le useEffect contient une fonction qui se lance au chargement du component puis
     * à chaque fois que la ou les variables du tableau en deuxième arguments changent,
     * si le tableau ne contient aucune variable, alors le useEffect ne
     * se lancera qu'une fois et on s'en sert pour initialiser des choses, comme par exemple
     * un appel serveur.
     * Ici on lui dit de se relancer à chaque fois que la valeur de la variable page change
     * de valeur (donc à chaque fois qu'on change de page, on refetch les data)
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
        } catch (error) {
            alert(error);
        }

    }

    function refreshHandle() {
        setPage(1);
        setDogList([]);
        fetchData();
    }

    function select(dog) {
        if(selectedDogs.includes(dog)) {
            setSelectedDogs(selectedDogs.filter(item => dog != item))
        } else {
            setSelectedDogs([
                ...selectedDogs,
                dog
            ]);
        }
    }

    async function deleteSelected() {
        for(const dog of selectedDogs) {
            await axios.delete('https://bunny-relaxing-quickly.ngrok-free.app/api/dog/'+dog.id);
        }
        setDogList(dogList.filter(item => !selectedDogs.includes(item)));
        setSelectedDogs([]);
        Alert.alert('Dog Deleted'); //Petit feedback indiquant que l'opération a réussie
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text>The Dog List, current page = {page}</Text>
            {/* <Button onPress={() => setPage(page + 1)} title="Next Page" /> */}
            {showFloating &&
                <Pressable onPress={() => list.current.scrollToIndex({ index: 0 })}
                    style={styles.floatingButton}>
                    <Text style={{ color: 'white' }}>⤊</Text>
                </Pressable>
            }
            {selectedDogs.length > 0 &&
                <Pressable onPress={deleteSelected}
                    style={styles.deleteButton}>
                    <Text style={{ color: 'white' }}>X</Text>
                </Pressable>
            }
            <FlatList
                ref={list}
                style={{ width: '100%' }}
                refreshing={isLoading}
                onRefresh={refreshHandle}
                // Les deux on suivant c'est juste pour afficher ou non le button back to top. Pas critique comme truc
                onScrollEndDrag={(event) => event.nativeEvent.contentOffset.y > 50 && setShowFloating(true)}
                onStartReached={() => setShowFloating(false)}
                onEndReached={() => setPage(page + 1)}
                // onEndReachedThreshold={3}
                data={dogList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Pressable 
                        onLongPress={() => select(item)}
                        onPress={() => selectedDogs.length > 0 && select(item)}
                    >
                        
                        <ItemDog dog={item} isSelected={selectedDogs.includes(item)} />
                    </Pressable>
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
        padding: 20,
        borderRadius: 100,
        backgroundColor: 'skyblue',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 10
    },
    deleteButton: {
        padding: 20,
        borderRadius: 100,
        backgroundColor: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 10,
        left: 10,
        zIndex: 10
    }
})
/*
CRUD sur une API Rest standard
GET /api/dog
GET /api/dog/:id
POST /api/dog -- Attend un dog dans son body
DELETE /api/dog/:id
PATCH/PUT /api/dog/:id -- Attend un dog (ou un fragment de dog pour un PATCH) dans son body


*/