import { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";



export default function TodoList() {
    const [task, setTask] = useState('Default value');
    const [list, setList] = useState(['Test', 'Toust', 'Toast']);

    function addTask() {
        setList([
            ...list,
            task
        ]);
    }

    function removeTask(indexToRemove) {
        setList(
            list.filter((item, index) => index !== indexToRemove)
        );
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
                <View key={index} style={{flexDirection:"row", alignItems:'center', justifyContent:'space-between', margin:2}}>
                    <Text>{item}</Text>
                    <Button title="X" onPress={() => removeTask(index)} />
                    {/* <Pressable style={{padding:10, backgroundColor: 'red', borderRadius:10}} onPress={() => removeTask(index)}>
                        <Text>X</Text>
                    </Pressable> */}
                </View>)}
        </View>
    );
}