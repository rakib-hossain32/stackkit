import { describe, it, expect } from "vitest";
import { parseDatabaseOption, isPrismaOption } from "../discovery/shared";

describe("shared", () => {
  describe("parseDatabaseOption", () => {
    it("should parse plain database name", () => {
      const result = parseDatabaseOption("mongoose");
      expect(result).toEqual({ database: "mongoose", provider: undefined });
    });

    it("should parse prisma with provider", () => {
      const result = parseDatabaseOption("prisma-postgresql");
      expect(result).toEqual({ database: "prisma", provider: "postgresql" });
    });

    it("should parse prisma with sqlite", () => {
      const result = parseDatabaseOption("prisma-sqlite");
      expect(result).toEqual({ database: "prisma", provider: "sqlite" });
    });

    it("should handle prisma alone", () => {
      const result = parseDatabaseOption("prisma");
      expect(result).toEqual({ database: "prisma", provider: undefined });
    });
  });

  describe("isPrismaOption", () => {
    it("should identify prisma options", () => {
      expect(isPrismaOption("prisma")).toBe(true);
      expect(isPrismaOption("prisma-postgresql")).toBe(true);
      expect(isPrismaOption("mongoose")).toBe(false);
      expect(isPrismaOption("none")).toBe(false);
    });
  });
});
