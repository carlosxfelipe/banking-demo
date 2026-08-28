import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Image, Text } from "react-native";

import { useTheme } from "@/hooks/use-theme";

import { BalanceCard } from "./components/balance-card";
import { CreditCardLimit } from "./components/credit-card-limit";
import { PromoCard } from "./components/promo-card";
import { QuickActions } from "./components/quick-actions";

const AVATAR_URI =
  "https://avatars.githubusercontent.com/u/85801709?s=400&u=01cce0318ea853ce1a133699bc6b2af1919094d6&v=4";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={{ uri: AVATAR_URI }} style={styles.avatar} />
            <Text style={[styles.name, { color: theme.text }]}>Olá, Carlos Felipe</Text>
          </View>
        </View>

        <BalanceCard />
        
        <View style={styles.grid}>
          <QuickActions />
          <CreditCardLimit />
          <PromoCard />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 32,
    gap: 32,
    maxWidth: 1024,
    width: "100%",
    alignSelf: "center",
  },
  grid: {
    gap: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.05)",
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
  },
});
