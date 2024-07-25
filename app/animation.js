import { Button, StyleSheet } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";




export default function animation() {
    const positionY = useSharedValue(50);

    return (
        <SafeAreaView style={styles.container}>
            <Button title="Animate !" 
            onPress={() => positionY.value = withSpring(positionY.value+100)} />
            <Animated.View style={{...styles.square, top: positionY}}></Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    square: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    }
})