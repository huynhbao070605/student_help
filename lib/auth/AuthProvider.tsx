import { Session, User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";
import { vendorPhoneToEmail } from "./vendorEmail";

export type AppRole = "student" | "admin" | "vendor";

export type Profile = {
  id: string;
  role: AppRole;
  display_name: string;
  email: string | null;
  phone: string | null;
  phone_share_enabled: boolean;
  avatar_path: string | null;
  verification_status: "not_submitted" | "pending" | "approved" | "rejected" | "resubmit_requested";
  reputation_score: number;
  created_at: string;
  last_active_at: string;
};

type AuthContextValue = {
  configured: boolean;
  loading: boolean;
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  refreshProfile: () => Promise<void>;
  signInStudent: (email: string, password: string) => Promise<void>;
  signInVendor: (phone: string, password: string) => Promise<void>;
  signUpStudent: (params: { email: string; password: string; displayName: string; phone?: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    if (!supabase) {
      setProfile(null);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    const currentUser = userData.user;

    if (!currentUser) {
      setProfile(null);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("id, role, display_name, email, phone, phone_share_enabled, avatar_path, verification_status, reputation_score, created_at, last_active_at")
      .eq("id", currentUser.id)
      .single();

    if (error) {
      throw error;
    }

    setProfile(data as Profile);
  }, []);

  useEffect(() => {
    let active = true;

    async function boot() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!active) return;
      setSession(data.session);

      if (data.session) {
        await refreshProfile();
      }

      setLoading(false);
    }

    boot().catch(() => setLoading(false));

    if (!supabase) {
      return () => {
        active = false;
      };
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession) {
        refreshProfile().catch(() => undefined);
      } else {
        setProfile(null);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [refreshProfile]);

  const signInStudent = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error("Supabase chưa được cấu hình.");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) throw error;
    await refreshProfile();
  }, [refreshProfile]);

  const signInVendor = useCallback(async (phone: string, password: string) => {
    if (!supabase) throw new Error("Supabase chưa được cấu hình.");
    const { error } = await supabase.auth.signInWithPassword({
      email: vendorPhoneToEmail(phone),
      password
    });
    if (error) throw error;
    await refreshProfile();
  }, [refreshProfile]);

  const signUpStudent = useCallback(async (params: { email: string; password: string; displayName: string; phone?: string }) => {
    if (!supabase) throw new Error("Supabase chưa được cấu hình.");
    const { error } = await supabase.auth.signUp({
      email: params.email.trim(),
      password: params.password,
      options: {
        data: {
          role: "student",
          display_name: params.displayName,
          phone: params.phone
        }
      }
    });
    if (error) throw error;
    await refreshProfile();
  }, [refreshProfile]);

  const logout = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    configured: isSupabaseConfigured,
    loading,
    session,
    user: session?.user ?? null,
    profile,
    refreshProfile,
    signInStudent,
    signInVendor,
    signUpStudent,
    logout
  }), [loading, logout, profile, refreshProfile, session, signInStudent, signInVendor, signUpStudent]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}

