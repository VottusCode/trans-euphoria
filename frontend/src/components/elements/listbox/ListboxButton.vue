<template>
  <TwListboxButton class="relative inline-flex" :class="baseClasses">
    <span class="block truncate mr-4">
      <slot />
    </span>
    <span
      class="
        absolute
        inset-y-0
        right-0
        flex
        items-center
        pr-2
        pointer-events-none
      "
    >
      <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
    </span>
  </TwListboxButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BASE_BUTTON_CLASSES as baseClasses } from "../button";
import { ListboxButton as TwListboxButton } from "@headlessui/vue";
import { SelectorIcon } from "heroicons-vue3/outline";

export default defineComponent({
  components: {
    TwListboxButton,
    SelectorIcon,
  },
  setup() {
    return {
      baseClasses,
    };
  },
});
</script>
