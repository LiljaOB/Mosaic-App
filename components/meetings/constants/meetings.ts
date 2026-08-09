export type MeetingLink = {
  name: string;
  description: string;
  url: string;
  colour: string;
};

export type SectionName =
  | "local"
  | "online"
  | "special"
  | "languages"
  | "wellbeing";

export const SOCIAL_PRESCRIBING_URL =
  "https://www.allirelandsocialprescribing.ie/service-list-by-county";

export const localMeetingLinks: MeetingLink[] = [
  {
    name: "AA Meetings",
    description: "Alcoholics Anonymous Ireland meeting finder.",
    url: "https://www.alcoholicsanonymous.ie/find-meeting/",
    colour: "#1F9BBF",
  },
  {
    name: "NA Meetings",
    description: "Narcotics Anonymous Ireland meetings.",
    url: "https://www.na-ireland.org/na-meetings/",
    colour: "#177F69",
  },
  {
    name: "LifeRing Meetings",
    description: "LifeRing Ireland online recovery meetings.",
    url: "https://lifering.ie/online-meetings-schedule/",
    colour: "#96358B",
  },
  {
    name: "SMART Recovery",
    description: "SMART Recovery Ireland meeting finder.",
    url: "https://smartrecovery.ie/find-a-meeting/",
    colour: "#D66926",
  },
];

export const onlineMeetingLinks: MeetingLink[] = [
  {
    name: "Live Online AA Meetings",
    description: "AA Online Intergroup live online meeting directory.",
    url: "https://aa-intergroup.org/meetings/",
    colour: "#1F9BBF",
  },
  {
    name: "Online NA Meetings",
    description: "Virtual NA online and phone meetings.",
    url: "https://virtual-na.org/meetings/",
    colour: "#177F69",
  },
  {
    name: "LifeRing Online Meetings",
    description: "LifeRing Ireland online meetings schedule.",
    url: "https://lifering.ie/online-meetings-schedule/",
    colour: "#96358B",
  },
  {
    name: "SMART Recovery Online",
    description: "SMART Recovery Ireland online meetings.",
    url: "https://smartrecovery.ie/online-meetings/",
    colour: "#D66926",
  },
];

export const specialistMeetingLinks: MeetingLink[] = [
  {
    name: "LGBTQ+ AA Online",
    description: "AA Online Intergroup LGBTQ+ meeting example.",
    url: "https://aa-intergroup.org/meetings/angel-lgbtq-online-meeting/",
    colour: "#96358B",
  },
  {
    name: "Women’s AA Online",
    description: "AA Online Intergroup women’s meeting example.",
    url: "https://aa-intergroup.org/meetings/better-together-womens-group/",
    colour: "#96358B",
  },
  {
    name: "Men’s AA Online",
    description: "AA Online Intergroup men’s meeting example.",
    url: "https://aa-intergroup.org/meetings/boyz-ii-men-daily-fellowship/",
    colour: "#1F9BBF",
  },
  {
    name: "Young People’s AA Online",
    description: "AA Online Intergroup young people’s meeting example.",
    url: "https://aa-intergroup.org/meetings/a-new-wave-young-peoples-group-4/",
    colour: "#D66926",
  },
];

export const languageMeetingLinks: MeetingLink[] = [
  {
    name: "AA Online Intergroup",
    description:
      "International online AA directory with meetings in different languages.",
    url: "https://aa-intergroup.org/meetings/",
    colour: "#1F9BBF",
  },
  {
    name: "Spanish AA Online",
    description: "Spanish-speaking AA online meeting example.",
    url: "https://aa-intergroup.org/meetings/aa-en-espaol-6/",
    colour: "#D66926",
  },
  {
    name: "Polish AA Meetings",
    description: "Polish-speaking AA meetings through AA Great Britain.",
    url: "https://www.alcoholics-anonymous.org.uk/intergroups/polish-speaking-meetings/",
    colour: "#96358B",
  },
  {
    name: "French AA Online",
    description: "Online AA meetings connected with AA Paris.",
    url: "https://www.aaparis.org/meetings/?type=online",
    colour: "#96358B",
  },
  {
    name: "AA Spain",
    description: "Official Alcoholics Anonymous Spain website.",
    url: "https://www.alcoholicos-anonimos.org/",
    colour: "#177F69",
  },
  {
    name: "AA Around the World",
    description:
      "AA world directory for finding AA support in other countries and languages.",
    url: "https://www.aa.org/aa-around-the-world",
    colour: "#123C69",
  },
];
