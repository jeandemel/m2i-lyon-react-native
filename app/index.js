import { Link, router } from "expo-router";
import { Button, Text, View } from "react-native";



export default function index() {


    return (
        <View>
            <Text>Welcome</Text>
            <Link href="/todo">The TodoList
            </Link>

            <Button title="Todo List"
                onPress={() => router.push('/todo')} />
            <Button title="Gesture"
                onPress={() => router.push('/gesture')} />
            <Button title="Dog"
                onPress={() => router.push('/data-dog')} />
        </View>
    );
}