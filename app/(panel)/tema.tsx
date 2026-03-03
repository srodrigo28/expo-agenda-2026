import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TemaScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tema e Aparenência</Text>
            <Text style={styles.text}>Configurações de modo claro/escuro.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a', padding: 24, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
    text: { color: '#94a3b8', textAlign: 'center' }
});
