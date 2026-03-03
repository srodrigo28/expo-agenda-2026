import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

export interface SuccessModalProps {
    visible: boolean;
    title: string;
    message: string;
    buttonText?: string;
    onClose: () => void;
}

export default function SuccessModal({ visible, title, message, buttonText = "Concluir", onClose }: SuccessModalProps) {
    if (!visible) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Animated.View
                    entering={FadeInDown.springify().damping(15)}
                    exiting={FadeOutUp}
                    style={styles.modalContainer}
                >
                    <View style={styles.cardBase}>
                        <LinearGradient
                            colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.01)']}
                            style={styles.card}
                        >
                            <View style={styles.iconCircle}>
                                <Ionicons name="checkmark-circle" size={72} color="#10b981" />
                            </View>

                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.message}>{message}</Text>

                            <TouchableOpacity style={styles.button} onPress={onClose}>
                                <LinearGradient
                                    colors={['#8b5cf6', '#6d28d9']}
                                    style={styles.buttonGradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text style={styles.buttonText}>{buttonText}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalContainer: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 28,
        overflow: 'hidden',
    },
    cardBase: {
        backgroundColor: '#0f172a', // Solid base to hide elements behind
        borderRadius: 28,
    },
    card: {
        padding: 32,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 28,
    },
    iconCircle: {
        marginBottom: 20,
        shadowColor: '#10b981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#ffffff',
        marginBottom: 12,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    message: {
        fontSize: 15,
        color: '#94a3b8',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 22,
    },
    button: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
    },
    buttonGradient: {
        paddingVertical: 18,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    }
});
