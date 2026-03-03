import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function PanelLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        backgroundColor: '#0f172a',
                        width: 280,
                    },
                    drawerActiveBackgroundColor: 'rgba(139, 92, 246, 0.15)',
                    drawerActiveTintColor: '#a78bfa',
                    drawerInactiveTintColor: '#9ca3af',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                }}
            >
                <Drawer.Screen
                    name="dashboard"
                    options={{
                        drawerLabel: 'Dashboard',
                        title: 'Resumo',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="home-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="agenda"
                    options={{
                        drawerLabel: 'Agenda',
                        title: 'Minha Agenda',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="calendar-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="perfil"
                    options={{
                        drawerLabel: 'Perfil',
                        title: 'Meu Perfil',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="person-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="tema"
                    options={{
                        drawerLabel: 'Tema',
                        title: 'Aparência',
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="color-palette-outline" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="novo-cliente"
                    options={{
                        drawerItemStyle: { display: 'none' },
                        headerShown: false,
                        title: 'Novo Cliente',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
