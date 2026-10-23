"use client";

import { useState } from "react";
import { BikeArt } from "@/components/BikeArt";
import { cn } from "@/lib/cn";

const frames = [
  { name: "Midnight", value: "#111111" },
  { name: "Bone", value: "#f4f1ea" },
  { name: "Joker", value: "#7c3aed" },
];

// Client component: the only interactive part of the page is the frame color
export function Showcase({ accent }: { accent: string }) {
  // Hide a frame color that matches the background: a purple frame on purple is invisible
  const options = frames.filter((f) => f.value.toLowerCase() !== accent.toLowerCase());
  const [frame, setFrame] = useState(options[0]);
  return (
    <div className="flex flex-col gap-5">
      <div className="border-[3px] border-ink p-8 shadow-hard-lg md:p-12" style={{ background: accent }}>
        <BikeArt accent={accent === "#b6ff00" ? "#111111" : "#b6ff00"} frame={frame.value} className="w-full" />
      </div>
      <fieldset>
        <legend className="mb-3 font-bold uppercase">Frame: {frame.name}</legend>
        <div className="flex gap-3">
          {options.map((f) => (
            <button
              key={f.name}
              type="button"
              onClick={() => setFrame(f)}
              aria-pressed={frame.name === f.name}
              aria-label={f.name}
              className={cn(
                "size-11 cursor-pointer rounded-full border-[3px] border-ink transition-transform",
                "focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-joker",
                frame.name === f.name ? "scale-110 shadow-[3px_3px_0_#111111]" : "hover:scale-105",
              )}
              style={{ background: f.value }}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
