import { useState } from "react";
import { Text, TextInput, View } from "react-native";



export default function TodoList() {
    const [task, setTask] = useState('Default value');
    const [list, setList] = useState(['Test', 'Toust', 'Toast']);

    return (
        <View>
            <TextInput 
                placeholder="Enter a task" 
                value={task} 
                onChangeText={(text) => setTask(text)} />
            <Text>You are typing : {task}</Text>
            {list.map((item, index) => <Text key={index}>{item}</Text>)}
        </View>
    );
}