<template>
  <div class="mb-8 flex justify-between">
    <div class="flex items-center w-full">
      <main-title class="text-xl" />
    </div>
    <div class="flex items-center justify-end w-full" v-if="store.account">
      <div class="flex flex-col items-end mr-6 w-full">
        <p>{{ store.account.username }}</p>
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
      <div class="w-full">
        <img
          :src="`https://cdn.discordapp.com/avatars/${store.account.id}/${store.account.avatarId}`"
          class="w-16 h-16 rounded-full"
        />
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
      store.account = null;
      router.push("/");
    };

    return {
      logout,
      store,
    };
  },
});
</script>
