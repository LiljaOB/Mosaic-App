export type MeetingLink = {
  name: string;
  description: string;
  url: string;
  colour: string;
};

export type SectionName =
  | "alcohol"
  | "gambling"
  | "cannabis"
  | "cocaine"
  | "heroin"
  | "sexlove"
  | "wellbeing";

export const SOCIAL_PRESCRIBING_URL =
  "https://www.allirelandsocialprescribing.ie/service-list-by-county";
export const MOSAIC_SUPPORT_URL = "https://mosaicbytes.com/pages/support.html";

export const SECTION_COLOURS: Record<SectionName, string> = {
  alcohol: "#1F9BBF",
  gambling: "#377D1B",
  cannabis: "#177F69",
  cocaine: "#D66926",
  heroin: "#96358B",
  sexlove: "#9B51E0",
  wellbeing: "#177F69",
};

export const alcoholLocalLinks: MeetingLink[] = [
  {
    name: "AA Meetings",
    description: "Alcoholics Anonymous Ireland meeting finder.",
    url: "https://www.alcoholicsanonymous.ie/find-meeting/",
    colour: "#1F9BBF",
  },
  {
    name: "LifeRing Meetings",
    description: "LifeRing Ireland recovery meetings.",
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

export const alcoholOnlineLinks: MeetingLink[] = [
  {
    name: "Live Online AA Meetings",
    description: "AA Online Intergroup live online meeting directory.",
    url: "https://aa-intergroup.org/meetings/",
    colour: "#1F9BBF",
  },
  {
    name: "LifeRing Online Meetings",
    description: "LifeRing Ireland online meetings schedule.",
    url: "https://lifering.ie/online-meetings-schedule/",
    colour: "#96358B",
  },
  {
    name: "SMART Recovery Online",
    description: "SMART Recovery online meeting options.",
    url: "https://smartrecovery.ie/find-a-meeting/",
    colour: "#D66926",
  },
];

export const alcoholWomenLinks: MeetingLink[] = [
  {
    name: "Women-only AA meetings",
    description:
      "Use the AA Ireland finder and look for women-only meetings near you.",
    url: "https://www.alcoholicsanonymous.ie/find-meeting/",
    colour: "#C76E27",
  },
  {
    name: "Online women-focused AA options",
    description: "Search AA Online Intergroup for women / women’s meetings.",
    url: "https://aa-intergroup.org/meetings/",
    colour: "#D66926",
  },
];

export const alcoholMenLinks: MeetingLink[] = [
  {
    name: "Men-only AA meetings",
    description:
      "Use the AA Ireland finder and look for men-only meetings near you.",
    url: "https://www.alcoholicsanonymous.ie/find-meeting/",
    colour: "#1F9BBF",
  },
  {
    name: "Online men-focused AA options",
    description: "Search AA Online Intergroup for men / men’s meetings.",
    url: "https://aa-intergroup.org/meetings/",
    colour: "#123C69",
  },
];

export const alcoholSpecialLinks: MeetingLink[] = [
  {
    name: "LGBTQ+ AA Ireland",
    description: "LGBTQ+ Alcoholics Anonymous meetings in Ireland.",
    url: "https://lgbtaaireland.com/index.php/lgbt-aa-meetings/",
    colour: "#96358B",
  },
  {
    name: "Outhouse LGBTQ+ Centre",
    description: "AA, NA and recovery groups at Outhouse, Dublin.",
    url: "https://outhouse.ie/health-wellness/",
    colour: "#9B51E0",
  },
  {
    name: "Kindr (GBTQ+ men's recovery)",
    description: "GBTQ+ men’s 12-step recovery group.",
    url: "https://www.kindr.ie/",
    colour: "#1F9BBF",
  },
  {
    name: "IREYPAA – Young People in AA",
    description: "All-Ireland Young People in Alcoholics Anonymous.",
    url: "https://ireypaa.org/",
    colour: "#D66926",
  },
  {
    name: "Belong To (LGBTQ+ youth)",
    description:
      "Ireland’s national LGBTQ+ youth organisation – including drug & alcohol support.",
    url: "https://www.belongto.org/",
    colour: "#177F69",
  },
];

export const alcoholLanguageLinks: MeetingLink[] = [
  {
    name: "AA Meetings in Other Languages",
    description: "Find AA meetings by language via AA Online Intergroup.",
    url: "https://aa-intergroup.org/meetings/",
    colour: "#1F9BBF",
  },
  {
    name: "NA Multilingual / Online",
    description: "NA meetings including online and wider language options.",
    url: "https://www.na-ireland.org/na-meetings/",
    colour: "#177F69",
  },
  {
    name: "SMART Recovery",
    description: "Ask SMART about language or accessibility needs.",
    url: "https://smartrecovery.ie/find-a-meeting/",
    colour: "#D66926",
  },
];

export const gamblingLinks: MeetingLink[] = [
  {
    name: "Gamblers Anonymous Ireland",
    description: "GA Ireland meetings and support.",
    url: "https://www.gamblersanonymous.ie/",
    colour: "#377D1B",
  },
  {
    name: "GA Online Meetings (UK & Ireland list)",
    description:
      "Online GA meetings including LGBTQ+-preferred and women-preferred options.",
    url: "https://gamblersanonymous.org.uk/online-meetings",
    colour: "#96358B",
  },
];

export const cannabisLinks: MeetingLink[] = [
  {
    name: "NA Meetings (Ireland)",
    description: "Narcotics Anonymous Ireland – covers cannabis and other drugs.",
    url: "https://www.na-ireland.org/na-meetings/",
    colour: "#177F69",
  },
  {
    name: "SMART Recovery",
    description: "SMART Recovery Ireland meeting finder.",
    url: "https://smartrecovery.ie/find-a-meeting/",
    colour: "#D66926",
  },
  {
    name: "NA World – find online meetings",
    description:
      "Search worldwide NA meetings, including virtual, LGBTQ and young people where listed.",
    url: "https://www.na.org",
    colour: "#1F9BBF",
  },
];

export const cocaineLinks: MeetingLink[] = [
  {
    name: "Cocaine Anonymous Ireland",
    description: "CA Ireland fellowship and meeting information.",
    url: "https://www.caireland.info/",
    colour: "#1F9BBF",
  },
  {
    name: "NA Meetings (Ireland)",
    description: "Narcotics Anonymous Ireland meetings.",
    url: "https://www.na-ireland.org/na-meetings/",
    colour: "#177F69",
  },
  {
    name: "CA Online meetings",
    description: "Cocaine Anonymous online meeting directory.",
    url: "https://ca-online.org",
    colour: "#D66926",
  },
  {
    name: "CAUK meeting finder (online & special interest)",
    description:
      "UK/online CA list – includes women, LGBTQ and other tagged meetings.",
    url: "https://meetings.cocaineanonymous.org.uk/locations",
    colour: "#96358B",
  },
];

export const heroinLinks: MeetingLink[] = [
  {
    name: "NA Meetings (Ireland)",
    description: "Narcotics Anonymous Ireland meetings.",
    url: "https://www.na-ireland.org/na-meetings/",
    colour: "#177F69",
  },
  {
    name: "NA at Outhouse (Dublin)",
    description: "NA meeting hosted at Outhouse LGBTQ+ Centre.",
    url: "https://outhouse.ie/health-wellness/",
    colour: "#9B51E0",
  },
  {
    name: "NA World – find online meetings",
    description:
      "Search worldwide NA meetings, including virtual and special-interest where listed.",
    url: "https://www.na.org",
    colour: "#1F9BBF",
  },
];

export const sexLoveLinks: MeetingLink[] = [
  {
    name: "SLAA Ireland",
    description: "Sex and Love Addicts Anonymous Ireland.",
    url: "https://slaaireland.org/",
    colour: "#96358B",
  },
  {
    name: "Sexaholics Anonymous Ireland",
    description: "SA Ireland meetings information.",
    url: "https://saireland.com/meetings/",
    colour: "#D66926",
  },
  {
    name: "SLAA Virtual Intergroup",
    description:
      "Worldwide online SLAA meetings – includes LGBTQIA and other special-interest meetings.",
    url: "https://slaavirtual.org/meetings/calendar/",
    colour: "#9B51E0",
  },
];
