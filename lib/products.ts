export interface Product {
  id: string
  name: string
  price: number
  category: string
  image: string
  description: string
  unit: string
}

export const products: Product[] = [
  // Meat Products
  {
    id: "meat-1",
    name: "Fresh Beef",
    price: 12.99,
    category: "Meat",
    image: "/fresh-beef-meat.jpg",
    description: "Premium quality fresh beef",
    unit: "per kg",
  },
  {
    id: "meat-2",
    name: "Chicken Breast",
    price: 8.99,
    category: "Meat",
    image: "/chicken-breast-meat.jpg",
    description: "Tender chicken breast",
    unit: "per kg",
  },
  {
    id: "meat-3",
    name: "Lamb Chops",
    price: 15.99,
    category: "Meat",
    image: "/lamb-chops-meat.jpg",
    description: "Succulent lamb chops",
    unit: "per kg",
  },
  {
    id: "meat-4",
    name: "Ground Turkey",
    price: 9.99,
    category: "Meat",
    image: "/ground-turkey-meat.jpg",
    description: "Lean ground turkey",
    unit: "per kg",
  },
  {
    id: "meat-5",
    name: "Made in Usa",
    price: 9.99,
    category: "Meat",
    image: "/usa-meat-xn.jpg",
    description: "Made in the USA",
    unit: "per kg",
  },
  // Jam Products
  {
    id: "jam-1",
    name: "Strawberry Jam",
    price: 5.99,
    category: "Jam",
    image: "/strawberry-jam-jar.jpg",
    description: "Homemade strawberry jam",
    unit: "per jar",
  },
  {
    id: "jam-2",
    name: "Apricot Jam",
    price: 6.49,
    category: "Jam",
    image: "/apricot-jam-jar.jpg",
    description: "Sweet apricot preserve",
    unit: "per jar",
  },
  {
    id: "jam-3",
    name: "Blueberry Jam",
    price: 6.99,
    category: "Jam",
    image: "/blueberry-jam-jar.jpg",
    description: "Rich blueberry jam",
    unit: "per jar",
  },
  {
    id: "jam-4",
    name: "Orange Marmalade",
    price: 5.49,
    category: "Jam",
    image: "/orange-marmalade-jar.jpg",
    description: "Tangy orange marmalade",
    unit: "per jar",
  },
  {
    id: "jam-5",
    name: "Strawberry Jam",
    price: 5.49,
    category: "Jam",
    image: "/strawberry-jam.jpg",
    description: "Tangy strawbery jam",
    unit: "per jar",
  },

  // Drinks
    {
    id: "drink-5",
    name: "Cola",
    price: 4.99,
    category: "Drinks",
    image: "/cola.jpg",
    description: "Coca Cola",
    unit: "per liter",
  },
  {
    id: "drink-1",
    name: "Fresh Orange Juice",
    price: 4.99,
    category: "Drinks",
    image: "/fresh-orange-juice-bottle.jpg",
    description: "Freshly squeezed orange juice",
    unit: "per liter",
  },
  {
    id: "drink-2",
    name: "Apple Cider",
    price: 5.49,
    category: "Drinks",
    image: "/apple-cider-bottle.png",
    description: "Natural apple cider",
    unit: "per liter",
  },
  {
    id: "drink-3",
    name: "Mineral Water",
    price: 2.99,
    category: "Drinks",
    image: "/mineral-water-bottle.jpg",
    description: "Pure mineral water",
    unit: "per liter",
  },
  {
    id: "drink-4",
    name: "Green Tea",
    price: 3.99,
    category: "Drinks",
    image: "/green-tea-bottle.jpg",
    description: "Organic green tea",
    unit: "per bottle",
  },
]

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery),
  )
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export const categories = ["Meat", "Jam", "Drinks"]
