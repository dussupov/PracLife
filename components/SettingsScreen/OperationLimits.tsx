import { View, StyleSheet, Text, TextInput, FlatList } from "react-native";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { RootState } from "@/redux";
import { useToast } from "react-native-toast-notifications";

type OperationType = {
  type: string;
  name: string;
  icon: JSX.Element;
};

const OperationLimits = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const limits = useSelector((state: RootState) => state.operation.limits);
  const inputTimeout = useRef<NodeJS.Timeout | null>(null);

  const [operationTypes] = useState<OperationType[]>([
    { name: 'Кафе и рестораны', type: 'cafe', icon: <Ionicons name="cafe" size={24} color="white" /> },
    { name: 'Продукты', type: 'products', icon: <MaterialCommunityIcons name="food-drumstick" size={24} color="white" /> },
    { name: 'Автомобиль', type: 'car', icon: <AntDesign name="car" size={24} color="white" /> },
    { name: 'Подписки', type: 'subscriptions', icon: <MaterialIcons name="subscriptions" size={24} color="white" /> },
    { name: 'Такси', type: 'taxi', icon: <FontAwesome5 name="taxi" size={24} color="white" /> },
    { name: 'Развлечения', type: 'entertainment', icon: <Entypo name="game-controller" size={24} color="white" /> },
    { name: 'Прочее', type: 'other', icon: <FontAwesome6 name="money-bill" size={24} color="white" /> },
  ]);

  const handleLimitChange = (type: string, limit: string) => {
    const numericLimit = parseFloat(limit) || 0;
    const currentLimit = limits.find((item) => item.type === type)?.currentLimit || 0;

    if (numericLimit < currentLimit) {
      toast.show(
        `Лимит не может быть меньше уже потраченных средств (${currentLimit}₸)`,
        {
          type: "danger",
          placement: "bottom",
          duration: 3000,
          animationType: "slide-in",
        }
      );
      return;
    }

    // Обновляем лимиты с задержкой
    if (inputTimeout.current) {
      clearTimeout(inputTimeout.current);
    }

    inputTimeout.current = setTimeout(() => {
      const updatedLimits = limits.map((item) =>
        item.type === type
          ? { ...item, limit: numericLimit }
          : item
      );

      dispatch({ type: "SET_LIMITS", limits: updatedLimits });

      toast.show(`${type} — ${numericLimit}₸`, {
        type: "success",
        placement: "top",
        duration: 2000,
        animationType: "slide-in",
      });
    }, 500);
  };

  const renderItem = ({ item }: { item: OperationType }) => {
    const currentLimit = limits.find((limit) => limit.type === item.type)?.limit || "";
    const currentLimitValue = limits.find((limit) => limit.type === item.type)?.currentLimit || "";

    return (
      <View style={styles.card}>
        <View style={styles.icon}>{item.icon}</View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.limit}>Потраченно: {currentLimitValue || 0}</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите лимит"
            keyboardType="numeric"
            value={currentLimit.toString()}
            onChangeText={(text) => handleLimitChange(item.type, text)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Лимиты</Text>
      <FlatList
        data={operationTypes}
        renderItem={renderItem}
        keyExtractor={(item) => item.type}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  icon: {
    marginRight: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
    color: 'white',
  },
  limit: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
});

export default OperationLimits;
