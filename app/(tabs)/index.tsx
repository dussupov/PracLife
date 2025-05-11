import {ScrollView, StyleSheet, View} from 'react-native';
import { RootState } from "@/redux";
import { useSelector } from "react-redux";
import WalletEmpty from "@/components/WalletsScreen/WalletEmpty";
import WalletItems from "@/components/WalletsScreen/WalletItems";
import WalletAdd from "@/components/WalletsScreen/WalletAdd";
import WalletBalance from "@/components/WalletsScreen/WalletBalance";

export default function HomeScreen() {

  // Достаем счета из стора 
  const walletStore = useSelector((state: RootState) => state.wallet);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container} //стили для своего скрола
        contentContainerStyle={styles.scrollContent} //стили для контейнера
        showsVerticalScrollIndicator={false} //отключаем показ индикатора прокрутки
      >
        {
          walletStore.wallets && walletStore.wallets.length <= 0 ?
            <WalletEmpty /> //если нет счетов
            :
            <>
              <WalletBalance />
              <WalletItems />
            </>
        }
      </ScrollView>
      {/* "Фиксированная" кнопка добавления счета */}
     <WalletAdd />
    </View>
  );
}

// Стили
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgb(28,28,28)',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 80, // учитывая прозрачный хедер
    paddingHorizontal: 20,
    paddingBottom: 100, // чтобы не накладывалось на tabbar
    height: '100%',
  },
});
