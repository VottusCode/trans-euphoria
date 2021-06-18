<template>
  <CardWrapper>
    <div v-if="state.currentState !== 'AUTHENTICATING'">
      <h1 class="text-4xl font-medium">
        {{
          { FAIL: "An error has occurred", REDIRECTING: "Redirecting..." }[
            state.currentState
          ]
        }}
      </h1>
      <h2 class="text-2xl">{{ state.message }}</h2>
      <div v-if="state.currentState === 'FAIL'" class="mt-4">
        <Button @click="redirect">Try again</Button>
      </div>
    </div>
    <div class="w-full flex justify-center items-center" v-else>
      <Spinner />
    </div>
  </CardWrapper>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { authorize as apiAuthorize } from "../../api/endpoints/auth";
import CardWrapper from "../../components/elements/CardWrapper.vue";
import Spinner from "../../components/elements/Spinner.vue";
import Button from "../../components/elements/button/Button.vue";

/**
 * The current authentication state. Used in the template show
 * correct content.
 *
 * REDIRECTING = User is being redirected to the Discord OAuth Page.
 * AUTHENTICATING = The user is currently being authenticated via API (after redirect from Discord).
 * FAIL = An error has occurred.
 */
type AuthState = "REDIRECTING" | "AUTHENTICATING" | "FAIL";

export default defineComponent({
  components: {
    CardWrapper,
    Button,
    Spinner,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const state = reactive({
      // Represents the current authentication state,
      // refer to the type def.
      currentState: "REDIRECTING" as AuthState,
      // Any additionally message is stored here.
      // It's not shown in the "AUTHENTICATING" state.
      message: "You are being redirected to Discord...",
    });

    /**
     * Redirects the user to the authorize route that redirects to the OAuth route.
     */
    const redirect = () => (window.location.href = "/api/auth/authorize");

    /**
     * Checks whether the code is present in the querystring (= redirected from Discord).
     * If not, the user gets redirected to the authorize route.
     */
    if (typeof route.query.code !== "string") {
      redirect();
      return { state };
    }

    // Sets the current state to AUTHENTICATING.
    state.currentState = "AUTHENTICATING";
    state.message = "";

    // The auth code returned from Discord
    const code: string = route.query.code;

    /**
     * Authorizes the user with the code returned from Discord.
     */
    const authorize = async () => {
      try {
        const res = await apiAuthorize(code);

        if (!res.data.success) {
          // TODO: fix type
          throw new Error((res.data as any).error.message);
        }

        // TODO. better backlink
        router.push("/dashboard/profile");
      } catch (e) {
        // TODO: split
        state.currentState = "FAIL";
        state.message =
          e?.response?.data?.error?.message ??
          e?.message ??
          "Unknown error has occurred.";
      }
    };

    /**
     * Add an onMounted hook to authorize the user.
     */
    onMounted(authorize);

    return {
      state,
      redirect,
    };
  },
});
</script>
