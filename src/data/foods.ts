// Indian Food Database with calories per serving
export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  category: string;
  serving: string;
}

export const indianFoodDatabase: FoodItem[] = [
  // Rotis & Breads
  { id: "1", name: "Roti (Tandoori)", calories: 120, protein: 4, carbs: 20, fat: 3, category: "Roti/Bread", serving: "1 piece" },
  { id: "2", name: "Chapati (Wheat)", calories: 104, protein: 3, carbs: 18, fat: 2.5, category: "Roti/Bread", serving: "1 piece" },
  { id: "3", name: "Paratha (Plain)", calories: 180, protein: 4, carbs: 24, fat: 8, category: "Roti/Bread", serving: "1 piece" },
  { id: "4", name: "Paratha (Aloo)", calories: 230, protein: 5, carbs: 32, fat: 9, category: "Roti/Bread", serving: "1 piece" },
  { id: "5", name: "Naan (Butter)", calories: 260, protein: 6, carbs: 38, fat: 10, category: "Roti/Bread", serving: "1 piece" },
  { id: "6", name: "Tandoori Roti", calories: 110, protein: 3.5, carbs: 19, fat: 2, category: "Roti/Bread", serving: "1 piece" },
  { id: "7", name: "Missi Roti", calories: 140, protein: 5, carbs: 22, fat: 4, category: "Roti/Bread", serving: "1 piece" },
  { id: "8", name: "Puri", calories: 120, protein: 2, carbs: 15, fat: 6, category: "Roti/Bread", serving: "1 piece" },
  { id: "9", name: "Bhatura", calories: 150, protein: 3, carbs: 20, fat: 7, category: "Roti/Bread", serving: "1 piece" },
  { id: "10", name: "Kulcha", calories: 200, protein: 5, carbs: 30, fat: 7, category: "Roti/Bread", serving: "1 piece" },

  // Rice Items
  { id: "11", name: "Steamed Rice", calories: 130, protein: 3, carbs: 28, fat: 0.5, category: "Rice", serving: "1 cup" },
  { id: "12", name: "Jeera Rice", calories: 160, protein: 3, carbs: 30, fat: 4, category: "Rice", serving: "1 cup" },
  { id: "13", name: "Biryani (Chicken)", calories: 420, protein: 25, carbs: 45, fat: 15, category: "Rice", serving: "1 plate" },
  { id: "14", name: "Biryani (Mutton)", calories: 480, protein: 28, carbs: 42, fat: 20, category: "Rice", serving: "1 plate" },
  { id: "15", name: "Biryani (Veg)", calories: 320, protein: 8, carbs: 50, fat: 10, category: "Rice", serving: "1 plate" },
  { id: "16", name: "Fried Rice", calories: 280, protein: 8, carbs: 40, fat: 10, category: "Rice", serving: "1 cup" },
  { id: "17", name: "Lemon Rice", calories: 200, protein: 4, carbs: 35, fat: 6, category: "Rice", serving: "1 cup" },
  { id: "18", name: "Curd Rice", calories: 180, protein: 6, carbs: 30, fat: 4, category: "Rice", serving: "1 cup" },
  { id: "19", name: "Pulao", calories: 220, protein: 5, carbs: 38, fat: 6, category: "Rice", serving: "1 cup" },
  { id: "20", name: "Khichdi", calories: 250, protein: 8, carbs: 42, fat: 5, category: "Rice", serving: "1 bowl" },

  // Dal & Lentils
  { id: "21", name: "Dal (Toor)", calories: 150, protein: 10, carbs: 20, fat: 3, category: "Dal", serving: "1 bowl" },
  { id: "22", name: "Dal (Moong)", calories: 140, protein: 11, carbs: 18, fat: 2, category: "Dal", serving: "1 bowl" },
  { id: "23", name: "Dal (Masoor)", calories: 145, protein: 10, carbs: 19, fat: 2.5, category: "Dal", serving: "1 bowl" },
  { id: "24", name: "Dal (Chana)", calories: 170, protein: 12, carbs: 22, fat: 4, category: "Dal", serving: "1 bowl" },
  { id: "25", name: "Dal Makhani", calories: 280, protein: 12, carbs: 25, fat: 15, category: "Dal", serving: "1 bowl" },
  { id: "26", name: "Rajma", calories: 200, protein: 12, carbs: 28, fat: 5, category: "Dal", serving: "1 bowl" },
  { id: "27", name: "Chole", calories: 220, protein: 10, carbs: 30, fat: 7, category: "Dal", serving: "1 bowl" },
  { id: "28", name: "Sambar", calories: 100, protein: 5, carbs: 15, fat: 2, category: "Dal", serving: "1 bowl" },
  { id: "29", name: "Rasam", calories: 60, protein: 2, carbs: 10, fat: 1, category: "Dal", serving: "1 bowl" },

  // Sabzi / Vegetables
  { id: "30", name: "Aloo Gobi", calories: 160, protein: 4, carbs: 20, fat: 8, category: "Sabzi", serving: "1 bowl" },
  { id: "31", name: "Aloo Matar", calories: 170, protein: 5, carbs: 22, fat: 7, category: "Sabzi", serving: "1 bowl" },
  { id: "32", name: "Baingan Bharta", calories: 130, protein: 3, carbs: 15, fat: 7, category: "Sabzi", serving: "1 bowl" },
  { id: "33", name: "Bhindi Masala", calories: 120, protein: 3, carbs: 14, fat: 6, category: "Sabzi", serving: "1 bowl" },
  { id: "34", name: "Palak Paneer", calories: 240, protein: 14, carbs: 12, fat: 16, category: "Sabzi", serving: "1 bowl" },
  { id: "35", name: "Matar Paneer", calories: 260, protein: 16, carbs: 14, fat: 16, category: "Sabzi", serving: "1 bowl" },
  { id: "36", name: "Paneer Butter Masala", calories: 340, protein: 18, carbs: 15, fat: 24, category: "Sabzi", serving: "1 bowl" },
  { id: "37", name: "Shahi Paneer", calories: 320, protein: 16, carbs: 14, fat: 22, category: "Sabzi", serving: "1 bowl" },
  { id: "38", name: "Kadai Paneer", calories: 280, protein: 16, carbs: 12, fat: 18, category: "Sabzi", serving: "1 bowl" },
  { id: "39", name: "Mix Veg", calories: 140, protein: 5, carbs: 18, fat: 6, category: "Sabzi", serving: "1 bowl" },
  { id: "40", name: "Aloo Jeera", calories: 140, protein: 3, carbs: 20, fat: 6, category: "Sabzi", serving: "1 bowl" },
  { id: "41", name: "Aloo Dum", calories: 200, protein: 4, carbs: 25, fat: 10, category: "Sabzi", serving: "1 bowl" },
  { id: "42", name: "Gobi Manchurian", calories: 220, protein: 6, carbs: 25, fat: 12, category: "Sabzi", serving: "1 plate" },

  // Meat & Eggs
  { id: "43", name: "Chicken Curry", calories: 280, protein: 26, carbs: 8, fat: 16, category: "Non-Veg", serving: "1 bowl" },
  { id: "44", name: "Butter Chicken", calories: 380, protein: 28, carbs: 14, fat: 24, category: "Non-Veg", serving: "1 bowl" },
  { id: "45", name: "Chicken Tikka Masala", calories: 320, protein: 28, carbs: 12, fat: 18, category: "Non-Veg", serving: "1 bowl" },
  { id: "46", name: "Tandoori Chicken", calories: 260, protein: 30, carbs: 4, fat: 14, category: "Non-Veg", serving: "2 pieces" },
  { id: "47", name: "Chicken 65", calories: 300, protein: 24, carbs: 12, fat: 18, category: "Non-Veg", serving: "1 plate" },
  { id: "48", name: "Mutton Curry", calories: 350, protein: 28, carbs: 8, fat: 22, category: "Non-Veg", serving: "1 bowl" },
  { id: "49", name: "Rogan Josh", calories: 380, protein: 30, carbs: 10, fat: 24, category: "Non-Veg", serving: "1 bowl" },
  { id: "50", name: "Fish Curry", calories: 220, protein: 24, carbs: 6, fat: 12, category: "Non-Veg", serving: "1 bowl" },
  { id: "51", name: "Fish Fry", calories: 200, protein: 22, carbs: 4, fat: 10, category: "Non-Veg", serving: "1 piece" },
  { id: "52", name: "Egg Curry", calories: 200, protein: 16, carbs: 8, fat: 12, category: "Non-Veg", serving: "2 eggs" },
  { id: "53", name: "Boiled Egg", calories: 70, protein: 6, carbs: 0.5, fat: 5, category: "Non-Veg", serving: "1 egg" },
  { id: "54", name: "Egg Bhurji", calories: 180, protein: 14, carbs: 5, fat: 12, category: "Non-Veg", serving: "2 eggs" },
  { id: "55", name: "Omlette", calories: 160, protein: 12, carbs: 2, fat: 12, category: "Non-Veg", serving: "2 eggs" },

  // Breakfast
  { id: "56", name: "Idli", calories: 60, protein: 2, carbs: 12, fat: 0.5, category: "Breakfast", serving: "1 piece" },
  { id: "57", name: "Dosa (Plain)", calories: 120, protein: 3, carbs: 20, fat: 3, category: "Breakfast", serving: "1 piece" },
  { id: "58", name: "Dosa (Masala)", calories: 200, protein: 5, carbs: 30, fat: 7, category: "Breakfast", serving: "1 piece" },
  { id: "59", name: "Uttapam", calories: 150, protein: 4, carbs: 25, fat: 4, category: "Breakfast", serving: "1 piece" },
  { id: "60", name: "Upma", calories: 180, protein: 5, carbs: 32, fat: 4, category: "Breakfast", serving: "1 bowl" },
  { id: "61", name: "Poha", calories: 170, protein: 4, carbs: 30, fat: 4, category: "Breakfast", serving: "1 bowl" },
  { id: "62", name: "Aloo Paratha", calories: 240, protein: 5, carbs: 32, fat: 10, category: "Breakfast", serving: "1 piece" },
  { id: "63", name: "Gobi Paratha", calories: 220, protein: 5, carbs: 30, fat: 8, category: "Breakfast", serving: "1 piece" },
  { id: "64", name: "Paneer Paratha", calories: 280, protein: 12, carbs: 28, fat: 12, category: "Breakfast", serving: "1 piece" },
  { id: "65", name: "Methi Paratha", calories: 190, protein: 5, carbs: 26, fat: 7, category: "Breakfast", serving: "1 piece" },
  { id: "66", name: "Chole Bhature", calories: 450, protein: 14, carbs: 55, fat: 20, category: "Breakfast", serving: "1 plate" },
  { id: "67", name: "Vada Pav", calories: 300, protein: 8, carbs: 40, fat: 12, category: "Breakfast", serving: "1 piece" },
  { id: "68", name: "Samosa", calories: 260, protein: 5, carbs: 30, fat: 14, category: "Breakfast", serving: "1 piece" },
  { id: "69", name: "Kachori", calories: 280, protein: 6, carbs: 32, fat: 14, category: "Breakfast", serving: "1 piece" },
  { id: "70", name: "Medu Vada", calories: 150, protein: 4, carbs: 20, fat: 6, category: "Breakfast", serving: "1 piece" },

  // Snacks
  { id: "71", name: "Bhel Puri", calories: 180, protein: 4, carbs: 30, fat: 6, category: "Snacks", serving: "1 plate" },
  { id: "72", name: "Sev Puri", calories: 200, protein: 5, carbs: 28, fat: 8, category: "Snacks", serving: "1 plate" },
  { id: "73", name: "Pani Puri", calories: 50, protein: 1, carbs: 8, fat: 2, category: "Snacks", serving: "1 piece" },
  { id: "74", name: "Dahi Puri", calories: 120, protein: 4, carbs: 16, fat: 4, category: "Snacks", serving: "1 plate" },
  { id: "75", name: "Aloo Chaat", calories: 160, protein: 3, carbs: 28, fat: 5, category: "Snacks", serving: "1 plate" },
  { id: "76", name: "Chana Chaat", calories: 180, protein: 10, carbs: 28, fat: 4, category: "Snacks", serving: "1 bowl" },
  { id: "77", name: "Pakora (Mixed)", calories: 200, protein: 5, carbs: 22, fat: 10, category: "Snacks", serving: "4 pieces" },
  { id: "78", name: "Paneer Tikka", calories: 220, protein: 18, carbs: 6, fat: 14, category: "Snacks", serving: "4 pieces" },
  { id: "79", name: "Hara Bhara Kabab", calories: 160, protein: 6, carbs: 20, fat: 6, category: "Snacks", serving: "2 pieces" },
  { id: "80", name: "Spring Roll", calories: 140, protein: 4, carbs: 20, fat: 5, category: "Snacks", serving: "1 piece" },
  { id: "81", name: "Momos (Steamed)", calories: 100, protein: 6, carbs: 14, fat: 2, category: "Snacks", serving: "4 pieces" },
  { id: "82", name: "Momos (Fried)", calories: 180, protein: 6, carbs: 16, fat: 10, category: "Snacks", serving: "4 pieces" },

  // Beverages
  { id: "83", name: "Masala Chai", calories: 80, protein: 2, carbs: 10, fat: 3, category: "Beverages", serving: "1 cup" },
  { id: "84", name: "Green Tea", calories: 5, protein: 0, carbs: 1, fat: 0, category: "Beverages", serving: "1 cup" },
  { id: "85", name: "Filter Coffee", calories: 90, protein: 2, carbs: 10, fat: 3.5, category: "Beverages", serving: "1 cup" },
  { id: "86", name: "Lassi (Sweet)", calories: 200, protein: 8, carbs: 28, fat: 6, category: "Beverages", serving: "1 glass" },
  { id: "87", name: "Lassi (Salted)", calories: 140, protein: 8, carbs: 12, fat: 6, category: "Beverages", serving: "1 glass" },
  { id: "88", name: "Buttermilk (Chaas)", calories: 50, protein: 3, carbs: 4, fat: 2, category: "Beverages", serving: "1 glass" },
  { id: "89", name: "Aam Panna", calories: 120, protein: 1, carbs: 28, fat: 0, category: "Beverages", serving: "1 glass" },
  { id: "90", name: "Nimbu Pani", calories: 40, protein: 0, carbs: 10, fat: 0, category: "Beverages", serving: "1 glass" },
  { id: "91", name: "Coconut Water", calories: 45, protein: 2, carbs: 9, fat: 0.5, category: "Beverages", serving: "1 glass" },
  { id: "92", name: "Mango Shake", calories: 250, protein: 8, carbs: 40, fat: 6, category: "Beverages", serving: "1 glass" },
  { id: "93", name: "Banana Shake", calories: 220, protein: 8, carbs: 35, fat: 5, category: "Beverages", serving: "1 glass" },

  // Sweets & Desserts
  { id: "94", name: "Gulab Jamun", calories: 150, protein: 2, carbs: 22, fat: 6, category: "Sweets", serving: "1 piece" },
  { id: "95", name: "Rasgulla", calories: 120, protein: 3, carbs: 20, fat: 3, category: "Sweets", serving: "1 piece" },
  { id: "96", name: "Jalebi", calories: 200, protein: 2, carbs: 35, fat: 6, category: "Sweets", serving: "2 pieces" },
  { id: "97", name: "Kheer", calories: 180, protein: 5, carbs: 28, fat: 5, category: "Sweets", serving: "1 bowl" },
  { id: "98", name: "Halwa (Sooji)", calories: 220, protein: 4, carbs: 32, fat: 8, category: "Sweets", serving: "1 bowl" },
  { id: "99", name: "Halwa (Gajar)", calories: 240, protein: 5, carbs: 35, fat: 9, category: "Sweets", serving: "1 bowl" },
  { id: "100", name: "Barfi", calories: 160, protein: 4, carbs: 22, fat: 7, category: "Sweets", serving: "1 piece" },
  { id: "101", name: "Ladoo", calories: 180, protein: 4, carbs: 25, fat: 7, category: "Sweets", serving: "1 piece" },
  { id: "102", name: "Kaju Katli", calories: 140, protein: 3, carbs: 18, fat: 7, category: "Sweets", serving: "1 piece" },
  { id: "103", name: "Rasmalai", calories: 160, protein: 5, carbs: 22, fat: 5, category: "Sweets", serving: "1 piece" },
  { id: "104", name: "Gajar Ka Halwa", calories: 250, protein: 5, carbs: 35, fat: 10, category: "Sweets", serving: "1 bowl" },
  { id: "105", name: "Mysore Pak", calories: 200, protein: 3, carbs: 25, fat: 10, category: "Sweets", serving: "1 piece" },

  // South Indian
  { id: "106", name: "Sambar", calories: 100, protein: 5, carbs: 16, fat: 2, category: "South Indian", serving: "1 bowl" },
  { id: "107", name: "Coconut Chutney", calories: 80, protein: 2, carbs: 4, fat: 7, category: "South Indian", serving: "1 bowl" },
  { id: "108", name: "Tomato Chutney", calories: 50, protein: 1, carbs: 8, fat: 2, category: "South Indian", serving: "1 bowl" },
  { id: "109", name: "Rasam", calories: 60, protein: 2, carbs: 10, fat: 1, category: "South Indian", serving: "1 bowl" },
  { id: "110", name: "Pappu", calories: 130, protein: 8, carbs: 18, fat: 3, category: "South Indian", serving: "1 bowl" },
  { id: "111", name: "Avial", calories: 120, protein: 3, carbs: 15, fat: 6, category: "South Indian", serving: "1 bowl" },
  { id: "112", name: "Kootu", calories: 110, protein: 4, carbs: 16, fat: 3, category: "South Indian", serving: "1 bowl" },
  { id: "113", name: "Thayir Sadam", calories: 180, protein: 6, carbs: 28, fat: 5, category: "South Indian", serving: "1 bowl" },
  { id: "114", name: "Lemon Rice", calories: 200, protein: 4, carbs: 35, fat: 6, category: "South Indian", serving: "1 bowl" },
  { id: "115", name: "Tamarind Rice", calories: 210, protein: 4, carbs: 36, fat: 6, category: "South Indian", serving: "1 bowl" },
  { id: "116", name: "Coconut Rice", calories: 190, protein: 4, carbs: 30, fat: 7, category: "South Indian", serving: "1 bowl" },
  { id: "117", name: "Appam", calories: 100, protein: 2, carbs: 18, fat: 2, category: "South Indian", serving: "1 piece" },
  { id: "118", name: "Puttu", calories: 160, protein: 3, carbs: 30, fat: 2, category: "South Indian", serving: "1 plate" },
  { id: "119", name: "Idiyappam", calories: 130, protein: 3, carbs: 26, fat: 1, category: "South Indian", serving: "1 plate" },
  { id: "120", name: "Dosa (Rava)", calories: 140, protein: 3, carbs: 24, fat: 3, category: "South Indian", serving: "1 piece" },
  { id: "121", name: "Dosa (Onion)", calories: 160, protein: 4, carbs: 26, fat: 4, category: "South Indian", serving: "1 piece" },
  { id: "122", name: "Dosa (Cheese)", calories: 240, protein: 10, carbs: 26, fat: 10, category: "South Indian", serving: "1 piece" },
  { id: "123", name: "Dosa (Paper)", calories: 100, protein: 2, carbs: 18, fat: 2, category: "South Indian", serving: "1 piece" },

  // North Indian
  { id: "124", name: "Chana Masala", calories: 240, protein: 12, carbs: 32, fat: 8, category: "North Indian", serving: "1 bowl" },
  { id: "125", name: "Aloo Tikki", calories: 160, protein: 4, carbs: 24, fat: 6, category: "North Indian", serving: "2 pieces" },
  { id: "126", name: "Chole Kulche", calories: 380, protein: 14, carbs: 48, fat: 14, category: "North Indian", serving: "1 plate" },
  { id: "127", name: "Rajma Chawal", calories: 350, protein: 16, carbs: 48, fat: 10, category: "North Indian", serving: "1 plate" },
  { id: "128", name: "Kadhi Pakoda", calories: 220, protein: 10, carbs: 20, fat: 10, category: "North Indian", serving: "1 bowl" },
  { id: "129", name: "Malai Kofta", calories: 320, protein: 12, carbs: 20, fat: 22, category: "North Indian", serving: "1 bowl" },
  { id: "130", name: "Navratan Korma", calories: 280, protein: 10, carbs: 22, fat: 18, category: "North Indian", serving: "1 bowl" },
  { id: "131", name: "Paneer Lababdar", calories: 340, protein: 18, carbs: 16, fat: 22, category: "North Indian", serving: "1 bowl" },
  { id: "132", name: "Matar Mushroom", calories: 180, protein: 8, carbs: 16, fat: 10, category: "North Indian", serving: "1 bowl" },
  { id: "133", name: "Dum Aloo", calories: 220, protein: 5, carbs: 28, fat: 10, category: "North Indian", serving: "1 bowl" },
  { id: "134", name: "Sarson Ka Saag", calories: 120, protein: 5, carbs: 12, fat: 6, category: "North Indian", serving: "1 bowl" },
  { id: "135", name: "Makki Ki Roti", calories: 100, protein: 2, carbs: 18, fat: 2, category: "North Indian", serving: "1 piece" },
  { id: "136", name: "Chole Tikkiya", calories: 320, protein: 12, carbs: 40, fat: 12, category: "North Indian", serving: "1 plate" },

  // Common staples
  { id: "137", name: "Plain Curd", calories: 60, protein: 4, carbs: 5, fat: 3, category: "Staples", serving: "1 bowl" },
  { id: "138", name: "Ghee", calories: 120, protein: 0, carbs: 0, fat: 14, category: "Staples", serving: "1 tbsp" },
  { id: "139", name: "Butter", calories: 100, protein: 0, carbs: 0, fat: 11, category: "Staples", serving: "1 tbsp" },
  { id: "140", name: "Pickle", calories: 40, protein: 0, carbs: 8, fat: 1, category: "Staples", serving: "1 tbsp" },
  { id: "141", name: "Papad", calories: 50, protein: 2, carbs: 6, fat: 2, category: "Staples", serving: "1 piece" },
  { id: "142", name: "Salad", calories: 30, protein: 1, carbs: 5, fat: 0.5, category: "Staples", serving: "1 bowl" },
  { id: "143", name: "Raita (Cucumber)", calories: 80, protein: 4, carbs: 6, fat: 4, category: "Staples", serving: "1 bowl" },
  { id: "144", name: "Raita (Boondi)", calories: 120, protein: 5, carbs: 14, fat: 4, category: "Staples", serving: "1 bowl" },
  { id: "145", name: "Achar", calories: 35, protein: 0, carbs: 6, fat: 1, category: "Staples", serving: "1 tbsp" },
  { id: "146", name: "Green Chutney", calories: 25, protein: 1, carbs: 3, fat: 1, category: "Staples", serving: "1 tbsp" },
  { id: "147", name: "Tamarind Chutney", calories: 40, protein: 0, carbs: 10, fat: 0, category: "Staples", serving: "1 tbsp" },
];

export const getFoodsByCategory = (category: string): FoodItem[] => {
  return indianFoodDatabase.filter(food => food.category === category);
};

export const searchFoods = (query: string): FoodItem[] => {
  const lowerQuery = query.toLowerCase();
  return indianFoodDatabase.filter(food =>
    food.name.toLowerCase().includes(lowerQuery) ||
    food.category.toLowerCase().includes(lowerQuery)
  );
};

export const foodCategories = [
  "All",
  "Roti/Bread",
  "Rice",
  "Dal",
  "Sabzi",
  "Non-Veg",
  "Breakfast",
  "Snacks",
  "Beverages",
  "Sweets",
  "South Indian",
  "North Indian",
  "Staples",
];
