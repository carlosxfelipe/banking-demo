import { StyleSheet, View } from "react-native";

import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { useTheme } from "@/hooks/use-theme";

export function CreditCardLimit() {
  const theme = useTheme();

  const used = 1500;
  const available = 3500;
  const total = used + available;
  const percentage = (used / total) * 100;

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.header}>
        <Icon name="credit-card-outline" size={20} color={theme.text} />
        <Text style={styles.title}>Limite cartão de crédito</Text>
      </View>

      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressTrack,
            { backgroundColor: theme.backgroundSelected },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              { backgroundColor: theme.primary, width: `${percentage}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.valueLabel} themeColor="textSecondary">
            Utilizado
          </Text>
          <Text style={styles.valueText}>R$ 1.500,00</Text>
        </View>
        <View style={styles.rightAlign}>
          <Text style={styles.valueLabel} themeColor="textSecondary">
            Disponível
          </Text>
          <Text style={styles.valueText}>R$ 3.500,00</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  progressContainer: {
    paddingVertical: 4,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightAlign: {
    alignItems: "flex-end",
  },
  valueLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
  },
  valueText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
