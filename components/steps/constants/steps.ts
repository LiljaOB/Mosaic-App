export type Quote = {
  quote: string;
  author: string;
  bio?: string;
};

export const SAVED_QUOTES_KEY = "savedQuotes";

export const authorBios: Record<string, string> = {
  "Steven Condra":
    "Steven Condra is the creator of Mosaic and a person in recovery.",
  "Benjamin Franklin":
    "Benjamin Franklin was an American writer, inventor, printer and statesman.",
  "Lao Tzu":
    "Lao Tzu was an ancient Chinese philosopher traditionally associated with the Tao Te Ching.",
  "Friedrich Nietzsche":
    "Friedrich Nietzsche was a German philosopher.",
  "Frank Leahy":
    "Frank Leahy was an American football coach.",
  "Robert H. Schuller":
    "Robert H. Schuller was an American pastor, speaker and author.",
  "Wayne Gretzky":
    "Wayne Gretzky is a Canadian former professional ice hockey player.",
  "Arthur Ashe":
    "Arthur Ashe was an American tennis champion and civil rights advocate.",
  "Albert Einstein":
    "Albert Einstein was a German-born theoretical physicist.",
  "Babe Ruth":
    "Babe Ruth was an American baseball player.",
  "Charles R. Swindoll":
    "Charles R. Swindoll is an American pastor, author and speaker.",
  "Norman Vaughan":
    "Norman Vaughan was an American explorer and adventurer.",
  "Neil Armstrong":
    "Neil Armstrong was an American astronaut and the first person to walk on the Moon.",
  "David Brinkley":
    "David Brinkley was an American television journalist.",
  "Robert Frost":
    "Robert Frost was an American poet.",
  "Mother Teresa":
    "Mother Teresa was a Catholic nun and humanitarian.",
  "Paraphrase of Mother Teresa":
    "This line is commonly linked to Mother Teresa, but is treated here as a paraphrase rather than an exact verified quotation.",
  "Malcolm X":
    "Malcolm X was an American civil rights leader and speaker.",
  "Eleanor Roosevelt":
    "Eleanor Roosevelt was an American diplomat, writer and First Lady of the United States.",
  "Anne Frank":
    "Anne Frank was a German-born Jewish diarist.",
  "Oliver Goldsmith":
    "Oliver Goldsmith was an Irish writer, poet and playwright.",
  "Sarah Frances Brown":
    "Sarah Frances Brown was the mother of author H. Jackson Brown, Jr.",
  "H. Jackson Brown, Jr.":
    "H. Jackson Brown, Jr. was an American author.",
  Epictetus:
    "Epictetus was a Greek Stoic philosopher.",
  "Marcus Aurelius":
    "Marcus Aurelius was a Roman emperor and Stoic philosopher.",
  "William Shakespeare":
    "William Shakespeare was an English playwright and poet.",
  "Frederick Douglass":
    "Frederick Douglass was an American abolitionist, writer and speaker.",
  "William Ernest Henley":
    "William Ernest Henley was an English poet.",
  "Jane Austen":
    "Jane Austen was an English novelist.",
  "Emily Dickinson":
    "Emily Dickinson was an American poet.",
  "James Allen":
    "James Allen was a British writer known for inspirational and philosophical works.",
  "Louisa May Alcott":
    "Louisa May Alcott was an American novelist.",
  "Samuel Johnson":
    "Samuel Johnson was an English writer, critic and lexicographer.",
  "Walt Whitman":
    "Walt Whitman was an American poet.",
  "Ralph Waldo Emerson":
    "Ralph Waldo Emerson was an American essayist, poet and philosopher.",
  "Henry David Thoreau":
    "Henry David Thoreau was an American writer and philosopher.",
  "Kenny Rogers":
    "Kenny Rogers was an American singer, songwriter and actor.",
  "American proverb":
    "A proverb is a traditional saying passed down over time.",
  Unknown:
    "The original author of this quote has not been verified.",
  "Abraham Lincoln":
    "Abraham Lincoln was an American statesman and the 16th president of the United States.",
  "Albert Camus":
    "Albert Camus was a French philosopher, author and journalist.",
  "Alfred Adler":
    "Alfred Adler was an Austrian doctor and psychotherapist.",
  "Anna Quindlen":
    "Anna Quindlen is an American author and journalist.",
  "Annette Funicello":
    "Annette Funicello was an American actress and singer.",
  "Anthony J. D’Angelo":
    "Anthony J. D’Angelo is an American author and speaker.",
  Aristotle:
    "Aristotle was an ancient Greek philosopher.",
  "Augustine of Hippo":
    "Augustine of Hippo was an early Christian theologian and philosopher.",
  "Bhagavad Gita":
    "The Bhagavad Gita is an ancient Hindu scripture presented as a dialogue on duty, action and spiritual life.",
  "Bill Murray":
    "Bill Murray is an American actor and comedian.",
  "Bruce Lee":
    "Bruce Lee was a martial artist, actor and filmmaker.",
  Buddha:
    "Buddha commonly refers to Siddhartha Gautama, the spiritual teacher whose teachings founded Buddhism.",
  "Carl Jung":
    "Carl Jung was a Swiss psychiatrist and founder of analytical psychology.",
  "Charlie Brown":
    "Charlie Brown is a fictional character created by cartoonist Charles M. Schulz.",
  "Charlie Munger":
    "Charlie Munger was an American investor, businessman and writer.",
  Confucius:
    "Confucius was an ancient Chinese philosopher and teacher.",
  "Cory Muscara":
    "Cory Muscara is a meditation teacher, speaker and author.",
  "Dalai Lama":
    "The Dalai Lama is the title of a leading figure in Tibetan Buddhism.",
  "David Goggins":
    "David Goggins is an American endurance athlete, speaker and author.",
  "Dolly Parton":
    "Dolly Parton is an American singer, songwriter, actress and philanthropist.",
  "Edmund Hillary":
    "Edmund Hillary was a New Zealand mountaineer and explorer.",
  "Elbert Hubbard":
    "Elbert Hubbard was an American writer, publisher and philosopher.",
  "Elon Musk":
    "Elon Musk is a technology entrepreneur and business leader.",
  "Esther Hicks":
    "Esther Hicks is an American inspirational speaker and author.",
  "Gary Keller":
    "Gary Keller is an American entrepreneur and author.",
  "George Bernard Shaw":
    "George Bernard Shaw was an Irish playwright, critic and political thinker.",
  "Grandma Moses":
    "Grandma Moses was an American folk artist.",
  "Helen Keller":
    "Helen Keller was an American author, lecturer and disability rights advocate.",
  Horace:
    "Horace was an ancient Roman poet.",
  "Hugh Laurie":
    "Hugh Laurie is an English actor, musician and writer.",
  "Immanuel Kant":
    "Immanuel Kant was a German philosopher.",
  "Indira Gandhi":
    "Indira Gandhi was an Indian stateswoman and prime minister.",
  "Jack Canfield":
    "Jack Canfield is an American author and motivational speaker.",
  "Jim Carrey":
    "Jim Carrey is a Canadian-American actor and comedian.",
  "John C. Maxwell":
    "John C. Maxwell is an American author and leadership speaker.",
  "John F. Kennedy":
    "John F. Kennedy was an American statesman and the 35th president of the United States.",
  "Joseph Campbell":
    "Joseph Campbell was an American writer and scholar of mythology.",
  "Joshua Fields Millburn":
    "Joshua Fields Millburn is an American author known for writing about minimalism.",
  "Joyce Meyer":
    "Joyce Meyer is an American Christian author and speaker.",
  "Leo Tolstoy":
    "Leo Tolstoy was a Russian novelist and philosopher.",
  "Lex Fridman":
    "Lex Fridman is a podcaster and computer scientist.",
  "Mae West":
    "Mae West was an American actress, playwright and comedian.",
  "Mahatma Gandhi":
    "Mahatma Gandhi was an Indian independence leader and advocate of nonviolent resistance.",
  "Marcus Tullius Cicero":
    "Marcus Tullius Cicero was a Roman statesman, lawyer, writer and philosopher.",
  "Mark Manson":
    "Mark Manson is an American author and blogger.",
  "Mark Twain":
    "Mark Twain was an American writer and humorist.",
  "Mary Lou Retton":
    "Mary Lou Retton is an American former gymnast.",
  "Mary Oliver":
    "Mary Oliver was an American poet.",
  "Maxime Lagacé":
    "Maxime Lagacé is a writer and the creator of WisdomQuotes.",
  "Maya Angelou":
    "Maya Angelou was an American poet, memoirist and civil rights activist.",
  "Mel Robbins":
    "Mel Robbins is an American author, speaker and podcaster.",
  "Michael Easter":
    "Michael Easter is an American author and journalist.",
  "Michael Jordan":
    "Michael Jordan is an American former professional basketball player.",
  "Michel de Montaigne":
    "Michel de Montaigne was a French philosopher and essayist.",
  "Mike Dolan":
    "Mike Dolan is credited as the author of this quote.",
  "Napoleon Bonaparte":
    "Napoleon Bonaparte was a French military leader and emperor.",
  "Naval Ravikant":
    "Naval Ravikant is an entrepreneur, investor and writer.",
  "Norman Vincent Peale":
    "Norman Vincent Peale was an American minister and author.",
  "Omar Khayyam":
    "Omar Khayyam was a Persian mathematician, astronomer, philosopher and poet.",
  "Oprah Winfrey":
    "Oprah Winfrey is an American television host, producer and philanthropist.",
  "Oscar Wilde":
    "Oscar Wilde was an Irish poet, playwright and author.",
  Osho:
    "Osho was an Indian spiritual teacher and author.",
  "Paulo Coelho":
    "Paulo Coelho is a Brazilian novelist.",
  "Paulo Coelho (The Alchemist)":
    "Paulo Coelho is a Brazilian novelist and the author of The Alchemist.",
  Pythagoras:
    "Pythagoras was an ancient Greek philosopher and mathematician.",
  "Rhonda Byrne":
    "Rhonda Byrne is an Australian author and producer.",
  "Richard Wagner":
    "Richard Wagner was a German composer and theatre director.",
  "Rick Riordan":
    "Rick Riordan is an American author.",
  "Rikki Rogers":
    "Rikki Rogers is credited as the author of this quote.",
  "Robert Greene":
    "Robert Greene is an American author.",
  "Ryan Brewlow":
    "Ryan Brewlow is credited as the author of this quote.",
  Sadhguru:
    "Sadhguru is an Indian yogi, speaker and author.",
  "Sam Levenson":
    "Sam Levenson was an American humorist, writer and television host.",
  Seneca:
    "Seneca was a Roman Stoic philosopher, statesman and playwright.",
  "Shane Parrish":
    "Shane Parrish is an author and the founder of Farnam Street.",
  "Simon Sinek":
    "Simon Sinek is a British-American author and speaker.",
  Socrates:
    "Socrates was an ancient Greek philosopher.",
  "Stephen King":
    "Stephen King is an American author.",
  "Steve Jobs":
    "Steve Jobs was an American entrepreneur and co-founder of Apple.",
  "Søren Kierkegaard":
    "Søren Kierkegaard was a Danish philosopher and theologian.",
  "Theodore Roosevelt":
    "Theodore Roosevelt was an American statesman and the 26th president of the United States.",
  "Thomas J. Watson":
    "Thomas J. Watson was an American business executive.",
  "Tim Ferriss":
    "Tim Ferriss is an American author, entrepreneur and podcaster.",
  "Timothée Chalamet":
    "Timothée Chalamet is an American-French actor.",
  "Tony Robbins":
    "Tony Robbins is an American author, coach and motivational speaker.",
  "Will Smith":
    "Will Smith is an American actor and musician.",
  "William James":
    "William James was an American philosopher and psychologist.",
  "Winston Churchill":
    "Winston Churchill was a British statesman, writer and prime minister.",
  "Yvon Chouinard":
    "Yvon Chouinard is an American climber, environmentalist and businessman.",
  "Zsa Zsa Gabor":
    "Zsa Zsa Gabor was a Hungarian-American actress and socialite.",
};

