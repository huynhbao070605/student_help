import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

const DEMO_DOMAIN = "studenthelp.local";
const VENDOR_DOMAIN = "vendor.studenthelp.local";

const accounts = [
  {
    email: "admin@studenthelp.local",
    password: "StudentHelp123!",
    role: "admin",
    displayName: "Admin Student Help",
    phone: null,
    verificationStatus: "approved",
    reputationScore: 100,
  },
  {
    email: "minhanh@studenthelp.local",
    password: "StudentHelp123!",
    role: "student",
    displayName: "Minh Anh",
    phone: "0900000101",
    verificationStatus: "approved",
    reputationScore: 86,
  },
  {
    email: "quanghuy@studenthelp.local",
    password: "StudentHelp123!",
    role: "student",
    displayName: "Quang Huy",
    phone: "0900000102",
    verificationStatus: "pending",
    reputationScore: 35,
  },
  {
    email: "0900000201@vendor.studenthelp.local",
    password: "VendorDemo123!",
    role: "vendor",
    displayName: "Com tam Co Ba",
    phone: "0900000201",
    verificationStatus: "approved",
    reputationScore: 91,
    vendor: {
      name: "Com tam Co Ba",
      category: "restaurant",
      description: "Com tam sinh vien, dat thu cong qua chat.",
      address_text: "Gan cong KTX Khu B",
      area: "Lang Dai hoc",
    },
  },
  {
    email: "0900000202@vendor.studenthelp.local",
    password: "VendorDemo123!",
    role: "vendor",
    displayName: "Tra sua May Nho",
    phone: "0900000202",
    verificationStatus: "approved",
    reputationScore: 88,
    vendor: {
      name: "Tra sua May Nho",
      category: "drink_shop",
      description: "Tra sua va topping gia mem cho sinh vien.",
      address_text: "Di An Center",
      area: "Di An",
    },
  },
];

function loadDotEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    if (process.env[key]) {
      continue;
    }

    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

function requireEnv() {
  loadDotEnv();

  const supabaseUrl =
    process.env.SUPABASE_URL ?? process.env.EXPO_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey =
    process.env.SUPABASE_ANON_KEY ?? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  const missing = [];
  if (!supabaseUrl) missing.push("SUPABASE_URL or EXPO_PUBLIC_SUPABASE_URL");
  if (!serviceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!anonKey) missing.push("SUPABASE_ANON_KEY or EXPO_PUBLIC_SUPABASE_ANON_KEY");

  if (missing.length > 0) {
    throw new Error(`Missing required local env values: ${missing.join(", ")}`);
  }

  return { supabaseUrl, serviceRoleKey, anonKey };
}

function assertDemoEmail(email) {
  if (!email.endsWith(`@${DEMO_DOMAIN}`) && !email.endsWith(`@${VENDOR_DOMAIN}`)) {
    throw new Error(`Refusing to modify non-demo email: ${email}`);
  }
}

async function findUserByEmail(adminClient, email) {
  let page = 1;
  const perPage = 1000;

  while (true) {
    const { data, error } = await adminClient.auth.admin.listUsers({
      page,
      perPage,
    });
    if (error) {
      throw error;
    }

    const user = data.users.find(
      (candidate) => candidate.email?.toLowerCase() === email.toLowerCase(),
    );
    if (user) {
      return user;
    }

    if (data.users.length < perPage) {
      return null;
    }
    page += 1;
  }
}

async function deleteExistingDemoUser(adminClient, email) {
  assertDemoEmail(email);
  const existing = await findUserByEmail(adminClient, email);
  if (!existing) {
    return;
  }

  const { error } = await adminClient.auth.admin.deleteUser(existing.id);
  if (error) {
    throw new Error(`Could not delete existing demo user ${email}: ${error.message}`);
  }
}

async function createAuthUser(adminClient, account) {
  assertDemoEmail(account.email);
  await deleteExistingDemoUser(adminClient, account.email);

  const { data, error } = await adminClient.auth.admin.createUser({
    email: account.email,
    password: account.password,
    email_confirm: true,
    user_metadata: {
      role: account.role,
      display_name: account.displayName,
      phone: account.phone,
    },
  });

  if (error || !data.user) {
    throw new Error(`Could not create ${account.email}: ${error?.message}`);
  }

  return data.user;
}

async function upsertProfile(adminClient, user, account) {
  const { error } = await adminClient.from("profiles").upsert(
    {
      id: user.id,
      role: account.role,
      display_name: account.displayName,
      email: account.email,
      phone: account.phone,
      phone_share_enabled: account.role === "vendor",
      verification_status: account.verificationStatus,
      reputation_score: account.reputationScore,
      last_active_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    throw new Error(`Could not upsert profile for ${account.email}: ${error.message}`);
  }
}

async function upsertVendor(adminClient, user, account) {
  if (!account.vendor) {
    return;
  }

  const vendorPayload = {
    owner_id: user.id,
    name: account.vendor.name,
    category: account.vendor.category,
    description: account.vendor.description,
    address_text: account.vendor.address_text,
    area: account.vendor.area,
    phone: account.phone,
    reputation_score: account.reputationScore,
    is_active: true,
    is_open: true,
  };

  const { data: existing, error: selectError } = await adminClient
    .from("vendors")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (selectError) {
    throw new Error(`Could not inspect vendor for ${account.email}: ${selectError.message}`);
  }

  const query = existing
    ? adminClient.from("vendors").update(vendorPayload).eq("id", existing.id)
    : adminClient.from("vendors").insert(vendorPayload);

  const { error } = await query;
  if (error) {
    throw new Error(`Could not upsert vendor for ${account.email}: ${error.message}`);
  }
}

async function verifyLogin(supabaseUrl, anonKey, account) {
  const client = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: signInData, error: signInError } =
    await client.auth.signInWithPassword({
      email: account.email,
      password: account.password,
    });

  if (signInError || !signInData.user) {
    throw new Error(`Login failed for ${account.email}: ${signInError?.message}`);
  }

  const { data: profile, error: profileError } = await client
    .from("profiles")
    .select("id, role, display_name, email, phone, verification_status, reputation_score")
    .eq("id", signInData.user.id)
    .single();

  if (profileError || !profile) {
    throw new Error(`Profile load failed for ${account.email}: ${profileError?.message}`);
  }

  if (profile.role !== account.role) {
    throw new Error(
      `Role mismatch for ${account.email}: expected ${account.role}, got ${profile.role}`,
    );
  }

  await client.auth.signOut();
}

async function main() {
  const { supabaseUrl, serviceRoleKey, anonKey } = requireEnv();
  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  for (const account of accounts) {
    const user = await createAuthUser(adminClient, account);
    await upsertProfile(adminClient, user, account);
    await upsertVendor(adminClient, user, account);
    await verifyLogin(supabaseUrl, anonKey, account);
    console.log(`ok ${account.role} ${account.email}`);
  }

  console.log("Demo Auth users repaired and verified.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
