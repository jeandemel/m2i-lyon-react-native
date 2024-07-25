import { useEffect } from "react";
import { View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";


export default function game() {
    const top = useSharedValue(0);
    const rotation = useSharedValue(0);
    const left = useSharedValue(0);
    
    const anitmationStyle =  useAnimatedStyle(() => ({
        top: top.value+'%',
        left: left.value+'%',
        transform:[
            {rotate: rotation.value+'deg'}
        ]
    }))

    useEffect(() => {
        top.value = withRepeat(withTiming(100, {duration:3000,easing: Easing.linear}, () => {
            left.value = Math.floor(Math.random() * 85);
        }), -1);
        rotation.value = withRepeat(withTiming(360, {duration:1000,easing: Easing.linear}), -1);
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