// app/(tabs)/_layout.tsx
import { Tabs, useNavigation } from 'expo-router';
import React from 'react';
import { BlurView } from 'expo-blur';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { TouchableOpacity } from 'react-native';

// Фон таббара , красивый, прозрачный
const TabBarBackground = () => (
  <BlurView
    blurType="light"
    blurAmount={20}
    reducedTransparencyFallbackColor="white"
    style={{
      flex: 1,
      borderRadius: 25,
      overflow: 'hidden',
    }}
  />
);

// Кнопка перезагрузки
const ReloadButton = () => {
  const navigation = useNavigation();

  // Функция перезагрузки
  const handleReload = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: navigation.getState().routes[navigation.getState().index].name }],
    });
  };

  // Отрисовываем кнопку
  return (
    <TouchableOpacity onPress={handleReload} style={{ marginRight: 15 }}>
      <Ionicons name="reload" size={24} color="#ffffff" />
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null; // Подождём, пока шрифт загрузится
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true, // Показываем хедер
        tabBarShowLabel: true, // Показываем названия табов
        tabBarActiveTintColor: '#fe2942', // Цвет активного таба
        tabBarInactiveTintColor: '#ffffff', // Цвет неактивного таба
        tabBarBackground: () => <TabBarBackground />,
        headerStyle: {  // Стили для header
          backgroundColor: '#2c2c2c',
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {  // Шрифт для заголовка
          fontSize: 20,
          fontWeight: '600',
          color: '#fff',
          fontFamily: 'Montserrat_700Bold',
        },
        headerTransparent: true, // делаем хедер прозрачным
        headerTintColor: '#ffffff', // цвет стрелки «назад» и иконок
        headerRight: () => <ReloadButton />, // добавляем кнопку перезагрузки
        tabBarStyle: { // Стили для таббара
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 25,
          height: 70,
          borderRadius: 25,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255)',
          backgroundColor: 'rgba(255,255,255,0.07)',
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
          elevation: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      }}
    >
      {/* ЗДЕСЬ У НАС ЭКРАНЫ */}

      {/* ДОМАШНИЙ ЭКРАН СЧЕТОВ */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Счета',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="credit-card" size={24} color={color} />
          ),
        }}
      />

      {/* ЭКРАН ОПЕРАЦИЙ */}
      <Tabs.Screen
        name="operation"
        options={{
          title: 'Операции',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bank-transfer" size={24} color={color} />
          ),
        }}
      />

      {/* ЭКРАН АНАЛИТИКИ */}
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Аналитика',
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics-sharp" size={24} color={color} />
          ),
        }}
      />

      {/* ЭКРАН НАСТРОЕК */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Настройки',
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
