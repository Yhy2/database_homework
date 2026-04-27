import { computed, ref } from "vue";

export interface MerchantSession {
  merchantName: string;
  accessToken: string;
}

const STORAGE_KEY = "campus-secondhand-merchant-session";
const DEFAULT_DEMO_TOKEN = "local-demo-token";

function readStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<MerchantSession>;
    if (parsed.merchantName && parsed.accessToken) {
      return {
        merchantName: parsed.merchantName,
        accessToken: parsed.accessToken,
      };
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return null;
}

const merchantSession = ref<MerchantSession | null>(readStoredSession());

export const isMerchantAuthenticated = computed(() => Boolean(merchantSession.value));
export const activeMerchantName = computed(
  () => merchantSession.value?.merchantName ?? "游客",
);

export function getExpectedDemoAccessToken() {
  return import.meta.env.VITE_DEMO_ACCESS_TOKEN || DEFAULT_DEMO_TOKEN;
}

export function getMerchantAccessToken() {
  return merchantSession.value?.accessToken ?? "";
}

export function loginMerchant(session: MerchantSession) {
  merchantSession.value = {
    merchantName: session.merchantName.trim(),
    accessToken: session.accessToken,
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merchantSession.value));
  }
}

export function logoutMerchant() {
  merchantSession.value = null;

  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export function resetAuthSessionForTest() {
  logoutMerchant();
}

export function useAuthSession() {
  return {
    activeMerchantName,
    isMerchantAuthenticated,
    loginMerchant,
    logoutMerchant,
  };
}
