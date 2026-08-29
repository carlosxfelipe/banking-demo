import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";

import { Text } from "@/components/text";
import { Icon } from "@/components/icon";
import { useTheme } from "@/hooks/use-theme";
import { LinearGradient } from "expo-linear-gradient";
import { formatCurrency } from "@/utils/format-currency";
import { type Product, type Category, CATEGORIES, PRODUCTS } from "./shop-data";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

function StarRating({ rating }: { rating: number }) {
  const theme = useTheme();
  const stars = Math.round(rating);
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text
          key={i}
          style={{ fontSize: 10, color: i <= stars ? "#F59E0B" : theme.border }}
        >
          ★
        </Text>
      ))}
    </View>
  );
}

export default function ShopScreen() {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat =
        selectedCategory === "all" || p.category === selectedCategory;
      const matchSearch =
        searchText.trim() === "" ||
        p.name.toLowerCase().includes(searchText.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchText.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchText]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const discount = (product: Product) => {
    if (!product.oldPrice) return null;
    return Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100,
    );
  };

  const installments = (price: number) => {
    const parcela = price / 12;
    return `12x ${formatCurrency(parcela)}`;
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundElement }]}
    >
      {/* Search Bar */}
      <View
        style={[
          styles.searchBar,
          { backgroundColor: theme.background, borderColor: theme.border },
        ]}
      >
        <Icon name="magnify" size={18} color={theme.placeholder} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Buscar produtos..."
          placeholderTextColor={theme.placeholder}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Icon name="close" size={16} color={theme.placeholder} />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
          style={styles.categoriesScroll}
        >
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: active ? theme.primary : theme.background,
                    borderColor: active ? theme.primary : theme.border,
                  },
                ]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Icon
                  name={cat.icon as any}
                  size={14}
                  color={active ? theme.onPrimary : theme.textSecondary}
                />
                <Text
                  style={[
                    styles.categoryLabel,
                    { color: active ? theme.onPrimary : theme.textSecondary },
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.08)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.categoriesFade}
          pointerEvents="none"
        />
      </View>

      {/* Results count */}
      <View style={styles.resultsRow}>
        <Text type="small" style={{ color: theme.textSecondary }}>
          {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
        </Text>
      </View>

      {/* Products Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="package-variant" size={48} color={theme.border} />
            <Text style={{ color: theme.textSecondary, marginTop: 12 }}>
              Nenhum produto encontrado
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const disc = discount(item);
          const inWish = wishlist.has(item.id);
          return (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: theme.background,
                  width: CARD_WIDTH,
                  shadowColor: theme.text,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: theme.border,
                },
              ]}
            >
              {/* Badge */}
              {item.badge && !disc && (
                <View
                  style={[styles.badge, { backgroundColor: theme.primary }]}
                >
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              )}

              {/* Discount */}
              {disc && (
                <View
                  style={[styles.discountBadge, { backgroundColor: "#16a34a" }]}
                >
                  <Text style={styles.badgeText}>-{disc}%</Text>
                </View>
              )}

              {/* Wishlist */}
              <TouchableOpacity
                style={styles.wishlistBtn}
                onPress={() => toggleWishlist(item.id)}
              >
                <Icon
                  name={inWish ? "heart" : "heart-outline"}
                  size={18}
                  color={inWish ? theme.primary : theme.border}
                />
              </TouchableOpacity>

              {/* Product Image */}
              <View
                style={[
                  styles.imageContainer,
                  { backgroundColor: theme.backgroundElement },
                ]}
              >
                {failedImages.has(item.id) ? (
                  <View style={styles.imageFallback}>
                    <Icon name="image-off" size={32} color="#ccc" />
                    <Text style={styles.imageFallbackText}>{item.brand}</Text>
                  </View>
                ) : (
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.productImage}
                    contentFit="contain"
                    onError={() =>
                      setFailedImages((prev) => new Set(prev).add(item.id))
                    }
                  />
                )}
              </View>

              {/* Info */}
              <View style={styles.cardInfo}>
                {/* Top: variable content */}
                <View style={styles.cardTop}>
                  <Text
                    style={[styles.brandText, { color: theme.textSecondary }]}
                    numberOfLines={1}
                  >
                    {item.brand}
                  </Text>
                  <Text
                    style={[styles.productName, { color: theme.text }]}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>

                  {/* Stars */}
                  <View style={styles.ratingRow}>
                    <StarRating rating={item.rating} />
                    <Text
                      style={[
                        styles.reviewsText,
                        { color: theme.textSecondary },
                      ]}
                    >
                      ({item.reviews.toLocaleString("pt-BR")})
                    </Text>
                  </View>
                </View>

                {/* Bottom: price + button always at bottom */}
                <View>
                  {item.oldPrice && (
                    <Text
                      style={[styles.oldPrice, { color: theme.textSecondary }]}
                    >
                      {formatCurrency(item.oldPrice)}
                    </Text>
                  )}
                  <Text style={[styles.price, { color: theme.text }]}>
                    {formatCurrency(item.price)}
                  </Text>
                  <Text
                    style={[
                      styles.installments,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {installments(item.price)} sem juros
                  </Text>

                  {/* Buy Button */}
                  <TouchableOpacity
                    style={[
                      styles.buyButton,
                      { backgroundColor: theme.primary },
                    ]}
                    activeOpacity={0.85}
                  >
                    <Icon name="cart" size={14} color={theme.onPrimary} />
                    <Text style={[styles.buyText, { color: theme.onPrimary }]}>
                      Comprar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
  categoriesWrapper: {
    position: "relative",
  },
  categoriesScroll: {
    flexGrow: 0,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 8,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  categoriesFade: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 48,
    zIndex: 1,
  },
  resultsRow: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  columnWrapper: {
    gap: 16,
    paddingHorizontal: 16,
  },
  gridContent: {
    paddingTop: 4,
    paddingBottom: 100,
    gap: 16,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 2,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
  wishlistBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
    padding: 4,
  },
  imageContainer: {
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  imageFallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  imageFallbackText: {
    fontSize: 11,
    color: "#bbb",
    fontWeight: "600",
  },
  cardInfo: {
    flex: 1,
    padding: 12,
    gap: 8,
    justifyContent: "space-between",
  },
  cardTop: {
    gap: 3,
  },
  brandText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  starsRow: {
    flexDirection: "row",
    gap: 1,
  },
  reviewsText: {
    fontSize: 10,
  },
  oldPrice: {
    fontSize: 11,
    textDecorationLine: "line-through",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
  },
  installments: {
    fontSize: 10,
    marginBottom: 8,
  },
  buyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
    marginTop: 4,
  },
  buyText: {
    fontSize: 13,
    fontWeight: "700",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
});
