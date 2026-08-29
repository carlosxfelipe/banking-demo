import { Stack } from "expo-router";

import { defaultHeaderOptions } from "@/constants/header";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={defaultHeaderOptions}>
      <Stack.Screen name="index" options={{ title: "Perfil" }} />
    </Stack>
  );
}
