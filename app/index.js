import { Link, router } from "expo-router";
import { Button, Text, View } from "react-native";
import Counter from "../components/Counter";



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
            <Button title="Animation"
                onPress={() => router.push('/animation')} />
                <Button title="Game"
                    onPress={() => router.push('/game')} />

            <View style={{ width: '50%', marginTop: 50 }}>
                {/* Ici, on définit donc les fonctions qui seront déclenchés pour ce
                Counter spécifique, selon l'event */}
                <Counter
                    onBigNumberReached={() => console.log('wow this is doing numbers')}
                    onValueChange={(value) => console.log('counter value changed', value)} />
            </View>
        </View>
    );
}