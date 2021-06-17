<template>
  <div
    :style="{
      background: `url(${bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }"
    class="
      min-w-screen min-h-screen
      w-full
      h-full
      flex
      justify-center
      items-center
      relative
      bg-no-repeat bg-cover
    "
  >
    <router-view />
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import bg from "../assets/bg.svg";

export default defineComponent({
  setup() {
    return {
      bg,
    };
  },
});
</script>
