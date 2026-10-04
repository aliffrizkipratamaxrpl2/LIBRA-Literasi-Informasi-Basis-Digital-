export interface DetailedBook {
  id: string;
  title: string;
  author: string;
  rating: number;
  categories: string[];
  cover: string;
  synopsis: string;
  audiobookDuration: string;
  publishedYear: string;
  chapterTitle?: string;
  content?: string;
  details: {
    pages: string;
    language: string;
    publisher: string;
    publishedDate: string;
    isbn: string;
    format: string;
  };
  reviews?: {
    id: string;
    name: string;
    avatar: string;
    time: string;
    rating: number;
    text: string;
  }[];
}

export const detailedBooksDatabase: Record<string, DetailedBook> = {
  "beyond-the-grid": {
    id: "beyond-the-grid",
    title: "Beyond the Grid",
    author: "Klaus Van Der Meer",
    publishedYear: "2023",
    rating: 4.9,
    categories: ["Technology", "Science", "Philosophy"],
    cover: "/images/books/beyond-the-grid.jpeg",
    chapterTitle: "Chapter 4: The Silent Algorithm",
    content: `The machine did not hum. That was the first thing they noticed—or rather, the first thing they failed to notice. For generations, we had equated technological supremacy with a relentless mechanical orchestration, an industrial rhythm that pulsed through the concrete foundations of the city. But the architecture Klaus had designed was completely passive, digesting complex computational queries with the quiet grace of deep water.

"When you build a system that aligns with human intuition, the friction of logic disappears," he had written in his early manifestos. Sitting on the simple wooden stool in the middle of the clean white testing bay, Arthur realized how literal that translation had become. The screens did not flicker with the aggressive blue spectrum of old. Instead, they glowed with the warm amber of natural linen, adjusting dynamically to the afternoon sun that slanted through the high clerestory windows.

He turned the physical page with a soft rustle, the tactile feedback of the digital overlay simulating perfectly the weight and texture of a handmade folio. It wasn't about nostalgia; it was about anchors. In a world completely decoupled from physical boundaries, keeping the physical mechanics of reading was the only way to safeguard concentration.`,
    synopsis:
      "Klaus Van Der Meer examines how digital systems interact with human consciousness. When algorithms align with intuition, computational complexity dissolves into sheer clarity and effortless creation.",
    audiobookDuration: "9h 20m narration",
    details: {
      pages: "318 pages",
      language: "English",
      publisher: "Amsterdam Tech Press",
      publishedDate: "February 22, 2023",
      isbn: "978-0-14-312774-1",
      format: "eBook, Hardcover, Audio",
    },
    reviews: [
      {
        id: "1",
        name: "Dimas Pratama",
        avatar: "/images/avatars/ikan-cupang.jpeg",
        time: "5 days ago",
        rating: 5,
        text: "Chapter 4 on Silent Algorithms completely reshaped how I think about user interface tranquility.",
      },
    ],
  },
  "designing-the-humane": {
    id: "designing-the-humane",
    title: "Designing the Humane",
    author: "Clementine Dupont",
    publishedYear: "2021",
    rating: 4.8,
    categories: ["Design", "Technology", "Non-Fiction"],
    cover: "/images/books/organic-forms.jpeg",
    chapterTitle: "Chapter 1: The Humanist Artifact",
    content: `Every line etched onto paper, every curve sculpted into wood or metal, carries an implicit philosophy of how humans should spend their hours. In our haste to optimize utility, modern production has often stripped away the emotional resonance that grounded pre-industrial craft.

Clementine Dupont invites us to reconsider the subtle ergonomics of everyday objects. When a reader opens a beautifully bound book, the tactile feedback of cotton rag paper and the golden ratio of page margins are not decorative superfluities—they are cognitive anchors that invite the human mind into sustained reflection.

To design humanely is to design with patience. It requires acknowledging that our senses evolved in tactile, organic landscapes, not within cold rectangles of unyielding glass.`,
    synopsis:
      "An outstanding study on industrial and aesthetic design choices that have reshaped our interface with life over centuries. From original typographies and editorial grid alignments, to industrial machinery and modern digital components, Dupont showcases how \"humanity\" is encoded directly into physical and interactive artifacts.",
    audiobookDuration: "8h 45m narration",
    details: {
      pages: "340 pages",
      language: "English",
      publisher: "Cozy Craft Press",
      publishedDate: "October 12, 2021",
      isbn: "978-3-16-148410-0",
      format: "eBook, Hardcover, Audio",
    },
    reviews: [
      {
        id: "1",
        name: "Ikan Cupang",
        avatar: "/images/avatars/ikan-cupang.jpeg",
        time: "2 weeks ago",
        rating: 5,
        text: "Genuinely changed the way I think about everyday interfaces. Dupont writes with extreme clarity and elegance. The cozy book design perfectly mirrors her philosophy.",
      },
    ],
  },
  "design-systems": {
    id: "design-systems",
    title: "Design Systems",
    author: "Clementine Dupont",
    publishedYear: "2022",
    rating: 4.9,
    categories: ["Technology", "Design", "Art"],
    cover: "/images/books/design-systems.jpeg",
    chapterTitle: "Chapter 2: Foundations of Harmony",
    content: `A design system is not merely a collection of reusable UI buttons and color palettes. It is the visual dialect through which an application converses with its users. When typography scales, border radii, and spacing rhythms adhere to a unified mathematical harmonic, the interface recedes, allowing the content to command undivided attention.

In this chapter, Dupont explores how traditional Swiss grid systems can be adapted into fluid, responsive component frameworks. Consistency builds trust; elegance sustains engagement.`,
    synopsis:
      "A deep dive into creating robust, scalable, and harmonious visual ecosystems across modern web interfaces. Clementine Dupont bridges the gap between traditional Swiss typography and modern modular component systems.",
    audiobookDuration: "6h 30m narration",
    details: {
      pages: "295 pages",
      language: "English",
      publisher: "Cozy Craft Press",
      publishedDate: "March 18, 2022",
      isbn: "978-1-56619-909-4",
      format: "eBook, Hardcover, Audio",
    },
  },
  "echo-of-silence": {
    id: "echo-of-silence",
    title: "The Echo of Silence",
    author: "Marcia Sterling",
    publishedYear: "2020",
    rating: 4.8,
    categories: ["Fiction", "Mystery", "Drama"],
    cover: "/images/books/echo-of-silence.jpeg",
    chapterTitle: "Chapter 1: The Scottish Valley",
    content: `The fog hung low over the loch, thick as carded wool and smelling faintly of heather and damp peat. In the distance, the stone bell tower of St. Jude's Abbey stood silhouetted against the slate sky, unchanged by the passage of four centuries.

Evelyn tightened her wool scarf against the biting Highland wind as she pushed open the heavy oak door. Inside, silence was not merely the absence of sound; it had texture, weight, and the faint fragrance of beeswax candles and dry parchment. She knew that somewhere in the monastery vaults lay the letter that had driven her across the continent.`,
    synopsis:
      "Set in the secluded mist-covered valleys of northern Scotland, The Echo of Silence unravels the quiet mysteries of an ancient abbey and the forgotten letters discovered inside its stone archives.",
    audiobookDuration: "11h 15m narration",
    details: {
      pages: "412 pages",
      language: "English",
      publisher: "Edinburgh House Publishing",
      publishedDate: "November 4, 2020",
      isbn: "978-0-7432-7356-5",
      format: "eBook, Audio, Paperback",
    },
  },
  "midsummer-wanderlust": {
    id: "midsummer-wanderlust",
    title: "Midsummer Wanderlust",
    author: "Celia Harlow",
    publishedYear: "2023",
    rating: 4.6,
    categories: ["Romance", "Travel", "Fiction"],
    cover: "/images/books/midsummer-wanderlust.jpeg",
    chapterTitle: "Chapter 3: Sunlit Terraces",
    content: `The afternoon train from Nice had deposited Clara at a sun-bleached coastal platform surrounded by olive groves. The air was rich with the scent of wild rosemary, sea salt, and ripe figs.

Carrying nothing but a canvas rucksack and a leatherbound sketchbook, she ascended the cobblestone stairs leading toward the cliffside village. For the first time in ten years, there were no deadlines, no unanswered emails—only the warm Mediterranean light and the promise of uncharted days.`,
    synopsis:
      "A heartwarming romantic voyage across the sun-drenched coastal villages of southern Italy and Provence. A young illustrator rediscovers her passion for art and spontaneous adventure.",
    audiobookDuration: "7h 50m narration",
    details: {
      pages: "275 pages",
      language: "English",
      publisher: "Sunlight Books",
      publishedDate: "June 1, 2023",
      isbn: "978-0-06-231500-7",
      format: "eBook, Paperback, Audio",
    },
  },
  "algorithms-of-joy": {
    id: "algorithms-of-joy",
    title: "The Algorithms of Joy",
    author: "Dr. Arthur Pendelton",
    publishedYear: "2021",
    rating: 4.7,
    categories: ["Technology", "Psychology", "Self-Development"],
    cover: "/images/books/algorithms-of-joy.jpeg",
    chapterTitle: "Chapter 2: The Serendipity Loop",
    content: `Why do the most fulfilling moments of our lives consistently elude our calendars? Modern productivity literature urges us to maximize every waking minute, creating hyper-optimized routines that inadvertently eliminate the accidental encounters where creativity and joy naturally reside.

Dr. Pendelton introduces the 'Serendipity Loop'—a psychological framework designed to balance disciplined focus with deliberate cognitive slack. When we create space for wandering thoughts, the brain's default mode network engages in deep synthesis, unlocking unexpected moments of clarity.`,
    synopsis:
      "Can happiness be modeled, or is joy an emergence of random creative collisions? Dr. Pendelton explores cognitive science, behavioral economics, and joyful daily rituals.",
    audiobookDuration: "10h 05m narration",
    details: {
      pages: "360 pages",
      language: "English",
      publisher: "Beacon Hill Academic",
      publishedDate: "September 14, 2021",
      isbn: "978-0-385-54734-5",
      format: "eBook, Hardcover, Audio",
    },
  },
  "contours-of-memory": {
    id: "contours-of-memory",
    title: "Contours of Memory",
    author: "Siddharth Mehta",
    publishedYear: "2022",
    rating: 4.5,
    categories: ["History", "Memoir", "Philosophy"],
    cover: "/images/books/contours-of-memory.jpeg",
    chapterTitle: "Chapter 1: The Courtyard in Chandni Chowk",
    content: `Memory does not reside in linear chronicles; it lingers in the texture of weathered sandstone and the aroma of cardamoms roasting in afternoon sunlight. In my grandfather's courtyard, generations of conversations had seeped directly into the red clay bricks.

Walking through those arched verandas decades later, I realized that remembering is not a passive retrieval—it is an act of architecture, continually reconstructing the sanctuaries of our past.`,
    synopsis:
      "An introspective memoir traversing family roots in old Delhi, migration across continents, and how cultural memories survive across modern generations through oral history and architecture.",
    audiobookDuration: "8h 10m narration",
    details: {
      pages: "310 pages",
      language: "English",
      publisher: "Heritage Books",
      publishedDate: "April 10, 2022",
      isbn: "978-0-525-55947-4",
      format: "eBook, Hardcover",
    },
  },
  "echoes-of-renaissance": {
    id: "echoes-of-renaissance",
    title: "Echoes of the Renaissance",
    author: "Elena Rostova",
    publishedYear: "2019",
    rating: 4.8,
    categories: ["Art", "History", "Non-Fiction"],
    cover: "/images/books/echoes-of-renaissance.jpeg",
    chapterTitle: "Chapter 5: The Master Apprentice Guilds",
    content: `In the bottegas of fifteenth-century Florence, mastery was not taught through abstract lectures. It was absorbed through muscle memory, grinding lapis lazuli into ultramarine pigment, preparing rabbit-skin glue for gesso panels, and watching the maestro's hand guide a silverpoint stylus across toned paper.

Elena Rostova examines how the communal nature of Renaissance ateliers created an unprecedented explosion of artistic and intellectual discovery that still informs modern studio craft.`,
    synopsis:
      "A sumptuous retrospective on Florentine workshops, master apprentice systems, and the artistic techniques that ignited the Renaissance and continue to inspire modern typography and oil painters.",
    audiobookDuration: "12h 40m narration",
    details: {
      pages: "480 pages",
      language: "English",
      publisher: "Florentine Arts Foundation",
      publishedDate: "October 30, 2019",
      isbn: "978-0-393-35618-2",
      format: "eBook, Hardcover, Audio",
    },
  },
  "cozy-cabin": {
    id: "cozy-cabin",
    title: "Cozy Cabin Living",
    author: "Arthur Wood",
    publishedYear: "2023",
    rating: 4.7,
    categories: ["Self-Development", "Architecture", "Lifestyle"],
    cover: "/images/books/cozy-cabin.jpeg",
    chapterTitle: "Chapter 1: The Hearth and the Window",
    content: `A cabin needs only three fundamental elements to become a home: a well-built hearth, a wide window oriented toward the morning sun, and a deep bookshelf within arm's reach of a comfortable armchair.

When you strip away the superfluous square footage of modern houses, the relationship between human life and natural rhythms becomes immediate and profound.`,
    synopsis:
      "An architect's guide to mindful timber framing, slow living, natural light orientation, and crafting sanctuary spaces away from modern urban noise.",
    audiobookDuration: "5h 45m narration",
    details: {
      pages: "220 pages",
      language: "English",
      publisher: "Nordic Craft Press",
      publishedDate: "August 15, 2023",
      isbn: "978-1-4521-7977-3",
      format: "eBook, Hardcover",
    },
  },
  "cozy-cabin-guide": {
    id: "cozy-cabin-guide",
    title: "The Cozy Cabin Guide",
    author: "Arthur Wood",
    publishedYear: "2023",
    rating: 4.6,
    categories: ["Self-Development", "Lifestyle"],
    cover: "/images/books/cozy-cabin-guide.jpeg",
    chapterTitle: "Chapter 2: Timber, Stone, and Solitude",
    content: `Working with raw timber teaches humility. Every grain line records a season of drought or deluge, a century of quiet growth under the forest canopy. In this guide, Arthur Wood details practical off-grid building techniques that honor the surrounding ecology.`,
    synopsis:
      "Essential wisdom for building minimalist cabins, organizing hearth rooms, and embracing the tranquil rhythm of off-grid reading sessions.",
    audiobookDuration: "6h 15m narration",
    details: {
      pages: "240 pages",
      language: "English",
      publisher: "Nordic Craft Press",
      publishedDate: "September 5, 2023",
      isbn: "978-1-4521-7978-0",
      format: "eBook, Audio",
    },
  },
  "lessons-of-time": {
    id: "lessons-of-time",
    title: "Lessons of Time",
    author: "Prof. Alistair Finch",
    publishedYear: "2022",
    rating: 4.9,
    categories: ["History", "Philosophy", "Education"],
    cover: "/images/books/lessons-of-time.jpeg",
    chapterTitle: "Chapter 1: The Long Arc of Epochs",
    content: `We measure our lives in quarters and fiscal cycles, yet civilizational changes unfold across centuries. By studying the deep historical currents of ancient Alexandria, the Song Dynasty, and the early Enlightenment, Prof. Finch shows how human wisdom consistently perseveres through dark ages.`,
    synopsis:
      "A profound meditation on centuries of human civilizational shifts, resilience during crises, and the timeless philosophies that have guided humanity through epochs of upheaval.",
    audiobookDuration: "10h 30m narration",
    details: {
      pages: "390 pages",
      language: "English",
      publisher: "Oxford University Review",
      publishedDate: "May 12, 2022",
      isbn: "978-0-19-953556-9",
      format: "eBook, Hardcover, Audio",
    },
  },
  "whispers-of-kyoto": {
    id: "whispers-of-kyoto",
    title: "Whispers of Kyoto",
    author: "Sayuri Haruki",
    publishedYear: "2023",
    rating: 4.8,
    categories: ["Fiction", "Literature", "Art"],
    cover: "/images/books/whispers-of-kyoto.jpeg",
    chapterTitle: "Chapter 1: The Scent of Roasted Green Tea",
    content: `The morning rain in Kyoto always smells of wet slate tiles and cedar needles. In her small workshop along the Shirakawa canal, Grandma Miyoko spun the potter's wheel with practiced ease, shaping black Raku clay into tea bowls whose imperfections celebrated the fleeting beauty of life.`,
    synopsis:
      "In the tranquil alleys of Gion and the quiet moss gardens of Arashiyama, a master tea ceramist passes down the hidden philosophy of wabi-sabi to her estranged granddaughter.",
    audiobookDuration: "8h 00m narration",
    details: {
      pages: "288 pages",
      language: "English",
      publisher: "Kyoto Heritage Publications",
      publishedDate: "November 20, 2023",
      isbn: "978-4-8053-1540-8",
      format: "eBook, Hardcover, Audio",
    },
  },
};

export function findDetailedBook(idOrSlug: string): DetailedBook | null {
  const normalized = idOrSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  if (detailedBooksDatabase[idOrSlug]) {
    return detailedBooksDatabase[idOrSlug];
  }
  if (detailedBooksDatabase[normalized]) {
    return detailedBooksDatabase[normalized];
  }

  // Search by title or partial key
  for (const key of Object.keys(detailedBooksDatabase)) {
    const item = detailedBooksDatabase[key];
    const itemTitleNorm = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (
      key === normalized ||
      itemTitleNorm === normalized ||
      itemTitleNorm.includes(normalized) ||
      normalized.includes(key)
    ) {
      return item;
    }
  }

  return null;
}
