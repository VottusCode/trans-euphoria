import { reactive } from "vue";
import { User } from "../api/types";
import { genders, pronouns, sexes } from "../profile";

export const oldStore = reactive({
  user: {
    name: "Mia",
    gender: genders[1],
    pronouns: pronouns[1],
    sex: sexes[1],
    about: "meow",
    img:
      "https://cdn.discordapp.com/avatars/353861818982203392/a487a2f8e294057ae401d4bb7447a744.webp",
  },
});

export const store = reactive({
  user: null as User | null,
});
