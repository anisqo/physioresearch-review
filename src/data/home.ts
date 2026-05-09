export type AboutItem = {
  title: string;
  description: string;
  tag: string;
  image?: string;
  imageShiftX?: number;
  imageShiftY?: number;
  imageScale?: number;
};

const aboutItems: AboutItem[] = [
  {
    title: "Badania w laboratorium układu ruchu",
    description:
      "Prowadzimy pomiary związane z ruchem, funkcją, równowagą, chodem, siłą mięśniową i sprawnością fizyczną.",
    tag: "POMIAR / RUCH / FUNKCJA",
    image: "/work/laboratorium1.png",
    imageShiftX: 0,
    imageShiftY: 0,
    imageScale: 1,
  },
  {
    title: "Analiza publikacji naukowych",
    description:
      "Czytamy badania, oceniamy ich jakość metodologiczną i uczymy się odróżniać mocne dowody od atrakcyjnych, ale słabo udokumentowanych twierdzeń.",
    tag: "LITERATURA / EBP / METODOLOGIA",
    image: "/work/literatura1.png",
    imageShiftX: 0,
    imageShiftY: 0,
    imageScale: 1,
  },
  {
    title: "Publikacje i wystąpienia konferencyjne",
    description:
      "Przekładamy wyniki pracy na abstrakty, prezentacje, komunikaty konferencyjne i autorskie teksty naukowe.",
    tag: "ABSTRAKT / PREZENTACJA / ARTYKUŁ",
    image: "/work/publikacje1.png",
    imageShiftX: 0,
    imageShiftY: 0,
    imageScale: 1,
  },
  {
    title: "Obiektywizacja metod stosowanych w fizjoterapii",
    description:
      "Interesuje nas sprawdzanie tego, co w fizjoterapii można zmierzyć, porównać i uczciwie ocenić na podstawie danych.",
    tag: "DANE / POMIAR / OCENA",
    image: "/work/obiektywizacja1.png",
    imageShiftX: 0,
    imageShiftY: 0,
    imageScale: 1,
  },
  {
    title: "Mówienie o nauce ludzkim językiem",
    description:
      "Chcemy pokazywać badania naukowe w sposób przystępny, bez uproszczeń, które zniekształcają ich sens.",
    tag: "EDUKACJA / KOMUNIKACJA / POPULARYZACJA",
    image: "/work/komunikacja1.png",
    imageShiftX: 0,
    imageShiftY: 0,
    imageScale: 1,
  },
  {
    title: "Autorska konferencja PhysioScience",
    description:
      "Rozwijamy własną konferencję naukową jako przestrzeń rozmowy o fizjoterapii, ruchu, badaniach i odpowiedzialnej praktyce klinicznej.",
    tag: "KONFERENCJA / STUDENCI / NAUKA",
    image: "/work/physioscience1.png",
    imageShiftX: 0,
    imageShiftY: 0,
    imageScale: 1,
  },
];

export const home = {
  site: {
    name: "PhysioResearchReview",
    shortName: "PRR",
    eyebrow: "Studenckie koło naukowe",
  },
  nav: [
    { label: "Co robimy", href: "/#o-kole" },
    { label: "Zespół", href: "/#zespol" },
    { label: "Publikacje", href: "/publikacje" },
    { label: "Konferencje", href: "/konferencje" },
    { label: "Galeria", href: "/galeria" },
    { label: "PhysioScience", href: "/physioscience" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  hero: {
    title: "Nauka przyszłością fizjoterapii",
    lead:
      "PhysioResearchReview to przestrzeń dla studentów, którzy chcą rozumieć fizjoterapię przez badania naukowe, edukację i krytyczne myślenie kliniczne.",
    primaryAction: { label: "Poznaj działalność", href: "/#o-kole" },
    secondaryAction: { label: "PhysioScience", href: "/physioscience" },
  },
  about: {
    label: "CO REALNIE ROBIMY?",
    title:
      "Nie zaczynamy od technik, trendów ani gotowych odpowiedzi. Zaczynamy od pytań, które można sprawdzić.",
    description:
      "PhysioResearchReview łączy pracę w laboratorium układu ruchu, krytyczną analizę literatury i komunikację nauki. Chcemy uczyć się fizjoterapii w sposób mierzalny, uczciwy i zrozumiały — tak, aby dokładać własny, skromny wkład do rozwoju nowoczesnej fizjoterapii.",
    items: aboutItems,
  },
  team: {
    label: "Zespół",
    title: "Ludzie, którzy budują PhysioResearchReview",
    intro:
      "PhysioResearchReview tworzą osoby o różnych zainteresowaniach i mocnych stronach. Ta różnorodność buduje nasz sposób pracy, ale wspólnym mianownikiem pozostaje ciekawość świata nauki oraz przekonanie, że fizjoterapię należy oceniać nie przez pryzmat trendów, lecz przez badania, krytyczne myślenie i rzetelną analizę dowodów.",
    founder: {
      name: "mgr Bartosz Aniśko",
      role: "Założyciel, Opiekun koła",
      photo: "/team/founder.jpg",
      photoShiftY: 0,
      photoScale: 1.08,
    },
    cohorts: [
      {
        members: [
          {
            name: "Kacper Bernatowicz",
            photo: "/team/bernatowicz3.jpg",
          },
          {
            name: "Matylda Sauermann",
            photo: "/team/sauermann3.jpg",
          },
          {
            name: "Maciej Wołczek",
            photo: "/team/wolczek3.jpg",
          },
        ],
      },
      {
        members: [
          {
            name: "Paulina Kowalewska",
            photo: "/team/kowalewska3.jpg",
          },
          {
            name: "Aleksandra Banaszak",
            photo: "/team/banaszak3.jpg",
          },
          {
            name: "Patrycja Wołodźko",
            photo: "/team/wolodzko3.jpg",
          },
          {
            name: "Mateusz Motyl",
            photo: "/team/motyl3.jpg",
          },
        ],
      },
      {
        members: [
          {
            name: "Wiktor Nowak",
            photo: "/team/nowak3.jpg",
          },
          {
            name: "Mikołaj Gidlewicz",
            photo: "/team/gidlewicz3.jpg",
          },
          {
            name: "Dawid Rewaj",
            photo: "/team/rewaj3.jpg",
          },
        ],
      },
    ],
  },
  physioScience: {
    label: "PhysioScience",
    title: "Konferencja tworzona językiem nauki, ruchu i odpowiedzialności klinicznej.",
    text:
      "PhysioScience to autorska konferencja tworzona z myślą o studentach, młodych naukowcach i praktykach fizjoterapii, którzy chcą rozmawiać o fizjoterapii językiem nauki, ruchu i odpowiedzialności klinicznej.",
    note: "Pełna sekcja konferencji zostanie rozbudowana w kolejnym etapie projektu.",
  },
  footer: {
    affiliation: "PhysioResearchReview · Studenckie koło naukowe",
    note: "Fizjoterapia, biomechanika, edukacja i evidence-based practice.",
  },
};
