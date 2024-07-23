import { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";



export default function TodoList() {
    const [task, setTask] = useState('Default value');
    const [list, setList] = useState(['Test', 'Toust', 'Toast']);
    const [startPosition, setStartPosition] = useState(0);
    /**
     * Fonction qui va ajouter une nouvelle valeur à la liste en utilisant le setList
     * et en "destructurant" la valeur actuelle de la liste pour les mettre toutes dans
     * un nouveau tableau avec en plus la nouvelle valeur (qui vient de l'autre useState)
     */
    function addTask() {
        setList([
            ...list,
            task
        ]);
        setTask('');
    }
    /**
     * Fonction pour retirer un élément de la liste en se basant sur son index. On
     * utilise une méthode filter qui permet de créer un nouveau tableau filtré en fonction
     * de si la fat-arrow renvoie true ou false pour chaque élément du tableau
     * @param {number} indexToRemove L'index du truc à virer
     */
    function removeTask(indexToRemove) {
        setList(
            list.filter((item, index) => index !== indexToRemove)
        );
    }

    function swipeHandle(endPosition, index) {
        if(endPosition > startPosition + 100){
            removeTask(index);
        }
    }

    return (
        <View>
            <TextInput
                placeholder="Enter a task"
                value={task}
                onChangeText={(text) => setTask(text)} />
            <Button title="Add task" onPress={addTask} />
            <Text>You are typing : {task}</Text>
            {list.map((item, index) =>
                <View key={index} 
                onTouchStart={(event) => setStartPosition(event.nativeEvent.locationX)}
                onTouchEnd={(event) => swipeHandle(event.nativeEvent.locationX, index)}
                style={{flexDirection:"row", alignItems:'center', justifyContent:'space-between', margin:2}}>
                    <Text>{item}</Text>
                    <Button title="X" onPress={() => removeTask(index)} />
                    {/* <Pressable style={{padding:10, backgroundColor: 'red', borderRadius:10}} onPress={() => removeTask(index)}>
                        <Text>X</Text>
                    </Pressable> */}
                </View>)}
        </View>
    );
}