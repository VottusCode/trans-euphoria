<template>
  <div class="mb-8 flex justify-between">
    <div class="flex items-center w-full">
      <main-title class="text-xl" />
    </div>
    <div class="flex items-center justify-end w-full" v-if="store.user">
      <div class="flex flex-col items-end mr-6">
        <p>{{ store.user.username }}</p>
        <div
          @click="logout"
          class="
            text-red-500
            border-b border-red-500
            hover:opacity-50
            text-sm
            cursor-pointer
            transition
            duration-300
            ease-in-out
          "
        >
          Log out
        </div>
      </div>
      <div>
        <img :src="store.user.img" class="w-16 h-16 rounded-full" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { store } from "../../store";
import { logout as apiLogout } from "../../api/endpoints/auth";
import { useRouter } from "vue-router";
import MainTitle from "../elements/MainTitle.vue";

export default defineComponent({
  components: { MainTitle },
  setup() {
    const router = useRouter();

    const logout = async () => {
      await apiLogout();
      store.user = null;
      router.push("/");
    };

    return {
      logout,
      store,
    };
  },
});
</script>
