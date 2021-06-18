<template>
  <CardWrapper>
    <div class="mb-8 flex justify-between">
      <div class="flex items-center w-full">
        <MainTitle class="text-xl" />
      </div>
    </div>

    <div class="mb-8">
      <h1 class="text-4xl font-medium">{{ store.user.name }}'s Pronouns</h1>
      <h1 class="text-2xl">{{ store.user.pronouns.display }}</h1>
    </div>

    <div class="mb-4">
      {{ store.user.name }} uses the
      <span class="font-medium">
        {{ store.user.pronouns.display.toLowerCase() }}
      </span>
      pronouns.

      <h2 class="text-xl mb-2">Examples:</h2>
      <div>
        {{ store.user.pronouns.display.examples }}
      </div>
    </div>
  </CardWrapper>
</template>

<script lang="ts">
// TODO: currently using store.user as a placeholder
import { defineComponent } from "vue";
import CardWrapper from "../components/elements/CardWrapper.vue";
import { oldStore as store } from "../store";

export default defineComponent({
  components: {
    CardWrapper,
  },
  setup() {
    return {
      store,
    };
  },
});
</script>
