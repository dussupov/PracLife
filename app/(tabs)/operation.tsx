import { View, StyleSheet, ScrollView } from "react-native";
import { RootState } from "@/redux";
import { useSelector } from "react-redux";
import OperationEmpty from "@/components/OperationScreen/OperationEmpty";
import OperationItems from "@/components/OperationScreen/OperationItems";
import OperationAdd from "@/components/OperationScreen/OperationAdd";

const Operation = () => {
  const operationStore = useSelector((state: RootState) => state.operation);

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {operationStore.operations && operationStore.operations.length <= 0
          ? <OperationEmpty />
          : <OperationItems />}
      </ScrollView>

      {/* "Фиксированная" кнопка */}
      <OperationAdd />
    </View>
  );
};

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
});

export default Operation;
