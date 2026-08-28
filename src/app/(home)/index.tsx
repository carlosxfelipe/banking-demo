import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks/use-theme";

import { BalanceCard } from "./components/balance-card";
import { CreditCardLimit } from "./components/credit-card-limit";
import { HeroHeader } from "./components/hero-header";
import { PromoCard } from "./components/promo-card";
import { QuickActions } from "./components/quick-actions";

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.background }]}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
      >
        <HeroHeader>
          <BalanceCard />
        </HeroHeader>

        <View style={[styles.content, { backgroundColor: theme.background }]}>
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
    flex: 1,
    padding: 20,
    gap: 16,
    marginTop: -16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
