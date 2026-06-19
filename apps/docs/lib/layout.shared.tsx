import { GithubStars } from "@/components/github-stars";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { DiscordIcon } from "@/components/icons";

const navTitle = (
  <div className="flex items-center gap-2">
    <Image src="/fdt.png" className="dark:hidden" alt="StackKit Logo" width={24} height={24} />
    <Image
      src="/fwt.png"
      className="hidden dark:block"
      alt="StackKit Logo"
      width={24}
      height={24}
    />
    <span className="font-bold">StackKit</span>
  </div>
);

export function baseOptions(): BaseLayoutProps {
  return {
    nav: { title: navTitle },
  };
}

export function homeOptions(): BaseLayoutProps {
  return {
    nav: { title: navTitle },
    links: [
      {
        type: "custom",
        secondary: true,
        children: <GithubStars />,
      },
      {
        type: "icon",
        label: "Discord",
        icon: <DiscordIcon className="h-4 w-4" />,
        text: "Discord",
        url: "https://discord.gg/PD8XWdpA",
        external: true,
        secondary: true,
      },
    ],
  };
}
