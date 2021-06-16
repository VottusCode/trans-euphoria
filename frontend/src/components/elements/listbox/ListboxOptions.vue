<template>
  <TwListboxOptions
    style="padding: 0 !important"
    class="absolute mt-2 bg-white left-0 z-10"
    :class="baseClasses"
  >
    <slot />
  </TwListboxOptions>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BASE_BUTTON_CLASSES as baseClasses } from "../button";
import { ListboxOptions as TwListboxOptions } from "@headlessui/vue";

export default defineComponent({
  components: {
    TwListboxOptions,
  },
  setup() {
    return {
      baseClasses,
    };
  },
});
</script>
