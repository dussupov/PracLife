import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";

const OperationAdd = () => {
  const router = useRouter();
  const walletStore = useSelector((state: RootState) => state.wallet);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push('/(modals)/add-operation')} disabled={walletStore.wallets.length <= 0}>
        <MaterialCommunityIcons name="bank-transfer" size={24} color='white' />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 130,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fe2942',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    zIndex: 10,
  },
});

export default OperationAdd;