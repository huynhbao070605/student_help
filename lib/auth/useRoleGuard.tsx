import { Redirect } from "expo-router";

import { AppLoadingState } from "@/components/ui";
import { AppRole, useAuth } from "./AuthProvider";

export function useRoleGuard(role: AppRole) {
  const { configured, loading, session, profile } = useAuth();

  if (!configured) {
    return null;
  }

  if (loading) {
    return <AppLoadingState label="Đang kiểm tra phiên đăng nhập..." />;
  }

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  if (profile && profile.role !== role) {
    if (profile.role === "admin") return <Redirect href="/(admin)" />;
    if (profile.role === "vendor") return <Redirect href="/(vendor)" />;
    return <Redirect href="/(student)" />;
  }

  return null;
}

