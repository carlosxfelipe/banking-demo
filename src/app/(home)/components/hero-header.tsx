import { LinearGradient } from "expo-linear-gradient";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/icon";
import { useTheme } from "@/hooks/use-theme";

const HERO_COLORS = ["#D9043D", "#C20A3D"] as const;
const OVERSCROLL_COLOR = "#D9043D";
const AVATAR_URI =
  "https://media.licdn.com/dms/image/v2/D4D03AQGsNV8xuOh9Lw/profile-displayphoto-crop_800_800/B4DaAmp2Y3I8AI-/0/1787354900839?e=1789603200&v=beta&t=cuQA0EvD-KxS3OZDhb2RbFchDvmVQwknhdMwVC26s3o";

interface HeroHeaderProps {
  children?: React.ReactNode;
}

export function HeroHeader({ children }: HeroHeaderProps) {
  const theme = useTheme();

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
          <View
            style={[
              styles.bellContainer,
              Platform.OS === "web" && { marginRight: 16 },
            ]}
          >
            <Icon
              name="bell-outline"
              size={24}
              color="#fff"
              onPress={() => console.log("Bell pressed!")}
            />
            <View
              style={[styles.badge, { backgroundColor: theme.notification }]}
            >
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
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
  bellContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#000000",
    fontSize: 10,
    fontWeight: "bold",
  },
});
