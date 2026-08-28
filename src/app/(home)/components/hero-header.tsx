import { LinearGradient } from "expo-linear-gradient";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/components/icon";
import { useTheme } from "@/hooks/use-theme";

const HERO_COLORS = ["#D9043D", "#9B1235"] as const;
const OVERSCROLL_COLOR = "#D9043D";
const AVATAR_URI =
  "https://avatars.githubusercontent.com/u/85801709?s=400&u=01cce0318ea853ce1a133699bc6b2af1919094d6&v=4";

interface HeroHeaderProps {
  children?: React.ReactNode;
}

export function HeroHeader({ children }: HeroHeaderProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <>
      {/* Truque para a cor do overscroll (puxar pra baixo) no topo */}
      <LinearGradient
        colors={[OVERSCROLL_COLOR, OVERSCROLL_COLOR]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.overscroll}
      />
      <LinearGradient
        colors={HERO_COLORS}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[styles.hero, { paddingTop: 10 }]}
      >
        <View style={styles.topBar}>
          <View style={styles.userInfo}>
            <Image source={{ uri: AVATAR_URI }} style={styles.avatar} />
            <Text style={styles.name}>Olá, Carlos Felipe</Text>
          </View>
          <Icon
            name="bell-outline"
            size={24}
            color="#fff"
            onPress={() => console.log("Bell pressed!")}
            style={Platform.OS === "web" ? { marginRight: 16 } : undefined}
          />
        </View>

        {children}
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  overscroll: {
    position: "absolute",
    top: -1000,
    left: 0,
    right: 0,
    height: 1000,
  },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 16,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  name: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "600",
  },
});
