<template>
  <a :class="classes" disabled>
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { computedButtonClasses } from ".";

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    bg: {
      type: String,
      default: "bg-transparent",
    },
  },
  setup(props) {
    const classes = computedButtonClasses(props.disabled, props.bg);

    return {
      classes,
    };
  },
});
</script>
