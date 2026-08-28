import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { useTheme } from "@/hooks/use-theme";

export function BalanceCard() {
  const theme = useTheme();
  const [visible, setVisible] = useState(true);

  return (
    <View style={[styles.card, { backgroundColor: theme.background }]}>
      <View style={styles.top}>
        <Text style={styles.label} themeColor="textSecondary">
          Saldo disponível
        </Text>
        <Pressable
          onPress={() => setVisible((v) => !v)}
          hitSlop={12}
          style={styles.eyeButton}
        >
          <Icon
            name={visible ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={theme.textSecondary}
          />
        </Pressable>
      </View>

      <Text style={styles.amount}>
        {visible ? "R$ 12.450,00" : "R$ ••••••"}
      </Text>

      <View style={styles.row}>
        <View
          style={[styles.pill, { backgroundColor: theme.backgroundElement }]}
        >
          <Icon name="arrow-up" size={12} color="#22c55e" />
          <Text style={styles.pillText} themeColor="textSecondary">
            {visible ? "R$ 5.200" : "••••"}
          </Text>
        </View>
        <View
          style={[styles.pill, { backgroundColor: theme.backgroundElement }]}
        >
          <Icon name="arrow-down" size={12} color="#f87171" />
          <Text style={styles.pillText} themeColor="textSecondary">
            {visible ? "R$ 1.820" : "••••"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  eyeButton: {
    padding: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
  amount: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  pillText: {
    fontSize: 11,
    fontWeight: "500",
  },
});
