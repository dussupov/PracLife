import {ScrollView, StyleSheet} from "react-native";
import ResetPersistButton from "@/components/ui/ResetPersistButton";

const SettingsScreen = () => {
  return(
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ResetPersistButton />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(28,28,28)',
  },
  scrollContent: {
    paddingTop: 80, // учитывая прозрачный хедер
    paddingHorizontal: 20,
    paddingBottom: 100, // чтобы не накладывалось на tabbar
    height: '100%',
  },
})

export default SettingsScreen;