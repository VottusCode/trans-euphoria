<template>
  <router-link v-if="to" :to="to" :disabled="disabled" :class="classes">
    <slot />
  </router-link>
  <a v-else :href="href" :disabled="disabled" :class="classes">
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
    href: {
      type: String,
      default: "#",
    },
    to: {
      type: String,
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
