# MyNutritionist - Indian Nutrition Tracker

AI-Powered Nutrition Tracker for Indian Students with BMR/TDEE calculations, smart recommendations, and deficiency alerts.

## Features

- ✅ **Indian Food Database** - 50+ common Indian foods (Dal, Roti, Paneer, etc.)
- ✅ **Daily Targets** - Calculated based on profile (Age, Weight, Height, Activity, Goal)
- ✅ **Macro Tracking** - Track Calories, Protein, Carbs, Fats in real-time
- ✅ **Beautiful Charts** - Pie charts, Radar charts, and weekly trends using Recharts
- ✅ **Smart Recommendations** - AI suggests foods to fix nutrient deficiencies
- ✅ **Weight Prediction** - Realistic weight change projections
- ✅ **Browser Storage** - Data saves in localStorage (persists after refresh)
- ✅ **Tailwind CSS** - Beautiful, responsive UI

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Storage**: Browser localStorage

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Gopulucky/MyNutritionist-Indian-Nutrition-Tracker.git
cd MyNutritionist-Indian-Nutrition-Tracker

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
MyNutritionist/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── AddMeal.jsx
│   │   ├── Analytics.jsx
│   │   ├── Profile.jsx
│   │   └── Navbar.jsx
│   ├── data/
│   │   └── indianFoods.js
│   ├── engine/
│   │   └── NutritionEngine.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## How It Works

### 1. **Setup Profile**
- Enter your age, weight, height, activity level, and fitness goal
- The app calculates your BMR (Basal Metabolic Rate) and TDEE (Total Daily Energy Expenditure)
- Sets daily targets for calories, protein, carbs, and fats

### 2. **Add Meals**
- Search for Indian foods from the database
- Add meals with portions
- App instantly shows calories and macros

### 3. **Track & Analyze**
- Dashboard shows daily progress with visual charts
- Identifies nutrient deficiencies
- Suggests foods to improve nutrition

### 4. **Track Progress**
- Weekly weight change predictions
- Historical data (saved in browser)

## Key Algorithms

### BMR Calculation (Harris-Benedict Formula)
```
For Males: BMR = 10×weight(kg) + 6.25×height(cm) − 5×age(years) + 5
For Females: BMR = 10×weight(kg) + 6.25×height(cm) − 5×age(years) − 161
```

### TDEE Calculation
```
TDEE = BMR × Activity Multiplier
- Sedentary: 1.2
- Light: 1.375
- Moderate: 1.55
- Very Active: 1.725
```

## Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## Deploy to Vercel (Free)

```bash
npm install -g vercel
vercel --prod
```

Your app will be live at a URL like: `https://mynutritionist-xxxxx.vercel.app`

## Usage Tips

- **For Hostel Life**: Track mess food + occasional canteen meals
- **For Fitness**: Set goal as "Muscle Gain" or "Fat Loss" to get personalized targets
- **Export Data**: All data is stored in browser, download as needed

## Contributing

Contributions welcome! Feel free to:
- Add more Indian foods to the database
- Improve the UI/UX
- Add new features like meal planning

## License

MIT License - Feel free to use this project for your own purposes!

## Author

**Gopulucky** - Data Science Engineering Student

---

**Made for Indian students, by an Indian engineer** 🇮🇳
