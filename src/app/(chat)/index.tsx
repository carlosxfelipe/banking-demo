import { StyleSheet, View } from "react-native";
import { Text } from "@/components/text";
import { useTheme } from "@/hooks/use-theme";

export default function ChatScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text>Chat Screen</Text>
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
