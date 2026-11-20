/* ScentVault Phase 1.3 | Curated, fixed front-end dataset.
   24 brands / 72 perfumes; nine candidates (Khadlaj and Alchemist: 6) pending user approval.
   Prices are COLLECTOR-CHOSEN reference values in RM, not live store prices.
   All records are coded below. Nothing is saved to browser storage or a server.
   Each page starts with an independent copy of the seed collection. */
window.ScentVaultData = (() => {
  const brandSpecs = [
  {
    "name": "Afnan",
    "origin": "Arabian",
    "country": "United Arab Emirates",
    "perfumes": [
      {
        "name": "Supremacy Collector's Edition",
        "category": "Woody",
        "notes": "Floral, fruity, woody and amber",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "9 PM Rebel",
        "category": "Fruity",
        "notes": "Fruity, woody and amber",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "9 PM Night Out",
        "category": "Warm Spicy",
        "notes": "Warm and sweet evening scent",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 250
  },
  {
    "name": "Armaf",
    "origin": "Arabian",
    "country": "United Arab Emirates",
    "perfumes": [
      {
        "name": "Club de Nuit Intense Man",
        "category": "Woody",
        "notes": "Citrus, smoky and woody",
        "concentration": "Eau de Toilette (EDT)",
        "size": 105,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Club de Nuit Sillage",
        "category": "Fresh",
        "notes": "Citrus, musky and fresh",
        "concentration": "Eau de Parfum (EDP)",
        "size": 105,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Odyssey Mandarin Sky",
        "category": "Sweet",
        "notes": "Mandarin, caramel and warm amber",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 200
  },
  {
    "name": "Lattafa",
    "origin": "Arabian",
    "country": "United Arab Emirates",
    "perfumes": [
      {
        "name": "Khamrah",
        "category": "Sweet",
        "notes": "Cinnamon, dates and vanilla",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Asad",
        "category": "Warm Spicy",
        "notes": "Black pepper, tobacco and amber",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Yara",
        "category": "Floral",
        "notes": "Soft floral and creamy sweet",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 150
  },
  {
    "name": "Rasasi",
    "origin": "Arabian",
    "country": "United Arab Emirates",
    "perfumes": [
      {
        "name": "Hawas Ice",
        "category": "Fresh",
        "notes": "Fresh, fruity and aquatic",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Hawas Kobra",
        "category": "Fresh",
        "notes": "Fresh, aromatic and spicy",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Hawas Thunder",
        "category": "Woody",
        "notes": "Woody and aromatic",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 150
  },
  {
    "name": "Bujairami",
    "origin": "Arabian",
    "country": "Australia",
    "perfumes": [
      {
        "name": "Hectic",
        "category": "Fresh",
        "notes": "Fresh and aromatic",
        "concentration": "Extrait de Parfum",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Too Damn Good",
        "category": "Sweet",
        "notes": "Sweet and warm",
        "concentration": "Extrait de Parfum",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Psycho",
        "category": "Woody",
        "notes": "Woody and warm",
        "concentration": "Extrait de Parfum",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 250
  },
  {
    "name": "Khadlaj",
    "origin": "Arabian",
    "country": "United Arab Emirates",
    "perfumes": [
      {
        "name": "Shiyaaka Sky",
        "category": "Fresh",
        "notes": "Bergamot, neroli and ambroxan",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "official",
        "productSource": "https://khadlaj-perfumes.com/",
        "selectionStatus": "suggested"
      },
      {
        "name": "Island",
        "category": "Fruity",
        "notes": "Pineapple, coconut and sandalwood",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "official",
        "productSource": "https://khadlaj-perfumes.com/",
        "selectionStatus": "suggested"
      },
      {
        "name": "Cream Velvet",
        "category": "Sweet",
        "notes": "Caramel, magnolia and sandalwood",
        "concentration": "Extrait de Parfum",
        "size": 100,
        "specStatus": "official",
        "productSource": "https://khadlaj-perfumes.com/",
        "selectionStatus": "suggested"
      }
    ],
    "fixedPriceRM": 159
  },
  {
    "name": "NBDY (Nobody)",
    "origin": "Malaysian",
    "country": "Malaysia",
    "perfumes": [
      {
        "name": "Carte Blanche",
        "category": "Fresh",
        "notes": "Fresh and clean",
        "concentration": "Extrait de Parfum",
        "size": 50,
        "specStatus": "reference",
        "productSource": "https://nbdy.world/collections/nbdy-fragrance",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Bhava",
        "category": "Floral",
        "notes": "Floral and warm",
        "concentration": "Extrait de Parfum",
        "size": 50,
        "specStatus": "reference",
        "productSource": "https://nbdy.world/collections/nbdy-fragrance",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Destino Oscura",
        "category": "Amber",
        "notes": "Amber and woody",
        "concentration": "Extrait de Parfum",
        "size": 50,
        "specStatus": "reference",
        "productSource": "https://nbdy.world/collections/nbdy-fragrance",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 140
  },
  {
    "name": "High Notes",
    "origin": "Malaysian",
    "country": "Malaysia",
    "perfumes": [
      {
        "name": "Illusion",
        "category": "Fresh",
        "notes": "Fresh and musky",
        "concentration": "Eau de Parfum (EDP)",
        "size": 35,
        "specStatus": "size-confirmed",
        "productSource": "https://highnotesfragrance.com/",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Symphonic",
        "category": "Woody",
        "notes": "Woody and aromatic",
        "concentration": "Eau de Parfum (EDP)",
        "size": 35,
        "specStatus": "size-confirmed",
        "productSource": "https://highnotesfragrance.com/",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Why",
        "category": "Fresh",
        "notes": "Fresh and aromatic",
        "concentration": "Eau de Parfum (EDP)",
        "size": 35,
        "specStatus": "size-confirmed",
        "productSource": "https://highnotesfragrance.com/",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 50
  },
  {
    "name": "Szindore",
    "origin": "Malaysian",
    "country": "Malaysia",
    "perfumes": [
      {
        "name": "Eyes",
        "category": "Floral",
        "notes": "Floral and musky",
        "concentration": "Extrait de Parfum",
        "size": 32,
        "specStatus": "reference",
        "productSource": "https://szindore.com/",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Sultan of Sea",
        "category": "Fresh",
        "notes": "Fresh and aquatic",
        "concentration": "Extrait de Parfum",
        "size": 100,
        "specStatus": "reference",
        "productSource": "https://szindore.com/shop/",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Was Ice",
        "category": "Fresh",
        "notes": "Fresh and cool",
        "concentration": "Extrait de Parfum",
        "size": 32,
        "specStatus": "reference",
        "productSource": "https://szindore.com/",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 50
  },
  {
    "name": "Blanco",
    "origin": "Malaysian",
    "country": "Malaysia",
    "perfumes": [
      {
        "name": "Most Wanted",
        "category": "Woody",
        "notes": "Woody and fresh",
        "concentration": "Eau de Parfum (EDP)",
        "size": 35,
        "specStatus": "reference",
        "productSource": "https://blancofragrance.com.my/",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Captivate",
        "category": "Other",
        "notes": "Fragrance profile pending verification",
        "concentration": "Eau de Parfum (EDP)",
        "size": 35,
        "specStatus": "unverified",
        "productSource": "https://blancofragrance.com.my/",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Ovanilla",
        "category": "Other",
        "notes": "Fragrance profile pending verification",
        "concentration": "Eau de Parfum (EDP)",
        "size": 35,
        "specStatus": "unverified",
        "productSource": "https://blancofragrance.com.my/",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 50
  },
  {
    "name": "SugarBomb",
    "origin": "Malaysian",
    "country": "Malaysia",
    "perfumes": [
      {
        "name": "Sexy Vanilla",
        "category": "Sweet",
        "notes": "Creamy vanilla and sweet",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Black Ice",
        "category": "Fresh",
        "notes": "Fresh and cool",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "White Ice",
        "category": "Fresh",
        "notes": "Fresh and cool",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 120
  },
  {
    "name": "Opai",
    "origin": "Malaysian",
    "country": "Malaysia",
    "perfumes": [
      {
        "name": "Summer Rock",
        "category": "Fruity",
        "notes": "Pineapple, berries, apple, rose, magnolia, musk, vanilla and amber",
        "concentration": "Extrait de Parfum",
        "size": 40,
        "specStatus": "official",
        "productSource": "https://opaifragrance.com/products/summer-rock",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Victory",
        "category": "Woody",
        "notes": "Bergamot, blackcurrant, apple, birch, patchouli, musk and leather",
        "concentration": "Extrait de Parfum",
        "size": 40,
        "specStatus": "official",
        "productSource": "https://opaifragrance.com/products/victory",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Oasis",
        "category": "Floral",
        "notes": "Orange blossom, mandarin, tuberose, ylang-ylang, vanilla and sandalwood",
        "concentration": "Extrait de Parfum",
        "size": 40,
        "specStatus": "official",
        "productSource": "https://opaifragrance.com/products/oasis",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 120
  },
  {
    "name": "HMNS",
    "origin": "Indonesian",
    "country": "Indonesia",
    "perfumes": [
      {
        "name": "ORGSM Eau de Parfum",
        "category": "Floral",
        "notes": "Fruity, floral and vanilla",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Farhampton Parfum",
        "category": "Woody",
        "notes": "Citrus, aromatic, woody and amber",
        "concentration": "Parfum",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Alpha Eau de Parfum",
        "category": "Fresh",
        "notes": "Fresh citrus and green tea",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 130
  },
  {
    "name": "Mykonos",
    "origin": "Indonesian",
    "country": "Indonesia",
    "perfumes": [
      {
        "name": "Inception",
        "category": "Woody",
        "notes": "Citrus, spicy and woody",
        "concentration": "Extrait de Parfum",
        "size": 100,
        "specStatus": "reference",
        "productSource": "https://shop.com/m/xpkha106j8",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Luminos",
        "category": "Fruity",
        "notes": "Fruity, sweet and floral",
        "concentration": "Extrait de Parfum",
        "size": 100,
        "specStatus": "reference",
        "productSource": "https://shop.com/m/xpkha106j8",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Conquer",
        "category": "Woody",
        "notes": "Citrus, woody and amber",
        "concentration": "Extrait de Parfum",
        "size": 100,
        "specStatus": "reference",
        "productSource": "https://shop.com/m/xpkha106j8",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 157
  },
  {
    "name": "Monacruz",
    "origin": "Indonesian",
    "country": "Indonesia",
    "perfumes": [
      {
        "name": "Morven",
        "category": "Woody",
        "notes": "Woody and warm",
        "concentration": "Eau de Parfum (EDP)",
        "size": 50,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Dark Lucifer",
        "category": "Amber",
        "notes": "Warm, sweet and amber",
        "concentration": "Eau de Parfum (EDP)",
        "size": 50,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Moon Rabbit",
        "category": "Floral",
        "notes": "Floral and musky",
        "concentration": "Eau de Parfum (EDP)",
        "size": 50,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 112
  },
  {
    "name": "SAFF & Co.",
    "origin": "Indonesian",
    "country": "Indonesia",
    "perfumes": [
      {
        "name": "Eulalie",
        "category": "Floral",
        "notes": "Floral, fruity and ambery",
        "concentration": "Extrait de Parfum",
        "size": 50,
        "specStatus": "reference",
        "productSource": "https://saffnco.com/collections",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Irai Leima",
        "category": "Floral",
        "notes": "Floral, powdery and musky",
        "concentration": "Extrait de Parfum",
        "size": 50,
        "specStatus": "reference",
        "productSource": "https://saffnco.com/collections",
        "selectionStatus": "confirmed"
      },
      {
        "name": "SOTB",
        "category": "Sweet",
        "notes": "Tropical floral and vanilla musk",
        "concentration": "Extrait de Parfum",
        "size": 50,
        "specStatus": "reference",
        "productSource": "https://saffnco.com/collections",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 136
  },
  {
    "name": "Velixir",
    "origin": "Indonesian",
    "country": "Indonesia",
    "perfumes": [
      {
        "name": "Morpheus",
        "category": "Sweet",
        "notes": "Sweet, warm and aromatic",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "size-confirmed",
        "productSource": "https://www.shamperfume.com/brands/velixir/",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Icarus",
        "category": "Fresh",
        "notes": "Fresh, citrus and woody",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "size-confirmed",
        "productSource": "https://www.shamperfume.com/brands/velixir/",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Uranus",
        "category": "Woody",
        "notes": "Woody and aromatic",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "size-confirmed",
        "productSource": "https://www.shamperfume.com/brands/velixir/",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 120
  },
  {
    "name": "Alchemist",
    "origin": "Indonesian",
    "country": "Indonesia",
    "perfumes": [
      {
        "name": "Onirique",
        "category": "Floral",
        "notes": "Pear, tuberose, jasmine and vanilla",
        "concentration": "Extrait de Parfum",
        "size": 50,
        "specStatus": "official",
        "productSource": "https://alchemistfragrance.com/products/onirique",
        "selectionStatus": "suggested"
      },
      {
        "name": "Bois et Musc",
        "category": "Woody",
        "notes": "Black pepper, muguet, patchouli and musk",
        "concentration": "Les Classiques (35% oil)",
        "size": 50,
        "specStatus": "official",
        "productSource": "https://alchemistfragrance.com/products/alchemist-fragrance-bois-et-musc-les-classiques",
        "selectionStatus": "suggested"
      },
      {
        "name": "Got My Mojo Back",
        "category": "Sweet",
        "notes": "Chocolate, blackcurrant, praline and amber",
        "concentration": "Eau de Parfum (EDP)",
        "size": 50,
        "specStatus": "official",
        "productSource": "https://alchemistfragrance.com/products/got-my-mojo-back",
        "selectionStatus": "suggested"
      }
    ],
    "fixedPriceRM": 110
  },
  {
    "name": "Dior",
    "origin": "International",
    "country": "France",
    "perfumes": [
      {
        "name": "Sauvage Eau de Parfum",
        "category": "Fresh",
        "notes": "Citrus, spices and vanilla",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Miss Dior Eau de Parfum",
        "category": "Floral",
        "notes": "Rose, floral and vanilla",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "J'adore Eau de Parfum",
        "category": "Floral",
        "notes": "Jasmine and floral",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 700
  },
  {
    "name": "Yves Saint Laurent (YSL)",
    "origin": "International",
    "country": "France",
    "perfumes": [
      {
        "name": "Y Eau de Parfum",
        "category": "Fresh",
        "notes": "Fresh, aromatic and woody",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Libre Eau de Parfum",
        "category": "Floral",
        "notes": "Lavender, floral and vanilla",
        "concentration": "Eau de Parfum (EDP)",
        "size": 50,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Black Opium Eau de Parfum",
        "category": "Sweet",
        "notes": "Coffee, vanilla and white floral",
        "concentration": "Eau de Parfum (EDP)",
        "size": 50,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 790
  },
  {
    "name": "Creed",
    "origin": "International",
    "country": "France",
    "perfumes": [
      {
        "name": "Aventus",
        "category": "Fruity",
        "notes": "Fruity, fresh and woody",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Wild Vetiver",
        "category": "Woody",
        "notes": "Green, woody and floral",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Silver Mountain Water",
        "category": "Fresh",
        "notes": "Fresh, citrus and musky",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 2500
  },
  {
    "name": "Louis Vuitton",
    "origin": "International",
    "country": "France",
    "perfumes": [
      {
        "name": "Imagination",
        "category": "Fresh",
        "notes": "Citrus, black tea and amber",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Symphony",
        "category": "Fresh",
        "notes": "Grapefruit, ginger and bergamot",
        "concentration": "Extrait de Parfum",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Pacific Chill",
        "category": "Fruity",
        "notes": "Blackcurrant, citron and fruity",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 1700
  },
  {
    "name": "Chanel",
    "origin": "International",
    "country": "France",
    "perfumes": [
      {
        "name": "Bleu de Chanel Eau de Parfum",
        "category": "Woody",
        "notes": "Woody, aromatic and amber",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Coco Mademoiselle Eau de Parfum",
        "category": "Floral",
        "notes": "Fresh, floral and amber",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "N°5 Eau de Parfum",
        "category": "Floral",
        "notes": "Floral, aldehydic and vanilla",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "reference",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 650
  },
  {
    "name": "Versace",
    "origin": "International",
    "country": "Italy",
    "perfumes": [
      {
        "name": "Eros Eau de Parfum",
        "category": "Fresh",
        "notes": "Mint, apple, woods and vanilla",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "size-confirmed",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Eros Flame Eau de Parfum",
        "category": "Warm Spicy",
        "notes": "Citrus, pepper, rosemary and woods",
        "concentration": "Eau de Parfum (EDP)",
        "size": 100,
        "specStatus": "size-confirmed",
        "productSource": "",
        "selectionStatus": "confirmed"
      },
      {
        "name": "Dylan Blue Eau de Toilette",
        "category": "Fresh",
        "notes": "Aquatic, citrus, incense and woody notes",
        "concentration": "Eau de Toilette (EDT)",
        "size": 100,
        "specStatus": "size-confirmed",
        "productSource": "",
        "selectionStatus": "confirmed"
      }
    ],
    "fixedPriceRM": 700
  }
];
  // Every curated perfume has a local JPEG supplied by the collection owner.
  const brands = brandSpecs.map(({name,origin,country,fixedPriceRM}) => ({name,origin,country,fixedPriceRM}));
  const catalogue = brandSpecs.flatMap((brand,brandIndex) => brand.perfumes.map((scent,scentIndex) => ({
    id:'sv-'+String(brandIndex*3+scentIndex+1).padStart(3,'0'),
    name:scent.name,brand:brand.name,origin:brand.origin,country:brand.country,
    category:scent.category,notes:scent.notes,concentration:scent.concentration,size:scent.size,
    price:brand.fixedPriceRM,priceSource:'user-brand-reference',
    specStatus:scent.specStatus,productSource:scent.productSource,
    selectionStatus:scent.selectionStatus,source:'curated-catalogue',
    // Images must be physically present under assets/images/perfumes/ (no remote fallback).
    image:'assets/images/perfumes/sv-'+String(brandIndex*3+scentIndex+1).padStart(3,'0')+'.jpg'
  })));
  const find=(brand,name)=>catalogue.find(p=>p.brand===brand && p.name===name);
  // Twelve owned fragrances, each priced RM 1,000 or less. One and two star ratings included.
  const ownedSelection=[
    ['Afnan',"Supremacy Collector's Edition",5],['Armaf','Club de Nuit Sillage',3],
    ['Lattafa','Asad',4],['Rasasi','Hawas Ice',2],
    ['NBDY (Nobody)','Carte Blanche',5],['High Notes','Illusion',3],
    ['Blanco','Most Wanted',1],['SugarBomb','Sexy Vanilla',4],
    ['HMNS','ORGSM Eau de Parfum',4],['Mykonos','Luminos',3],
    ['Dior','Sauvage Eau de Parfum',5],['Versace','Eros Eau de Parfum',null]
  ];
  const demoCollection=ownedSelection.map(([brand,name,rating],i)=>({
    ...find(brand,name),rating,favorite:[0,3,7,10].includes(i),
    addedAt:new Date(Date.UTC(2026,Math.min(i,10),10+(i%10))).toISOString().slice(0,10),
    personalReview:'',priceSource:'user-brand-reference'
  }));
  const wishSelection=[
    ['Afnan','9 PM Night Out'],['Rasasi','Hawas Kobra'],
    ['NBDY (Nobody)','Bhava'],['Szindore','Sultan of Sea'],
    ['SAFF & Co.','SOTB'],['Velixir','Morpheus'],
    ['Creed','Aventus'],['Louis Vuitton','Imagination']
  ];
  const priorities=['High','Medium','Low','Medium','High','Low','High','Medium'];
  const demoWishlist=wishSelection.map(([brand,name],i)=>({
    ...find(brand,name),priority:priorities[i],targetDate:new Date(Date.UTC(2027,i,15)).toISOString().slice(0,10),
    wishlistNotes:'',priceSource:'user-brand-reference'
  }));
  const clone=value=>JSON.parse(JSON.stringify(value));
  // Return cloned hardcoded data: refresh restores the original collection.
  function read(){return {collection:clone(demoCollection),wishlist:clone(demoWishlist)};}
  return {catalogue,brands,brandSpecs,read,demoCollection,demoWishlist};
})();
