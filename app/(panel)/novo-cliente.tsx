import React, { useState } from 'react';
import {
    View, Text, StyleSheet, TextInput,
    TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function NovoClienteScreen() {
    const router = useRouter();

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [tipoCliente, setTipoCliente] = useState<'contrato' | 'avulso' | ''>('');
    const [loadingCep, setLoadingCep] = useState(false);

    // Máscaras de Input
    const handleTelefoneChange = (text: string) => {
        let value = text.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
        setTelefone(value);
    };

    const handleCepChange = (text: string) => {
        let value = text.replace(/\D/g, "");
        if (value.length > 8) value = value.slice(0, 8);
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        setCep(value);
    };

    // API Call (ViaCEP)
    const buscarCep = async () => {
        const cleanCep = cep.replace(/\D/g, '');
        if (cleanCep.length === 8) {
            setLoadingCep(true);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    Alert.alert('Erro', 'CEP não encontrado.');
                    setEndereco('');
                    setCidade('');
                    setEstado('');
                } else {
                    const enderecoCompleto = data.bairro ? `${data.logradouro}, ${data.bairro}` : data.logradouro;
                    setEndereco(enderecoCompleto);
                    setCidade(data.localidade);
                    setEstado(data.uf);
                }
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível buscar o CEP no momento.');
            } finally {
                setLoadingCep(false);
            }
        }
    };

    const handleSalvar = () => {
        if (!nome || !telefone || !cep || !tipoCliente) {
            Alert.alert('Campos Obrigatórios', 'Preencha todos os campos obrigatórios.');
            return;
        }

        // Simula salvamento no "Banco de Dados"
        Alert.alert(
            'Sucesso!',
            'Cliente cadastrado com sucesso.',
            [
                { text: 'OK', onPress: () => router.back() }
            ]
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Novo Cliente</Text>
                    <View style={{ width: 24 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nome Completo *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o nome"
                            placeholderTextColor="#64748b"
                            value={nome}
                            onChangeText={setNome}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Telefone *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="(00) 00000-0000"
                            placeholderTextColor="#64748b"
                            keyboardType="phone-pad"
                            value={telefone}
                            onChangeText={handleTelefoneChange}
                            maxLength={15}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
                            <Text style={styles.label}>CEP *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="00000-000"
                                placeholderTextColor="#64748b"
                                keyboardType="number-pad"
                                value={cep}
                                onChangeText={handleCepChange}
                                onBlur={buscarCep}
                                maxLength={9}
                            />
                        </View>
                        <View style={[styles.formGroup, { flex: 0.5 }]}>
                            <Text style={styles.label}>Número</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="123"
                                placeholderTextColor="#64748b"
                                keyboardType="number-pad"
                                value={numero}
                                onChangeText={setNumero}
                            />
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Endereço Completo</Text>
                        <View>
                            <TextInput
                                style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                                placeholder="Aguardando CEP..."
                                placeholderTextColor="#64748b"
                                value={endereco}
                                onChangeText={setEndereco}
                                multiline
                            />
                            {loadingCep && (
                                <ActivityIndicator
                                    size="small"
                                    color="#a78bfa"
                                    style={{ position: 'absolute', right: 16, top: 30 }}
                                />
                            )}
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
                            <Text style={styles.label}>Cidade</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Cidade"
                                placeholderTextColor="#64748b"
                                value={cidade}
                                onChangeText={setCidade}
                            />
                        </View>
                        <View style={[styles.formGroup, { flex: 0.4 }]}>
                            <Text style={styles.label}>UF</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="SP"
                                placeholderTextColor="#64748b"
                                value={estado}
                                onChangeText={setEstado}
                                maxLength={2}
                                autoCapitalize="characters"
                            />
                        </View>
                    </View>

                    <Text style={styles.label}>Tipo de Cliente *</Text>
                    <View style={styles.typeSelectorRow}>
                        <TouchableOpacity
                            style={[
                                styles.typeButton,
                                tipoCliente === 'avulso' && styles.typeButtonActive
                            ]}
                            onPress={() => setTipoCliente('avulso')}
                        >
                            <Ionicons
                                name="person-outline"
                                size={20}
                                color={tipoCliente === 'avulso' ? '#fff' : '#94a3b8'}
                                style={{ marginRight: 8 }}
                            />
                            <Text style={[
                                styles.typeButtonText,
                                tipoCliente === 'avulso' && styles.typeButtonTextActive
                            ]}>
                                Avulso
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.typeButton,
                                tipoCliente === 'contrato' && styles.typeButtonActive
                            ]}
                            onPress={() => setTipoCliente('contrato')}
                        >
                            <Ionicons
                                name="briefcase-outline"
                                size={20}
                                color={tipoCliente === 'contrato' ? '#fff' : '#94a3b8'}
                                style={{ marginRight: 8 }}
                            />
                            <Text style={[
                                styles.typeButtonText,
                                tipoCliente === 'contrato' && styles.typeButtonTextActive
                            ]}>
                                Contrato
                            </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
                        <LinearGradient
                            colors={['#8b5cf6', '#6d28d9']}
                            style={styles.saveButtonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.saveButtonText}>SALVAR CLIENTE</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
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
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        padding: 24,
        paddingBottom: 40,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        color: '#e2e8f0',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: '#fff',
        fontSize: 15,
    },
    typeSelectorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    typeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        paddingVertical: 16,
        marginHorizontal: 4,
    },
    typeButtonActive: {
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        borderColor: '#a78bfa',
    },
    typeButtonText: {
        color: '#94a3b8',
        fontWeight: '600',
        fontSize: 15,
    },
    typeButtonTextActive: {
        color: '#fff',
    },
    footer: {
        padding: 24,
        backgroundColor: '#0f172a',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    saveButton: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    saveButtonGradient: {
        paddingVertical: 18,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    }
});
