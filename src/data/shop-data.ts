export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  badge?: string;
  imageUrl: string;
};

export type Category = {
  id: string;
  label: string;
  icon: string;
};

export const CATEGORIES: Category[] = [
  { id: "all", label: "Todos", icon: "view-grid" },
  { id: "smartphones", label: "Smartphones", icon: "cellphone" },
  { id: "notebooks", label: "Notebooks", icon: "laptop" },
  { id: "tablets", label: "Tablets", icon: "tablet" },
  { id: "audio", label: "Áudio", icon: "headphones" },
  { id: "wearables", label: "Wearables", icon: "watch" },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    price: 9799,
    oldPrice: 10999,
    rating: 4.9,
    reviews: 2841,
    category: "smartphones",
    badge: "Mais vendido",
    imageUrl: "https://m.media-amazon.com/images/I/71WbxLdbGOL._AC_SX679_.jpg",
  },
  {
    id: "2",
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    price: 8499,
    oldPrice: 9299,
    rating: 4.8,
    reviews: 1923,
    category: "smartphones",
    badge: "Novo",
    imageUrl:
      "https://m.media-amazon.com/images/I/61ceM-WQC7L._AC_SY300_SX300_QL70_ML2_.jpg",
  },
  {
    id: "3",
    name: 'MacBook Pro 14" M4',
    brand: "Apple",
    price: 19999,
    oldPrice: 22499,
    rating: 4.9,
    reviews: 876,
    category: "notebooks",
    badge: "Top",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202410?wid=904&hei=840&fmt=jpeg",
  },
  {
    id: "4",
    name: "Dell XPS 15",
    brand: "Dell",
    price: 12499,
    oldPrice: 13999,
    rating: 4.7,
    reviews: 542,
    category: "notebooks",
    imageUrl:
      "https://acdn-us.mitiendanube.com/stores/001/228/749/products/20250923_151159-92f431959919d3aac417587265269186-1024-1024.webp",
  },
  {
    id: "5",
    name: 'iPad Pro 13" M4',
    brand: "Apple",
    price: 12999,
    rating: 4.8,
    reviews: 1105,
    category: "tablets",
    badge: "Novo",
    imageUrl: "https://m.media-amazon.com/images/I/51pnOmSGLnL._AC_SX679_.jpg",
  },
  {
    id: "6",
    name: "Samsung Galaxy Tab S10+",
    brand: "Samsung",
    price: 5499,
    oldPrice: 6299,
    rating: 4.6,
    reviews: 734,
    category: "tablets",
    imageUrl:
      "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s10-plus.jpg",
  },
  {
    id: "7",
    name: "AirPods Pro 2",
    brand: "Apple",
    price: 2299,
    oldPrice: 2699,
    rating: 4.8,
    reviews: 3412,
    category: "audio",
    badge: "Mais vendido",
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=800&hei=800&fmt=png-alpha",
  },
  {
    id: "8",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    price: 1999,
    oldPrice: 2399,
    rating: 4.9,
    reviews: 2198,
    category: "audio",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Sony_WH-1000XM5_wireless_headphones%2C_black%2C_2022_%28cropped%29.jpg/220px-Sony_WH-1000XM5_wireless_headphones%2C_black%2C_2022_%28cropped%29.jpg",
  },
  {
    id: "9",
    name: "Apple Watch Series 10",
    brand: "Apple",
    price: 4299,
    oldPrice: 4799,
    rating: 4.7,
    reviews: 1567,
    category: "wearables",
    badge: "Novo",
    imageUrl: "https://m.media-amazon.com/images/I/5179Ty9CRoL._AC_SX679_.jpg",
  },
  {
    id: "10",
    name: "Samsung Galaxy Watch 7",
    brand: "Samsung",
    price: 1799,
    oldPrice: 2199,
    rating: 4.5,
    reviews: 892,
    category: "wearables",
    imageUrl: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch7.jpg",
  },
];
