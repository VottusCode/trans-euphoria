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

let pronouns: {
  name: string;
  list: string[];
  examples: string;
  display?: string;
}[] = [
  {
    name: "he",
    list: ["He", "Him", "His", "His", "Himself"],
    examples: [
      "He is studying.",
      "I studied with him.",
      "The book is his. ",
      "He decided to do it himself.",
    ].join("\n\r"),
  },
  {
    name: "she",
    list: ["She", "Her", "Her", "Hers", "Herself"],
    examples: [
      "She is studying.",
      "I studied with her.",
      "The book is hers. ",
      "She decided to do it herself.",
    ].join("\n\r"),
  },
  {
    name: "they",
    list: ["They", "Them", "Their", "Theirs", "Themselves"],
    examples: [
      "They are studying.",
      "I studied with them.",
      "The book is theirs. ",
      "They decided to do it themselves.",
    ].join("\n\r"),
  },
  {
    name: "other",
    list: ["Other"],
    examples: ["No examples available. SoonTM"].join("\n\r"),
  },
];

// adding display without the need to type the pronouns out like an idiot
pronouns = pronouns.map((p) => ({
  ...p,
  display: p.list.join("/"),
}));

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

export { genders, pronouns, sexes };
