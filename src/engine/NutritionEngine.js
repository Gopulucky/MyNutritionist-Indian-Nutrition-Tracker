export class NutritionEngine {
  constructor(profile) {
    this.profile = profile;
  }

  calculateBMR() {
    const { weight, height, age, sex } = this.profile;
    if (sex === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    }
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }

  calculateTDEE() {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very_active: 1.725
    };
    return this.calculateBMR() * multipliers[this.profile.activity];
  }

  getGoalAdjustment() {
    const goals = {
      'fat_loss': { cal: -500, proteinRatio: 2.2, carbRatio: 2.0, fatRatio: 0.8 },
      'maintenance': { cal: 0, proteinRatio: 1.8, carbRatio: 3.0, fatRatio: 1.0 },
      'muscle_gain': { cal: 300, proteinRatio: 2.4, carbRatio: 4.0, fatRatio: 1.0 },
      'general_health': { cal: 0, proteinRatio: 1.6, carbRatio: 3.0, fatRatio: 0.9 }
    };
    return goals[this.profile.goal] || goals['maintenance'];
  }

  calculateTargets() {
    const tdee = this.calculateTDEE();
    const adjustment = this.getGoalAdjustment();
    const calories = tdee + adjustment.cal;
    const protein = this.profile.weight * adjustment.proteinRatio;
    const fat = this.profile.weight * adjustment.fatRatio;
    const carbCals = calories - (protein * 4 + fat * 9);
    const carbs = carbCals / 4;

    return {
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(Math.max(carbs, 100)),
      fat: Math.round(fat),
      fiber: 38,
      calcium: 1000,
      iron: this.profile.sex === 'male' ? 19 : 27
    };
  }

  analyzeDeficiencies(totals, targets) {
    const deficiencies = [];
    const impacts = {
      protein: 'Muscle loss, weak immunity',
      iron: 'Fatigue, weakness',
      calcium: 'Weak bones',
      fiber: 'Digestive issues'
    };
    const solutions = {
      protein: ['Chicken', 'Paneer', 'Eggs'],
      iron: ['Spinach', 'Chickpeas', 'Red meat'],
      calcium: ['Milk', 'Yogurt', 'Paneer'],
      fiber: ['Vegetables', 'Fruits', 'Whole grains']
    };

    Object.keys(targets).forEach(nutrient => {
      const intake = totals[nutrient] || 0;
      const target = targets[nutrient];
      const percentage = (intake / target) * 100;
      if (percentage < 80) {
        deficiencies.push({
          nutrient: nutrient.charAt(0).toUpperCase() + nutrient.slice(1),
          intake: Math.round(intake),
          target: Math.round(target),
          percentage: Math.round(percentage),
          severity: percentage < 60 ? 'high' : 'medium',
          impact: impacts[nutrient] || 'Important for health',
          solutions: solutions[nutrient] || ['Balanced diet']
        });
      }
    });
    return deficiencies.sort((a, b) => a.percentage - b.percentage);
  }

  generateRecommendations(deficiencies) {
    const recs = [];
    deficiencies.slice(0, 3).forEach(def => {
      recs.push({
        priority: def.severity === 'high' ? 'urgent' : 'recommended',
        action: `Add ${def.solutions[0]} to meals`,
        benefit: `Boosts ${def.nutrient}`,
        nutrient: def.nutrient
      });
    });
    return recs;
  }
}