export const quoteBank: Quote[] = [
  {
    quote: "When you can't fall any further, it's time to get up.",
    author: "Steven Condra",
    bio: authorBios["Steven Condra"],
  },
  {
    quote: "An ounce of prevention is worth a pound of cure.",
    author: "Benjamin Franklin",
    bio: authorBios["Benjamin Franklin"],
  },
  {
    quote: "The journey of a thousand miles begins with a single step.",
    author: "Lao Tzu",
    bio: authorBios["Lao Tzu"],
  },
  {
    quote: "That which does not kill me makes me stronger.",
    author: "Friedrich Nietzsche",
    bio: authorBios["Friedrich Nietzsche"],
  },
  {
    quote: "When the going gets tough, the tough get going.",
    author: "Frank Leahy",
    bio: authorBios["Frank Leahy"],
  },
  {
    quote: "Tough times never last, but tough people do.",
    author: "Robert H. Schuller",
    bio: authorBios["Robert H. Schuller"],
  },
  {
    quote: "You miss 100 percent of the shots you never take.",
    author: "Wayne Gretzky",
    bio: authorBios["Wayne Gretzky"],
  },
  {
    quote: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
    bio: authorBios["Arthur Ashe"],
  },
  {
    quote:
      "Try not to become a person of success, but rather try to become a person of value.",
    author: "Albert Einstein",
    bio: authorBios["Albert Einstein"],
  },
  {
    quote: "I have no special talent. I am only passionately curious.",
    author: "Albert Einstein",
    bio: authorBios["Albert Einstein"],
  },
  {
    quote: "Never let the fear of striking out keep you from playing the game.",
    author: "Babe Ruth",
    bio: authorBios["Babe Ruth"],
  },
  {
    quote:
      "Life is ten percent what happens to you and ninety percent how you respond to it.",
    author: "Charles R. Swindoll",
    bio: authorBios["Charles R. Swindoll"],
  },
  {
    quote: "Dream big and dare to fail.",
    author: "Norman Vaughan",
    bio: authorBios["Norman Vaughan"],
  },
  {
    quote: "That's one small step for [a] man, one giant leap for mankind.",
    author: "Neil Armstrong",
    bio: authorBios["Neil Armstrong"],
  },
  {
    quote:
      "A successful man is one who can lay a firm foundation with the bricks others have thrown at him.",
    author: "David Brinkley",
    bio: authorBios["David Brinkley"],
  },
  {
    quote:
      "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost",
    bio: authorBios["Robert Frost"],
  },
  {
    quote: "If you judge people, you have no time to love them.",
    author: "Paraphrase of Mother Teresa",
    bio: authorBios["Paraphrase of Mother Teresa"],
  },
  {
    quote: "The future belongs to those who prepare for it today.",
    author: "Malcolm X",
    bio: authorBios["Malcolm X"],
  },
  {
    quote: "Don't be afraid to give up the good to go for the great.",
    author: "Kenny Rogers",
    bio: authorBios["Kenny Rogers"],
  },
  {
    quote:
      "Our greatest glory is not in never falling, but in rising every time we fall.",
    author: "Oliver Goldsmith",
    bio: authorBios["Oliver Goldsmith"],
  },
  {
    quote: "When you reach the end of your rope, tie a knot in it and hang on.",
    author: "American proverb",
    bio: authorBios["American proverb"],
  },
  {
    quote: "No one can make you feel inferior without your consent.",
    author: "Eleanor Roosevelt",
    bio: authorBios["Eleanor Roosevelt"],
  },
  {
    quote:
      "In the long run, the sharpest weapon of all is a kind and gentle spirit.",
    author: "Anne Frank",
    bio: authorBios["Anne Frank"],
  },
  {
    quote: "People are just as happy as they make up their minds to be.",
    author: "Unknown",
    bio: authorBios.Unknown,
  },
  {
    quote: "Every great dream begins with a dreamer.",
    author: "Unknown",
    bio: authorBios.Unknown,
  },
  {
    quote:
      "Success is not final; failure is not fatal. It is the courage to continue that counts.",
    author: "Unknown",
    bio: authorBios.Unknown,
  },
  {
    quote:
      "Remember that the happiest people are not those getting more, but those giving more.",
    author: "H. Jackson Brown, Jr.",
    bio: authorBios["H. Jackson Brown, Jr."],
  },
  {
    quote:
      "Twenty years from now you will be more disappointed by the things you didn't do than by the ones you did do.",
    author: "Sarah Frances Brown",
    bio: authorBios["Sarah Frances Brown"],
  },
  {
    quote: "Some things are in our control and others not.",
    author: "Epictetus",
    bio: authorBios.Epictetus,
  },
  {
    quote: "No great thing is created suddenly.",
    author: "Epictetus",
    bio: authorBios.Epictetus,
  },
  {
    quote:
      "First say to yourself what you would be; and then do what you have to do.",
    author: "Epictetus",
    bio: authorBios.Epictetus,
  },
  {
    quote: "Do every act of your life as if it were your last.",
    author: "Marcus Aurelius",
    bio: authorBios["Marcus Aurelius"],
  },
  {
    quote: "This above all: to thine own self be true.",
    author: "William Shakespeare",
    bio: authorBios["William Shakespeare"],
  },
  {
    quote: "What's past is prologue.",
    author: "William Shakespeare",
    bio: authorBios["William Shakespeare"],
  },
  {
    quote: "Sweet are the uses of adversity.",
    author: "William Shakespeare",
    bio: authorBios["William Shakespeare"],
  },
  {
    quote: "If there is no struggle, there is no progress.",
    author: "Frederick Douglass",
    bio: authorBios["Frederick Douglass"],
  },
  {
    quote: "I am the master of my fate, I am the captain of my soul.",
    author: "William Ernest Henley",
    bio: authorBios["William Ernest Henley"],
  },
  {
    quote: "Know your own happiness.",
    author: "Jane Austen",
    bio: authorBios["Jane Austen"],
  },
  {
    quote: "Hope is the thing with feathers that perches in the soul.",
    author: "Emily Dickinson",
    bio: authorBios["Emily Dickinson"],
  },
  {
    quote: "Forever is composed of nows.",
    author: "Emily Dickinson",
    bio: authorBios["Emily Dickinson"],
  },
  {
    quote: "I dwell in possibility.",
    author: "Emily Dickinson",
    bio: authorBios["Emily Dickinson"],
  },
  {
    quote: "Calmness is power.",
    author: "James Allen",
    bio: authorBios["James Allen"],
  },
  {
    quote: "I am not afraid of storms, for I am learning how to sail my ship.",
    author: "Louisa May Alcott",
    bio: authorBios["Louisa May Alcott"],
  },
  {
    quote: "Great works are performed, not by strength, but by perseverance.",
    author: "Samuel Johnson",
    bio: authorBios["Samuel Johnson"],
  },
  {
    quote:
      "I am larger, better than I thought; I did not know I held so much goodness.",
    author: "Walt Whitman",
    bio: authorBios["Walt Whitman"],
  },
  {
    quote: "Trust thyself: every heart vibrates to that iron string.",
    author: "Ralph Waldo Emerson",
    bio: authorBios["Ralph Waldo Emerson"],
  },
  {
    quote: "Simplify, simplify.",
    author: "Henry David Thoreau",
    bio: authorBios["Henry David Thoreau"],
  },
  {
    quote: "Energy and persistence conquer all things.",
    author: "Benjamin Franklin",
    bio: authorBios["Benjamin Franklin"],
  },
  {
    quote: "Well done is better than well said.",
    author: "Benjamin Franklin",
    bio: authorBios["Benjamin Franklin"],
  },
  {
    quote: "Lost time is never found again.",
    author: "Benjamin Franklin",
    bio: authorBios["Benjamin Franklin"],
  },
  {
    quote: "Little strokes fell great oaks.",
    author: "Benjamin Franklin",
    bio: authorBios["Benjamin Franklin"],
  },
  {
    quote: "If you're going through hell, keep going.",
    author: "Unknown",
    bio: authorBios.Unknown,
  },
  {
    quote: "It always seems impossible until it's done.",
    author: "Unknown",
    bio: authorBios.Unknown,
  },
  {
    quote: "The man who moves a mountain begins by carrying away small stones.",
    author: "Unknown",
    bio: authorBios.Unknown,
  },
  {
    quote: "Believe you can and you’re halfway there.",
    author: "Theodore Roosevelt",
    bio: authorBios["Theodore Roosevelt"],
  },
  {
    quote: "Life can only be understood backwards; but it must be lived forwards.",
    author: "Søren Kierkegaard",
    bio: authorBios["Søren Kierkegaard"],
  },
  {
    quote: "If you spend too much time thinking about a thing, you’ll never get it done.",
    author: "Bruce Lee",
    bio: authorBios["Bruce Lee"],
  },
  {
    quote: "The quality of your life is directly related to how much uncertainty you can comfortably handle.",
    author: "Tony Robbins",
    bio: authorBios["Tony Robbins"],
  },
  {
    quote: "A happy life consists in the tranquility of mind.",
    author: "Marcus Tullius Cicero",
    bio: authorBios["Marcus Tullius Cicero"],
  },
  {
    quote: "Almost nothing material is needed for a happy life, for he who has understood existence.",
    author: "Marcus Aurelius",
    bio: authorBios["Marcus Aurelius"],
  },
  {
    quote: "The realization that life is absurd cannot be an end, but only a beginning.",
    author: "Albert Camus",
    bio: authorBios["Albert Camus"],
  },
  {
    quote: "Not how long, but how well you have lived is the main thing.",
    author: "Seneca",
    bio: authorBios["Seneca"],
  },
  {
    quote: "Be happy for this moment. This moment is your life.",
    author: "Omar Khayyam",
    bio: authorBios["Omar Khayyam"],
  },
  {
    quote: "Difficult and meaningful will always bring more satisfaction than easy and meaningless.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
    author: "Marcus Aurelius",
    bio: authorBios["Marcus Aurelius"],
  },
  {
    quote: "Change your thoughts and you change your world.",
    author: "Norman Vincent Peale",
    bio: authorBios["Norman Vincent Peale"],
  },
  {
    quote: "Everything has beauty, but not everyone sees it.",
    author: "Confucius",
    bio: authorBios["Confucius"],
  },
  {
    quote: "Dost thou love life? Then do not squander time, for that is the stuff life is made of.",
    author: "Benjamin Franklin",
    bio: authorBios["Benjamin Franklin"],
  },
  {
    quote: "It’s a terrible thing, I think, in life, to wait until you’re ready.",
    author: "Hugh Laurie",
    bio: authorBios["Hugh Laurie"],
  },
  {
    quote: "You’ll never change your life until you change something you do daily.",
    author: "John C. Maxwell",
    bio: authorBios["John C. Maxwell"],
  },
  {
    quote: "Man is made by his belief. As he believes so he is.",
    author: "Bhagavad Gita",
    bio: authorBios["Bhagavad Gita"],
  },
  {
    quote: "Life is a book you write, not a movie you watch.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "My life is my message.",
    author: "Mahatma Gandhi",
    bio: authorBios["Mahatma Gandhi"],
  },
  {
    quote: "Life is a mountain. Your goal is to find your path, not to reach the top.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "It’s the possibility of having a dream come true that makes life interesting.",
    author: "Paulo Coelho (The Alchemist)",
    bio: authorBios["Paulo Coelho (The Alchemist)"],
  },
  {
    quote: "In the end, it’s not the years in your life that count. It’s the life in your years.",
    author: "Abraham Lincoln",
    bio: authorBios["Abraham Lincoln"],
  },
  {
    quote: "Sing the song that only you can sing, write the book that only you can write, build the product that only you can build… live the life that only you can live.",
    author: "Naval Ravikant",
    bio: authorBios["Naval Ravikant"],
  },
  {
    quote: "Don’t search for the meaning of life. Simply be present for the people you love.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "You cannot be afraid to disappoint people. You have to live the life you want to live.",
    author: "David Goggins",
    bio: authorBios["David Goggins"],
  },
  {
    quote: "Life is nothing but a mirror of your consistent thoughts.",
    author: "Tony Robbins",
    bio: authorBios["Tony Robbins"],
  },
  {
    quote: "The soul becomes dyed with the color of its thoughts.",
    author: "Marcus Aurelius",
    bio: authorBios["Marcus Aurelius"],
  },
  {
    quote: "I tell you, in this world being a little crazy helps to keep you sane.",
    author: "Zsa Zsa Gabor",
    bio: authorBios["Zsa Zsa Gabor"],
  },
  {
    quote: "You can’t think your way into a better life, you have to live it.",
    author: "Mark Manson",
    bio: authorBios["Mark Manson"],
  },
  {
    quote: "The mind is everything. What you think you become.",
    author: "Buddha",
    bio: authorBios["Buddha"],
  },
  {
    quote: "Each person’s task in life is to become an increasingly better person.",
    author: "Leo Tolstoy",
    bio: authorBios["Leo Tolstoy"],
  },
  {
    quote: "Life isn’t about finding yourself. Life is about creating yourself.",
    author: "George Bernard Shaw",
    bio: authorBios["George Bernard Shaw"],
  },
  {
    quote: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller",
    bio: authorBios["Helen Keller"],
  },
  {
    quote: "If you want to live a happy life, tie it to a goal, not to people or things.",
    author: "Albert Einstein",
    bio: authorBios["Albert Einstein"],
  },
  {
    quote: "The cost for the good life is giving up comfort.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "Life is only meaningful when we are striving for a goal.",
    author: "Aristotle",
    bio: authorBios.Aristotle,
  },
  {
    quote: "Go confidently in the direction of your dreams! Live the life you’ve imagined.",
    author: "Henry David Thoreau",
    bio: authorBios["Henry David Thoreau"],
  },
  {
    quote: "The unexamined life is not worth living.",
    author: "Socrates",
    bio: authorBios["Socrates"],
  },
  {
    quote: "Life loves the liver of it.",
    author: "Maya Angelou",
    bio: authorBios["Maya Angelou"],
  },
  {
    quote: "You have to realize life is coming from you, not at you.",
    author: "Timothée Chalamet",
    bio: authorBios["Timothée Chalamet"],
  },
  {
    quote: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
    bio: authorBios["Mae West"],
  },
  {
    quote: "The first step to life is to try. The second is to learn. The third is to share.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "Love is the goal, life is the journey.",
    author: "Osho",
    bio: authorBios["Osho"],
  },
  {
    quote: "Good friends, good books, and a sleepy conscience: this is the ideal life.",
    author: "Mark Twain",
    bio: authorBios["Mark Twain"],
  },
  {
    quote: "People are in your life for a reason, a season, or a lifetime.",
    author: "Mel Robbins",
    bio: authorBios["Mel Robbins"],
  },
  {
    quote: "Going back to a simpler life is not a step backward.",
    author: "Yvon Chouinard",
    bio: authorBios["Yvon Chouinard"],
  },
  {
    quote: "Our life is frittered away by detail. Simplify, simplify.",
    author: "Henry David Thoreau",
    bio: authorBios["Henry David Thoreau"],
  },
  {
    quote: "Life is too important to be taken seriously.",
    author: "Oscar Wilde",
    bio: authorBios["Oscar Wilde"],
  },
  {
    quote: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    bio: authorBios["Confucius"],
  },
  {
    quote: "Tell me, what is it you plan to do with your one wild and precious life?",
    author: "Mary Oliver",
    bio: authorBios["Mary Oliver"],
  },
  {
    quote: "The biggest adventure you can ever take is to live the life of your dreams.",
    author: "Oprah Winfrey",
    bio: authorBios["Oprah Winfrey"],
  },
  {
    quote: "Life consists of what man is thinking about all day.",
    author: "Ralph Waldo Emerson",
    bio: authorBios["Ralph Waldo Emerson"],
  },
  {
    quote: "Nothing great in life comes with complete assurance of success.",
    author: "Michael Easter",
    bio: authorBios["Michael Easter"],
  },
  {
    quote: "Life is a succession of lessons which must be lived to be understood.",
    author: "Ralph Waldo Emerson",
    bio: authorBios["Ralph Waldo Emerson"],
  },
  {
    quote: "If life is a video game, the graphics are great, but the plot is confusing and the tutorial is way too long.",
    author: "Elon Musk",
    bio: authorBios["Elon Musk"],
  },
  {
    quote: "A life worth living might be measured in many ways, but the one way that stands above all others is living a life of no regrets.",
    author: "Gary Keller",
    bio: authorBios["Gary Keller"],
  },
  {
    quote: "No one can compete with you on being you. Most of life is a search for who and what needs you the most.",
    author: "Naval Ravikant",
    bio: authorBios["Naval Ravikant"],
  },
  {
    quote: "Your clarity determines how successfully you walk this life.",
    author: "Sadhguru",
    bio: authorBios["Sadhguru"],
  },
  {
    quote: "The purpose of life is to believe, to hope, and to strive.",
    author: "Indira Gandhi",
    bio: authorBios["Indira Gandhi"],
  },
  {
    quote: "Cut yourself off from the past and the future and live in the present, and your life becomes a song and a dance.",
    author: "Osho",
    bio: authorBios["Osho"],
  },
  {
    quote: "The best life has one foot in joy, one foot in suffering.",
    author: "Shane Parrish",
    bio: authorBios["Shane Parrish"],
  },
  {
    quote: "The chief danger in life is that you may take too many precautions.",
    author: "Alfred Adler",
    bio: authorBios["Alfred Adler"],
  },
  {
    quote: "Life is sweeter when you have an attitude of gratitude.",
    author: "Dolly Parton",
    bio: authorBios["Dolly Parton"],
  },
  {
    quote: "The first rule of a happy life is low expectations.",
    author: "Charlie Munger",
    bio: authorBios["Charlie Munger"],
  },
  {
    quote: "I alone cannot change the world, but I can cast a stone across the water to create many ripples.",
    author: "Mother Teresa",
    bio: authorBios["Mother Teresa"],
  },
  {
    quote: "Challenges, failures, defeats and ultimately, progress, are what make your life worthwhile.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "In any situation in life, you always have three choices: you can change it, you can accept it, or you can leave it.",
    author: "Naval Ravikant",
    bio: authorBios["Naval Ravikant"],
  },
  {
    quote: "The biggest life hack is becoming your own best friend. Everything is easier when you do.",
    author: "Cory Muscara",
    bio: authorBios["Cory Muscara"],
  },
  {
    quote: "Life is not a competition. It’s an expression.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "We cannot buy a meaningful life. We can only live it.",
    author: "Joshua Fields Millburn",
    bio: authorBios["Joshua Fields Millburn"],
  },
  {
    quote: "Your best life will not be found in comfort. It will be found in fighting for what you believe in.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "If my life is going to mean anything, I have to live it myself.",
    author: "Rick Riordan",
    bio: authorBios["Rick Riordan"],
  },
  {
    quote: "The greatest discovery of any generation is that a human being can alter his life by altering his attitude.",
    author: "William James",
    bio: authorBios["William James"],
  },
  {
    quote: "Constantly imagine you have the life you want.",
    author: "Rhonda Byrne",
    bio: authorBios["Rhonda Byrne"],
  },
  {
    quote: "Life is not a competition. It’s not about winning or losing. Life is about all the fun we have before it ends.",
    author: "Simon Sinek",
    bio: authorBios["Simon Sinek"],
  },
  {
    quote: "The life you have led doesn’t need to be the only life you have.",
    author: "Anna Quindlen",
    bio: authorBios["Anna Quindlen"],
  },
  {
    quote: "Life is a tree. Your mind is the roots and who you become is the fruits.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "We should be satisfied with the small things in life. The less we need, the less trouble we can have.",
    author: "Leo Tolstoy",
    bio: authorBios["Leo Tolstoy"],
  },
  {
    quote: "Fear is going to be a player in your life, but you get to decide how much.",
    author: "Jim Carrey",
    bio: authorBios["Jim Carrey"],
  },
  {
    quote: "The ego wants comfort and certainty. The soul wants to live fully.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "Create a ladder of values and priorities in your life, reminding yourself of what really matters to you.",
    author: "Robert Greene",
    bio: authorBios["Robert Greene"],
  },
  {
    quote: "Be pleasantly surprised by everything that happens. Life is more fun that way.",
    author: "Lex Fridman",
    bio: authorBios["Lex Fridman"],
  },
  {
    quote: "Life does not have to be perfect to be wonderful.",
    author: "Annette Funicello",
    bio: authorBios["Annette Funicello"],
  },
  {
    quote: "This is a wonderful day. I’ve never seen this one before.",
    author: "Maya Angelou",
    bio: authorBios["Maya Angelou"],
  },
  {
    quote: "You can, you should, and if you’re brave enough to start, you will.",
    author: "Stephen King",
    bio: authorBios["Stephen King"],
  },
  {
    quote: "Small steps motivate. Big steps overwhelm.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "The first step is you have to say that you can.",
    author: "Will Smith",
    bio: authorBios["Will Smith"],
  },
  {
    quote: "I am thankful to all who said no to me. It is because of them that I’m doing it myself.",
    author: "Albert Einstein",
    bio: authorBios["Albert Einstein"],
  },
  {
    quote: "Enjoy yourself. Do something positive. Project some love. Make someone happy. Laugh a little bit. Appreciate the moment. And do your work.",
    author: "Naval Ravikant",
    bio: authorBios["Naval Ravikant"],
  },
  {
    quote: "Faith loves the journey. Gratitude loves the moment. Inner peace loves the pause.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "You are not alone, and you are better than you think.",
    author: "Tim Ferriss",
    bio: authorBios["Tim Ferriss"],
  },
  {
    quote: "Positivity is a superpower.",
    author: "Ryan Brewlow",
    bio: authorBios["Ryan Brewlow"],
  },
  {
    quote: "Keep looking up… that’s the secret of life.",
    author: "Charlie Brown",
    bio: authorBios["Charlie Brown"],
  },
  {
    quote: "One person can make a difference, and everyone should try.",
    author: "John F. Kennedy",
    bio: authorBios["John F. Kennedy"],
  },
  {
    quote: "Mix a little foolishness with your serious plans. It is lovely to be silly at the right moment.",
    author: "Horace",
    bio: authorBios["Horace"],
  },
  {
    quote: "Joy is not in things; it is in us.",
    author: "Richard Wagner",
    bio: authorBios["Richard Wagner"],
  },
  {
    quote: "Wherever you go, no matter what the weather, always bring your own sunshine.",
    author: "Anthony J. D’Angelo",
    bio: authorBios["Anthony J. D’Angelo"],
  },
  {
    quote: "Be the light in the dark, be the calm in the storm and be at peace while at war.",
    author: "Mike Dolan",
    bio: authorBios["Mike Dolan"],
  },
  {
    quote: "I wish you a kinder sea.",
    author: "Emily Dickinson",
    bio: authorBios["Emily Dickinson"],
  },
  {
    quote: "Write it on your heart that every day is the best day in the year.",
    author: "Ralph Waldo Emerson",
    bio: authorBios["Ralph Waldo Emerson"],
  },
  {
    quote: "The less you respond to negative people, the more positive your life will become.",
    author: "Paulo Coelho",
    bio: authorBios["Paulo Coelho"],
  },
  {
    quote: "There is something out there just for you.",
    author: "Naval Ravikant",
    bio: authorBios["Naval Ravikant"],
  },
  {
    quote: "When we are fulfilled, we radiate energy toward others. When we are empty, we pull energy from others. Fill yourself up and let it pour over.",
    author: "Cory Muscara",
    bio: authorBios["Cory Muscara"],
  },
  {
    quote: "Be a flame of positive emotions and you will never be without a friend.",
    author: "Robert Greene",
    bio: authorBios["Robert Greene"],
  },
  {
    quote: "Optimism is a happiness magnet. If you stay positive, good things and good people will be drawn to you.",
    author: "Mary Lou Retton",
    bio: authorBios["Mary Lou Retton"],
  },
  {
    quote: "You are joy, looking for a way to express.",
    author: "Esther Hicks",
    bio: authorBios["Esther Hicks"],
  },
  {
    quote: "It doesn’t matter how slow you go, as long as you don’t stop.",
    author: "Confucius",
    bio: authorBios["Confucius"],
  },
  {
    quote: "Positive anything is better than negative nothing.",
    author: "Elbert Hubbard",
    bio: authorBios["Elbert Hubbard"],
  },
  {
    quote: "Give every day the chance to become the most beautiful day of your life.",
    author: "Mark Twain",
    bio: authorBios["Mark Twain"],
  },
  {
    quote: "You cannot have a positive life and a negative mind.",
    author: "Joyce Meyer",
    bio: authorBios["Joyce Meyer"],
  },
  {
    quote: "The best and most beautiful things in the world cannot be seen or even touched – they must be felt with the heart.",
    author: "Helen Keller",
    bio: authorBios["Helen Keller"],
  },
  {
    quote: "Always turn a negative situation into a positive situation.",
    author: "Michael Jordan",
    bio: authorBios["Michael Jordan"],
  },
  {
    quote: "The positive thinker sees the invisible, feels the intangible, and achieves the impossible.",
    author: "Winston Churchill",
    bio: authorBios["Winston Churchill"],
  },
  {
    quote: "Science is organized knowledge. Wisdom is organized life.",
    author: "Immanuel Kant",
    bio: authorBios["Immanuel Kant"],
  },
  {
    quote: "Doubt is the origin of wisdom.",
    author: "Augustine of Hippo",
    bio: authorBios["Augustine of Hippo"],
  },
  {
    quote: "The truest wisdom is a resolute determination.",
    author: "Napoleon Bonaparte",
    bio: authorBios["Napoleon Bonaparte"],
  },
  {
    quote: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.",
    author: "Albert Einstein",
    bio: authorBios["Albert Einstein"],
  },
  {
    quote: "Wisdom is the power to put our time and our knowledge to the proper use.",
    author: "Thomas J. Watson",
    bio: authorBios["Thomas J. Watson"],
  },
  {
    quote: "A symptom of wisdom is curiosity. The evidence is calmness and perseverance. The causes are experimentation and understanding.",
    author: "Maxime Lagacé",
    bio: authorBios["Maxime Lagacé"],
  },
  {
    quote: "It is not the man who has too little, but the man who craves more, that is poor.",
    author: "Seneca",
    bio: authorBios["Seneca"],
  },
  {
    quote: "A wise man never loses anything, if he has himself.",
    author: "Michel de Montaigne",
    bio: authorBios["Michel de Montaigne"],
  },
  {
    quote: "A fool is known by his speech; and a wise man by silence.",
    author: "Pythagoras",
    bio: authorBios["Pythagoras"],
  },
  {
    quote: "It is not the mountain we conquer but ourselves.",
    author: "Edmund Hillary",
    bio: authorBios["Edmund Hillary"],
  },
  {
    quote: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    bio: authorBios["Dalai Lama"],
  },
  {
    quote: "Life is what we make it, always has been, always will be.",
    author: "Grandma Moses",
    bio: authorBios["Grandma Moses"],
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    bio: authorBios["Sam Levenson"],
  },
  {
    quote: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    bio: authorBios["Tony Robbins"],
  },
  {
    quote: "Everything you want is on the other side of fear.",
    author: "Jack Canfield",
    bio: authorBios["Jack Canfield"],
  },
  {
    quote: "The cave you fear to enter holds the treasure you seek.",
    author: "Joseph Campbell",
    bio: authorBios["Joseph Campbell"],
  },
  {
    quote: "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
    author: "Rikki Rogers",
    bio: authorBios["Rikki Rogers"],
  },
  {
    quote: "After every difficulty, there is calm.",
    author: "Omar Khayyam",
    bio: authorBios["Omar Khayyam"],
  },
  {
    quote: "You are not broken. You are breaking free.",
    author: "Unknown",
    bio: authorBios["Unknown"],
  },
  {
    quote: "The privilege of a lifetime is to become who you truly are.",
    author: "Carl Jung",
    bio: authorBios["Carl Jung"],
  },
  {
    quote: "You can't make everyone happy. You're not pizza.",
    author: "Bill Murray",
    bio: authorBios["Bill Murray"],
  },
  {
    quote: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    bio: authorBios["Steve Jobs"],
  },
  {
    quote: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    bio: authorBios["Oscar Wilde"],
  },
];

