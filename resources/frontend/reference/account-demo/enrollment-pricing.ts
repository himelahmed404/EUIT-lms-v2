type EnrollChoice = { format: "online" | "offline"; batch: "16" | "18"; plan: "full" | "installments" };

export const ENROLL_PRICES = {
  offline: 15000,
  online: 10000,
} as const;

export function enrollmentChoice(params: Pick<URLSearchParams, "get">): EnrollChoice {
  return {
    batch: params.get("batch") === "18" ? "18" : "16",
    format: params.get("format") === "online" ? "online" : "offline",
    plan: params.get("plan") === "full" ? "full" : "installments",
  };
}

export function priceFor(choice: EnrollChoice): number {
  return ENROLL_PRICES[choice.format];
}

export function installmentAmount(choice: EnrollChoice): number {
  const total = priceFor(choice);
  return choice.plan === "full" ? total : Math.round(total / 3);
}

export const DEMO_COUPONS: Record<string, { label: string; off: number }> = {
  EIT1000: { label: "৳1,000 off", off: 1000 },
  FRIEND: { label: "Referral · ৳1,000 off", off: 1000 },
};
