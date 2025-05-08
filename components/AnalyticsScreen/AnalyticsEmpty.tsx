import { View, Text, StyleSheet, Pressable } from "react-native";
import {Link, useRouter} from "expo-router";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import Ionicons from "@expo/vector-icons/Ionicons";

const AnalyticsEmpty = () => {
  const router = useRouter();
  const operationStore = useSelector((state: RootState) => state.operation);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Аналитика доступна минимум с 5 операций.</Text>
      <Ionicons name="analytics-sharp" size={60} color={'white'} />
      <Pressable onPress={() => router.push('/(modals)/add-operation')} disabled={operationStore.operations.length <= 5}>
        <Text style={[styles.text, styles.link]}>Добавить новую операцию</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  link: {
    color: '#fe2942',
  },
});

export default AnalyticsEmpty;
