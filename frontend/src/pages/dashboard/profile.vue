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
                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <template>
                    <listbox-button>
                      {{ gender.display }}
                    </listbox-button>
                    <listbox-options>
                      <listbox-option-list :list="genders" />
                    </listbox-options>
                  </template>
                </transition>
              </div>
            </Listbox>
          </div>
          <div class="flex flex-col mr-8 w-full">
            <label>Pronouns</label>
            <Listbox v-model="pronoun">
              <div class="relative mt-2 w-full">
                <ListboxButton
                  class="relative flex w-full"
                  :class="baseClasses"
                >
                  <span class="block truncate mr-4">{{
                    pronoun.list.join("/")
                  }}</span>
                  <span
                    class="
                      absolute
                      inset-y-0
                      right-0
                      flex
                      items-center
                      pr-2
                      pointer-events-none
                    "
                  >
                    <SelectorIcon
                      class="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute mt-2 bg-white left-0 px-0 py-0 z-10"
                    :class="baseClasses"
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="(p, i) in pronouns"
                      :key="p.name"
                      :value="p"
                      as="template"
                    >
                      <li
                        :class="[
                          active
                            ? 'text-amber-900 bg-amber-100'
                            : 'text-gray-900',
                          // first item
                          i === 0 && 'rounded-t-2xl',
                          // last item
                          i === pronouns.length - 1 && 'rounded-b-2xl',
                        ]"
                        class="
                          cursor-pointer
                          select-none
                          relative
                          py-2
                          px-10
                          hover:bg-gray-100
                          transition
                          duration-300
                          ease-in-out
                        "
                      >
                        <span
                          :class="[
                            selected ? 'font-medium' : 'font-normal',
                            'block truncate',
                          ]"
                          >{{ p.list.join("/") }}</span
                        >
                        <span
                          v-if="selected"
                          class="
                            absolute
                            inset-y-0
                            left-0
                            flex
                            items-center
                            pl-3
                            text-amber-600
                          "
                        >
                          <CheckIcon class="w-5 h-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>

          <div class="flex flex-col w-full">
            <div>
              <label>Sexuality</label>
              <Listbox v-model="sex">
                <div class="relative mt-2">
                  <ListboxButton
                    class="relative inline-flex"
                    :class="baseClasses"
                  >
                    <span class="block truncate mr-4">{{ sex.display }}</span>
                    <span
                      class="
                        absolute
                        inset-y-0
                        right-0
                        flex
                        items-center
                        pr-2
                        pointer-events-none
                      "
                    >
                      <SelectorIcon
                        class="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </ListboxButton>

                  <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <ListboxOptions
                      class="absolute mt-2 bg-white left-0 px-0 py-0"
                      :class="baseClasses"
                    >
                      <ListboxOption
                        v-slot="{ active, selected }"
                        v-for="(s, i) in sexes"
                        :key="s.name"
                        :value="s"
                        as="template"
                      >
                        <li
                          :class="[
                            active
                              ? 'text-amber-900 bg-amber-100'
                              : 'text-gray-900',
                            // first item
                            i === 0 && 'rounded-t-2xl',
                            // last item
                            i === sexes.length - 1 && 'rounded-b-2xl',
                          ]"
                          class="
                            cursor-pointer
                            select-none
                            relative
                            py-2
                            px-10
                            hover:bg-gray-100
                            transition
                            duration-300
                            ease-in-out
                          "
                        >
                          <span
                            :class="[
                              selected ? 'font-medium' : 'font-normal',
                              'block truncate',
                            ]"
                            >{{ s.display }}</span
                          >
                          <span
                            v-if="selected"
                            class="
                              absolute
                              inset-y-0
                              left-0
                              flex
                              items-center
                              pl-3
                              text-amber-600
                            "
                          >
                            <CheckIcon class="w-5 h-5" aria-hidden="true" />
                          </span>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
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
          <button :class="baseClasses">
            Save
            <!-- <label>Your name</label> -->
            <!-- <input type="text" :class="baseClasses" class="mt-2 inline-flex" /> -->
          </button>
        </div>
      </form>
    </div>
  </CardWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CardWrapper from "../../components/elements/CardWrapper.vue";
import { BASE_BUTTON_CLASSES as baseClasses } from "../../components/elements/button";
import {
  Listbox
  ListboxOption,
} from "@headlessui/vue";
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
    ListboxOptions,
    ListboxOptionList
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

    const pronouns: { name: string; list: Pronouns | string[] }[] = [
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
