import {ScrollView, StyleSheet, View} from "react-native";
import ResetPersistButton from "@/components/ui/ResetPersistButton";
import OperationChart from "@/components/AnalyticsScreen/OperationChart";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";

const AnalyticsScreen = () => {

  const operationStore = useSelector((state: RootState) => state.operation.operations);

  return(
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <OperationChart data={operationStore} />
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
})

export default AnalyticsScreen;