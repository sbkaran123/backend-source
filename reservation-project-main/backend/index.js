
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const restaurants = [
  {
    id: 1,
    name: 'The Gourmet Spot',
    cuisine: 'Italian',
    priceRange: 'Rs.300-Rs.999',
    location: 'Peelamedu',
    menu: [
      { name: 'Pasta Carbonara', price: 12 },
      { name: 'Margherita Pizza', price: 10 }
    ],
    hours: '10:00 AM - 10:00 PM',
    contact: '7547454396',
    photos: ['image1.jpg', 'image2.jpg'],
    availability: [
      { date: '2024-12-18', slots: ['12:00 PM', '1:00 PM'] },
      { date: '2024-12-19', slots: ['2:00 PM', '3:00 PM'] }
    ]
  },
  {
    id: 2,
    name: 'Sushi Paradise',
    cuisine: 'Japanese',
    priceRange: 'Rs.300-Rs.999',
    location: 'Saravanampatti',
    menu: [
      { name: 'Dragon Roll', price: 15 },
      { name: 'Sashimi Platter', price: 20 }
    ],
    hours: '11:00 AM - 11:00 PM',
    contact: '9666567536',
    photos: ['image3.jpg', 'image4.jpg'],
    availability: [
      { date: '2024-12-18', slots: ['6:00 PM', '7:00 PM'] },
      { date: '2024-12-19', slots: ['8:00 PM', '9:00 PM'] }
    ]
  }
];

const reservations = [
  {
    id: 1,
    restaurantId: 1,
    userId: 1,
    date: '2024-12-18',
    time: '12:00 PM',
    partySize: 2
  },
  {
    id: 2,
    restaurantId: 2,
    userId: 2,
    date: '2024-12-18',
    time: '6:00 PM',
    partySize: 4
  }
];

const reviews = [
  {
    id: 1,
    restaurantId: 1,
    userId: 1,
    rating: 5,
    comment: 'Amazing food and ambiance!',
    photos: ['review1.jpg'],
    date: '2024-12-18'
  },
  {
    id: 2,
    restaurantId: 2,
    userId: 2,
    rating: 4,
    comment: 'Great sushi but a bit pricey.',
    photos: ['review2.jpg'],
    date: '2024-12-18'
  }
];

const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password123'
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: 'password456'
  }
];

// Endpoints

// Restaurants
app.get('/api/restaurants', (req, res) => {
  res.json(restaurants);
});

app.post('/api/restaurants', (req, res) => {
  const newRestaurant = { id: restaurants.length + 1, ...req.body };
  restaurants.push(newRestaurant);
  res.json(newRestaurant);
});

// Reservations
app.post('/api/reservations', (req, res) => {
  const newReservation = { id: reservations.length + 1, ...req.body };
  reservations.push(newReservation);
  res.json(newReservation);
});

app.get('/api/reservations/user/:userId', (req, res) => {
  const userReservations = reservations.filter(
    (reservation) => reservation.userId === parseInt(req.params.userId)
  );
  res.json(userReservations);
});

// Reviews
app.post('/api/reviews', (req, res) => {
  const newReview = { id: reviews.length + 1, ...req.body };
  reviews.push(newReview);
  res.json(newReview);
});

// Users
app.post('/api/users/register', (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.json(newUser);
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json({ token: 'sample-jwt-token', user });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
