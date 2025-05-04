import React from 'react';
import { Button, Alert } from 'react-native';
import { persistor } from '@/redux/'; // убедись, что путь верный

const ResetPersistButton = () => {
  const handleReset = async () => {
    try {
      await persistor.purge();
      Alert.alert('Сброс', 'Данные успешно сброшены!');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сбросить данные');
      console.error('Purge error:', error);
    }
  };

  return <Button title="Сбросить настройки" onPress={handleReset} color="red" />;
};

export default ResetPersistButton;
