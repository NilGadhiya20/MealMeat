require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const Dish = require('./models/Dish');
const Contact = require('./models/Contact');
const Order = require('./models/Order');

const seedData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    await Dish.deleteMany({});
    await Contact.deleteMany({});
    await Order.deleteMany({});

    // 1. Create Users
    const users = await User.create([
      { name: 'John Doe', email: 'john@example.com', password: 'password123', isStudent: false },
      { name: 'Jane Smith', email: 'jane@example.com', password: 'password123', isStudent: true },
      { name: 'Student 1', email: 'student1@example.com', password: 'password123', isStudent: true }
    ]);
    console.log(`Created ${users.length} users.`);

    // 2. Create Contacts
    const contacts = await Contact.create([
      { name: 'John Doe', email: 'john@example.com', phone: '1234567890', subject: 'App Feedback', message: 'I love using MealMate!' },
      { name: 'Alice', email: 'alice@example.com', phone: '0987654321', subject: 'Business Inquiry', message: 'We would like to list our restaurant' }
    ]);
    console.log(`Created ${contacts.length} contacts.`);

    // 3. Create Restaurants
    const restaurants = await Restaurant.create([
      { name: 'Spicy Delight', address: '123 Curry Ave', rating: 4.5, crowdLevel: 'high', deliveryTime: '30-45 min', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
      { name: 'Healthy Greens', address: '45 Veggie St', rating: 4.8, crowdLevel: 'low', deliveryTime: '15-25 min', image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&q=80' },
      { name: 'Pizza Paradise', address: '67 Slice Blvd', rating: 4.2, crowdLevel: 'medium', deliveryTime: '20-35 min', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80' },
      { name: 'Sweet Tooth', address: '89 Sugar Ln', rating: 4.7, crowdLevel: 'low', deliveryTime: '10-20 min', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80' }
    ]);
    console.log(`Created ${restaurants.length} restaurants.`);

    // 4. Create Dishes
    const dishes = await Dish.create([
      { name: 'Spicy Chicken Curry', price: 250, rating: 4.6, category: 'Curry', restaurant: restaurants[0]._id, isVeg: false, prepTime: 25, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80' },
      { name: 'Paneer Tikka Masala', price: 220, rating: 4.4, category: 'Curry', restaurant: restaurants[0]._id, isVeg: true, prepTime: 20, image: 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=400&q=80' },
      
      { name: 'Quinoa Salad', price: 180, rating: 4.8, category: 'Salad', restaurant: restaurants[1]._id, isVeg: true, prepTime: 10, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80' },
      { name: 'Avocado Toast', price: 150, rating: 4.7, category: 'Breakfast', restaurant: restaurants[1]._id, isVeg: true, prepTime: 10, image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?w=400&q=80' },

      { name: 'Margherita Pizza', price: 300, rating: 4.3, category: 'Pizza', restaurant: restaurants[2]._id, isVeg: true, prepTime: 20, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80' },
      { name: 'Pepperoni Pizza', price: 350, rating: 4.5, category: 'Pizza', restaurant: restaurants[2]._id, isVeg: false, prepTime: 20, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80' },

      { name: 'Chocolate Fudge Cake', price: 120, rating: 4.9, category: 'Dessert', restaurant: restaurants[3]._id, isVeg: true, prepTime: 5, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80' },
      { name: 'Strawberry Cheesecake', price: 140, rating: 4.8, category: 'Dessert', restaurant: restaurants[3]._id, isVeg: true, prepTime: 5, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80' }
    ]);
    console.log(`Created ${dishes.length} dishes.`);

    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
