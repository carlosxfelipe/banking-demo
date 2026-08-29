import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";

import { Icon } from "@/components/icon";
import { Text } from "@/components/text";

export function PromoCard() {
  return (
    <Pressable style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/4746224/pexels-photo-4746224.jpeg",
        }}
        style={styles.image}
        imageStyle={styles.imageRadius}
      >
        <LinearGradient
          colors={["transparent", "rgba(232, 0, 61, 0.9)"]}
          style={styles.overlay}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Seguro de Vida</Text>
          <Text style={styles.subtitle}>
            Proteja quem você ama com coberturas a partir de R$ 9,90 ao mês.
          </Text>
          <View style={styles.action}>
            <Text style={styles.actionText}>Fazer simulação</Text>
            <Icon name="arrow-right" size={14} color="#fff" />
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageRadius: {
    borderRadius: 16,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 16,
  },
  content: {
    padding: 16,
    gap: 6,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
