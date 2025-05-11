import React, {useEffect, useRef, useState} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import formatMoney from "@/scripts/formatMoney";

type WalletType = {
  type: string;
  label: string;
  icon: JSX.Element;
  sumPrice?: number;
};

const WalletItems = () => {
  const walletStore = useSelector((state: RootState) => state.wallet);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const animatedHeights = useRef<Record<string, Animated.Value>>(getInitialAnimatedValues()).current;

  const [walletTypes, setWalletTypesWithSum] = useState<WalletType[]>([
    { type: 'card', label: 'Карта', icon: <AntDesign name="creditcard" size={26} color="white" />},
    { type: 'bank_account', label: 'Банковский счёт', icon: <MaterialCommunityIcons name="bank" size={24} color="white" /> },
    { type: 'cash', label: 'Наличные', icon: <MaterialCommunityIcons name="cash-multiple" size={24} color="white" /> },
  ]);

  // АНИМАЦИЯ СЕКЦИЙ
  function getInitialAnimatedValues() {
    const values: Record<string, Animated.Value> = {
      card: new Animated.Value(0),
      bank_account: new Animated.Value(0),
      cash: new Animated.Value(0),
    };
    return values;
  }

  
  const toggleSection = (type: string, length: number) => {
    const isOpen = openSections[type];
    setOpenSections((prev) => ({ ...prev, [type]: !isOpen }));

    Animated.timing(animatedHeights[type], {
      toValue: isOpen ? 0 : length * 70, // Примерная высота одного элемента
      duration: 300,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  useEffect(() => {
    const updated = walletTypes.map(item => {
      let sumPrice = 0;
      walletStore.wallets.forEach(wallet => {
        if (wallet.type === item.type) {
          sumPrice += wallet.value;
        }
      });
      return { ...item, sumPrice };
    });

    setWalletTypesWithSum(updated);
  }, [walletStore.wallets]);

  return (
    <View style={styles.container}>
      {walletTypes.map(({ type, label, icon, sumPrice }) => {
        const filteredWallets = walletStore.wallets.filter((w) => w.type === type);
        const height = animatedHeights[type];

        if(filteredWallets .length === 0) return null;

        return (
          <View key={type} style={{marginBottom: 15}}>
            <TouchableOpacity
              onPress={() => toggleSection(type, filteredWallets.length)}
              style={styles.header}
            >
              <View style={styles.headerLeft}>
                <Text style={styles.headerText}>{label}</Text>
              </View>
              <View style={styles.headerRight}>
                <Text style={styles.headerTextPrice}>{formatMoney(sumPrice)} ₸</Text>
                <AntDesign
                  name={openSections[type] ? 'up' : 'down'}
                  size={18}
                  color="white"
                />
              </View>
            </TouchableOpacity>

            <Animated.View style={[styles.animatedContainer, { height }]}>
              {filteredWallets.map((item) => (
                <View key={item.id} style={styles.walletItem}>
                  <View style={styles.walletItemLeft}>
                    {icon}
                  </View>
                  <View style={styles.walletItemRight}>
                    <Text style={styles.walletName}>{item.name}</Text>
                    <Text style={styles.walletValue}>{formatMoney(item.value)} ₸</Text>
                  </View>
                </View>
              ))}
            </Animated.View>
          </View>
        );
      })}
    </View>
  );
};

export default WalletItems;

// СТИЛИ
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(28,28,28)',
    flex: 1,
  },
  header: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 1
  },
  headerLeft:{},
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  headerTextPrice: {
    fontSize: 14,
    color: 'white',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  animatedContainer: {
    overflow: 'hidden',
  },
  walletItem: {
    padding: 12,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletItemLeft: {
    width: '15%'
  },
  walletItemRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    width: '85%',
    paddingBottom: 2,
  },
  walletName: {
    color: 'white',
    fontSize: 16,
  },
  walletValue: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
  emptyText: {
    color: '#999',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
