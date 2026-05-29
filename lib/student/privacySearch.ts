import type { LostFoundPost } from "@/data/studentDemo";

export type PrivacyRisk = {
  score: number;
  status: "auto_pass" | "admin_review" | "auto_rejected";
  evidence: string[];
  strongEvidence: boolean;
};

const privacyPatterns: { label: string; pattern: RegExp; weight: number; strong?: boolean }[] = [
  { label: "số điện thoại", pattern: /(?:\+?84|0)(?:\d[\s.-]?){8,10}/i, weight: 28, strong: true },
  { label: "email", pattern: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, weight: 24, strong: true },
  { label: "CCCD/CMND", pattern: /\b\d{9}(\d{3})?\b/, weight: 34, strong: true },
  { label: "MSSV hoặc mã sinh viên", pattern: /\b(?:mssv|student\s?id|sv|n\d{2}|b\d{2})[\s:-]?\d{5,10}\b/i, weight: 30, strong: true },
  { label: "số tài khoản/ngân hàng", pattern: /\b\d{10,16}\b/, weight: 30, strong: true },
  { label: "biển số xe", pattern: /\b\d{2}[A-Z][A-Z0-9]?[-\s]?\d{3,5}\b/i, weight: 22 },
  { label: "địa chỉ chi tiết", pattern: /\b(?:số|hẻm|ngõ|đường|phường|quận|ấp|khu phố)\s+[A-Za-zÀ-ỹ0-9\s/.-]{4,}/i, weight: 18 }
];

export function analyzePrivacyText(text: string): PrivacyRisk {
  const evidence = privacyPatterns.filter((item) => item.pattern.test(text));
  const score = Math.min(100, evidence.reduce((total, item) => total + item.weight, 0));
  const strongEvidence = evidence.some((item) => item.strong) && score >= 60;

  return {
    score,
    status: score <= 10 ? "auto_pass" : score >= 60 && strongEvidence ? "auto_rejected" : "admin_review",
    evidence: evidence.map((item) => item.label),
    strongEvidence
  };
}

const synonyms: Record<string, string[]> = {
  "ví": ["bóp", "wallet"],
  "bóp": ["ví", "wallet"],
  "thẻ sinh viên": ["mssv", "student card", "thẻ sv"],
  "mssv": ["thẻ sinh viên", "student card"],
  "tai nghe": ["airpods", "earbuds", "headphone"],
  "airpods": ["tai nghe", "earbuds"],
  "ktx b": ["ký túc xá khu b", "khu b", "kí túc xá b"],
  "bình nước": ["chai nước", "water bottle"],
  "chai nước": ["bình nước", "water bottle"]
};

function normalize(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function expandVietnameseQuery(query: string) {
  const lower = query.toLowerCase();
  const terms = new Set(lower.split(/\s+/).filter(Boolean));
  for (const [key, values] of Object.entries(synonyms)) {
    if (lower.includes(key)) {
      values.forEach((value) => terms.add(value));
    }
  }
  return Array.from(terms);
}

export function scoreLostFoundMatch(post: LostFoundPost, query: string) {
  if (!query.trim()) {
    return { score: 1, label: "Có vẻ liên quan" };
  }

  const terms = expandVietnameseQuery(query).map(normalize);
  const haystack = normalize([
    post.title,
    post.description,
    post.category,
    post.color,
    post.brand,
    post.locationText
  ].join(" "));
  const hits = terms.filter((term) => haystack.includes(term)).length;
  const ratio = hits / Math.max(terms.length, 1);
  const score = Math.round(ratio * 100);

  return {
    score,
    label: score >= 60 ? "Rất có thể liên quan" : score >= 30 ? "Có vẻ liên quan" : "Có vài điểm giống"
  };
}

export function smartFilterLostFound(posts: LostFoundPost[], query: string) {
  if (!query.trim()) return posts.map((post) => ({ post, match: scoreLostFoundMatch(post, query) }));
  return posts
    .map((post) => ({ post, match: scoreLostFoundMatch(post, query) }))
    .filter((item) => item.match.score > 0)
    .sort((a, b) => b.match.score - a.match.score);
}
