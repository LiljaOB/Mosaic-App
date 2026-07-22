export type Suggestion = {
  mood: string;
  idea: string;
  why: string;
};

const suggestions: Suggestion[] = [
  {
    mood: "Solid",
    idea: "Use the good moment. Do one small thing that helps tomorrow-you.",
    why: "When you feel steady, it is a good time to gently build momentum.",
  },
  {
    mood: "Grateful",
    idea: "Send a short message of thanks to someone, or write one line of gratitude.",
    why: "Gratitude becomes stronger when you give it somewhere to go.",
  },
  {
    mood: "Upbeat",
    idea: "Put on one song and move around for five minutes.",
    why: "A good mood can be used as energy, not wasted.",
  },
  {
    mood: "Calm",
    idea: "Sit quietly for five minutes and let yourself enjoy the calm without filling it.",
    why: "Calm moments are worth noticing, not rushing past.",
  },
  {
    mood: "Bored",
    idea: "Stand outside for five minutes and notice five things you can see.",
    why: "It gives your brain a quick change of scene without asking too much from you.",
  },
  {
    mood: "Restless",
    idea: "Walk around slowly and stretch your shoulders.",
    why: "Restlessness often needs gentle movement, not pressure.",
  },
  {
    mood: "Lonely",
    idea: "Send one simple message to someone safe: Thinking of you.",
    why: "Connection does not have to be a big conversation.",
  },
  {
    mood: "Anxious",
    idea: "Breathe in for three seconds and breathe out for three seconds, ten times.",
    why: "Simple breathing gives your body a clear signal to slow down.",
  },
  {
    mood: "Stressed",
    idea: "Drink a glass of water and unclench your jaw.",
    why: "Small physical resets can help when stress is building.",
  },
  {
    mood: "Struggling",
    idea: "Do the smallest useful thing available: wash your face, change your socks, or sit up.",
    why: "When things feel heavy, small actions still count.",
  },
  {
    mood: "Triggered",
    idea: "Move away from the trigger if you can, then breathe slowly for one minute.",
    why: "Creating space gives you a better chance to choose your next move.",
  },
  {
    mood: "Angry",
    idea: "Put the phone down for five minutes and walk until your body slows.",
    why: "Anger often wants action. Movement gives it somewhere safer to go.",
  },
  {
    mood: "Overwhelmed",
    idea: "Pick one thing only. Write it down. Do not add a second thing yet.",
    why: "Overwhelm gets worse when everything is treated as urgent at once.",
  },
];

export default suggestions;