export const starterQuotes: Quote[] = quoteBank.slice(0, 5);

export const traditionalSteps = [
  {
    step: "We admitted we were powerless over alcohol — that our lives had become unmanageable.",
    question: "What feels unmanageable for me today?",
  },
  {
    step: "Came to believe that a Power greater than ourselves could restore us to sanity.",
    question: "What kind of support or strength could help me right now?",
  },
  {
    step: "Made a decision to turn our will and our lives over to the care of God as we understood Him.",
    question: "What am I willing to stop carrying alone?",
  },
  {
    step: "Made a searching and fearless moral inventory of ourselves.",
    question: "What am I ready to look at honestly?",
  },
  {
    step: "Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.",
    question: "What truth would feel lighter if I shared it safely?",
  },
  {
    step: "Were entirely ready to have God remove all these defects of character.",
    question: "What pattern am I ready to let go of?",
  },
  {
    step: "Humbly asked Him to remove our shortcomings.",
    question: "What help am I willing to ask for?",
  },
  {
    step: "Made a list of all persons we had harmed, and became willing to make amends to them all.",
    question: "Who has been affected by my actions?",
  },
  {
    step: "Made direct amends to such people wherever possible, except when to do so would injure them or others.",
    question: "What small repair could I make safely?",
  },
  {
    step: "Continued to take personal inventory and when we were wrong promptly admitted it.",
    question: "What do I need to notice about myself today?",
  },
  {
    step: "Sought through prayer and meditation to improve our conscious contact with God as we understood Him.",
    question: "How can I create a quiet moment today?",
  },
  {
    step: "Having had a spiritual awakening as the result of these steps, we tried to carry this message to alcoholics, and to practice these principles in all our affairs.",
    question: "What can I carry forward into tomorrow?",
  },
];

