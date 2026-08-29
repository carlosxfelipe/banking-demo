import { LinearGradient } from "expo-linear-gradient";

export const defaultHeaderOptions: any = {
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
      colors={["#D9043D", "#C20A3D"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    />
  ),
};
