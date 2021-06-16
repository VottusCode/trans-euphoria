<template>
  <CardWrapper>
    <div>
      <h1 class="text-4xl font-medium">Redirecting...</h1>
      <h1 class="text-2xl">You are being redirected to Discord...</h1>
    </div>
  </CardWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardWrapper from "../../components/elements/CardWrapper.vue";

export default defineComponent({
  components: {
    CardWrapper,
  },
  setup() {
    return {};
  },
});
</script>
