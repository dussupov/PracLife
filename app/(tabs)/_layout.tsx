// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';
import { BlurView } from "expo-blur";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

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
        headerShown: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#fe2942',
        tabBarInactiveTintColor: '#ffffff',
        tabBarBackground: () => <TabBarBackground />,
        headerStyle: {
          backgroundColor: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(10px)', // работает только в web — можно игнорить
          shadowOpacity: 0, // убираем тень в iOS
          elevation: 0, // убираем тень в Android
          borderBottomWidth: 0,
          fontFamily: 'Montserrat_700Bold', // шрифт для заголовка
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '600',
          color: '#fff', // или любой светлый текст
          fontFamily: 'Montserrat_700Bold', // применяем шрифт
        },
        headerTransparent: true, // делает хедер прозрачным
        headerTintColor: '#ffffff', // цвет стрелки «назад» и иконок
        tabBarStyle: {
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
          elevation: 10, // для Android тень
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'Montserrat_400Regular', // шрифт для таббара
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Счета',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="credit-card" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="operation"
        options={{
          title: 'Операции',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bank-transfer" size={24} color={color} />
          ),
        }}
      />
      {/* Модальный экран */}
      <Tabs.Screen
        name="add-wallet"
        options={{
          tabBarStyle: { display: 'none' },  // Скрываем этот экран в TabBar
          headerShown: true,  // Убираем хедер для модального экрана
          presentation: 'modal',  // Настроим экран как модальный
          animationTypeForReplace: 'fade',  // Плавная анимация при открытии модала
        }}
      />
    </Tabs>
  );
}
