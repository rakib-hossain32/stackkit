export function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const output = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (target[key]) {
        output[key] = deepMerge(
          target[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>,
        );
      } else {
        output[key] = source[key];
      }
    } else if (Array.isArray(source[key])) {
      const targetArr = (target[key] as unknown[]) || [];
      const sourceArr = source[key] as unknown[];
      const merged = [...targetArr];
      for (const item of sourceArr) {
        if (typeof item === "object" && item !== null) {
          const exists = merged.some((m) => JSON.stringify(m) === JSON.stringify(item));
          if (!exists) merged.push(item);
        } else {
          if (!merged.includes(item)) merged.push(item);
        }
      }
      output[key] = merged;
    } else {
      output[key] = source[key];
    }
  }

  return output;
}
