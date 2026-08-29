import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  Slot,
  ThemeProvider,
  useRouter,
  useSegments,
} from "expo-router";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { Icon } from "@/components/icon";
import { Text } from "@/components/text";
import { Colors } from "@/constants/theme";
import { BREAKPOINT } from "@/constants/layout";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function WebLayout() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const scheme =
    colorScheme === "unspecified" ? "light" : (colorScheme ?? "light");
  const colors = Colors[scheme];
  const router = useRouter();
  const segments = useSegments();

  const navItems = [
    {
      name: "Início",
      path: "/(home)",
      activeIcon: "home",
      inactiveIcon: "home-outline",
    },
    {
      name: "Chat",
      path: "/(chat)",
      activeIcon: "chat",
      inactiveIcon: "chat-outline",
    },
    {
      name: "Shop",
      path: "/(shop)",
      activeIcon: "shopping",
      inactiveIcon: "shopping-outline",
    },
    {
      name: "Serviços",
      path: "/(services)",
      activeIcon: "view-grid",
      inactiveIcon: "view-grid-outline",
    },
    {
      name: "Perfil",
      path: "/(profile)",
      activeIcon: "account",
      inactiveIcon: "account-outline",
    },
  ] as const;

  const [fontsLoaded] = useFonts({
    MaterialDesignIcons: require("@react-native-vector-icons/material-design-icons/fonts/MaterialDesignIcons.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const isDesktop = width >= BREAKPOINT;

  // Scenario 1: Small screens (Mobile Web) -> Keep the Bottom Navigation Bar identical to the native app
  if (!isDesktop) {
    return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <View style={styles.content}>
            <Slot />
          </View>
          {/* Bottom Navbar */}
          <View
            style={[
              styles.bottomNav,
              {
                backgroundColor: colors.background,
                borderTopColor: colors.backgroundElement,
              },
            ]}
          >
            {navItems.map((item) => {
              const isActive = (segments as string[]).includes(
                item.path.replace("/", ""),
              );
              return (
                <Pressable
                  key={item.path}
                  onPress={() => router.push(item.path)}
                  style={({ pressed }) => [
                    styles.bottomNavItem,
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  <Icon
                    name={isActive ? item.activeIcon : item.inactiveIcon}
                    size={24}
                    color={isActive ? colors.primary : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.bottomNavLabel,
                      {
                        color: isActive ? colors.text : colors.textSecondary,
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ThemeProvider>
    );
  }

  // Scenario 2: Large screens (Desktop/Tablet) -> Top Navbar

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Top Navbar */}
        <View
          style={[
            styles.navbar,
            {
              backgroundColor: colors.background,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View style={styles.logoContainer}>
            <Icon name="bank" size={22} color={colors.primary} />
            <Text style={[styles.logoText, { color: colors.primary }]}>
              Banking Demo
            </Text>
          </View>
          <View style={styles.navLinks}>
            {navItems.map((item) => {
              const isActive = (segments as string[]).includes(
                item.path.replace("/", ""),
              );
              return (
                <Pressable
                  key={item.path}
                  onPress={() => router.push(item.path)}
                  style={({ hovered }) => [
                    styles.navItem,
                    isActive && { borderBottomColor: colors.primary },
                    !isActive &&
                      hovered && { borderBottomColor: colors.border },
                    hovered && {
                      backgroundColor: colors.backgroundElement,
                    },
                  ]}
                >
                  {({ hovered }) => (
                    <>
                      <Icon
                        name={
                          isActive || hovered
                            ? item.activeIcon
                            : item.inactiveIcon
                        }
                        size={20}
                        color={
                          isActive
                            ? colors.primary
                            : hovered
                              ? colors.text
                              : colors.textSecondary
                        }
                      />
                      <Text
                        style={[
                          styles.navText,
                          {
                            color: isActive
                              ? colors.text
                              : hovered
                                ? colors.text
                                : colors.textSecondary,
                            fontWeight: isActive ? "700" : "500",
                          },
                        ]}
                      >
                        {item.name}
                      </Text>
                    </>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Main content area */}
        <View style={styles.content}>
          <Slot />
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    height: 64,
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 10,
  },
  logoContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  navLinks: {
    flexDirection: "row",
    gap: 8,
    height: "100%",
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
    height: "100%",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    // React Native Web support for smooth transitions
    ...({
      transitionProperty: "all",
      transitionDuration: "200ms",
    } as any),
  },
  navText: {
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 1,
    height: 64,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: 2,
  },
  bottomNavLabel: {
    fontSize: 11,
    fontWeight: "500",
  },
});
