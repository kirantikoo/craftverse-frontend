export type PricingRegion = {
  country: string;
  currency: string;
  symbol: string;
  amount: number;
  label: string;
};

export const REGIONAL_PRICES = {
  AU: {
    country: "Australia",
    currency: "AUD",
    symbol: "$",
    amount: 5,
    label: "AUD $5/month",
  },
  IN: {
    country: "India",
    currency: "INR",
    symbol: "₹",
    amount: 299,
    label: "₹299/month",
  },
  US: {
    country: "United States",
    currency: "USD",
    symbol: "$",
    amount: 4.99,
    label: "USD $4.99/month",
  },
  GB: {
    country: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    amount: 3.99,
    label: "£3.99/month",
  },
  EU: {
    country: "Europe",
    currency: "EUR",
    symbol: "€",
    amount: 4.99,
    label: "€4.99/month",
  },
} satisfies Record<string, PricingRegion>;

export const DEFAULT_PRICING = REGIONAL_PRICES.US;

const DEFAULT_COUNTRY_CODE = "DEFAULT";

const EUROPE_COUNTRY_CODES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
]);

export function getPricingByCountry(countryCode?: string | null) {
  const normalizedCountryCode = countryCode?.trim().toUpperCase();

  if (!normalizedCountryCode || normalizedCountryCode === DEFAULT_COUNTRY_CODE || normalizedCountryCode === "OTHER") {
    return DEFAULT_PRICING;
  }

  if (normalizedCountryCode in REGIONAL_PRICES) {
    return REGIONAL_PRICES[normalizedCountryCode as keyof typeof REGIONAL_PRICES];
  }

  if (EUROPE_COUNTRY_CODES.has(normalizedCountryCode)) {
    return REGIONAL_PRICES.EU;
  }

  return DEFAULT_PRICING;
}

export function getCountryCodeFromLocale(locale?: string) {
  if (!locale) {
    return DEFAULT_COUNTRY_CODE;
  }

  const parts = locale.replace("_", "-").split("-");
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : DEFAULT_COUNTRY_CODE;
}

function getCountryCodeFromTimezone(timeZone?: string) {
  if (!timeZone) {
    return DEFAULT_COUNTRY_CODE;
  }

  if (timeZone.startsWith("Australia/")) {
    return "AU";
  }

  if (timeZone === "Asia/Kolkata" || timeZone === "Asia/Calcutta") {
    return "IN";
  }

  if (timeZone === "Europe/London") {
    return "GB";
  }

  if (timeZone.startsWith("Europe/")) {
    return "EU";
  }

  return DEFAULT_COUNTRY_CODE;
}

export async function detectUserCountry() {
  if (typeof navigator !== "undefined") {
    const locales = navigator.languages?.length
      ? navigator.languages
      : [navigator.language];

    for (const locale of locales) {
      const countryCode = getCountryCodeFromLocale(locale);

      if (countryCode !== DEFAULT_COUNTRY_CODE) {
        return countryCode;
      }
    }
  }

  if (typeof Intl !== "undefined") {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const countryCode = getCountryCodeFromTimezone(timeZone);

    if (countryCode !== DEFAULT_COUNTRY_CODE) {
      return countryCode;
    }
  }

  return DEFAULT_COUNTRY_CODE;
}
