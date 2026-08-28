import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, Tabs, ThemeProvider } from "expo-router";
import { Platform } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { Icon } from "@/components/icon";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { IosNativeTabs } from "@/layouts/ios-native-tabs";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const scheme =
    colorScheme === "unspecified" ? "light" : (colorScheme ?? "light");
  const colors = Colors[scheme];

  const [fontsLoaded] = useFonts({
    MaterialDesignIcons: require("@react-native-vector-icons/material-design-icons/fonts/MaterialDesignIcons.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (Platform.OS === "ios") {
    return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <IosNativeTabs colors={colors} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Tabs
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 17,
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
          tabBarStyle: {
            backgroundColor: colors.background,
            borderTopColor: colors.backgroundElement,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="(home)"
          options={{
            headerShown: false, // Hide the global header here to use the Stack's header
            title: "Início",
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name={focused ? "home" : "home-outline"}
                size={24}
                color={color as string}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(chat)"
          options={{
            title: "Chat",
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name={focused ? "chat" : "chat-outline"}
                size={24}
                color={color as string}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(shop)"
          options={{
            title: "Shop",
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name={focused ? "shopping" : "shopping-outline"}
                size={24}
                color={color as string}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(services)"
          options={{
            title: "Serviços",
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name={focused ? "view-grid" : "view-grid-outline"}
                size={24}
                color={color as string}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color, focused }) => (
              <Icon
                name={focused ? "account" : "account-outline"}
                size={24}
                color={color as string}
              />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
