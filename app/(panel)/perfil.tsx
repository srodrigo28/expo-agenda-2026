import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown, Layout } from 'react-native-reanimated';
import SuccessModal from '../../components/SuccessModal';

export default function PerfilScreen() {
    const navigation = useNavigation();

    // Mock Data
    const [foto, setFoto] = useState('https://i.pravatar.cc/300?img=11');
    const [nome, setNome] = useState('Rodrigo Admin');
    const [email] = useState('admin@treinadev.com'); // Read-only
    const [telefone, setTelefone] = useState('(11) 99999-9999');

    // Password Update States
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [showSenha1, setShowSenha1] = useState(false);
    const [showSenha2, setShowSenha2] = useState(false);

    // Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', message: '' });

    const openMenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };

    const handlePickImage = () => {
        // Mocking an image upload by selecting a random avatar from Pravatar
        const randomId = Math.floor(Math.random() * 70);
        setFoto(`https://i.pravatar.cc/300?img=${randomId}`);
    };

    const handleSaveProfile = () => {
        setModalConfig({
            title: 'Perfil Atualizado!',
            message: 'Seus dados de perfil foram sincronizados com sucesso.',
        });
        setModalVisible(true);
    };

    const handleUpdatePassword = () => {
        if (!senhaAtual || !novaSenha) return;

        setModalConfig({
            title: 'Senha Alterada!',
            message: 'A sua nova senha de acesso foi registrada com segurança. Use-a no próximo login no sistema.'
        });
        setModalVisible(true);
        setSenhaAtual('');
        setNovaSenha('');
        setShowPasswordForm(false);
    };

    return (
        <View style={styles.container}>
            {/* Standard App Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={openMenu} style={styles.menuIcon}>
                    <Ionicons name="menu" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meu Perfil</Text>
                <View style={{ width: 28 }} />
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Profile Picture Upload Section */}
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarContainer}>
                            <Image source={{ uri: foto }} style={styles.avatarImage} />
                            <TouchableOpacity style={styles.editAvatarButton} onPress={handlePickImage}>
                                <LinearGradient
                                    colors={['#8b5cf6', '#ec4899']}
                                    style={styles.editAvatarGradient}
                                >
                                    <Ionicons name="camera" size={16} color="#fff" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.avatarLabel}>Toque para alterar a foto</Text>
                    </View>

                    {/* Profile Info Form */}
                    <View style={styles.sectionBlock}>
                        <Text style={styles.sectionTitle}>DADOS PESSOAIS</Text>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>NOME COMPLETO</Text>
                            <TextInput
                                style={styles.input}
                                value={nome}
                                onChangeText={setNome}
                                placeholderTextColor="#64748b"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>E-MAIL (SOMENTE LEITURA)</Text>
                            <TextInput
                                style={[styles.input, styles.inputDisabled, { color: '#94a3b8' }]}
                                value={email}
                                editable={false} // Disable editing
                            />
                            <Ionicons name="lock-closed" size={16} color="#64748b" style={styles.inputLockIcon} />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>TELEFONE</Text>
                            <TextInput
                                style={styles.input}
                                value={telefone}
                                onChangeText={setTelefone}
                                keyboardType="phone-pad"
                            />
                        </View>

                        <TouchableOpacity style={styles.mainButton} onPress={handleSaveProfile}>
                            <LinearGradient
                                colors={['#8b5cf6', '#6d28d9']}
                                style={styles.buttonGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    {/* Password Management Section */}
                    <View style={styles.sectionBlock}>
                        <View style={styles.passwordHeader}>
                            <Text style={styles.sectionTitle}>SEGURANÇA</Text>
                            {!showPasswordForm && (
                                <TouchableOpacity onPress={() => setShowPasswordForm(true)}>
                                    <Text style={styles.changePasswordLink}>Alterar Senha</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {showPasswordForm && (
                            <Animated.View
                                entering={FadeInDown.springify().damping(15)}
                                layout={Layout.springify()}
                                style={styles.passwordForm}
                            >
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>SENHA ATUAL</Text>
                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={[styles.input, { flex: 1, paddingRight: 40 }]}
                                            secureTextEntry={!showSenha1}
                                            value={senhaAtual}
                                            onChangeText={setSenhaAtual}
                                            placeholder="Digite a senha atual"
                                            placeholderTextColor="#64748b"
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeIcon}
                                            onPress={() => setShowSenha1(!showSenha1)}
                                        >
                                            <Ionicons name={showSenha1 ? 'eye-off' : 'eye'} size={20} color="#94a3b8" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>NOVA SENHA</Text>
                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={[styles.input, { flex: 1, paddingRight: 40 }]}
                                            secureTextEntry={!showSenha2}
                                            value={novaSenha}
                                            onChangeText={setNovaSenha}
                                            placeholder="Min. 6 caracteres"
                                            placeholderTextColor="#64748b"
                                        />
                                        <TouchableOpacity
                                            style={styles.eyeIcon}
                                            onPress={() => setShowSenha2(!showSenha2)}
                                        >
                                            <Ionicons name={showSenha2 ? 'eye-off' : 'eye'} size={20} color="#94a3b8" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.passwordActions}>
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={() => setShowPasswordForm(false)}
                                    >
                                        <Text style={styles.cancelButtonText}>CANCELAR</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.updatePasswordButton}
                                        onPress={handleUpdatePassword}
                                    >
                                        <LinearGradient
                                            colors={['#10b981', '#059669']}
                                            style={styles.buttonGradient}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                        >
                                            <Text style={styles.buttonText}>CONFIRMAR SENHA</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Global Success Component */}
            <SuccessModal
                visible={modalVisible}
                title={modalConfig.title}
                message={modalConfig.message}
                onClose={() => setModalVisible(false)}
            />
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
    menuIcon: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 60,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 500,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 10,
    },
    avatarContainer: {
        position: 'relative',
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        borderColor: 'rgba(139, 92, 246, 0.4)',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 55,
        backgroundColor: '#1e293b',
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 34,
        height: 34,
        borderRadius: 17,
        elevation: 5,
        shadowColor: '#ec4899',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    editAvatarGradient: {
        flex: 1,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#0f172a',
    },
    avatarLabel: {
        color: '#64748b',
        fontSize: 13,
        marginTop: 12,
    },
    sectionBlock: {
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#a78bfa',
        letterSpacing: 1,
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 16,
        position: 'relative',
    },
    label: {
        color: '#e2e8f0',
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: '#fff',
        fontSize: 15,
    },
    inputDisabled: {
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        borderColor: 'transparent',
    },
    inputLockIcon: {
        position: 'absolute',
        right: 16,
        top: 38,
    },
    mainButton: {
        marginTop: 8,
        borderRadius: 14,
        overflow: 'hidden',
    },
    buttonGradient: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    passwordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    changePasswordLink: {
        color: '#ec4899',
        fontSize: 13,
        fontWeight: 'bold',
    },
    passwordForm: {
        marginTop: 4,
    },
    passwordContainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        padding: 4,
    },
    passwordActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    cancelButton: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        flex: 0.4,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#94a3b8',
        fontWeight: 'bold',
        fontSize: 13,
    },
    updatePasswordButton: {
        flex: 0.55,
        borderRadius: 14,
        overflow: 'hidden',
    },
});
