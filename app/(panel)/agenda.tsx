import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeOutUp, Layout } from 'react-native-reanimated';
import { agendamentosMock, Agendamento } from '../../data/clientes';

const { width } = Dimensions.get('window');
const DAYS = [
    { key: 'Seg', date: '12' },
    { key: 'Ter', date: '13' },
    { key: 'Qua', date: '14' },
    { key: 'Qui', date: '15' },
    { key: 'Sex', date: '16' },
    { key: 'Sáb', date: '17' },
    { key: 'Dom', date: '18' },
];

export default function AgendaScreen() {
    const navigation = useNavigation();
    const [selectedDay, setSelectedDay] = useState('Seg');
    const [filteredData, setFilteredData] = useState<Agendamento[]>([]);

    // Simulate fetching data with a tiny delay to trigger enter/exit animations perfectly
    useEffect(() => {
        setFilteredData([]);
        const timeout = setTimeout(() => {
            const data = agendamentosMock.filter((a) => a.diaSemana === selectedDay);
            // Sort by time just for safety
            data.sort((a, b) => a.horario.localeCompare(b.horario));
            setFilteredData(data);
        }, 150);

        return () => clearTimeout(timeout);
    }, [selectedDay]);

    const openMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={openMenu} style={styles.menuIcon}>
                    <Ionicons name="menu" size={28} color="#fff" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>Sua Agenda</Text>
                    <Text style={styles.headerSubtitle}>Outubro 2026</Text>
                </View>
                <View style={{ width: 28 }} /> {/* Spacer */}
            </View>

            {/* Calendar Strip */}
            <View style={styles.calendarContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.calendarScroll}
                >
                    {DAYS.map((day) => {
                        const isSelected = day.key === selectedDay;
                        return (
                            <TouchableOpacity
                                key={day.key}
                                onPress={() => setSelectedDay(day.key)}
                                style={styles.dayWrapper}
                            >
                                <View style={[styles.dayCard, isSelected && styles.dayCardSelected]}>
                                    <Text style={[styles.dayName, isSelected && styles.dayNameSelected]}>
                                        {day.key}
                                    </Text>
                                    <Text style={[styles.dayDate, isSelected && styles.dayDateSelected]}>
                                        {day.date}
                                    </Text>
                                    {isSelected && (
                                        <View style={styles.activeDot} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            {/* Timeline & Appointments */}
            <ScrollView
                contentContainerStyle={styles.timelineContent}
                showsVerticalScrollIndicator={false}
            >
                {filteredData.length > 0 ? (
                    filteredData.map((agendamento, index) => (
                        <Animated.View
                            key={agendamento.id}
                            entering={FadeInDown.delay(index * 100).springify().damping(12)}
                            exiting={FadeOutUp.duration(150)}
                            layout={Layout.springify()}
                            style={styles.timelineRow}
                        >
                            {/* Left Timeline Marker */}
                            <View style={styles.timelineMarkerContainer}>
                                <Text style={styles.timelineTime}>{agendamento.horario}</Text>
                                <View style={styles.timelineLine} />
                                <View style={styles.timelineDot} />
                            </View>

                            {/* Right Appointment Card */}
                            <LinearGradient
                                colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.01)']}
                                style={styles.agendaCard}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <View style={styles.cardHeader}>
                                    <Text style={styles.clientName}>{agendamento.nomeCliente}</Text>
                                    <View style={styles.iconCircle}>
                                        <Ionicons name="person" size={14} color="#a78bfa" />
                                    </View>
                                </View>
                                <Text style={styles.serviceName}>{agendamento.servico}</Text>

                                <View style={styles.cardFooter}>
                                    <Ionicons name="time-outline" size={14} color="#64748b" />
                                    <Text style={styles.durationText}>
                                        {agendamento.horario} - 1 hora
                                    </Text>
                                </View>
                            </LinearGradient>
                        </Animated.View>
                    ))
                ) : (
                    <Animated.View
                        entering={FadeInDown.springify()}
                        style={styles.emptyState}
                    >
                        <Ionicons name="calendar-clear-outline" size={64} color="rgba(255,255,255,0.1)" />
                        <Text style={styles.emptyStateTitle}>Dia Livre!</Text>
                        <Text style={styles.emptyStateText}>
                            Você não possui compromissos agendados para este dia. Aproveite para descansar ou prospectar novos clientes.
                        </Text>
                    </Animated.View>
                )}
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
        alignSelf: 'center',
        width: '100%',
        maxWidth: 500,
    },
    menuIcon: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#a78bfa',
        textAlign: 'center',
        marginTop: 2,
    },
    calendarContainer: {
        marginBottom: 10,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 500,
    },
    calendarScroll: {
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    dayWrapper: {
        marginHorizontal: 6,
    },
    dayCard: {
        width: 65,
        height: 85,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
    },
    dayCardSelected: {
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: '#a78bfa',
    },
    dayName: {
        fontSize: 13,
        color: '#64748b',
        fontWeight: '600',
        marginBottom: 4,
    },
    dayNameSelected: {
        color: '#c4b5fd',
    },
    dayDate: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
    dayDateSelected: {
        color: '#fff',
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#ec4899',
        position: 'absolute',
        bottom: 8,
    },
    timelineContent: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 40,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 500,
    },
    timelineRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    timelineMarkerContainer: {
        width: 60,
        alignItems: 'center',
        marginRight: 16,
    },
    timelineTime: {
        color: '#94a3b8',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#0f172a',
        borderWidth: 3,
        borderColor: '#a78bfa',
        position: 'absolute',
        top: 26,
        zIndex: 2,
    },
    timelineLine: {
        width: 2,
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        position: 'absolute',
        top: 32,
        bottom: -30,
        zIndex: 1,
    },
    agendaCard: {
        flex: 1,
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    clientName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
    },
    iconCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    serviceName: {
        fontSize: 14,
        color: '#c4b5fd',
        marginBottom: 16,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationText: {
        fontSize: 12,
        color: '#64748b',
        marginLeft: 6,
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
        paddingHorizontal: 32,
    },
    emptyStateTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 15,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 22,
    }
});
