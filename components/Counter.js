import { useState } from "react"
import { Button, Text, View } from "react-native";


export default function Counter({onValueChange, onBigNumberReached}) {
    const [count,setCount] = useState(0);

    function changeValue(toAdd) {
        setCount(count+toAdd);
        onValueChange(count+toAdd);
        if(count+toAdd > 20) {
            onBigNumberReached();
        }
    }

    return (
        <View>
            <Button title="-" onPress={() => changeValue(-1)}></Button>
            <Text>{count}</Text>
            <Button title="+" onPress={() => changeValue(1)}></Button>

        </View>
    )
}