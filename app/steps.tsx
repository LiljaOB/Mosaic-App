import { Alert } from "react-native";

import { authorBios, quoteBank, type Quote } from "../components/steps/constants/steps";

export function getQuoteOfTheDay() {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor(
    (today.getTime() - startOfYear.getTime()) / 86400000,
  );

  return quoteBank[dayOfYear % quoteBank.length];
}

export function normaliseQuote(item: Quote) {
  const correctedQuote = quoteBank.find((quote) => quote.quote === item.quote);

  if (correctedQuote) {
    return correctedQuote;
  }

  return {
    quote: item.quote,
    author: item.author,
    bio: item.bio || authorBios[item.author] || authorBios.Unknown,
  };
}

export function showAuthorInfo(author: string, bio?: string) {
  Alert.alert(author, bio || authorBios[author] || authorBios.Unknown);
}
