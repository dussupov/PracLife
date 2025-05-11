import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Link, useRouter} from "expo-router";

const WalletEmpty = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>К сожалению, у вас не добавлено ни одного счёта.</Text>
      <MaterialIcons name="credit-card-off" size={60} color="white" />
      <Pressable onPress={() => router.push('/(modals)/add-wallet')}>
        <Text style={[styles.text, styles.link]}>Добавить новый счёт</Text>
      </Pressable>
    </View>
  );
};


// Стили для пустого экрана
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

export default WalletEmpty;
