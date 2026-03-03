import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withDelay
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function DashboardScreen() {
    const router = useRouter();

    const titleTranslateY = useSharedValue(-50);
    const titleOpacity = useSharedValue(0);
    const cardsScale = useSharedValue(0.8);
    const cardsOpacity = useSharedValue(0);

    useEffect(() => {
        titleTranslateY.value = withSpring(0, { damping: 10, stiffness: 100 });
        titleOpacity.value = withTiming(1, { duration: 800 });

        cardsScale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 90 }));
        cardsOpacity.value = withDelay(300, withTiming(1, { duration: 800 }));
    }, []);

    const animatedTitleStyle = useAnimatedStyle(() => ({
        opacity: titleOpacity.value,
        transform: [{ translateY: titleTranslateY.value }],
    }));

    const animatedCardsStyle = useAnimatedStyle(() => ({
        opacity: cardsOpacity.value,
        transform: [{ scale: cardsScale.value }],
    }));

    const handleLogout = () => {
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <Animated.View style={animatedTitleStyle}>
                    <Text style={styles.headerGreeting}>Olá, Rodrigo!</Text>
                    <Text style={styles.headerDate}>Bem-vindo ao seu painel principal.</Text>
                </Animated.View>

                <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>

            <Animated.View style={[styles.content, animatedCardsStyle]}>

                <View style={styles.cardRow}>
                    <LinearGradient
                        colors={['rgba(139, 92, 246, 0.2)', 'rgba(76, 29, 149, 0.1)']}
                        style={styles.card}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.cardNumber}>12</Text>
                        <Text style={styles.cardLabel}>Novos Usuários</Text>
                    </LinearGradient>

                    <LinearGradient
                        colors={['rgba(236, 72, 153, 0.2)', 'rgba(157, 23, 77, 0.1)']}
                        style={styles.card}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.cardNumber}>R$ 4k</Text>
                        <Text style={styles.cardLabel}>Faturamento</Text>
                    </LinearGradient>
                </View>

                <View style={styles.alertCard}>
                    <Text style={styles.alertTitle}>Novidades 🎉</Text>
                    <Text style={styles.alertText}>
                        Testando animações e funcionalidades de layout baseadas em reac-native-reanimated.
                        Essa é uma área fixa inicial!
                    </Text>
                </View>

            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    headerGreeting: {
        fontSize: 28,
        fontWeight: '800',
        color: '#ffffff',
        letterSpacing: 0.5,
    },
    headerDate: {
        fontSize: 14,
        color: '#a78bfa',
        marginTop: 4,
    },
    logoutBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    logoutText: {
        color: '#f87171',
        fontWeight: '600',
        fontSize: 14,
    },
    content: {
        flex: 1,
        padding: 24,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    card: {
        width: '48%',
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
    },
    cardNumber: {
        fontSize: 32,
        fontWeight: '900',
        color: '#ffffff',
    },
    cardLabel: {
        fontSize: 13,
        color: '#9ca3af',
        marginTop: 8,
        textAlign: 'center',
        fontWeight: '500',
    },
    alertCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e2e8f0',
        marginBottom: 8,
    },
    alertText: {
        fontSize: 15,
        color: '#94a3b8',
        lineHeight: 24,
    }
});
