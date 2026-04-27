import { beforeEach, describe, expect, it } from "vitest";

import {
  getMerchantAccessToken,
  isMerchantAuthenticated,
  loginMerchant,
  logoutMerchant,
  resetAuthSessionForTest,
} from "../session";

describe("merchant session", () => {
  beforeEach(() => {
    localStorage.clear();
    resetAuthSessionForTest();
  });

  it("keeps visitors in read-only mode until merchant login succeeds", () => {
    expect(isMerchantAuthenticated.value).toBe(false);
    expect(getMerchantAccessToken()).toBe("");

    loginMerchant({
      merchantName: "ZhangSan",
      accessToken: "local-demo-token",
    });

    expect(isMerchantAuthenticated.value).toBe(true);
    expect(getMerchantAccessToken()).toBe("local-demo-token");

    logoutMerchant();

    expect(isMerchantAuthenticated.value).toBe(false);
    expect(getMerchantAccessToken()).toBe("");
  });
});
