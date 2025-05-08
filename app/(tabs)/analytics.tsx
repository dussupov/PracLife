import {ScrollView, StyleSheet, View} from "react-native";
import OperationChart from "@/components/AnalyticsScreen/OperationChart";
import {useSelector} from "react-redux";
import {RootState} from "@/redux";
import AnalyticsEmpty from "@/components/AnalyticsScreen/AnalyticsEmpty";

const AnalyticsScreen = () => {

  const operationStore = useSelector((state: RootState) => state.operation);

  return(
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.scrollContent, operationStore.operations.length <= 5 ? {height: '100%'} : {}]}
        showsVerticalScrollIndicator={false}
      >
        {operationStore.operations && operationStore.operations.length <= 0
          ? <AnalyticsEmpty />
          : <OperationChart data={operationStore.operations} />}
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