import { StyleSheet, Text, View } from "react-native";

import { Icon } from "@/components/icon";
import { useTheme } from "@/hooks/use-theme";

type IconName =
  "bank-transfer" | "qrcode-scan" | "credit-card-outline" | "dots-horizontal";

interface Action {
  icon: IconName;
  label: string;
}

const ACTIONS: Action[] = [
  { icon: "bank-transfer", label: "Transferir" },
  { icon: "qrcode-scan", label: "Pix" },
  { icon: "credit-card-outline", label: "Cartão" },
  { icon: "dots-horizontal", label: "Mais" },
];

export function QuickActions() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Ações rápidas</Text>
      <View style={styles.grid}>
        {ACTIONS.map((item) => (
          <View key={item.label} style={styles.item}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.backgroundElement },
              ]}
            >
              <Icon name={item.icon} size={22} color={theme.primary} />
            </View>
            <Text style={[styles.label, { color: theme.text }]}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 4,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
});
