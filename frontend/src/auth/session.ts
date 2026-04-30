import { computed, ref } from "vue";

import type { AuthSession } from "../types";

const STORAGE_KEY = "campus-secondhand-auth-session";

function readStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<AuthSession>;
    if (parsed.user?.user_id && parsed.user.user_name && parsed.user.phone && parsed.token) {
      return {
        user: {
          user_id: parsed.user.user_id,
          user_name: parsed.user.user_name,
          phone: parsed.user.phone,
        },
        token: parsed.token,
      };
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return null;
}

const authSession = ref<AuthSession | null>(readStoredSession());

export const isAuthenticated = computed(() => Boolean(authSession.value));
export const activeUserName = computed(() => authSession.value?.user.user_name ?? "游客");
export const activeUserId = computed(() => authSession.value?.user.user_id ?? "");

export const isMerchantAuthenticated = isAuthenticated;
export const activeMerchantName = activeUserName;

export function getAuthToken() {
  return authSession.value?.token ?? "";
}

export function getMerchantAccessToken() {
  return getAuthToken();
}

export function saveAuthSession(session: AuthSession) {
  authSession.value = session;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(authSession.value));
  }
}

export const loginMerchant = saveAuthSession;

export function clearAuthSession() {
  authSession.value = null;

  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export const logoutMerchant = clearAuthSession;

export function resetAuthSessionForTest() {
  clearAuthSession();
}

export function useAuthSession() {
  return {
    activeUserId,
    activeUserName,
    activeMerchantName,
    isAuthenticated,
    isMerchantAuthenticated,
    saveAuthSession,
    logoutMerchant,
  };
}
