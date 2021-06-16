<template>
  <CardWrapper>
    <div class="mb-8 flex justify-between">
      <div class="flex items-center w-full">
        <MainTitle class="text-xl" />
      </div>
      <div class="flex items-center justify-end w-full">
        <div class="flex flex-col items-end mr-6">
          <p>Mia</p>
          <p class="text-red-500 border-b border-red-500 text-sm">Log out</p>
        </div>
        <div>
          <img
            src="https://cdn.discordapp.com/avatars/353861818982203392/a487a2f8e294057ae401d4bb7447a744.webp"
            class="w-16 h-16 rounded-full"
          />
        </div>
      </div>
    </div>

    <div class="mb-8">
      <h1 class="text-4xl font-medium">Your Profile</h1>
      <h1 class="text-2xl">Customize your profile here!</h1>
    </div>

    <div>
      <form @submit.prevent="sendForm">
        <div class="flex items-center mb-4 w-full">
          <div class="flex flex-col w-full">
            <label>Your name</label>
            <input type="text" :class="baseClasses" class="mt-2 inline-flex" />
          </div>
        </div>
        <div class="flex items-center w-full mb-8">
          <div class="flex flex-col w-full mr-8">
            <label>Gender</label>
            <Listbox v-model="gender">
              <div class="relative mt-2">
                <listbox-button>
                  {{ gender.display }}
                </listbox-button>
                <listbox-options>
                  <listbox-option-list :list="genders" />
                </listbox-options>
              </div>
            </Listbox>
          </div>
          <div class="flex flex-col mr-8 w-full">
            <label>Pronouns</label>
            <Listbox v-model="pronoun">
              <div class="relative mt-2">
                <listbox-button>
                  {{ pronoun.display }}
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
              <Listbox v-model="sex">
                <div class="relative mt-2">
                  <listbox-button>
                    {{ sex.display }}
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
            />
          </div>
        </div>
        <div class="flex justify-end w-full">
          <button :class="baseClasses">Save</button>
        </div>
      </form>
    </div>
  </CardWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CardWrapper from "../../components/elements/CardWrapper.vue";
import { BASE_BUTTON_CLASSES as baseClasses } from "../../components/elements/button";
import { Listbox, ListboxOption } from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "heroicons-vue3/outline";
import MainTitle from "../../components/elements/MainTitle.vue";
import ListboxButton from "../../components/elements/listbox/ListboxButton.vue";
import ListboxOptions from "../../components/elements/listbox/ListboxOptions.vue";
import ListboxOptionList from "../../components/elements/listbox/ListboxOptionList.vue";

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
  },
  setup() {
    const genders = [
      {
        name: "male",
        display: "Male",
      },
      {
        name: "female",
        display: "Female",
      },
      {
        name: "non_binary",
        display: "Non Binary",
      },
      {
        name: "other",
        display: "Other",
      },
    ];

    const gender = ref(genders[3]);

    type Pronouns = [string, string, string, string, string];

    let pronouns: {
      name: string;
      list: Pronouns | string[];
      display?: string;
    }[] = [
      {
        name: "he",
        list: ["He", "Him", "His", "His", "Himself"],
      },
      {
        name: "she",
        list: ["She", "Her", "Her", "Hers", "Herself"],
      },
      {
        name: "they",
        list: ["They", "Them", "Their", "Theirs", "Themself"],
      },
      {
        name: "other",
        list: ["Other"],
      },
    ];

    // adding display without the need to type the pronouns out like an idiot
    pronouns = pronouns.map((p) => ({ ...p, display: p.list.join("/") }));

    const pronoun = ref(pronouns[3]);

    const sexes = [
      {
        name: "straight",
        display: "Straight",
      },
      {
        name: "gay_lesbian",
        display: "Gay/Lesbian",
      },
      {
        name: "bisexual",
        display: "Bisexual",
      },
      {
        name: "pansexual",
        display: "Pansexual",
      },
      {
        name: "asexual",
        display: "Asexual",
      },
      {
        name: "other",
        display: "Other",
      },
    ];

    const sex = ref(sexes[5]);

    const sendForm = () => {};

    return {
      sendForm,
      baseClasses,
      genders,
      gender,
      pronouns,
      pronoun,
      sexes,
      sex,
    };
  },
});
</script>
