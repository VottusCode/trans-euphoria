<template>
  <div
    style="
      background: url(/src/assets/bg.svg);
      background-repeat: no-repeat;
      background-size: cover;
    "
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
    <div class="text-center z-10 bg-gray-50 shadow-2xl p-16 rounded-3xl">
      <h1 class="text-5xl font-medium text-white">
        <span class="text-trans-blue">Trans </span>
        <span class="text-trans-pink">Euphoria</span>
      </h1>

      <div class="mt-6">
        <button
          :href="invite"
          class="
            text-gray-500
            bg-transparent
            border-2 border-gray-500
            px-6
            py-2
            rounded-2xl
            hover:border-gray-600
            hover:text-gray-600
            hover:shadow-2xl
            transition
            duration-200
            ease-in-out
            mr-4
          "
        >
          Join the Server
        </button>
        <a
          :href="disboard"
          class="
            text-gray-500
            bg-transparent
            border-2 border-gray-500
            px-6
            py-2
            rounded-2xl
            hover:border-gray-600
            hover:text-gray-600
            hover:shadow-2xl
            transition
            duration-200
            ease-in-out
            mr-4
          "
        >
          Disboard
        </a>
        <button
          class="
            text-gray-400
            bg-transparent
            border-2 border-gray-400
            px-6
            py-2
            rounded-2xl
            hover:shadow-2xl
            transition
            duration-200
            ease-in-out
          "
          disabled
        >
          Profile (Soon)
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { invite, disboard } from "../constants";

export default defineComponent({
  setup() {
    return {
      invite,
      disboard,
    };
  },
});
</script>
