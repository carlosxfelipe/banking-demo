import { Text } from "@/components/text";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet, View } from "react-native";

export default function ServicesScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text>Services Screen</Text>
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
