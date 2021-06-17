import { computed } from "vue";

export const BASE_BUTTON_CLASSES = `
  border-2
  px-6 py-2
  rounded-2xl hover:shadow-2xl
  transition duration-200 ease-in-out
  focus:outline-none
`;

export const ENABLED_BUTTON_CLASSES = `
  text-gray-500 hover:text-gray-600
  border-gray-500 hover:border-gray-600
`;

export const DISABLED_BUTTON_CLASSES = `
  text-gray-400
  hover:border-gray-400
`;

export const computedButtonClasses = (disabled = false, bg = "") =>
  computed(() =>
    [
      BASE_BUTTON_CLASSES,
      bg,
      disabled ? DISABLED_BUTTON_CLASSES : ENABLED_BUTTON_CLASSES,
    ].join(" ")
  );
