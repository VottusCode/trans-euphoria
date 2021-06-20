<template>
  <card-wrapper>
    <Header />

    <div class="flex justify-center items-center">
      <div class="flex w-auto mr-8 max-w-sm">
        <div>
          <div class="mb-8">
            <h1 class="text-4xl font-medium">{{ user.name }}</h1>
            <h2>{{ user.about }}</h2>
          </div>

          <div>
            <span class="font-medium">{{ user.name }}</span> is a valid
            <span class="font-medium">{{ user.gender.toLowerCase() }}</span>
            that uses the
            <div></div>
            <span class="font-medium">{{ user.pronouns.toLowerCase() }}</span>
            pronouns. {{ user.pronouns.split("/")[0] }} is a
            <span class="font-medium">{{ user.sexuality.toLowerCase() }}</span
            >.
          </div>
        </div>
      </div>
      <div class="flex w-auto">
        <img
          :src="`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}`"
          :alt="user.name"
          class="rounded-2xl w-32 h-32"
        />
      </div>
    </div>
  </card-wrapper>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchUser, PublicUser } from "../api/endpoints/user";
import CardWrapper from "../components/elements/CardWrapper.vue";
import Header from "../components/layout/Header.vue";

export default defineComponent({
  components: { CardWrapper, Header },
  setup() {
    const router = useRouter();

    const user = ref<PublicUser>(null);

    const id =
      typeof router.currentRoute.value.params.id === "string"
        ? router.currentRoute.value.params.id
        : router.currentRoute.value.params.id[0];

    const fetchData = async () => {
      try {
        const res = await fetchUser(id);
        if (!res.data.success) throw new Error();

        user.value = res.data.data.user;
      } catch {
        router.push("/");
      }
    };

    onMounted(fetchData);

    return {
      user,
    };
  },
});
</script>
