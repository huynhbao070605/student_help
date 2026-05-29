export function normalizePhone(rawPhone: string) {
  return rawPhone.replace(/[^\d+]/g, "").replace(/^\+84/, "0");
}

export function vendorPhoneToEmail(rawPhone: string) {
  const phone = normalizePhone(rawPhone);
  return `${phone}@vendor.studenthelp.local`;
}

