// Mock initial data
export const initialProducts = [
  { id: 1, name: 'Wireless Headphones', price: 2999, image: '🎧', category: 'Electronics', stock: 15, sales: 45 },
  { id: 2, name: 'Smart Watch', price: 4999, image: '⌚', category: 'Electronics', stock: 20, sales: 32 },
  { id: 3, name: 'Laptop Backpack', price: 1499, image: '🎒', category: 'Accessories', stock: 30, sales: 67 },
  { id: 4, name: 'Bluetooth Speaker', price: 1999, image: '🔊', category: 'Electronics', stock: 25, sales: 54 },
  { id: 5, name: 'Running Shoes', price: 3499, image: '👟', category: 'Fashion', stock: 18, sales: 29 },
  { id: 6, name: 'Coffee Maker', price: 2499, image: '☕', category: 'Home', stock: 12, sales: 38 }
];

export const initialOrders = [
  { id: 1001, customer: 'Rahul Sharma', items: 2, total: 7998, status: 'pending', payment: 'online', date: '2024-12-28' },
  { id: 1002, customer: 'Priya Singh', items: 1, total: 1499, status: 'delivered', payment: 'cod', date: '2024-12-27' },
  { id: 1003, customer: 'Amit Kumar', items: 3, total: 8497, status: 'shipped', payment: 'online', date: '2024-12-28' },
  { id: 1004, customer: 'Neha Gupta', items: 1, total: 4999, status: 'pending', payment: 'cod', date: '2024-12-29' },
  { id: 1005, customer: 'Vikas Patel', items: 2, total: 5498, status: 'shipped', payment: 'online', date: '2024-12-29' }
];