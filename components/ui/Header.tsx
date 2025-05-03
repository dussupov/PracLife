import { View, Text, StyleSheet } from 'react-native';

export default function Header({ title }: { title: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: '#4A90E2',
    paddingTop: 30,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
