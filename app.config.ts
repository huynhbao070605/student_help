import type { ExpoConfig } from "expo/config";

const config = {
  name: "Student Help",
  slug: "student-help",
  scheme: "studenthelp",
  version: "0.1.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#FFF4EA"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: false
  },
  android: {
    package: "com.studenthelp.app",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#FFF4EA"
    },
    permissions: []
  },
  extra: {
    themeColor: "#FF8A7A",
    supabaseConfigured: Boolean(
      process.env.EXPO_PUBLIC_SUPABASE_URL && process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
    )
  },
  plugins: ["expo-router"]
};

export default config as ExpoConfig;
