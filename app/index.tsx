import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    Dimensions, Alert, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Animated values
    const bgOpacity = useSharedValue(0);
    const formTranslateY = useSharedValue(50);
    const formOpacity = useSharedValue(0);
    const logoScale = useSharedValue(0.5);
    const logoOpacity = useSharedValue(0);

    useEffect(() => {
        bgOpacity.value = withTiming(1, { duration: 1500 });
        logoScale.value = withSpring(1, { damping: 10, stiffness: 80 });
        logoOpacity.value = withTiming(1, { duration: 1000 });

        formTranslateY.value = withDelay(
            600,
            withSpring(0, { damping: 15, stiffness: 90 })
        );
        formOpacity.value = withDelay(
            600,
            withTiming(1, { duration: 800 })
        );
    }, []);

    const animatedBgStyle = useAnimatedStyle(() => ({ opacity: bgOpacity.value }));
    const animatedLogoStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: logoScale.value }],
    }));
    const animatedFormStyle = useAnimatedStyle(() => ({
        opacity: formOpacity.value,
        transform: [{ translateY: formTranslateY.value }],
    }));

    const handleLogin = () => {
        const validEmail = process.env.EXPO_PUBLIC_LOGIN_EMAIL;
        const validPassword = process.env.EXPO_PUBLIC_LOGIN_PASSWORD;

        if (email === validEmail && password === validPassword) {
            router.replace('/(panel)/dashboard');
        } else {
            Alert.alert('Erro no Login', 'E-mail ou senha incorretos.');
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Animated Gradient Background */}
            <Animated.View style={[StyleSheet.absoluteFillObject, animatedBgStyle]}>
                <LinearGradient
                    colors={['#0f172a', '#1e1b4b', '#000000']}
                    style={StyleSheet.absoluteFillObject}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
            </Animated.View>

            {/* Decorative Orbs */}
            <View style={styles.orb1} />
            <View style={styles.orb2} />

            {/* Form Container with Keyboard Management */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Logo Section */}
                    <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
                        <Text style={styles.logoText}>🚀 Sua Agenda</Text>
                        <Text style={styles.subtitle}>Controle seu dia e Compromissos Diários!</Text>
                    </Animated.View>

                    {/* Form Section */}
                    <Animated.View style={[styles.formContainer, animatedFormStyle]}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="E-mail"
                                placeholderTextColor="#9ca3af"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, { paddingRight: 50 }]}
                                placeholder="Senha"
                                placeholderTextColor="#9ca3af"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#9ca3af"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <LinearGradient
                                colors={['#8b5cf6', '#6d28d9']}
                                style={styles.loginButtonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.loginButtonText}>ENTRAR</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.signupContainer}
                            onPress={() => router.push('/cadastro')}
                        >
                            <Text style={styles.signupText}>
                                Ainda não tem conta? <Text style={styles.signupTextBold}>Cadastre-se</Text>
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
        zIndex: 10,
    },
    orb1: {
        position: 'absolute',
        top: -height * 0.1,
        right: -width * 0.2,
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        filter: 'blur(50px)',
    },
    orb2: {
        position: 'absolute',
        bottom: -height * 0.1,
        left: -width * 0.2,
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: 'rgba(236, 72, 153, 0.15)',
        filter: 'blur(50px)',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 60,
    },
    logoText: {
        fontSize: 42,
        fontWeight: '800',
        color: '#ffffff',
        letterSpacing: 1.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#a78bfa',
        marginTop: 8,
        fontWeight: '500',
    },
    formContainer: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    inputContainer: {
        marginBottom: 16,
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 18,
        fontSize: 16,
        color: '#ffffff',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        padding: 8,
    },
    loginButton: {
        marginTop: 12,
        borderRadius: 16,
        overflow: 'hidden',
    },
    loginButtonGradient: {
        paddingVertical: 18,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    signupContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    signupText: {
        color: '#9ca3af',
        fontSize: 15,
    },
    signupTextBold: {
        color: '#a78bfa',
        fontWeight: 'bold',
    },
});
