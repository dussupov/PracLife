import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '@/redux';
import { useToast } from 'react-native-toast-notifications';

export default function AddWalletScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('')
  const [errors, setErrors] = useState<{ amount?: string; accountNumber?: string; name?: string }>({});

  const dispatch = useDispatch();
  const router = useRouter();
  const walletStore = useSelector((state: RootState) => state.wallet);

  const toast = useToast();

  const walletAr = [
    {
      name: 'Карта',
      type: 'card',
      icon: <AntDesign name="creditcard" size={24} color="black" />,
    },
    {
      name: 'Банковский счёт',
      type: 'bank_account',
      icon: <MaterialCommunityIcons name="bank" size={24} color="black" />,
    },
    {
      name: 'Наличные',
      type: 'cash',
      icon: <MaterialCommunityIcons name="cash-multiple" size={24} color="black" />,
    },
  ];

  const handleSelect = (type: string) => {
    setSelectedType(type);
    setAccountNumber('');
    setAmount('');
    setName('')
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Введите корректную сумму больше 0';
    }

    if (!name || name.trim().length < 3) {
      newErrors.name = 'Введите название не менее 3 символов';
    }

    if (selectedType !== 'cash') {
      if (!accountNumber || !/^\d{8,20}$/.test(accountNumber)) {
        newErrors.accountNumber = 'Введите корректный номер (8-20 цифр)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newWallet = {
      id: uuidv4(),
      type: selectedType,
      name: name,
      wallet_number: accountNumber,
      value: parseFloat(amount),
    };

    dispatch({ type: 'SET_WALLETS', wallets: [...walletStore.wallets, newWallet] });
    toast.show(`${newWallet.name} успешно добавлен`, { type: 'success' });
    router.back();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Выберите тип счёта:</Text>

      {walletAr.map((item) => (
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
            placeholder="Введите имя"
            placeholderTextColor="#888"
            keyboardType="default"
            value={name}
            onChangeText={setName}
          />
          {errors.name && (
            <Text style={styles.error}>{errors.name}</Text>
          )}
          {selectedType !== 'cash' && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Введите номер счёта"
                placeholderTextColor="#888"
                keyboardType="number-pad"
                value={accountNumber}
                onChangeText={setAccountNumber}
              />
              {errors.accountNumber && (
                <Text style={styles.error}>{errors.accountNumber}</Text>
              )}
            </>
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
    backgroundColor: '#fe2942',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
