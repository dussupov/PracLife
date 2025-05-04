import {ScrollView, StyleSheet, View} from 'react-native';
import { RootState } from "@/redux";
import { useSelector } from "react-redux";
import WalletEmpty from "@/components/WalletsScreen/WalletEmpty";
import WalletItems from "@/components/WalletsScreen/WalletItems";
import WalletAdd from "@/components/WalletsScreen/WalletAdd";
import WalletBalance from "@/components/WalletsScreen/WalletBalance";

export default function HomeScreen() {
  const walletStore = useSelector((state: RootState) => state.wallet);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {
          walletStore.wallets && walletStore.wallets.length <= 0 ?
            <WalletEmpty />
            :
            <>
              <WalletBalance />
              <WalletItems />
            </>
        }
      </ScrollView>
      {/* "Фиксированная" кнопка */}
     <WalletAdd />
    </View>
  );
}

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
