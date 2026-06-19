"use client";

import { cn } from "@/lib/cn";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { NpmIcon } from "@/components/icons";

export default function CopyCommand() {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("npx stackkit@latest create");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-16 w-full max-w-3xl">
      <div className="relative overflow-hidden rounded-xl border border-fd-border bg-fd-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 border-b border-fd-border bg-fd-muted/50 px-5 py-3">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-red-500" />
            <div className="size-3 rounded-full bg-yellow-500" />
            <div className="size-3 rounded-full bg-green-500" />
          </div>
          <div className="ml-2 text-xs font-medium text-fd-muted-foreground">terminal</div>
        </div>
        <div className="p-8">
          <div className="flex items-center gap-4 font-mono text-lg">
            <span className="text-fd-primary">$</span>
            <span
              className={`font-semibold cursor-pointer transition-colors flex items-center gap-2 ${
                copied ? "text-green-500" : ""
              }`}
              onClick={handleCopy}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span>npx stackkit@latest create</span>
              {(hovered || copied) && (
                <span className="ml-2">
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-fd-muted-foreground" />
                  )}
                </span>
              )}
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <a
                href="https://www.npmjs.com/package/stackkit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <NpmIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
