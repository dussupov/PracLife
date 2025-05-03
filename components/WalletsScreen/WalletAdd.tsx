import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import {View, StyleSheet, Pressable, Text} from "react-native";
import {useRouter} from "expo-router";

const WalletAdd = () => {
  const router = useRouter();

  return(
    <View style={styles.container}>
      <Pressable onPress={() => router.push('/(modals)/add-wallet')}>
        <MaterialCommunityIcons name="credit-card-plus-outline" size={24} color="black" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: '100%',
    backgroundColor: '#fe2942',
    position: 'fixed',
    bottom: 130,
    right: 20,
  },
})

export default WalletAdd;