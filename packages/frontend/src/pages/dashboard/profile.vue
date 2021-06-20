<template>
  <CardWrapper class="relative">
    <Header />

    <div class="mb-8">
      <h1 class="text-4xl font-medium">Your Profile</h1>
      <h1 class="text-2xl">Customize your profile here!</h1>
    </div>

    <div>
      <form @submit.prevent="sendForm">
        <div class="flex items-center mb-4 w-full">
          <div class="flex flex-col w-full">
            <label>Your name</label>
            <input
              type="text"
              :class="baseClasses"
              class="mt-2 inline-flex"
              v-model="state.username"
              :disabled="changeDisabled"
            />
          </div>
        </div>
        <div class="flex items-center w-full mb-8">
          <div class="flex flex-col w-full mr-8">
            <label>Gender</label>
            <Listbox v-model="state.gender">
              <div class="relative mt-2">
                <listbox-button>
                  {{ display(state.gender) }}
                </listbox-button>
                <listbox-options>
                  <listbox-option-list :list="genders" />
                </listbox-options>
              </div>
            </Listbox>
          </div>
          <div class="flex flex-col mr-8 w-full">
            <label>Pronouns</label>
            <Listbox v-model="state.pronouns">
              <div class="relative mt-2">
                <listbox-button>
                  {{ display(state.pronouns) }}
                </listbox-button>
                <listbox-options>
                  <listbox-option-list :list="pronouns" />
                </listbox-options>
              </div>
            </Listbox>
          </div>
          <div class="flex flex-col w-full">
            <div>
              <label>Sexuality</label>
              <Listbox v-model="state.sexuality">
                <div class="relative mt-2">
                  <listbox-button>
                    {{ display(state.sexuality) }}
                  </listbox-button>
                  <listbox-options>
                    <listbox-option-list :list="sexes" />
                  </listbox-options>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
        <div class="flex items-center mb-4 w-full">
          <div class="flex flex-col w-full">
            <label>About you</label>
            <textarea
              type="text"
              :class="baseClasses"
              placeholder="Introduce yourself in few short sentences..."
              class="mt-2 inline-flex"
              v-model="state.about"
              :disabled="changeDisabled"
            />
          </div>
        </div>
        <div class="flex justify-end w-full">
          <button :class="baseClasses">
            {{ changeDisabled ? "Saving..." : "Save" }}
          </button>
          <div
            class="
              absolute
              w-full
              h-full
              bg-gray-100
              opacity-75
              z-50
              inset-0
              rounded-3xl
            "
            v-if="changeDisabled"
          >
            <spinner />
          </div>
        </div>
      </form>
    </div>
  </CardWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import CardWrapper from "../../components/elements/CardWrapper.vue";
import { BASE_BUTTON_CLASSES as baseClasses } from "../../components/elements/button";
import { Listbox, ListboxOption } from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "heroicons-vue3/outline";
import MainTitle from "../../components/elements/MainTitle.vue";
import ListboxButton from "../../components/elements/listbox/ListboxButton.vue";
import ListboxOptions from "../../components/elements/listbox/ListboxOptions.vue";
import ListboxOptionList from "../../components/elements/listbox/ListboxOptionList.vue";
import { clearAlerts, fail, ok, store } from "../../store";
import { genders, pronouns, sexes } from "../../profile";
import Header from "../../components/layout/Header.vue";
import { updateMe } from "../../api/endpoints/user";
import Spinner from "../../components/elements/Spinner.vue";

export default defineComponent({
  components: {
    CardWrapper,
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    SelectorIcon,
    MainTitle,
    ListboxOptionList,
    Header,
    Spinner,
  },
  setup() {
    // the current state.
    // shallow-copies the global state as default value and removes
    const state = reactive({ ...store.account.user });

    // Is changing the state disabled?
    // Toggled during saving.
    const changeDisabled = ref(false);

    const hasStateChanged = () =>
      Object.keys(state).some((k) => state[k] !== store.account.user[k]);

    const display = (str: { display: string } | string) =>
      typeof str === "string" ? str : str.display;

    const sendForm = async () => {
      if (changeDisabled.value) return;
      if (!hasStateChanged()) return;

      changeDisabled.value = true;

      // Clear alerts
      clearAlerts();

      // save changes to the copy
      for (const k in state) {
        store.account.user[k] = display(state[k]);
      }

      try {
        const res = await updateMe({
          ...store.account.user,
          discordId: undefined,
          id: undefined,
        });

        ok("Profile saved successfully.");
      } catch {
        fail("An error has occurred while saving your profile.");
      }

      setTimeout(clearAlerts, 1000);

      changeDisabled.value = false;
    };

    return {
      sendForm,
      baseClasses,
      changeDisabled,
      genders,
      pronouns,
      sexes,
      state,
      store,
      display,
    };
  },
});
</script>
