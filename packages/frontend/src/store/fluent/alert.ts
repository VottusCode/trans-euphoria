import { store, Alert } from "..";

export const setAlerts = (arr: Alert[] | Alert = []) =>
  (store.alerts = Array.isArray(arr) ? arr : [arr]);

export const addAlerts = (...alerts: Alert[]) =>
  (store.alerts = [...store.alerts, ...alerts]);

export const clearAlerts = () => setAlerts([]);

// Aliases

export const alert = (
  content: Alert["content"],
  color: Alert["color"] = "info",
  clear = true
) =>
  (clear ? setAlerts : addAlerts)({
    content,
    color,
  });

export const notify = (content: Alert["content"], clear = true) =>
  alert(content, "neutral", clear);

export const info = (content: Alert["content"], clear = true) =>
  alert(content, "info", clear);

export const warn = (content: Alert["content"], clear = true) =>
  alert(content, "warning", clear);

export const ok = (content: Alert["content"], clear = true) =>
  alert(content, "success", clear);

export const fail = (content: Alert["content"], clear = true) =>
  alert(content, "error", clear);
