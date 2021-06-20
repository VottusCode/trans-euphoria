import { computed } from "@vue/runtime-core";

export const ALERT_BASE_CLASSES = "py-2 px-4 border-2 rounded-2xl";

export const ALERT_COLOR_CLASSES = {
  error: "bg-red-300 border-red-200",
  warning: "bg-yellow-300 border-yellow-200",
  success: "bg-green-300 border-green-200",
  info: "bg-blue-300 border-blue-200",
  neutral: "bg-gray-300 border-gray-200",
};

export const colors = Object.keys(ALERT_COLOR_CLASSES);

export const computedAlertClasses = (color: keyof typeof ALERT_COLOR_CLASSES) =>
  computed(() => [ALERT_BASE_CLASSES, ALERT_COLOR_CLASSES[color]].join(" "));
