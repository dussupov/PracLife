import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import {VictoryPie, VictoryChart, VictoryBar, VictoryAxis, VictoryGroup, VictoryLabel} from 'victory-native';
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FinancialAdvice from "@/components/AnalyticsScreen/FinancialAdvice";

interface Operation {
  id: string;
  type: string;
  name: string;
  value: number;
  date?: string;
  wallet?: string;
}

interface OperationsChartProps {
  data: Operation[];
}

const OperationsChart: React.FC<OperationsChartProps> = ({ data }) => {
  // Разделяем данные на доходы и расходы
  const income = data.filter(item => item.type === 'refill');
  const expenses = data.filter(item => item.type !== 'refill');

  const operationType = [
    { name: 'Пополнение', type: 'refill'},
    { name: 'Кафе и рестораны', type: 'cafe'},
    { name: 'Продукты', type: 'products'},
    { name: 'Автомобиль', type: 'car'},
    { name: 'Подписки', type: 'subscriptions'},
    { name: 'Такси', type: 'taxi'},
    { name: 'Развлечения', type: 'entertainment'},
    { name: 'Прочее', type: 'other'},
  ]

  // Группируем расходы по категориям
  const expenseCategories = expenses.reduce((acc, item) => {
    const category = operationType.find(type => type.type === item.type);
    const categoryName = category ? category.name : 'Прочее';
    acc[categoryName] = (acc[categoryName] || 0) + item.value;
    return acc;
  }, {} as Record<string, number>);

  // Подготавливаем данные для Pie диаграммы
  const pieData = [
    { x: 'Доходы', y: income.reduce((sum, item) => sum + item.value, 0) },
    { x: 'Расходы', y: expenses.reduce((sum, item) => sum + item.value, 0) }
  ];

  // Подготавливаем данные для Bar диаграммы
  const barData = Object.entries(expenseCategories).map(([name, value]) => ({
    x: name,
    y: value
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Доходы и Расходы</Text>
      <VictoryPie
        data={pieData}
        colorScale={['#4CAF50', '#F44336']}
        innerRadius={80}
        labels={({ datum }) => `${datum.x}: ${datum.y}₸`}
        style={{
          labels: { fontSize: 16, fill: 'white' },
        }}
      />

      <Text style={styles.title}>Операции</Text>
      <VictoryChart domainPadding={{ y: 40 }}>
        <VictoryAxis
          dependentAxis
          style={{ tickLabels: { fontSize: 12, fill: '#666' } }}
        />
        <VictoryAxis
          style={{ tickLabels: { fontSize: 12, fill: '#666' } }}
        />
        <VictoryBar
          horizontal
          data={barData}
          labels={({ datum }) => datum.x}
          style={{
            data: { fill: '#2196F3', height: 20 },
            labels: { fontSize: 10, fill: 'white' }
          }}
          labelComponent={<VictoryLabel dx={10} />}
        />
      </VictoryChart>

      {/* Текстовое отображение категорий */}
      <View style={styles.summaryContainer}>
        {Object.entries(expenseCategories).map(([name, value]) => (
          <Text key={name} style={styles.summaryItem}>
            {name}: {value}₸
          </Text>
        ))}
      </View>

      <FinancialAdvice data={data} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  summaryContainer: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  summaryItem: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
});

export default OperationsChart;
