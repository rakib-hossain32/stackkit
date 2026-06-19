import Link from "next/link";
import { GithubStarCount } from "./github-star-count";
import { GithubIcon } from "@/components/icons";

export async function getGithubStars(): Promise<number | null> {
  try {
    const res = await fetch("https://api.github.com/repos/tariqul420/stackkit", {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.stargazers_count as number;
  } catch {
    return null;
  }
}

export async function GithubStars() {
  const stars = await getGithubStars();

  return (
    <Link
      href="https://github.com/tariqul420/stackkit"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-background px-2 py-1 text-xs font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
    >
      <GithubIcon className="h-5 w-5" />
      {stars !== null && stars > 0 && (
        <>
          <GithubStarCount count={stars} />
        </>
      )}
    </Link>
  );
}
