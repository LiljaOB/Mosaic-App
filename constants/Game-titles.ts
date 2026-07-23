export type Game = {
  title: string;
  text: string;
  route: string;
  info: string;
};

const games: Game[] = [
  {
    title: "Open Season",
    text: "Play the scope game.",
    route: "/open-season",
    info: "Open Season is a simple arcade-style recovery game. Move the scope, find the targets, and clear them from the screen.",
  },
  {
    title: "Craving Hunter",
    text: "Hunt the cravings.",
    route: "/craving-hunter",
    info: "Craving Hunter is a recovery arcade game where cravings chase people and try to pull them towards the pub. Your job is to stop the cravings and protect recovery.",
  },
  {
    title: "Recovery Crew",
    text: "Help people rebuild.",
    route: "/recovery-crew",
    info: "Recovery Crew is a tongue-in-cheek but heartfelt game about helping people step away from the street, build stability, and later come back to help others.",
  },
  {
    title: "Sober Road",
    text: "Make the roads safe again.",
    route: "/sober-road",
    info: "Sober Road is a driving game where you detect unsafe wobbling cars and activate the Sober Shield. Once a car is shielded, alcohol can no longer enter it — any beer, wine, or spirits brought inside turns into water, tea, or lemonade.",
 },
  {
    title: "Game 5",
    text: "Coming soon.",
    route: "/game-5",
    info: "This game space is reserved for a future recovery game.",
  },
  {
    title: "Game 6",
    text: "Coming soon.",
    route: "/game-6",
    info: "This game space is reserved for a future recovery game.",
  },
  {
    title: "Game 7",
    text: "Coming soon.",
    route: "/game-7",       
    info: "This game space is reserved for a future recovery game.",
  },
  {
    title: "Game 8",
    text: "Coming soon.",
    route: "/game-8",
    info: "This game space is reserved for a future recovery game.",
  },
  {
    title: "Game 9",
    text: "Coming soon.",
    route: "/game-9",
    info: "This game space is reserved for a future recovery game.",
  },
  {
    title: "Game 10",
    text: "Coming soon.",
    route: "/game-10",
    info: "This game space is reserved for a future recovery game.",
  },
];

export default games;