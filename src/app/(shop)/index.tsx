import { Text } from "@/components/text";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, View } from "react-native";

export default function ShopScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text>Shop Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
