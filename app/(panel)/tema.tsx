import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function TemaScreen() {
    const navigation = useNavigation();

    // UI State Mocks
    const [darkModeEnabled, setDarkModeEnabled] = useState(true);
    const [selectedAccent, setSelectedAccent] = useState('violet');

    const openMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    const accents = [
        { id: 'violet', color: '#8b5cf6', name: 'Violeta Neon' },
        { id: 'emerald', color: '#10b981', name: 'Esmeralda' },
        { id: 'rose', color: '#f43f5e', name: 'Rosa Vibrante' },
        { id: 'amber', color: '#f59e0b', name: 'Âmbar Escuro' }
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={openMenu} style={styles.menuIcon}>
                    <Ionicons name="menu" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tema e Aparência</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Visual Preview Model */}
                <View style={styles.previewBox}>
                    <Text style={styles.sectionTitle}>Pré-visualização</Text>
                    <View style={styles.mockAppView}>
                        <View style={styles.mockHeader} />
                        <View style={styles.mockBody}>
                            <View style={[styles.mockCard, { borderColor: accents.find(a => a.id === selectedAccent)?.color }]} />
                            <View style={styles.mockCard} />
                        </View>
                        <LinearGradient
                            colors={[accents.find(a => a.id === selectedAccent)?.color || '#8b5cf6', '#000']}
                            style={styles.mockFab}
                        />
                    </View>
                </View>

                {/* Dark Mode Switch */}
                <View style={styles.settingBlock}>
                    <View style={styles.settingTextGroup}>
                        <Text style={styles.settingTitle}>Modo Premium Dark</Text>
                        <Text style={styles.settingDesc}>
                            O aplicativo foi construído e fixado nativamente no modo Escuro Profundo para redução de fadiga visual, economia de bateria e contraste excepcional.
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.toggleSwitch, darkModeEnabled && styles.toggleSwitchActive]}
                        activeOpacity={1}
                    >
                        <View style={[styles.switchThumb, darkModeEnabled && styles.switchThumbActive]}>
                            <Ionicons name="moon" size={12} color={darkModeEnabled ? '#8b5cf6' : '#64748b'} />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                {/* Accent Color Selection */}
                <View style={styles.settingBlockColumn}>
                    <Text style={styles.settingTitle}>Cores de Destaque (Em Breve)</Text>
                    <Text style={styles.settingDesc}>
                        Personalize as cores dos botões, marcadores e ícones principais da sua interface.
                    </Text>

                    <View style={styles.accentsRow}>
                        {accents.map((accent) => (
                            <TouchableOpacity
                                key={accent.id}
                                style={[
                                    styles.accentCircleContainer,
                                    selectedAccent === accent.id && styles.accentCircleActive
                                ]}
                                onPress={() => setSelectedAccent(accent.id)}
                            >
                                <View style={[styles.accentCircle, { backgroundColor: accent.color }]} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </ScrollView>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#0f172a',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
        alignSelf: 'center',
        width: '100%',
        maxWidth: 500,
    },
    menuIcon: { padding: 4 },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    content: {
        padding: 24,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 500,
    },
    previewBox: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#a78bfa',
        letterSpacing: 1,
        marginBottom: 16,
        textTransform: 'uppercase',
    },
    mockAppView: {
        height: 180,
        backgroundColor: '#020617',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        overflow: 'hidden',
        padding: 12,
        position: 'relative'
    },
    mockHeader: {
        height: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 10,
        width: '40%',
        marginBottom: 16,
    },
    mockBody: { gap: 10 },
    mockCard: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    mockFab: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    settingBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    settingBlockColumn: {
        marginBottom: 24,
    },
    settingTextGroup: {
        flex: 1,
        paddingRight: 20,
    },
    settingTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    settingDesc: {
        color: '#64748b',
        fontSize: 13,
        lineHeight: 20,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginVertical: 24,
    },
    toggleSwitch: {
        width: 50,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    toggleSwitchActive: {
        backgroundColor: 'rgba(139, 92, 246, 0.4)',
    },
    switchThumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#1e293b',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    switchThumbActive: {
        transform: [{ translateX: 22 }],
        backgroundColor: '#fff',
    },
    accentsRow: {
        flexDirection: 'row',
        marginTop: 16,
        gap: 16,
    },
    accentCircleContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    accentCircleActive: {
        borderColor: '#fff',
    },
    accentCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
});
