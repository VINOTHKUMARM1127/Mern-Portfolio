import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
export default function ThemeToggle() {
 const [theme, setTheme] = useState("dark");
 useEffect(() => { setTheme(document.documentElement.dataset.theme || "dark"); }, []);
 const toggle = () => {
  const next=theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme=next;
  try { localStorage.setItem("portfolio-theme",next); } catch { /* Storage is optional. */ }
  setTheme(next);
 };
 return <button type="button" onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} className="theme-toggle p-2.5 rounded-xl border border-ink/15 bg-ink/5 text-ink hover:bg-ink/10">{theme === "dark" ? <Sun size={19} aria-hidden="true"/> : <Moon size={19} aria-hidden="true"/>}</button>;
}
