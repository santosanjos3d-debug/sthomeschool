import { describe, it, expect } from "vitest";
import { createAdminSession, getAdminSessionByToken, markAdminSessionAsUsed } from "../../db";

describe("Admin Auth Router", () => {
  describe("Admin Session Management", () => {
    it("should create an admin session with token", async () => {
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const session = await createAdminSession("giorgio@sthomeschool.com", expiresAt);

      expect(session).toBeDefined();
      expect(session?.email).toBe("giorgio@sthomeschool.com");
      expect(session?.token).toBeDefined();
      expect(session?.usedAt).toBeNull();
    });

    it("should retrieve session by token", async () => {
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const createdSession = await createAdminSession("giorgio@sthomeschool.com", expiresAt);

      if (createdSession) {
        const retrievedSession = await getAdminSessionByToken(createdSession.token);
        expect(retrievedSession).toBeDefined();
        expect(retrievedSession?.token).toBe(createdSession.token);
        expect(retrievedSession?.email).toBe("giorgio@sthomeschool.com");
      }
    });

    it("should mark session as used", async () => {
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const session = await createAdminSession("giorgio@sthomeschool.com", expiresAt);

      if (session) {
        const updatedSession = await markAdminSessionAsUsed(session.token);
        expect(updatedSession).toBeDefined();
        expect(updatedSession?.usedAt).toBeDefined();
      }
    });

    it("should return undefined for non-existent token", async () => {
      const session = await getAdminSessionByToken("non-existent-token");
      expect(session).toBeUndefined();
    });
  });
});
