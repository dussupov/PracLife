import {View, StyleSheet, Text} from "react-native";
import {RootState} from "@/redux";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import formatMoney from "@/scripts/formatMoney";

const WalletBalance = () => {

  const [balance, setBalance] = useState<number>(0);
  const walletStore = useSelector((state: RootState) => state.wallet);

  useEffect(()=>{
    const totalBalance = walletStore.wallets.reduce((acc, wallet) => {
      return acc + wallet.value;
    }, 0);

    const formattedBalance = formatMoney(totalBalance)

    setBalance(formattedBalance);
  },[walletStore.wallets])


  return(
    <View style={styles.container}>
       <Text style={styles.text}>Баланс:</Text>
       <Text style={styles.text}>{balance} ₸</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 40,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text:{
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  }
})

export default WalletBalance;