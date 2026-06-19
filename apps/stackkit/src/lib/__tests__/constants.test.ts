import { describe, it, expect } from "vitest";
import {
  PACKAGE_MANAGERS,
  LANGUAGES,
  MODULE_CATEGORIES,
  FILE_NAMES,
  DEFAULT_PACKAGE_MANAGER,
  DEFAULT_LANGUAGE,
} from "../constants";

describe("constants", () => {
  it("should have correct package managers", () => {
    expect(PACKAGE_MANAGERS.PNPM).toBe("pnpm");
    expect(PACKAGE_MANAGERS.NPM).toBe("npm");
    expect(PACKAGE_MANAGERS.YARN).toBe("yarn");
    expect(PACKAGE_MANAGERS.BUN).toBe("bun");
  });

  it("should have correct languages", () => {
    expect(LANGUAGES.TYPESCRIPT).toBe("typescript");
    expect(LANGUAGES.JAVASCRIPT).toBe("javascript");
  });

  it("should have correct module categories", () => {
    expect(MODULE_CATEGORIES.DATABASE).toBe("database");
    expect(MODULE_CATEGORIES.AUTH).toBe("auth");
    expect(MODULE_CATEGORIES.UI).toBe("ui");
  });

  it("should have correct file names", () => {
    expect(FILE_NAMES.PACKAGE_JSON).toBe("package.json");
    expect(FILE_NAMES.TSCONFIG_JSON).toBe("tsconfig.json");
    expect(FILE_NAMES.ENV).toBe(".env");
    expect(FILE_NAMES.GITIGNORE).toBe(".gitignore");
  });

  it("should default to pnpm and TypeScript", () => {
    expect(DEFAULT_PACKAGE_MANAGER).toBe("pnpm");
    expect(DEFAULT_LANGUAGE).toBe("typescript");
  });
});
