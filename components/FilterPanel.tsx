"use client";

import { Sparkles, Flame, Swords, Crosshair, LayoutGrid } from "lucide-react";
import { GAMES } from "@/lib/mockData";
import { FilterState, GameSlug } from "@/lib/types";

const ICONS: Record<string, typeof Sparkles> = {
  Sparkles,
  Flame,
  Swords,
  Crosshair,
};

interface FilterPanelProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
}

const RANKS = ["all", "Vàng", "Bạch Kim", "Kim Cương", "Cao Thủ", "Heroic", "Immortal", "Grandmaster"];

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  function update<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="space-y-4">
      {/* Game tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => update("game", "all")}
          className={`flex items-center gap-1.5 shrink-0 rounded-full border px-3 py-1.5 text-xs transition ${
            filters.game === "all"
              ? "border-neonCyan text-neonCyan shadow-glowCyan"
              : "border-white/10 text-white/60"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          Tất cả
        </button>
        {GAMES.map((g) => {
          const Icon = ICONS[g.icon] ?? Sparkles;
          const active = filters.game === g.slug;
          return (
            <button
              key={g.slug}
              onClick={() => update("game", g.slug as GameSlug)}
              className={`flex items-center gap-1.5 shrink-0 rounded-full border px-3 py-1.5 text-xs transition ${
                active ? "text-obsidian font-semibold shadow-glowCyan" : "border-white/10 text-white/60"
              }`}
              style={active ? { backgroundColor: g.accentColor, borderColor: g.accentColor } : undefined}
            >
              <Icon className="w-3.5 h-3.5" />
              {g.name}
              <span className="ml-1 rounded-full bg-black/20 px-1.5 text-[10px]">{g.accountCount}</span>
            </button>
          );
        })}
      </div>

      {/* Multi filter panel */}
      <div className="glass-panel rounded-xl p-4 grid grid-cols-1 md:grid-cols-4 gap-4 border border-white/10">
        <div>
          <label className="text-xs text-white/50 block mb-1">
            Khoảng giá: {filters.priceRange[0].toLocaleString("vi-VN")}đ - {filters.priceRange[1].toLocaleString("vi-VN")}đ
          </label>
          <input
            type="range"
            min={0}
            max={10_000_000}
            step={50_000}
            value={filters.priceRange[1]}
            onChange={(e) =>
              update("priceRange", [filters.priceRange[0], Number(e.target.value)])
            }
            className="w-full accent-neonCyan"
          />
        </div>

        <div>
          <label className="text-xs text-white/50 block mb-1">Đăng ký</label>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => update("registeredEmail", filters.registeredEmail ? null : true)}
              className={`px-2 py-1 rounded-full border ${
                filters.registeredEmail ? "border-neonCyan text-neonCyan" : "border-white/10 text-white/60"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => update("registeredPhone", filters.registeredPhone ? null : true)}
              className={`px-2 py-1 rounded-full border ${
                filters.registeredPhone ? "border-neonCyan text-neonCyan" : "border-white/10 text-white/60"
              }`}
            >
              SĐT
            </button>
            <button
              onClick={() => update("registeredFacebook", filters.registeredFacebook ? null : true)}
              className={`px-2 py-1 rounded-full border ${
                filters.registeredFacebook ? "border-neonCyan text-neonCyan" : "border-white/10 text-white/60"
              }`}
            >
              Facebook
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs text-white/50 block mb-1">Rank / Server</label>
          <select
            value={filters.rank}
            onChange={(e) => update("rank", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs"
          >
            {RANKS.map((r) => (
              <option key={r} value={r}>
                {r === "all" ? "Tất cả rank" : r}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 mt-2 text-xs text-white/60">
            <input
              type="checkbox"
              checked={filters.rareItemsOnly}
              onChange={(e) => update("rareItemsOnly", e.target.checked)}
              className="accent-crimson"
            />
            Chỉ hiện acc có vật phẩm hiếm
          </label>
        </div>

        <div>
          <label className="text-xs text-white/50 block mb-1">Sắp xếp</label>
          <select
            value={filters.sortBy}
            onChange={(e) => update("sortBy", e.target.value as FilterState["sortBy"])}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs"
          >
            <option value="newest">Mới nhất</option>
            <option value="price_asc">Giá tăng dần</option>
            <option value="price_desc">Giá giảm dần</option>
            <option value="discount">Discount hot</option>
          </select>
        </div>
      </div>
    </div>
  );
}
