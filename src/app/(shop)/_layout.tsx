import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function ShopLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#FFFFFF",
        headerShadowVisible: false,
        headerBackButtonDisplayMode: "minimal",
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 17,
          color: "#FFFFFF",
        },
        headerBackground: () => (
          <LinearGradient
            colors={["#D9043D", "#9B1235"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Shop" }} />
    </Stack>
  );
}
