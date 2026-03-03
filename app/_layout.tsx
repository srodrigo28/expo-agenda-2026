import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
  runOnJS
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

// Keep the native splash screen visible while we prepare our custom animation
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

function AnimatedSplashScreen({ onFinish }: { onFinish: () => void }) {
  const containerOpacity = useSharedValue(1);
  const orbScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);

  useEffect(() => {
    // 1. Hide native splash screen seamlessly because background color matches
    SplashScreen.hideAsync().then(() => {
      // 2. Start our custom animation
      orbScale.value = withSpring(1.5, { damping: 12, stiffness: 90 });
      textOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
      textTranslateY.value = withDelay(400, withSpring(0, { damping: 10, stiffness: 80 }));

      // 3. Fade out the splash component after a delay
      setTimeout(() => {
        containerOpacity.value = withTiming(0, { duration: 600, easing: Easing.inOut(Easing.ease) }, (finished) => {
          if (finished) {
            runOnJS(onFinish)();
          }
        });
      }, 2500); // Exibe o splash por 2.5s
    });
  }, []);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    pointerEvents: containerOpacity.value === 0 ? 'none' : 'auto',
  }));

  const animatedOrbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: orbScale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  return (
    <Animated.View style={[styles.splashContainer, animatedContainerStyle]}>
      <LinearGradient
        colors={['#0f172a', '#1e1b4b', '#000000']}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Animated Center Orb / Logo abstraction */}
      <Animated.View style={[styles.orb, animatedOrbStyle]}>
        <LinearGradient
          colors={['#8b5cf6', '#ec4899']}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <Animated.View style={[styles.textContainer, animatedTextStyle]}>
        <Animated.Text style={styles.splashTitle}>
          Treina - Dev
        </Animated.Text>
        <Animated.Text style={styles.splashSubtitle}>
          Desenvolvimento e treinamentos
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
}

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  // We enforce a dark theme so that React Navigation uses a black background 
  // for any safe area padding (e.g. system navigation bar) when the phone is in light mode.
  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#000000',
    },
  };

  return (
    <ThemeProvider value={customDarkTheme}>
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="cadastro" options={{ headerShown: true, title: 'Criar Conta' }} />
          <Stack.Screen name="(panel)" />
        </Stack>

        {/* Custom Animated Splash renders over the Stack until app is ready */}
        {!appReady && (
          <AnimatedSplashScreen onFinish={() => setAppReady(true)} />
        )}
      </View>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  orb: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 20,
  },
  textContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  splashTitle: {
    fontSize: 42,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  splashSubtitle: {
    fontSize: 16,
    color: '#a78bfa',
    fontWeight: '500',
    marginTop: 8,
    letterSpacing: 1,
  }
});
