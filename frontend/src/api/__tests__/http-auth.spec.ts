import { beforeEach, describe, expect, it } from "vitest";

import {
  loginMerchant,
  logoutMerchant,
  resetAuthSessionForTest,
} from "../../auth/session";
import { attachDemoTokenForWrite } from "../http";

describe("http write authorization", () => {
  beforeEach(() => {
    localStorage.clear();
    resetAuthSessionForTest();
  });

  it("does not attach the demo token for visitor write requests", () => {
    const config = attachDemoTokenForWrite({ method: "POST", headers: {} });

    expect((config.headers as Record<string, string>)["X-Demo-Token"]).toBeUndefined();
  });

  it("attaches the demo token only after merchant login", () => {
    loginMerchant({
      merchantName: "ZhangSan",
      accessToken: "local-demo-token",
    });

    const config = attachDemoTokenForWrite({ method: "PATCH", headers: {} });

    expect((config.headers as Record<string, string>)["X-Demo-Token"]).toBe("local-demo-token");

    logoutMerchant();
    const loggedOutConfig = attachDemoTokenForWrite({ method: "DELETE", headers: {} });

    expect((loggedOutConfig.headers as Record<string, string>)["X-Demo-Token"]).toBeUndefined();
  });
});
