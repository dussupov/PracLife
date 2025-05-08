import {ScrollView, StyleSheet, View, Text} from "react-native";
import ResetPersistButton from "@/components/ui/ResetPersistButton";
import OperationLimits from "@/components/SettingsScreen/OperationLimits";

const SettingsScreen = () => {
  return(
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <OperationLimits />

        <Text style={styles.text}>Сброс</Text>
        <Text style={styles.subtitle}>Данная кнопка сбрасывает настройки приложения</Text>
        <ResetPersistButton />
      </ScrollView>
    </View>
  )
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
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 200,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 20
  },
  subtitle:{
    color: 'white',
    fontSize: 16,
    marginBottom: 20
  }
})

export default SettingsScreen;