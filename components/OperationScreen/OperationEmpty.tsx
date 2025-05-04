import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Link, useRouter} from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";

const OperationEmpty = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>К сожалению, у вас не произведено ни одной операции.</Text>
      <MaterialCommunityIcons name="bank-transfer" size={60} color="white" />
      <Pressable onPress={() => router.push('/(modals)/add-operation')}>
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

export default OperationEmpty;
