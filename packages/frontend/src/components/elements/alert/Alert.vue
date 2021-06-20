<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { colors, ALERT_COLOR_CLASSES, computedAlertClasses } from ".";

export default defineComponent({
  props: {
    color: {
      type: String as PropType<keyof typeof ALERT_COLOR_CLASSES>,
      default: "neutral",
      validator: (s: string) => colors.includes(s),
    },
  },
  setup(props) {
    const classes = computedAlertClasses(props.color);

    return {
      classes,
    };
  },
});
</script>
