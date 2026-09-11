"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import { getHomeTagIndex, projectAnchorId } from "@/lib/projects";

type TagCategory = "ai" | "research" | "ux" | "neutral";

const AI_TAGS = new Set([
  "AI Product",
  "AI Agent",
  "AI Workflow Design",
  "Context Engineering",
  "AI 产品",
  "AI 工作流设计",
  "上下文工程",
]);

const RESEARCH_TAGS = new Set([
  "User Research",
  "HCI Research",
  "Service Design",
  "XR",
  "Rapid Prototyping",
  "Human-Robot Interaction (HRI)",
  "用户研究",
  "HCI 研究",
  "服务设计",
  "快速原型",
  "人机交互 (HRI)",
]);

const UX_TAGS = new Set([
  "Product Design",
  "Interaction Design",
  "Interaction Technique Design",
  "Conversational UX",
  "Computational Design",
  "Physical Computing",
  "Prototyping",
  "Creative Robotics",
  "产品设计",
  "交互设计",
  "交互技术设计",
  "对话式 UX",
  "计算设计",
  "物理计算",
  "原型设计",
  "创意机器人",
]);

function classifyTag(tag: string): TagCategory {
  if (AI_TAGS.has(tag)) return "ai";
  if (RESEARCH_TAGS.has(tag)) return "research";
  if (UX_TAGS.has(tag)) return "ux";
  return "neutral";
}

type TagEntry = { tag: string; slugs: string[] };

function composeMondrianOrder(tags: TagEntry[]): TagEntry[] {
  const buckets: Record<TagCategory, TagEntry[]> = {
    ai: [],
    research: [],
    ux: [],
    neutral: [],
  };

  for (const entry of tags) {
    buckets[classifyTag(entry.tag)].push(entry);
  }

  const cycle: TagCategory[] = ["ai", "ux", "research", "neutral", "ux", "ai"];
  const result: TagEntry[] = [];
  let guard = 0;

  while (
    buckets.ai.length +
      buckets.research.length +
      buckets.ux.length +
      buckets.neutral.length >
      0 &&
    guard < 500
  ) {
    guard += 1;
    let placed = false;
    for (const category of cycle) {
      const next = buckets[category].shift();
      if (!next) continue;
      const prev = result[result.length - 1];
      if (
        prev &&
        classifyTag(prev.tag) === category &&
        (buckets.ai.length > 0 ||
          buckets.research.length > 0 ||
          buckets.ux.length > 0 ||
          buckets.neutral.length > 0)
      ) {
        const others: TagCategory[] = (
          ["ai", "ux", "research", "neutral"] as TagCategory[]
        ).filter((c) => c !== category && buckets[c].length > 0);
        if (others.length > 0) {
          buckets[category].unshift(next);
          const alt = buckets[others[0]].shift();
          if (alt) {
            result.push(alt);
            placed = true;
          }
          continue;
        }
      }
      result.push(next);
      placed = true;
    }
    if (!placed) break;
  }

  return result;
}

function estimateTagWidth(tag: string): number {
  // Conservative overestimate so rows never spill past the column.
  return Math.ceil(tag.length * 8.2) + 28;
}

function packRows(
  tags: TagEntry[],
  containerWidth: number,
  gap = 8,
  indent = 0,
): TagEntry[][] {
  if (tags.length === 0) return [];
  const width = Math.max(containerWidth - indent, 160);
  const rows: TagEntry[][] = [];
  let current: TagEntry[] = [];
  let used = 0;

  for (const entry of tags) {
    const tagWidth = estimateTagWidth(entry.tag);
    const nextUsed = current.length === 0 ? tagWidth : used + gap + tagWidth;

    if (current.length > 0 && nextUsed > width) {
      if (current.length === 1) {
        current.push(entry);
        used = nextUsed;
        rows.push(current);
        current = [];
        used = 0;
        continue;
      }
      rows.push(current);
      current = [entry];
      used = tagWidth;
    } else {
      current.push(entry);
      used = nextUsed;
    }
  }
  if (current.length > 0) rows.push(current);

  for (let i = 0; i < rows.length; i++) {
    if (rows[i].length !== 1 || rows.length === 1) continue;
    if (i > 0) {
      rows[i - 1] = [...rows[i - 1], ...rows[i]];
      rows.splice(i, 1);
      i -= 1;
    } else {
      rows[1] = [...rows[0], ...rows[1]];
      rows.splice(0, 1);
      i -= 1;
    }
  }

  return rows;
}

function rowsEqual(a: TagEntry[][], b: TagEntry[][]) {
  if (a.length !== b.length) return false;
  return a.every(
    (row, i) =>
      row.length === b[i].length &&
      row.every((item, j) => item.tag === b[i][j].tag),
  );
}

const ROW_ALIGN = ["is-start", "is-end", "is-center", "is-end", "is-start"] as const;

const ROW_INDENT_PX = {
  "is-start": 0,
  "is-end": 56,
  "is-center": 28,
} as const;

export function HomeTagNav() {
  const { lang } = useLang();
  const tags = useMemo(
    () => composeMondrianOrder(getHomeTagIndex(lang)),
    [lang],
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<TagEntry[][]>(() => packRows(tags, 640));

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || tags.length === 0) {
      setRows(packRows(tags, 640));
      return;
    }

    function layout() {
      const el = rootRef.current;
      if (!el) return;
      // Pack using the tightest indent so indented rows also fit.
      const next = packRows(tags, el.clientWidth, 8, ROW_INDENT_PX["is-end"]);
      setRows((prev) => (rowsEqual(prev, next) ? prev : next));
    }

    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(root);
    return () => observer.disconnect();
  }, [tags]);

  if (tags.length === 0) return null;

  function jumpToTag(slugs: string[]) {
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    const target = document.getElementById(projectAnchorId(slug));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      ref={rootRef}
      className="profile-tags"
      aria-label={lang === "en" ? "Tags" : "标签"}
    >
      <div className="profile-tags-rows">
        {rows.map((row, rowIndex) => (
          <ul
            key={`row-${rowIndex}-${row.map((item) => item.tag).join("|")}`}
            className={`profile-tags-row ${ROW_ALIGN[rowIndex % ROW_ALIGN.length]}`}
          >
            {row.map(({ tag, slugs }) => (
              <li key={tag}>
                <button
                  type="button"
                  className={`project-tag profile-tag-button is-${classifyTag(tag)}`}
                  onClick={() => jumpToTag(slugs)}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
