import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PerfilScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meu Perfil</Text>
            <Text style={styles.text}>Aqui você atualizará seus dados pessoais e de trabalho.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a', padding: 24, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
    text: { color: '#94a3b8', textAlign: 'center' }
});
