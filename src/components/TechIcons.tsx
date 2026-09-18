import type { IconType } from "react-icons";
import { FaChartBar, FaDatabase } from "react-icons/fa";
import {
  SiPython,
  SiTypescript,
  SiGo,
  SiKotlin,
  SiPytorch,
  SiScikitlearn,
  SiFastapi,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiDocker,
  SiAndroid,
  SiSupabase,
  SiVercel,
  SiGit,
  SiGodotengine,
} from "react-icons/si";

const map: Record<string, IconType> = {
  python: SiPython,
  typescript: SiTypescript,
  go: SiGo,
  kotlin: SiKotlin,
  pytorch: SiPytorch,
  sklearn: SiScikitlearn,
  fastapi: SiFastapi,
  nextjs: SiNextdotjs,
  react: SiReact,
  node: SiNodedotjs,
  tailwind: SiTailwindcss,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  firebase: SiFirebase,
  docker: SiDocker,
  android: SiAndroid,
  supabase: SiSupabase,
  vercel: SiVercel,
  git: SiGit,
  godot: SiGodotengine,
  sql: FaDatabase,
  tableau: FaChartBar,
};

export function TechIcon({ name, size = 26 }: { name: string; size?: number }) {
  const Icon = map[name];
  if (!Icon) return null;
  return <Icon size={size} aria-hidden />;
}
