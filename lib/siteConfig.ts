// ============================================================
// CENTRALIZED SITE CONFIGURATION — edit here to update the whole site
// ============================================================

export type Locale = "uz" | "ru";
export const locales: Locale[] = ["ru", "uz"];
export const defaultLocale: Locale = "ru";

// ─── BRANCHES ────────────────────────────────────────────────
export const branches = [
  {
    id: "chilonzor",
    nameUz: "Chilonzor filiali",
    nameRu: "Филиал Чиланзар",
    phones: ["+998 71 276 60 72", "+998 99 052 38 93", "+998 95 195 23 13"],
    mapUrl: "https://yandex.uz/maps/-/CPc~RG-5",
    mapEmbed: "https://yandex.uz/map-widget/v1/-/CPc~RG-5",
    hours: "24/7",
    bgImage: "/images/filial1/bg.png",
    images: [
      "/images/filial1/1.webp",
      "/images/filial1/2.webp",
      "/images/filial1/3.webp",
      "/images/filial1/4.webp",
      "/images/filial1/5.webp",
      "/images/filial1/6.webp",
      "/images/filial1/7.webp",
      "/images/filial1/8.webp",
      "/images/filial1/9.webp",
      "/images/filial1/10.webp",
      "/images/filial1/11.webp",
      "/images/filial1/12.webp",
    ],
  },
  {
    id: "sergeli",
    nameUz: "Sergeli filiali",
    nameRu: "Филиал Сергели",
    phones: ["+998 77 144 00 17"],
    mapUrl: "https://yandex.uz/maps/-/CPc~RTp2",
    mapEmbed: "https://yandex.uz/map-widget/v1/-/CPc~RTp2",
    hours: "24/7",
    bgImage: "/images/filial2/bg1.png",
    images: [
      "/images/filial2/1.webp",
      "/images/filial2/2.png",
      "/images/filial2/3.webp",
      "/images/filial2/4.webp",
      "/images/filial2/5.webp",
      "/images/filial2/6.webp",
      "/images/filial2/7.webp",
    ],
  },
];

// ─── PRICING ─────────────────────────────────────────────────
export const pricing = {
  women: {
    singleVisit: 80_000,
    nightDay: {
      plans: [
        { labelUz: "12 ta tashrif", labelRu: "12 посещений", price: 400_000 },
        { labelUz: "Bezlimit (oy)", labelRu: "Безлимит месяц", price: 550_000 },
        { labelUz: "3 Oy", labelRu: "3 Месяца", price: 1_300_000 },
        { labelUz: "6 Oy", labelRu: "6 Месяцев", price: 2_000_000 },
        { labelUz: "1 Yil", labelRu: "1 Год", price: 3_200_000 },
      ],
    },
    unlimited: {
      plans: [
        { labelUz: "12 ta mashg'ulot", labelRu: "12 занятий", price: 480_000 },
        { labelUz: "Bezlimit (oy)", labelRu: "Безлимит месяц", price: 650_000 },
        { labelUz: "3 Oy", labelRu: "3 Месяца", price: 1_500_000 },
        { labelUz: "6 Oy", labelRu: "6 Месяцев", price: 2_200_000 },
        { labelUz: "1 Yil", labelRu: "1 Год", price: 3_700_000 },
      ],
    },
    trainer: { sergeli: 700_000, chilonzor: 600_000 },
  },
  men: {
    singleVisit: 100_000,
    nightDay: {
      plans: [
        { labelUz: "12 ta tashrif", labelRu: "12 посещений", price: 470_000 },
        { labelUz: "Bezlimit (oy)", labelRu: "Безлимит месяц", price: 650_000 },
        { labelUz: "3 Oy", labelRu: "3 Месяца", price: 1_500_000 },
        { labelUz: "6 Oy", labelRu: "6 Месяцев", price: 2_300_000 },
        { labelUz: "1 Yil", labelRu: "1 Год", price: 3_500_000 },
      ],
    },
    unlimited: {
      plans: [
        { labelUz: "12 ta mashg'ulot", labelRu: "12 занятий", price: 570_000 },
        { labelUz: "Bezlimit (oy)", labelRu: "Безлимит месяц", price: 750_000 },
        { labelUz: "3 Oy", labelRu: "3 Месяца", price: 1_800_000 },
        { labelUz: "6 Oy", labelRu: "6 Месяцев", price: 2_800_000 },
        { labelUz: "1 Yil", labelRu: "1 Год", price: 4_200_000 },
      ],
    },
    trainer: { sergeli: 700_000, chilonzor: 600_000 },
  },
};

// ─── COACHES ─────────────────────────────────────────────────
// days: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
export const coaches = [
  {
    id: 1,
    nameUz: "Murabbiy 1",
    nameRu: "Тренер 1",
    image: "/images/coaches/1.png",
    days: [1, 2, 3, 4, 5],
    branchUz: "Sergeli filiali",
    branchRu: "Сергели",
  },
  {
    id: 2,
    nameUz: "Murabbiy 2",
    nameRu: "Тренер 2",
    image: "/images/coaches/2.png",
    days: [1, 3, 5, 6],
    branchUz: "Chilonzor filiali",
    branchRu: "Чиланзар",
  },
  {
    id: 3,
    nameUz: "Murabbiy 3",
    nameRu: "Тренер 3",
    image: "/images/coaches/3.jpg",
    days: [2, 4, 6],
    branchUz: "Sergeli filiali",
    branchRu: "Сергели",
  },
  {
    id: 4,
    nameUz: "Murabbiy 4",
    nameRu: "Тренер 4",
    image: "/images/coaches/4.png",
    days: [1, 2, 3, 4, 5, 6],
    branchUz: "Chilonzor filiali",
    branchRu: "Чиланзар",
  },
  {
    id: 5,
    nameUz: "Murabbiy 5",
    nameRu: "Тренер 5",
    image: "/images/coaches/5.png",
    days: [1, 2, 3, 4, 5],
    branchUz: "Sergeli filiali",
    branchRu: "Сергели",
  },
  {
    id: 6,
    nameUz: "Murabbiy 6",
    nameRu: "Тренер 6",
    image: "/images/coaches/6.png",
    days: [3, 4, 5, 6],
    branchUz: "Chilonzor filiali",
    branchRu: "Чиланзар",
  },
];

// ─── SOCIAL ──────────────────────────────────────────────────
export const social = {
  instagram: "https://www.instagram.com/landfitness.uz",
  instagramHandle: "@landfitness.uz",
};
