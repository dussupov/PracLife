import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '@/redux';
import { useToast } from 'react-native-toast-notifications';
import Dropdown from "@/components/ui/Dropdown";

export default function AddOperationScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<{ amount?: string; name?: string }>({});
  const [wallet, setWallet] = useState<string | null>(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const limits = useSelector((state: RootState) => state.operation.limits);

  const operationStore = useSelector((state: RootState) => state.operation);
  const walletStore = useSelector((state: RootState) => state.wallet);

  const toast = useToast();

  const operationAr = [
    {
      name: 'Пополнение',
      type: 'refill',
      icon: <Entypo name="squared-plus" size={24} color="black" />,
    },
    {
      name: 'Кафе и рестораны',
      type: 'cafe',
      icon: <Ionicons name="cafe" size={24} color="black" />,
    },
    {
      name: 'Продукты',
      type: 'products',
      icon: <MaterialCommunityIcons name="food-drumstick" size={24} color="black" />,
    },
    {
      name: 'Автомобиль',
      type: 'car',
      icon: <AntDesign name="car" size={24} color="black" />,
    },
    {
      name: 'Подписки',
      type: 'subscriptions',
      icon: <MaterialIcons name="subscriptions" size={24} color="black" />,
    },
    {
      name: 'Такси',
      type: 'taxi',
      icon: <FontAwesome5 name="taxi" size={24} color="black" />,
    },
    {
      name: 'Развлечения',
      type: 'entertainment',
      icon: <Entypo name="game-controller" size={24} color="black" />,
    },
    {
      name: 'Прочее',
      type: 'other',
      icon: <FontAwesome6 name="money-bill" size={24} color="black" />,
    },
  ];

  const handleSelect = (type: string) => {
    setSelectedType(type);
    setAmount('');
    setName('')
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const currentLimits = limits.find((item) => item.type === selectedType);

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Введите корректную сумму больше 0';
    }

    if (!name || name.trim().length < 3) {
      newErrors.name = 'Введите название не менее 3 символов';
    }

    // Проверяем, что сумма не превышает общий лимит минус уже потраченные средства
    if (selectedType !== 'refill' && currentLimits) {
      const availableLimit = currentLimits.limit - currentLimits.currentLimit;
      if (parseFloat(amount) > availableLimit) {
        newErrors.amount = `Сумма не должна превышать доступный лимит`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newOperation = {
      id: uuidv4(),
      type: selectedType,
      name: name,
      value: parseFloat(amount),
      date: new Date().toISOString(),
      wallet: ''
    };

    let updatedWallets = walletStore.wallets.map((item) => {
      if (item.id === wallet) {
        if (selectedType === 'refill') {
          newOperation.wallet = item.name;
          return {
            ...item,
            value: item.value + parseFloat(amount),
          };
        } else {
          newOperation.wallet = item.name;
          return {
            ...item,
            value: item.value - parseFloat(amount),
          };
        }
      }
      return item;
    });

    // Обновляем текущие лимиты
    const updatedLimits = limits.map((limit) => {
      if (limit.type === selectedType && selectedType !== 'refill') {
        return {
          ...limit,
          currentLimit: limit.currentLimit + parseFloat(amount),
        };
      }
      return limit;
    });

    dispatch({ type: 'SET_OPERATIONS', operations: [...operationStore.operations, newOperation] });
    dispatch({ type: 'SET_WALLETS', wallets: updatedWallets });
    dispatch({ type: 'SET_CURRENT_LIMITS', limits: updatedLimits });

    toast.show(`${newOperation.name} успешно добавлен`, { type: 'success' });
    router.back();
  };

  // Достаем данные счетов , для отображения в дропдауне
  const options = walletStore.wallets.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  function handleSetWallet(item : any){
    setWallet(item.value);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Выберите тип операции:</Text>

      {operationAr.map((item) => (
        <TouchableOpacity
          key={item.type}
          style={[styles.card, selectedType === item.type && styles.cardSelected]}
          onPress={() => handleSelect(item.type)}
        >
          <View style={styles.icon}>{item.icon}</View>
          <Text style={styles.cardText}>{item.name}</Text>
        </TouchableOpacity>
      ))}

      {selectedType && (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Название"
            placeholderTextColor="#888"
            keyboardType="default"
            value={name}
            onChangeText={setName}
          />
          {errors.name && (
            <Text style={styles.error}>{errors.name}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Введите сумму"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          {errors.amount && (
            <Text style={styles.error}>{errors.amount}</Text>
          )}

          <Dropdown data={options} placeholder="Выберите способ платежа" getSelectedItem={handleSetWallet}/>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Сохранить</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(28,28,28)',
  },
  scrollContent: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardSelected: {
    backgroundColor: 'rgba(254, 41, 66, 0.2)',
    borderColor: '#fe2942',
    borderWidth: 1,
  },
  cardText: {
    marginLeft: 15,
    color: 'white',
    fontSize: 18,
  },
  icon: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
  },
  form: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: '#fe2942',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 5,
  },
  saveButton: {
    backgroundColor: '#bd1b27',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
