import type { CSSProperties } from "react";
import { copy } from "@/content/copy";
import { ExternalIcon } from "./icons";

const W = 400;
const H = 300;
const CX = 200;
const CY = 150;
const RINGS = 16;
const POINTS = 48;

const r1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Contour rings around the marker, computed at build time (static SVG, no
 * client JavaScript). Every fourth ring is stronger, like an index contour.
 */
function ringPath(ring: number): string {
  let d = "";
  for (let a = 0; a <= POINTS; a++) {
    const t = (a / POINTS) * Math.PI * 2;
    const radius =
      ring *
      15 *
      (1 +
        0.16 * Math.sin(3 * t + ring * 0.35) +
        0.09 * Math.sin(5 * t - ring * 0.2) +
        0.05 * Math.cos(7 * t + 1));
    const x = CX + 30 * Math.sin(ring * 0.25) + radius * Math.cos(t) * 1.15;
    const y = CY + 14 * Math.cos(ring * 0.3) + radius * Math.sin(t) * 0.82;
    d += `${a ? "L" : "M"}${r1(x)} ${r1(y)}`;
  }
  return `${d}Z`;
}

const RING_PATHS = Array.from({ length: RINGS }, (_, i) => ringPath(i + 1));

interface LocatorProps {
  /** The confirmed Google Maps listing. Without it the diagram is not a link. */
  href?: string | null;
  caption: string;
  coordinates?: string | null;
}

/**
 * Contact locator (art-direction §6.7): a labelled diagram, not a map. With
 * the confirmed listing it is a link that opens Google Maps, and says so. Its
 * accessible name is its visible caption (WCAG 2.5.3, label in name).
 * The rings draw once when it enters the viewport (motion M16).
 */
export function Locator({ href, caption, coordinates }: LocatorProps) {
  const diagram = (
    <>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g stroke="rgb(255 255 255 / 0.05)">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2={H} />
          ))}
          {Array.from({ length: 7 }, (_, j) => (
            <line key={`h${j}`} x1="0" y1={j * 50} x2={W} y2={j * 50} />
          ))}
        </g>
        <g fill="none">
          {RING_PATHS.map((d, i) => {
            const index = (i + 1) % 4 === 0;
            return (
              <path
                key={i}
                d={d}
                pathLength={1}
                className="ring"
                style={{ "--i": i + 1 } as CSSProperties}
                stroke={index ? "rgb(169 182 196 / 0.42)" : "rgb(169 182 196 / 0.2)"}
                strokeWidth={index ? 1.1 : 0.8}
              />
            );
          })}
        </g>
        <g className="locator-mark" stroke="#c9a060" fill="none" strokeWidth="1.2">
          <circle cx={CX} cy={CY} r="10" />
          <circle cx={CX} cy={CY} r="2.5" fill="#c9a060" />
          <path
            d={`M${CX - 26} ${CY}h12M${CX + 14} ${CY}h12M${CX} ${CY - 26}v12M${CX} ${CY + 14}v12`}
          />
        </g>
      </svg>
      <span
        className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-raised via-raised/85 via-55% to-transparent"
        aria-hidden="true"
      />
      <span className="absolute right-4 bottom-3.5 left-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 text-label">
        <span className="grid gap-0.5 text-mist">
          <span>{caption}</span>
          {coordinates && (
            <span className="font-semibold text-white tabular-nums">{coordinates}</span>
          )}
        </span>
        {href && (
          <span className="inline-flex items-center gap-1.5 font-semibold text-brass">
            {copy.actions.maps}
            <ExternalIcon className="size-4" />
            <span className="sr-only"> {copy.externalHint}</span>
          </span>
        )}
      </span>
    </>
  );

  if (!href) {
    return (
      <div className="locator md:aspect-[16/9] lg:aspect-[4/3]" data-reveal="rings">
        {diagram}
      </div>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="locator md:aspect-[16/9] lg:aspect-[4/3]"
      data-reveal="rings"
    >
      {diagram}
    </a>
  );
}
