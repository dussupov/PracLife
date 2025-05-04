import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import formatMoney from "@/scripts/formatMoney";

dayjs.locale('ru');

type OperationType = {
  type: string;
  name: string;
  icon: JSX.Element;
  sumPrice?: number;
};

const OperationItems = () => {
  const operationStore = useSelector((state: RootState) => state.operation);
  const [operationType, setOperationType] = useState<OperationType[]>([
    { name: 'Кафе и рестораны', type: 'cafe', icon: <Ionicons name="cafe" size={24} color="black" /> },
    { name: 'Продукты', type: 'products', icon: <MaterialCommunityIcons name="food-drumstick" size={24} color="black" /> },
    { name: 'Автомобиль', type: 'car', icon: <AntDesign name="car" size={24} color="black" /> },
    { name: 'Подписки', type: 'subscriptions', icon: <MaterialIcons name="subscriptions" size={24} color="black" /> },
    { name: 'Такси', type: 'taxi', icon: <FontAwesome5 name="taxi" size={24} color="black" /> },
    { name: 'Развлечения', type: 'entertainment', icon: <Entypo name="game-controller" size={24} color="black" />},
    { name: 'Прочее', type: 'other', icon: <FontAwesome6 name="money-bill" size={24} color="black" />},
  ]);

  // Группируем операции по дате
  const groupedByDate = operationStore.operations.reduce<Record<string, typeof operationStore.operations>>((acc, operation) => {
    const dateKey = dayjs(operation.date).format('D MMMM YYYY');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(operation);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {Object.entries(groupedByDate).map(([date, operations]) => (
        <View key={date} style={styles.group}>
          <Text style={styles.date}>{date}</Text>
          {operations.map((op) => (
            <View key={op.id} style={styles.operation}>
              <View style={styles.operationLeft}>
                {operationType.find((item) => item.type === op.type)?.icon}
              </View>
               <View style={styles.operationRight}>
                 <View style={styles.operationInfo}>
                   <View style={styles.operationInfoHead}>
                     <Text style={styles.operationInfoHeadText}>
                       {operationType.find((item) => item.type === op.type)?.name}
                     </Text>
                     <Text style={styles.operationInfoHeadText}>
                       - {formatMoney(op.value)} ₸
                     </Text>
                   </View>
                   <View style={styles.operationInfoBody}>
                      <Text style={{...styles.name}}>{op.name}</Text>
                      <Text style={styles.name}>|</Text>
                      <Text style={styles.name}>{op.wallet}</Text>
                   </View>
                 </View>
               </View>

            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(28,28,28)',
    flex: 1,
  },
  group: {
    marginBottom: 24,
    display: 'flex',
    gap: 15
  },
  date: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  operation: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 15
  },
  operationLeft:{
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  operationRight:{
    width: '80%',
  },
  operationInfo:{
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  },
  operationInfoHead:{
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  operationInfoHeadText:{
    color: '#fff',
    fontSize: 18,
  },
  operationInfoBody:{
    display: 'flex',
    flexDirection: "row",
    gap: 10
  },
  name: {
    color: '#ccc',
    fontSize: 14,
  },
  value: {
    color: '#fe2942',
    fontSize: 16,
    marginTop: 4,
  },
});

export default OperationItems;
