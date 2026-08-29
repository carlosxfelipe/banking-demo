import { StyleSheet, View, Pressable } from "react-native";

import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { useTheme } from "@/hooks/use-theme";

type Asset = {
  ticker: string;
  name: string;
  type: "acao" | "fii";
  quantity: number;
  currentPrice: number;
  avgPrice: number;
};

const PORTFOLIO: Asset[] = [
  {
    ticker: "PETR4",
    name: "Petrobras",
    type: "acao",
    quantity: 200,
    currentPrice: 43.55,
    avgPrice: 30.93,
  },
  {
    ticker: "VALE3",
    name: "Vale",
    type: "acao",
    quantity: 100,
    currentPrice: 78.11,
    avgPrice: 55.4,
  },
  {
    ticker: "SNFF11",
    name: "Suno FoF",
    type: "fii",
    quantity: 150,
    currentPrice: 70.98,
    avgPrice: 68.51,
  },
  {
    ticker: "AFHI11",
    name: "AF Invest CRI",
    type: "fii",
    quantity: 80,
    currentPrice: 93.15,
    avgPrice: 92.31,
  },
];

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function calcReturn(asset: Asset) {
  const total = asset.quantity * asset.currentPrice;
  const invested = asset.quantity * asset.avgPrice;
  const pct = ((total - invested) / invested) * 100;
  return { total, invested, pct };
}

export function InvestmentsCard() {
  const theme = useTheme();

  const totalInvested = PORTFOLIO.reduce(
    (acc, a) => acc + a.quantity * a.avgPrice,
    0,
  );
  const totalCurrent = PORTFOLIO.reduce(
    (acc, a) => acc + a.quantity * a.currentPrice,
    0,
  );
  const totalReturn = totalCurrent - totalInvested;
  const totalReturnPct = (totalReturn / totalInvested) * 100;
  const isPositive = totalReturn >= 0;

  const acoes = PORTFOLIO.filter((a) => a.type === "acao");
  const fiis = PORTFOLIO.filter((a) => a.type === "fii");

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon name="trending-up" size={20} color={theme.text} />
          <Text style={styles.title}>Minha Carteira</Text>
        </View>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: isPositive
                ? theme.returnPositiveBg
                : theme.returnNegativeBg,
            },
          ]}
        >
          <Icon
            name={isPositive ? "arrow-up" : "arrow-down"}
            size={11}
            color={isPositive ? theme.returnPositive : theme.returnNegative}
          />
          <Text
            style={[
              styles.badgePct,
              {
                color: isPositive ? theme.returnPositive : theme.returnNegative,
              },
            ]}
          >
            {isPositive ? "+" : ""}
            {totalReturnPct.toFixed(2)}%
          </Text>
        </View>
      </View>

      {/* Total */}
      <View style={styles.totalRow}>
        <View>
          <Text style={styles.totalLabel} themeColor="textSecondary">
            Valor total
          </Text>
          <Text style={styles.totalValue}>{formatCurrency(totalCurrent)}</Text>
        </View>
        <View style={styles.returnCol}>
          <Text style={styles.totalLabel} themeColor="textSecondary">
            Rentabilidade
          </Text>
          <Text
            style={[
              styles.returnValue,
              {
                color: isPositive ? theme.returnPositive : theme.returnNegative,
              },
            ]}
          >
            {isPositive ? "+" : ""}
            {formatCurrency(totalReturn)}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View
        style={[styles.divider, { backgroundColor: theme.backgroundSelected }]}
      />

      {/* Seções */}
      {[
        { label: "Ações", icon: "chart-line" as const, items: acoes },
        {
          label: "Fundos Imobiliários",
          icon: "office-building" as const,
          items: fiis,
        },
      ].map((section) => (
        <View key={section.label}>
          <View style={styles.sectionHeader}>
            <Icon name={section.icon} size={13} color={theme.textSecondary} />
            <Text style={styles.sectionLabel} themeColor="textSecondary">
              {section.label}
            </Text>
          </View>
          {section.items.map((asset) => {
            const { total, pct } = calcReturn(asset);
            const pos = pct >= 0;
            return (
              <View key={asset.ticker} style={styles.assetRow}>
                <View
                  style={[
                    styles.tickerBadge,
                    { backgroundColor: theme.backgroundSelected },
                  ]}
                >
                  <Text style={styles.tickerText}>{asset.ticker}</Text>
                </View>
                <View style={styles.assetInfo}>
                  <Text style={styles.assetName}>{asset.name}</Text>
                  <Text style={styles.assetQty} themeColor="textSecondary">
                    {asset.quantity} {asset.type === "acao" ? "ações" : "cotas"} · R$ {asset.currentPrice.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.assetRight}>
                  <Text style={styles.assetTotal}>{formatCurrency(total)}</Text>
                  <Text
                    style={[
                      styles.assetPct,
                      {
                        color: pos
                          ? theme.returnPositive
                          : theme.returnNegative,
                      },
                    ]}
                  >
                    {pos ? "+" : ""}
                    {pct.toFixed(2)}%
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      ))}

      {/* Ver detalhes */}
      <Pressable
        style={[
          styles.detailsBtn,
          { borderTopColor: theme.backgroundSelected },
        ]}
      >
        <Text style={[styles.detailsText, { color: theme.primary }]}>
          Ver carteira completa
        </Text>
        <Icon name="chevron-right" size={16} color={theme.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgePct: {
    fontSize: 12,
    fontWeight: "700",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 2,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  returnCol: {
    alignItems: "flex-end",
  },
  returnValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  assetRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  tickerBadge: {
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 4,
    minWidth: 56,
    alignItems: "center",
  },
  tickerText: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 13,
    fontWeight: "600",
  },
  assetQty: {
    fontSize: 11,
    marginTop: 1,
  },
  assetRight: {
    alignItems: "flex-end",
  },
  assetTotal: {
    fontSize: 13,
    fontWeight: "600",
  },
  assetPct: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 1,
  },
  detailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingTop: 8,
    borderTopWidth: 1,
    marginTop: 4,
  },
  detailsText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
