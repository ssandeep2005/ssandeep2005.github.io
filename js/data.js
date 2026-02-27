// js/data.js

const baseProducts = [
    { id: 1, name: "Marble Ganesha Idol", price: 3500, category: "Spiritual", rating: 4.9, reviews: 124, image: "https://images.unsplash.com/photo-1582560468968-3e58b1f28b49?q=80&w=600&auto=format&fit=crop", description: "A beautifully detailed white Makrana marble Ganesha idol with subtle gold accents.", isNew: true, isBestSeller: true, material: "Marble", stock: 15 },
    { id: 2, name: "Scented Candle Set", price: 1899, category: "Home Decor", rating: 4.7, reviews: 89, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop", description: "Set of premium soy wax candles in elegant glass jars.", isNew: false, isBestSeller: true, material: "Glass", stock: 40 },
    { id: 3, name: "Decorative Marble Urli", price: 4200, category: "Home Decor", rating: 4.8, reviews: 56, image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=600&auto=format&fit=crop", description: "A classic Indian Urli bowl carved from solid marble.", isNew: true, isBestSeller: false, material: "Marble", stock: 10 },
    { id: 4, name: "Corporate Hamper", price: 5500, category: "Hampers", rating: 4.6, reviews: 34, image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=600&auto=format&fit=crop", description: "An elegant black and gold gift box containing a leather journal, pen, chocolates.", isNew: false, isBestSeller: false, material: "Mixed", stock: 25 },
    { id: 5, name: "Brass Diya Set", price: 2100, category: "Spiritual", rating: 4.9, reviews: 210, image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600&auto=format&fit=crop", description: "A pair of traditional yet modern gold-plated brass diyas.", isNew: false, isBestSeller: true, material: "Brass", stock: 50 },
    { id: 6, name: "Ceramic Vase Duo", price: 2800, category: "Home Decor", rating: 4.5, reviews: 42, image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=600&auto=format&fit=crop", description: "Minimalist beige and terracotta ceramic vases.", isNew: true, isBestSeller: false, material: "Ceramic", stock: 20 },
    { id: 7, name: "Marble Radha Krishna", price: 8500, category: "Spiritual", rating: 5.0, reviews: 12, image: "https://images.unsplash.com/photo-1590059530462-81781c039fb2?q=80&w=600&auto=format&fit=crop", description: "Pure white marble Radha Krishna idol with intricate painting.", isNew: true, isBestSeller: true, material: "Marble", stock: 5 },
    { id: 8, name: "Tea & Honey Box", price: 3200, category: "Hampers", rating: 4.8, reviews: 65, image: "https://images.unsplash.com/photo-1577212001712-1f415c89dfae?q=80&w=600&auto=format&fit=crop", description: "Premium assortment of Darjeeling teas and organic raw honey.", isNew: false, isBestSeller: true, material: "Mixed", stock: 30 },
    { id: 9, name: "Vintage Table Clock", price: 4100, category: "Home Decor", rating: 4.6, reviews: 28, image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop", description: "A beautifully crafted vintage-style brass table clock.", isNew: true, isBestSeller: false, material: "Brass", stock: 15 },
    { id: 10, name: "Stone Shiva Lingam", price: 2500, category: "Spiritual", rating: 4.9, reviews: 105, image: "https://images.unsplash.com/photo-1580130601254-04faa3aca150?q=80&w=600&auto=format&fit=crop", description: "Hand-carved authentic black stone Shiva Lingam.", isNew: false, isBestSeller: true, material: "Stone", stock: 20 },
    { id: 11, name: "Crystal T-Light Holder", price: 1200, category: "Home Decor", rating: 4.7, reviews: 150, image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=600&auto=format&fit=crop", description: "Sparkling crystal lotus for tea lights.", isNew: false, isBestSeller: false, material: "Glass", stock: 60 },
    { id: 12, name: "Wellness Retreat Hamper", price: 4800, category: "Hampers", rating: 4.9, reviews: 44, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop", description: "Relaxation kit featuring bath salts and essential oils.", isNew: true, isBestSeller: false, material: "Mixed", stock: 12 },
    { id: 13, name: "Painted Marble Coasters", price: 950, category: "Home Decor", rating: 4.5, reviews: 200, image: "https://images.unsplash.com/photo-1610706564619-74d156114b35?q=80&w=600&auto=format&fit=crop", description: "Set of 4 square marble coasters with 24k gold foil abstract painting.", isNew: false, isBestSeller: true, material: "Marble", stock: 100 },
    { id: 14, name: "Brass Pooja Thali Set", price: 3400, category: "Spiritual", rating: 4.8, reviews: 75, image: "https://images.unsplash.com/photo-1613588718956-c2e80305bf61?q=80&w=600&auto=format&fit=crop", description: "Complete pooja thali set including a bell, diya, and incense holder.", isNew: false, isBestSeller: false, material: "Brass", stock: 25 },
    { id: 15, name: "Wooden Dry Fruit Box", price: 2200, category: "Hampers", rating: 4.6, reviews: 55, image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=600&auto=format&fit=crop", description: "Kashmiri wooden box filled with premium assorted nuts.", isNew: true, isBestSeller: false, material: "Wood", stock: 35 }
];

const generateProducts = () => {
    const namePrefixes = ["Signature", "Premium", "Bespoke", "Luxury", "Classic", "Timeless", "Artisan", "Divine", "Royal", "Elegant"];
    let expandedProducts = [];
    let idCounter = 1;

    baseProducts.forEach((baseItem) => {
        for(let i=0; i<10; i++) {
            const priceVariation = Math.floor(Math.random() * 600) - 300; 
            expandedProducts.push({
                ...baseItem,
                id: idCounter++,
                name: `${namePrefixes[i]} ${baseItem.name}`,
                price: baseItem.price + (i === 0 ? 0 : priceVariation),
                isNew: Math.random() > 0.8,
                isBestSeller: Math.random() > 0.85
            });
        }
    });
    return expandedProducts.sort(() => Math.random() - 0.5); // Shuffle
};

const products = generateProducts();

// Helper functions
const getProducts = () => products;
const getProductById = (id) => products.find(product => product.id === parseInt(id));
const getBestSellers = () => products.filter(product => product.isBestSeller);
const getNewArrivals = () => products.filter(product => product.isNew);
const getCategories = () => [...new Set(products.map(product => product.category))];