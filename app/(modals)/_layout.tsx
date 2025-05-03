// app/(modals)/_layout.tsx
import { Stack } from 'expo-router';
import React from "react";

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: true,
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
      }}
    >

      <Stack.Screen
        name="add-wallet"
        options={{
          title: 'Добавление счета', // Вот здесь задаем заголовок
        }}
      />
    </Stack>
  );
}
