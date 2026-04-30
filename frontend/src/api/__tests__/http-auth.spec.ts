import { beforeEach, describe, expect, it } from "vitest";

import {
  loginMerchant,
  logoutMerchant,
  resetAuthSessionForTest,
} from "../../auth/session";
import { attachAuthToken } from "../http";

describe("http write authorization", () => {
  beforeEach(() => {
    localStorage.clear();
    resetAuthSessionForTest();
  });

  it("does not attach authorization for visitor requests", () => {
    const config = attachAuthToken({ method: "POST", headers: {} });

    expect((config.headers as Record<string, string>).Authorization).toBeUndefined();
  });

  it("attaches the auth token only after account login", () => {
    loginMerchant({
      user: { user_id: "u001", user_name: "ZhangSan", phone: "13800000001" },
      token: "signed-token",
    });

    const config = attachAuthToken({ method: "PATCH", headers: {} });

    expect((config.headers as Record<string, string>).Authorization).toBe("Bearer signed-token");

    logoutMerchant();
    const loggedOutConfig = attachAuthToken({ method: "DELETE", headers: {} });

    expect((loggedOutConfig.headers as Record<string, string>).Authorization).toBeUndefined();
  });
});
