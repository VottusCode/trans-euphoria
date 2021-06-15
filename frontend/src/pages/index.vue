<template>
  <CardWrapper class="text-center">
    <MainTitle class="text-5xl" />
    <div class="mt-6">
      <ButtonAnchor :href="invite" class="mr-4"> Join the Server </ButtonAnchor>
      <ButtonAnchor :href="disboard" class="mr-4"> Disboard </ButtonAnchor>
      <Button disabled> Profile (Soon) </Button>
    </div>
  </CardWrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { invite, disboard } from "../constants";
import CardWrapper from "../components/elements/CardWrapper.vue";
import MainTitle from "../components/elements/MainTitle.vue";
import Button from "../components/elements/button/Button.vue";
import ButtonAnchor from "../components/elements/button/ButtonAnchor.vue";

export default defineComponent({
  components: {
    CardWrapper,
    MainTitle,
    Button,
    ButtonAnchor,
  },
  setup() {
    return {
      invite,
      disboard,
    };
  },
});
</script>
