import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Directions, Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";


export default function gesture() {
    const [leftPos, setLeftPos] = useState(100);
    const [topPos, setTopPos] = useState(200);
    const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onStart(event => setLeftPos(leftPos+25));

    const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(event => setLeftPos(leftPos-25));

    const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(event => setTopPos(topPos-25));

    const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(event =>  setTopPos(topPos+25));

    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={Gesture.Race(flingLeft,flingRight, flingUp, flingDown)}>
                <View style={styles.container}>
                    <View style={{...styles.square, left: leftPos, top: topPos}}></View>
                </View>
            </GestureDetector>

        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        flex:1
    },
    square: {
        backgroundColor: 'red',
        width: 100,
        height: 100,
        position:'absolute',

    }
})