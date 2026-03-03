import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { agendamentosMock } from '../../data/clientes';

const DAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

export default function DashboardScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const [selectedDay, setSelectedDay] = useState('Seg');

    // Filter appointments locally based on the selected day
    const compromissosDoDia = agendamentosMock.filter(
        (agendamento) => agendamento.diaSemana === selectedDay
    );

    const handleLogout = () => {
        router.replace('/');
    };

    const openMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={openMenu} style={styles.menuIcon}>
                        <Ionicons name="menu" size={28} color="#fff" />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerGreeting}>Olá, Admin!</Text>
                        <Text style={styles.headerDate}>Bem-vindo ao seu painel.</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>

            {/* Days Slider */}
            <View style={styles.daysContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysScroll}>
                    {DAYS.map((day) => {
                        const isSelected = day === selectedDay;
                        return (
                            <TouchableOpacity
                                key={day}
                                onPress={() => setSelectedDay(day)}
                                style={[styles.dayButton, isSelected && styles.dayButtonSelected]}
                            >
                                <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>{day}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Content / Summaries */}
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.cardRow}>
                    <LinearGradient
                        colors={['rgba(139, 92, 246, 0.2)', 'rgba(76, 29, 149, 0.1)']}
                        style={styles.card}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.cardNumber}>4</Text>
                        <Text style={styles.cardLabel}>Agendados Hoje</Text>
                    </LinearGradient>

                    <LinearGradient
                        colors={['rgba(236, 72, 153, 0.2)', 'rgba(157, 23, 77, 0.1)']}
                        style={styles.card}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.cardNumber}>R$ 1k</Text>
                        <Text style={styles.cardLabel}>Receita Esperada</Text>
                    </LinearGradient>
                </View>

                {/* Example Appointments */}
                <Text style={styles.sectionTitle}>Compromissos - {selectedDay}</Text>

                {compromissosDoDia.length > 0 ? (
                    compromissosDoDia.map((agendamento) => (
                        <View key={agendamento.id} style={styles.appointmentCard}>
                            <View style={styles.timeBadge}>
                                <Text style={styles.timeText}>{agendamento.horario}</Text>
                            </View>
                            <View style={styles.appointmentInfo}>
                                <Text style={styles.clientName}>{agendamento.nomeCliente}</Text>
                                <Text style={styles.serviceName}>{agendamento.servico}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={{ color: '#9ca3af', marginTop: 16, textAlign: 'center' }}>
                        Não há compromissos para este dia.
                    </Text>
                )}
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/(panel)/novo-cliente')}
            >
                <LinearGradient
                    colors={['#8b5cf6', '#ec4899']}
                    style={styles.fabGradient}
                >
                    <Ionicons name="add" size={32} color="#fff" />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 20,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 500,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        marginRight: 16,
    },
    headerGreeting: { fontSize: 24, fontWeight: '800', color: '#ffffff' },
    headerDate: { fontSize: 14, color: '#a78bfa', marginTop: 4 },
    logoutBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    logoutText: { color: '#f87171', fontWeight: '600', fontSize: 12 },

    daysContainer: { paddingVertical: 10, alignSelf: 'center', width: '100%', maxWidth: 500 },
    daysScroll: { paddingHorizontal: 20 },
    dayButton: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    dayButtonSelected: {
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: '#a78bfa',
    },
    dayText: { color: '#9ca3af', fontWeight: '600', fontSize: 16 },
    dayTextSelected: { color: '#ffffff', fontWeight: 'bold' },

    content: { padding: 24, paddingBottom: 100, alignSelf: 'center', width: '100%', maxWidth: 500 },
    cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    card: {
        width: '48%',
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
    },
    cardNumber: { fontSize: 28, fontWeight: '900', color: '#ffffff' },
    cardLabel: { fontSize: 12, color: '#9ca3af', marginTop: 8, textAlign: 'center', fontWeight: '500' },

    sectionTitle: { fontSize: 18, color: '#ffffff', fontWeight: 'bold', marginBottom: 16, marginTop: 8 },
    appointmentCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
    },
    timeBadge: {
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginRight: 16,
    },
    timeText: { color: '#a78bfa', fontWeight: 'bold', fontSize: 14 },
    appointmentInfo: { flex: 1 },
    clientName: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    serviceName: { color: '#94a3b8', fontSize: 13 },

    fab: {
        position: 'absolute',
        right: 24,
        bottom: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        elevation: 8,
        shadowColor: '#ec4899',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    fabGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
