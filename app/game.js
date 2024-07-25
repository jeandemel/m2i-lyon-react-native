import { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";


export default function game() {
    const top = useSharedValue(0);

    const anitmationStyle =  useAnimatedStyle(() => ({
        top: top.value+'%'
    }))

    useEffect(() => {
        top.value = withRepeat(withTiming(100, {duration:3000,easing: Easing.linear}), -1);
    }, []);


    return (
        <View style={{height:'100%'}}>
            <Animated.Image
                style={[anitmationStyle]}
                source={require('../assets/asteroid.png')}
            />
        </View>
    )
}