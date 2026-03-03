import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    ScrollView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Função para formatar (mascarar) o telefone automaticamente (XX) XXXXX-XXXX
const formatPhone = (value: string) => {
    let v = value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (v.length > 11) v = v.slice(0, 11);

    if (v.length <= 2) return v;
    if (v.length <= 6) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length <= 10) return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
    return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
};

export default function CadastroScreen() {
    const router = useRouter();

    const [form, setForm] = useState({
        nome: '',
        email: '',
        telefone: '',
        senha: '',
        sexo: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = () => {
        if (!form.nome || !form.email || !form.telefone || !form.senha || !form.sexo) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        Alert.alert('Sucesso', 'Conta criada com sucesso!', [
            { text: 'OK', onPress: () => router.back() }
        ]);
    };

    const updateForm = (key: string, value: string) => {
        if (key === 'telefone') {
            value = formatPhone(value);
        }
        setForm(prev => ({ ...prev, [key]: value }));
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Voltar',
                    headerStyle: { backgroundColor: '#0f172a' },
                    headerTintColor: '#fff',
                    headerShadowVisible: false,
                }}
            />

            {/* Controle absoluto do Teclado */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Novo Usuário</Text>
                        <Text style={styles.headerSubtitle}>Junte-se à nossa plataforma incrível.</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>NOME COMPLETO</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex: João da Silva"
                                placeholderTextColor="#6b7280"
                                value={form.nome}
                                onChangeText={(text) => updateForm('nome', text)}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>E-MAIL</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex: joao@email.com"
                                placeholderTextColor="#6b7280"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={form.email}
                                onChangeText={(text) => updateForm('email', text)}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>TELEFONE</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="(00) 00000-0000"
                                placeholderTextColor="#6b7280"
                                keyboardType="phone-pad"
                                maxLength={15}
                                value={form.telefone}
                                onChangeText={(text) => updateForm('telefone', text)}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>SENHA</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[styles.input, { flex: 1, paddingRight: 50 }]}
                                    placeholder="Mínimo 6 caracteres"
                                    placeholderTextColor="#6b7280"
                                    secureTextEntry={!showPassword}
                                    value={form.senha}
                                    onChangeText={(text) => updateForm('senha', text)}
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
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>SEXO</Text>
                            <View style={styles.radioContainer}>
                                <TouchableOpacity
                                    style={[styles.radioItem, form.sexo === 'M' && styles.radioItemSelected]}
                                    onPress={() => updateForm('sexo', 'M')}
                                >
                                    <Text style={[styles.radioText, form.sexo === 'M' && styles.radioTextSelected]}>Masculino</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.radioItem, form.sexo === 'F' && styles.radioItemSelected]}
                                    onPress={() => updateForm('sexo', 'F')}
                                >
                                    <Text style={[styles.radioText, form.sexo === 'F' && styles.radioTextSelected]}>Feminino</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                            <LinearGradient
                                colors={['#8b5cf6', '#6d28d9']}
                                style={styles.registerButtonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.registerButtonText}>CADASTRAR</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 40,
        flexGrow: 1,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 500,
    },
    header: {
        marginBottom: 32,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#9ca3af',
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: '#a78bfa',
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 16,
        color: '#ffffff',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        padding: 8,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioItem: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    radioItemSelected: {
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
    },
    radioText: {
        color: '#9ca3af',
        fontSize: 15,
        fontWeight: '500',
    },
    radioTextSelected: {
        color: '#8b5cf6',
        fontWeight: 'bold',
    },
    registerButton: {
        marginTop: 16,
        borderRadius: 16,
        overflow: 'hidden',
    },
    registerButtonGradient: {
        paddingVertical: 18,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