export const secularSteps = [
  {
    step: "We admitted that our lives had become difficult to manage on our own.",
    question: "What feels unmanageable for me today?",
  },
  {
    step: "Came to believe that support, honesty, and connection could help us heal.",
    question: "What kind of support or strength could help me right now?",
  },
  {
    step: "Made a decision to move toward healthier choices and support.",
    question: "What am I willing to stop carrying alone?",
  },
  {
    step: "Took an honest look at ourselves and our behaviour.",
    question: "What am I ready to look at honestly?",
  },
  {
    step: "Shared honestly with ourselves and another person about the ways we had struggled.",
    question: "What truth would feel lighter if I shared it safely?",
  },
  {
    step: "Became ready to let go of harmful habits and behaviours.",
    question: "What pattern am I ready to let go of?",
  },
  {
    step: "Asked for help and remained open to change.",
    question: "What help am I willing to ask for?",
  },
  {
    step: "Recognised the people affected by our actions.",
    question: "Who has been affected by my actions?",
  },
  {
    step: "Tried to repair harm where possible and safe to do so.",
    question: "What small repair could I make safely?",
  },
  {
    step: "Continued to reflect honestly on our behaviour and choices.",
    question: "What do I need to notice about myself today?",
  },
  {
    step: "Made time for reflection, mindfulness, and honest connection.",
    question: "How can I create a quiet moment today?",
  },
  {
    step: "Tried to carry what we had learned into everyday life and support others where possible.",
    question: "What can I carry forward into tomorrow?",
  },
];
