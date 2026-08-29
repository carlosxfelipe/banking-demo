import { Stack } from "expo-router";

import { defaultHeaderOptions } from "@/constants/header";

export default function ShopLayout() {
  return (
    <Stack screenOptions={defaultHeaderOptions}>
      <Stack.Screen name="index" options={{ title: "Shop" }} />
    </Stack>
  );
}
