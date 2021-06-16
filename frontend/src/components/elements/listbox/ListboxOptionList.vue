<template>
  <TwListboxOption
    v-slot="{ active, selected }"
    v-for="(item, i) in list"
    :key="item.name"
    :value="item"
    as="li"
    :class="[
      active ? 'font-bold bg-amber-100' : 'text-gray-900',
      // first item
      i === 0 && 'rounded-t-2xl',
      // last item
      i === list.length - 1 && 'rounded-b-2xl',
    ]"
    class="
      cursor-pointer
      select-none
      relative
      py-2
      px-10
      hover:bg-gray-100
      transition
      duration-300
      ease-in-out
    "
  >
    <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">
      {{ item.display }}
    </span>
    <span
      v-if="selected"
      class="
        absolute
        inset-y-0
        left-0
        flex
        items-center
        pl-3
        text-black
        font-medium
      "
    >
      <CheckIcon class="w-5 h-5" aria-hidden="true" />
    </span>
  </TwListboxOption>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ListboxOption as TwListboxOption } from "@headlessui/vue";
import { CheckIcon } from "heroicons-vue3/outline";

export default defineComponent({
  components: {
    TwListboxOption,
    CheckIcon,
  },
  props: {
    list: {
      type: Array,
    },
  },
});
</script>
