import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import TodoList from '../components/TodoList';
import { Link, router } from 'expo-router';

export default function todo() {
  return (
      <View style={styles.container}>
        {/* Soit un link qui va sur un écran donné */}
        <Link href="/">Back</Link>
        {/* Soit un bouton ou autre qui va faire un .back() pour retourner sur l'écran 
        où on était précédemment. Utile si on peut accéder à un écran depuis plusieurs endroits */}
        <Button title='back' onPress={() => router.back()} />
        <Text>Salut ça va ?</Text>
        <TodoList />
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
