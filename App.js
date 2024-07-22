import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Salut ça va ?</Text>
        <TodoList />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
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
