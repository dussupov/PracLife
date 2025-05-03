import {View, StyleSheet, Text} from "react-native";

const Operation = () => {
  return (
    <View
      style={styles.container}
    >
      <Text style={styles.text}>
        123
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80, // учитывая прозрачный хедер
    paddingHorizontal: 20,
    backgroundColor: 'rgb(28,28,28)', // лёгкий прозрачный фон
  },
  text: {
    fontSize: 20,
    color: '#fe2942',  // Устанавливаем цвет шрифта
  },
});

export default Operation;