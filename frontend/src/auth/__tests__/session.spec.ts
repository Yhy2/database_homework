import { beforeEach, describe, expect, it } from "vitest";

import {
  getAuthToken,
  isMerchantAuthenticated,
  loginMerchant,
  logoutMerchant,
  resetAuthSessionForTest,
} from "../session";

describe("auth session", () => {
  beforeEach(() => {
    localStorage.clear();
    resetAuthSessionForTest();
  });

  it("keeps visitors in read-only mode until account login succeeds", () => {
    expect(isMerchantAuthenticated.value).toBe(false);
    expect(getAuthToken()).toBe("");

    loginMerchant({
      user: { user_id: "u001", user_name: "ZhangSan", phone: "13800000001" },
      token: "signed-token",
    });

    expect(isMerchantAuthenticated.value).toBe(true);
    expect(getAuthToken()).toBe("signed-token");

    logoutMerchant();

    expect(isMerchantAuthenticated.value).toBe(false);
    expect(getAuthToken()).toBe("");
  });
});
