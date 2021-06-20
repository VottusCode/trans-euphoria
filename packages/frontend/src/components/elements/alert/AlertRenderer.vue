<template>
  <div>
    <alert
      v-for="(a, i) in store.alerts"
      :color="a.color"
      :key="i"
      :class="[i !== store.alerts.length - 1 && 'mb-2']"
    >
      {{ a.content }}
    </alert>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "../../../store";
import Alert from "./Alert.vue";

export default defineComponent({
  components: { Alert },
  setup() {
    return {
      store,
    };
  },
});
</script>
