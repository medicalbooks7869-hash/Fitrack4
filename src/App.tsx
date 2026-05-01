import { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import {
  indianFoodDatabase, foodCategories, searchFoods,
  type FoodItem
} from './data/foods';
import {
  exerciseDatabase, workoutPlans, exerciseCategories, getExerciseById,
  type Exercise, type WorkoutPlan
} from './data/exercises';
import {
  Plus, Search, ChevronLeft, Trash2,
  Dumbbell, UtensilsCrossed, Activity, User,
  History, Target, Flame, Calendar,
  BarChart3, Trophy, ArrowRight, Minus
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Types
interface MealEntry {
  id: string;
  foodId: string;
  foodName: string;
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  timestamp: number;
}

interface DailyLog {
  date: string;
  meals: MealEntry[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  waterIntake: number;
  weight?: number;
}

interface CustomExercise extends Exercise {
  isCustom: true;
}

interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  goal: 'bulking' | 'cutting' | 'maintenance';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

interface WorkoutLog {
  date: string;
  planId: string;
  dayFocus: string;
  exercises: {
    exerciseId: string;
    exerciseName: string;
    setsCompleted: number;
    repsCompleted: string;
    weightUsed: string;
    notes: string;
  }[];
  duration: number;
}

type View = 'dashboard' | 'food' | 'workout' | 'exercises' | 'history' | 'profile';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [profile, setProfile] = useLocalStorage<UserProfile>('fittrack_profile', {
    name: '',
    age: 25,
    gender: 'male',
    height: 170,
    weight: 70,
    goal: 'maintenance',
    activityLevel: 'moderate',
  });

  const [dailyLogs, setDailyLogs] = useLocalStorage<Record<string, DailyLog>>('fittrack_logs', {});
  const [customExercises, setCustomExercises] = useLocalStorage<CustomExercise[]>('fittrack_custom_exercises', []);
  const [workoutLogs, setWorkoutLogs] = useLocalStorage<WorkoutLog[]>('fittrack_workouts', []);

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const todayLog = useMemo(() => {
    if (!dailyLogs[today]) {
      return {
        date: today,
        meals: [],
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        waterIntake: 0,
      };
    }
    return dailyLogs[today];
  }, [dailyLogs, today]);

  const tdee = useMemo(() => {
    if (!profile.weight || !profile.height || !profile.age) return 2200;
    let bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age;
    bmr += profile.gender === 'male' ? 5 : -161;

    const multipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    const base = Math.round(bmr * multipliers[profile.activityLevel]);
    
    switch (profile.goal) {
      case 'bulking': return base + 500;
      case 'cutting': return base - 500;
      default: return base;
    }
  }, [profile]);

  const macroTargets = useMemo(() => {
    const protein = profile.goal === 'bulking' ? profile.weight * 2.2 : profile.weight * 1.8;
    const fat = (tdee * 0.25) / 9;
    const carbs = (tdee - (protein * 4) - (fat * 9)) / 4;
    return {
      calories: tdee,
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
    };
  }, [tdee, profile]);

  const addMeal = (food: FoodItem, quantity: number, mealType: MealEntry['mealType']) => {
    const multiplier = quantity;
    const newMeal: MealEntry = {
      id: `${Date.now()}-${Math.random()}`,
      foodId: food.id,
      foodName: food.name,
      quantity,
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.protein * multiplier * 10) / 10,
      carbs: Math.round(food.carbs * multiplier * 10) / 10,
      fat: Math.round(food.fat * multiplier * 10) / 10,
      mealType,
      timestamp: Date.now(),
    };

    setDailyLogs(prev => {
      const current = prev[today] || { date: today, meals: [], totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0, waterIntake: 0 };
      const updated = {
        ...current,
        meals: [...current.meals, newMeal],
        totalCalories: current.totalCalories + newMeal.calories,
        totalProtein: Math.round((current.totalProtein + newMeal.protein) * 10) / 10,
        totalCarbs: Math.round((current.totalCarbs + newMeal.carbs) * 10) / 10,
        totalFat: Math.round((current.totalFat + newMeal.fat) * 10) / 10,
      };
      return { ...prev, [today]: updated };
    });
  };

  const removeMeal = (mealId: string) => {
    setDailyLogs(prev => {
      const current = prev[today];
      if (!current) return prev;
      const meal = current.meals.find(m => m.id === mealId);
      if (!meal) return prev;
      const updated = {
        ...current,
        meals: current.meals.filter(m => m.id !== mealId),
        totalCalories: Math.max(0, current.totalCalories - meal.calories),
        totalProtein: Math.round(Math.max(0, current.totalProtein - meal.protein) * 10) / 10,
        totalCarbs: Math.round(Math.max(0, current.totalCarbs - meal.carbs) * 10) / 10,
        totalFat: Math.round(Math.max(0, current.totalFat - meal.fat) * 10) / 10,
      };
      return { ...prev, [today]: updated };
    });
  };

  const addWater = () => {
    setDailyLogs(prev => {
      const current = prev[today] || { date: today, meals: [], totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0, waterIntake: 0 };
      return { ...prev, [today]: { ...current, waterIntake: current.waterIntake + 1 } };
    });
  };

  const logWorkout = (log: WorkoutLog) => {
    setWorkoutLogs(prev => [log, ...prev]);
  };

  const addCustomExercise = (exercise: CustomExercise) => {
    setCustomExercises(prev => [...prev, exercise]);
  };

  const deleteCustomExercise = (id: string) => {
    setCustomExercises(prev => prev.filter(e => e.id !== id));
  };

  const streak = useMemo(() => {
    const dates = Object.keys(dailyLogs).sort().reverse();
    if (dates.length === 0) return 0;
    let count = 0;
    const todayDate = new Date();
    for (let i = 0; i < dates.length; i++) {
      const checkDate = new Date(todayDate);
      checkDate.setDate(checkDate.getDate() - i);
      const checkStr = checkDate.toISOString().split('T')[0];
      if (dates.includes(checkStr) && dailyLogs[checkStr]?.meals.length > 0) {
        count++;
      } else if (i > 0) {
        break;
      }
    }
    return count;
  }, [dailyLogs]);

  const allExercises = useMemo(() => {
    return [...exerciseDatabase, ...customExercises];
  }, [customExercises]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-24">
      <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-800">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">
              FitTrack <span className="text-blue-500">India</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>{streak} day streak</span>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-4">
        {currentView === 'dashboard' && (
          <DashboardView
            todayLog={todayLog}
            macroTargets={macroTargets}
            profile={profile}
            streak={streak}
            workoutLogs={workoutLogs}
            dailyLogs={dailyLogs}
            today={today}
            onAddWater={addWater}
            onNavigate={setCurrentView}
          />
        )}
        {currentView === 'food' && (
          <FoodView
            todayLog={todayLog}
            onAddMeal={addMeal}
            onRemoveMeal={removeMeal}
          />
        )}
        {currentView === 'workout' && (
          <WorkoutView
            workoutPlans={workoutPlans}
            profile={profile}
            onLogWorkout={logWorkout}
            allExercises={allExercises}
            today={today}
          />
        )}
        {currentView === 'exercises' && (
          <ExercisesView
            allExercises={allExercises}
            customExercises={customExercises}
            onAddCustom={addCustomExercise}
            onDeleteCustom={deleteCustomExercise}
          />
        )}
        {currentView === 'history' && (
          <HistoryView
            dailyLogs={dailyLogs}
            workoutLogs={workoutLogs}
          />
        )}
        {currentView === 'profile' && (
          <ProfileView
            profile={profile}
            onUpdateProfile={setProfile}
            macroTargets={macroTargets}
          />
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur-lg border-t border-neutral-800 safe-bottom">
        <div className="max-w-md mx-auto flex justify-around py-2">
          {[
            { view: 'dashboard' as View, icon: Activity, label: 'Home' },
            { view: 'food' as View, icon: UtensilsCrossed, label: 'Food' },
            { view: 'workout' as View, icon: Dumbbell, label: 'Workout' },
            { view: 'exercises' as View, icon: Target, label: 'Exercises' },
            { view: 'history' as View, icon: History, label: 'History' },
            { view: 'profile' as View, icon: User, label: 'Profile' },
          ].map(({ view, icon: Icon, label }) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                currentView === view
                  ? 'text-blue-500'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
              {currentView === view && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

// ============ DASHBOARD VIEW ============
function DashboardView({
  todayLog,
  macroTargets,
  profile,
  streak,
  workoutLogs,
  dailyLogs,
  today,
  onAddWater,
  onNavigate,
}: {
  todayLog: DailyLog;
  macroTargets: { calories: number; protein: number; carbs: number; fat: number };
  profile: UserProfile;
  streak: number;
  workoutLogs: WorkoutLog[];
  dailyLogs: Record<string, DailyLog>;
  today: string;
  onAddWater: () => void;
  onNavigate: (view: View) => void;
}) {
  const caloriePercent = Math.min((todayLog.totalCalories / macroTargets.calories) * 100, 100);
  const proteinPercent = Math.min((todayLog.totalProtein / macroTargets.protein) * 100, 100);
  const carbsPercent = Math.min((todayLog.totalCarbs / macroTargets.carbs) * 100, 100);
  const fatPercent = Math.min((todayLog.totalFat / macroTargets.fat) * 100, 100);

  const todayWorkout = workoutLogs.find(w => w.date === today);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="mb-2">
        <h2 className="text-xl font-bold">
          {profile.name ? `Hey, ${profile.name.split(' ')[0]}!` : 'Welcome!'}
        </h2>
        <p className="text-sm text-neutral-400">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-neutral-400">Calories Today</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{todayLog.totalCalories}</span>
                <span className="text-sm text-neutral-500">/ {macroTargets.calories}</span>
              </div>
            </div>
            <div className="w-16 h-16 relative">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#262626" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="3"
                  strokeDasharray={`${caloriePercent} 100`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold">{Math.round(caloriePercent)}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-neutral-800 rounded-lg p-2 text-center">
              <p className="text-xs text-neutral-400">Protein</p>
              <p className="text-sm font-bold">{todayLog.totalProtein}g</p>
              <div className="w-full bg-neutral-700 h-1 rounded-full mt-1">
                <div className="bg-green-500 h-1 rounded-full transition-all" style={{ width: `${proteinPercent}%` }} />
              </div>
            </div>
            <div className="bg-neutral-800 rounded-lg p-2 text-center">
              <p className="text-xs text-neutral-400">Carbs</p>
              <p className="text-sm font-bold">{todayLog.totalCarbs}g</p>
              <div className="w-full bg-neutral-700 h-1 rounded-full mt-1">
                <div className="bg-yellow-500 h-1 rounded-full transition-all" style={{ width: `${carbsPercent}%` }} />
              </div>
            </div>
            <div className="bg-neutral-800 rounded-lg p-2 text-center">
              <p className="text-xs text-neutral-400">Fat</p>
              <p className="text-sm font-bold">{todayLog.totalFat}g</p>
              <div className="w-full bg-neutral-700 h-1 rounded-full mt-1">
                <div className="bg-red-500 h-1 rounded-full transition-all" style={{ width: `${fatPercent}%` }} />
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-800 flex justify-between text-sm">
            <span className="text-neutral-400">Remaining</span>
            <span className={`font-bold ${macroTargets.calories - todayLog.totalCalories >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {macroTargets.calories - todayLog.totalCalories} kcal
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('food')}
          className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-left hover:border-blue-500/50 transition-colors"
        >
          <UtensilsCrossed className="w-6 h-6 text-blue-500 mb-2" />
          <p className="font-semibold text-sm">Log Food</p>
          <p className="text-xs text-neutral-500 mt-1">Track your meal</p>
        </button>
        <button
          onClick={() => onNavigate('workout')}
          className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-left hover:border-orange-500/50 transition-colors"
        >
          <Dumbbell className="w-6 h-6 text-orange-500 mb-2" />
          <p className="font-semibold text-sm">Workout</p>
          <p className="text-xs text-neutral-500 mt-1">Start training</p>
        </button>
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-semibold text-sm">Water Intake</p>
                <p className="text-xs text-neutral-400">{todayLog.waterIntake} / 8 glasses</p>
              </div>
            </div>
            <button
              onClick={onAddWater}
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-1 mt-3">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all ${
                  i < todayLog.waterIntake ? 'bg-blue-500' : 'bg-neutral-800'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-sm">Today's Workout</p>
            {todayWorkout ? (
              <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">Completed</span>
            ) : (
              <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded-full">Pending</span>
            )}
          </div>
          {todayWorkout ? (
            <div className="text-sm text-neutral-400">
              <p>Focus: {todayWorkout.dayFocus}</p>
              <p className="mt-1">Duration: {todayWorkout.duration} min</p>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('workout')}
              className="w-full py-3 bg-orange-600 rounded-lg text-sm font-semibold hover:bg-orange-500 transition-colors"
            >
              Start Workout
            </button>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-center">
          <Trophy className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
          <p className="text-lg font-bold">{streak}</p>
          <p className="text-[10px] text-neutral-500">Day Streak</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-center">
          <Calendar className="w-5 h-5 text-purple-500 mx-auto mb-1" />
          <p className="text-lg font-bold">{Object.keys(dailyLogs).length}</p>
          <p className="text-[10px] text-neutral-500">Days Logged</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-center">
          <BarChart3 className="w-5 h-5 text-green-500 mx-auto mb-1" />
          <p className="text-lg font-bold">{workoutLogs.length}</p>
          <p className="text-[10px] text-neutral-500">Workouts</p>
        </div>
      </div>
    </div>
  );
}

// ============ FOOD VIEW ============
function FoodView({
  todayLog,
  onAddMeal,
  onRemoveMeal,
}: {
  todayLog: DailyLog;
  onAddMeal: (food: FoodItem, quantity: number, mealType: MealEntry['mealType']) => void;
  onRemoveMeal: (id: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMealType, setSelectedMealType] = useState<MealEntry['mealType']>('breakfast');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredFoods = useMemo(() => {
    let foods = searchQuery ? searchFoods(searchQuery) : indianFoodDatabase;
    if (selectedCategory !== 'All') {
      foods = foods.filter(f => f.category === selectedCategory);
    }
    return foods;
  }, [searchQuery, selectedCategory]);

  const mealsByType = useMemo(() => {
    return {
      breakfast: todayLog.meals.filter(m => m.mealType === 'breakfast'),
      lunch: todayLog.meals.filter(m => m.mealType === 'lunch'),
      dinner: todayLog.meals.filter(m => m.mealType === 'dinner'),
      snack: todayLog.meals.filter(m => m.mealType === 'snack'),
    };
  }, [todayLog]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map(type => (
          <button
            key={type}
            onClick={() => setSelectedMealType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedMealType === type
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
            <span className="ml-1 text-xs opacity-70">({mealsByType[type].length})</span>
          </button>
        ))}
      </div>

      {mealsByType[selectedMealType].length > 0 ? (
        <div className="space-y-2">
          {mealsByType[selectedMealType].map(meal => (
            <div key={meal.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{meal.foodName}</p>
                <p className="text-xs text-neutral-500">
                  {meal.quantity}x | {meal.calories} kcal | P:{meal.protein}g C:{meal.carbs}g F:{meal.fat}g
                </p>
              </div>
              <button
                onClick={() => onRemoveMeal(meal.id)}
                className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-neutral-500">
          <UtensilsCrossed className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No {selectedMealType} logged yet</p>
        </div>
      )}

      <button
        onClick={() => setShowAddModal(true)}
        className="w-full py-3 bg-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Food to {selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)}
      </button>

      {showAddModal && (
        <div className="fixed inset-0 z-[60] bg-neutral-950 animate-fade-in">
          <div className="max-w-md mx-auto h-full flex flex-col">
            <div className="px-4 py-4 border-b border-neutral-800 flex items-center gap-3">
              <button
                onClick={() => { setShowAddModal(false); setSelectedFood(null); }}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-800"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="font-bold">Add Food</h2>
            </div>

            <div className="px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search Indian foods..."
                  className="pl-10 bg-neutral-900 border-neutral-800"
                />
              </div>
            </div>

            <div className="px-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar">
              {foodCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
              {!selectedFood ? (
                <div className="space-y-2">
                  {filteredFoods.map(food => (
                    <button
                      key={food.id}
                      onClick={() => setSelectedFood(food)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-left hover:border-blue-500/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{food.name}</p>
                          <p className="text-xs text-neutral-500">{food.serving} | {food.category}</p>
                        </div>
                        <span className="text-sm font-bold text-blue-500">{food.calories} kcal</span>
                      </div>
                      <div className="flex gap-3 mt-2 text-xs text-neutral-500">
                        <span>P: {food.protein}g</span>
                        <span>C: {food.carbs}g</span>
                        <span>F: {food.fat}g</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                    <h3 className="font-bold text-lg">{selectedFood.name}</h3>
                    <p className="text-sm text-neutral-500">{selectedFood.serving}</p>
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      <div className="text-center">
                        <p className="text-lg font-bold">{Math.round(selectedFood.calories * quantity)}</p>
                        <p className="text-xs text-neutral-500">kcal</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">{Math.round(selectedFood.protein * quantity * 10) / 10}g</p>
                        <p className="text-xs text-neutral-500">protein</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">{Math.round(selectedFood.carbs * quantity * 10) / 10}g</p>
                        <p className="text-xs text-neutral-500">carbs</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">{Math.round(selectedFood.fat * quantity * 10) / 10}g</p>
                        <p className="text-xs text-neutral-500">fat</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                    <p className="text-sm font-medium mb-3">Quantity</p>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))}
                        className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xl font-bold w-12 text-center">{quantity}x</span>
                      <button
                        onClick={() => setQuantity(quantity + 0.5)}
                        className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddMeal(selectedFood, quantity, selectedMealType);
                      setShowAddModal(false);
                      setSelectedFood(null);
                      setQuantity(1);
                    }}
                    className="w-full py-4 bg-blue-600 rounded-xl font-semibold hover:bg-blue-500 transition-colors"
                  >
                    Add to {selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ WORKOUT VIEW ============
function WorkoutView({
  workoutPlans,
  profile,
  onLogWorkout,
  allExercises,
  today,
}: {
  workoutPlans: WorkoutPlan[];
  profile: UserProfile;
  onLogWorkout: (log: WorkoutLog) => void;
  allExercises: Exercise[];
  today: string;
}) {
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);
  const [activeWorkout, setActiveWorkout] = useState<{
    planId: string;
    dayFocus: string;
    exercises: {
      exerciseId: string;
      exerciseName: string;
      setsCompleted: number;
      repsCompleted: string;
      weightUsed: string;
      notes: string;
    }[];
    startTime: number;
  } | null>(null);

  const filteredPlans = workoutPlans.filter(p =>
    profile.goal === p.goal || p.goal === 'maintenance'
  );

  const dayOfWeek = new Date().getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const startWorkout = (plan: WorkoutPlan, dayIndex: number) => {
    const day = plan.schedule[dayIndex];
    if (day.exercises.length === 0) return;

    const exercises = day.exercises.map(id => {
      const ex = allExercises.find(e => e.id === id) || getExerciseById(id);
      return {
        exerciseId: id,
        exerciseName: ex?.name || id,
        setsCompleted: 0,
        repsCompleted: '',
        weightUsed: '',
        notes: '',
      };
    });

    setActiveWorkout({
      planId: plan.id,
      dayFocus: day.focus,
      exercises,
      startTime: Date.now(),
    });
  };

  const completeWorkout = () => {
    if (!activeWorkout) return;
    const duration = Math.round((Date.now() - activeWorkout.startTime) / 60000);

    onLogWorkout({
      date: today,
      planId: activeWorkout.planId,
      dayFocus: activeWorkout.dayFocus,
      exercises: activeWorkout.exercises,
      duration,
    });

    setActiveWorkout(null);
  };

  if (activeWorkout) {
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{activeWorkout.dayFocus}</h2>
          <button
            onClick={completeWorkout}
            className="px-4 py-2 bg-green-600 rounded-lg text-sm font-semibold hover:bg-green-500 transition-colors"
          >
            Finish
          </button>
        </div>

        <div className="space-y-3">
          {activeWorkout.exercises.map((ex, idx) => {
            const exercise = allExercises.find(e => e.id === ex.exerciseId);
            return (
              <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold">{ex.exerciseName}</p>
                    <p className="text-xs text-neutral-500">
                      Target: {exercise?.sets} sets x {exercise?.reps}
                    </p>
                  </div>
                  <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">
                    {exercise?.muscleGroup}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-neutral-500">Sets</label>
                    <Input
                      type="number"
                      value={ex.setsCompleted || ''}
                      onChange={e => {
                        const val = parseInt(e.target.value) || 0;
                        setActiveWorkout(prev => prev ? {
                          ...prev,
                          exercises: prev.exercises.map((x, i) =>
                            i === idx ? { ...x, setsCompleted: val } : x
                          ),
                        } : null);
                      }}
                      className="bg-neutral-800 border-neutral-700 h-10 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500">Reps</label>
                    <Input
                      value={ex.repsCompleted}
                      onChange={e => {
                        setActiveWorkout(prev => prev ? {
                          ...prev,
                          exercises: prev.exercises.map((x, i) =>
                            i === idx ? { ...x, repsCompleted: e.target.value } : x
                          ),
                        } : null);
                      }}
                      placeholder="e.g. 10"
                      className="bg-neutral-800 border-neutral-700 h-10 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-500">Weight</label>
                    <Input
                      value={ex.weightUsed}
                      onChange={e => {
                        setActiveWorkout(prev => prev ? {
                          ...prev,
                          exercises: prev.exercises.map((x, i) =>
                            i === idx ? { ...x, weightUsed: e.target.value } : x
                          ),
                        } : null);
                      }}
                      placeholder="kg/lbs"
                      className="bg-neutral-800 border-neutral-700 h-10 mt-1"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="space-y-4 animate-fade-in">
        <h2 className="text-xl font-bold">Workout Plans</h2>
        <p className="text-sm text-neutral-500">
          Goal: <span className="text-blue-500 capitalize">{profile.goal}</span>
        </p>

        <div className="space-y-3">
          {filteredPlans.map(plan => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-left hover:border-blue-500/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{plan.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  plan.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-500' :
                  plan.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  {plan.difficulty}
                </span>
              </div>
              <p className="text-sm text-neutral-500 mb-3">{plan.description}</p>
              <div className="flex gap-2 text-xs text-neutral-400">
                <span>{plan.schedule.filter(d => d.exercises.length > 0).length} training days</span>
                <span>|</span>
                <span className="capitalize">{plan.goal}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => setSelectedPlan(null)}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-800"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">{selectedPlan.name}</h2>
      </div>

      <div className="space-y-2">
        {selectedPlan.schedule.map((day, idx) => {
          const isToday = dayNames[dayOfWeek] === day.day;
          const hasExercises = day.exercises.length > 0;

          return (
            <div
              key={idx}
              className={`bg-neutral-900 border rounded-xl p-4 ${
                isToday ? 'border-blue-500/50' : 'border-neutral-800'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className={`font-semibold ${isToday ? 'text-blue-500' : ''}`}>
                    {day.day}
                    {isToday && <span className="text-xs ml-2 bg-blue-500/20 text-blue-500 px-2 py-0.5 rounded-full">Today</span>}
                  </p>
                  <p className="text-sm text-neutral-500">{day.focus}</p>
                </div>
                {hasExercises && (
                  <button
                    onClick={() => startWorkout(selectedPlan, idx)}
                    className="px-4 py-2 bg-orange-600 rounded-lg text-sm font-semibold hover:bg-orange-500 transition-colors"
                  >
                    Start
                  </button>
                )}
              </div>

              {hasExercises && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {day.exercises.slice(0, 4).map(exId => {
                    const ex = allExercises.find(e => e.id === exId);
                    return ex ? (
                      <span key={exId} className="text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded">
                        {ex.name}
                      </span>
                    ) : null;
                  })}
                  {day.exercises.length > 4 && (
                    <span className="text-xs text-neutral-500">+{day.exercises.length - 4} more</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ EXERCISES VIEW ============
function ExercisesView({
  allExercises,
  onAddCustom,
  onDeleteCustom,
}: {
  allExercises: Exercise[];
  customExercises: CustomExercise[];
  onAddCustom: (ex: CustomExercise) => void;
  onDeleteCustom: (id: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const [newExercise, setNewExercise] = useState({
    name: '',
    category: 'Chest',
    muscleGroup: '',
    difficulty: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    sets: 3,
    reps: '10-12',
    restSeconds: 60,
    instructions: [''],
  });

  const filtered = useMemo(() => {
    let exercises = allExercises;
    if (selectedCategory !== 'All') {
      exercises = exercises.filter(e => e.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      exercises = exercises.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.muscleGroup.toLowerCase().includes(q)
      );
    }
    return exercises;
  }, [allExercises, selectedCategory, searchQuery]);

  if (selectedExercise) {
    return (
      <div className="fixed inset-0 z-[60] bg-neutral-950 animate-fade-in">
        <div className="max-w-md mx-auto h-full flex flex-col">
          <div className="px-4 py-4 border-b border-neutral-800 flex items-center gap-3">
            <button
              onClick={() => setSelectedExercise(null)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-800"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="font-bold">Exercise Details</h2>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            <div>
              <h3 className="text-2xl font-bold">{selectedExercise.name}</h3>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">{selectedExercise.category}</span>
                <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded">{selectedExercise.muscleGroup}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  selectedExercise.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-500' :
                  selectedExercise.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  {selectedExercise.difficulty}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-neutral-900 rounded-xl p-3 text-center">
                <p className="text-xl font-bold">{selectedExercise.sets}</p>
                <p className="text-xs text-neutral-500">Sets</p>
              </div>
              <div className="bg-neutral-900 rounded-xl p-3 text-center">
                <p className="text-xl font-bold">{selectedExercise.reps}</p>
                <p className="text-xs text-neutral-500">Reps</p>
              </div>
              <div className="bg-neutral-900 rounded-xl p-3 text-center">
                <p className="text-xl font-bold">{selectedExercise.restSeconds}s</p>
                <p className="text-xs text-neutral-500">Rest</p>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-xl p-4">
              <h4 className="font-semibold mb-3">Instructions</h4>
              <ol className="space-y-2">
                {selectedExercise.instructions.map((inst, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-neutral-300">{inst}</span>
                  </li>
                ))}
              </ol>
            </div>

            {selectedExercise.isCustom && (
              <button
                onClick={() => {
                  onDeleteCustom(selectedExercise.id);
                  setSelectedExercise(null);
                }}
                className="w-full py-3 bg-red-600/20 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-600/30 transition-colors"
              >
                Delete Exercise
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (showAddForm) {
    return (
      <div className="fixed inset-0 z-[60] bg-neutral-950 animate-fade-in">
        <div className="max-w-md mx-auto h-full flex flex-col">
          <div className="px-4 py-4 border-b border-neutral-800 flex items-center gap-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-800"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="font-bold">Add Custom Exercise</h2>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            <div>
              <label className="text-sm text-neutral-400">Exercise Name</label>
              <Input
                value={newExercise.name}
                onChange={e => setNewExercise(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. My Custom Push-up"
                className="bg-neutral-900 border-neutral-800 mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-neutral-400">Category</label>
              <select
                value={newExercise.category}
                onChange={e => setNewExercise(prev => ({ ...prev, category: e.target.value }))}
                className="w-full mt-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm"
              >
                {exerciseCategories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-neutral-400">Muscle Group</label>
              <Input
                value={newExercise.muscleGroup}
                onChange={e => setNewExercise(prev => ({ ...prev, muscleGroup: e.target.value }))}
                placeholder="e.g. Upper Chest"
                className="bg-neutral-900 border-neutral-800 mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-neutral-400">Sets</label>
                <Input
                  type="number"
                  value={newExercise.sets}
                  onChange={e => setNewExercise(prev => ({ ...prev, sets: parseInt(e.target.value) || 0 }))}
                  className="bg-neutral-900 border-neutral-800 mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-neutral-400">Reps</label>
                <Input
                  value={newExercise.reps}
                  onChange={e => setNewExercise(prev => ({ ...prev, reps: e.target.value }))}
                  placeholder="e.g. 10-12"
                  className="bg-neutral-900 border-neutral-800 mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-neutral-400">Difficulty</label>
              <div className="flex gap-2 mt-1">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => setNewExercise(prev => ({ ...prev, difficulty: d }))}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      newExercise.difficulty === d
                        ? 'bg-blue-600 text-white'
                        : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-neutral-400">Instructions (one per line)</label>
              <textarea
                value={newExercise.instructions.join('\n')}
                onChange={e => setNewExercise(prev => ({ ...prev, instructions: e.target.value.split('\n').filter(s => s.trim()) }))}
                placeholder="Step 1...\nStep 2...\nStep 3..."
                rows={4}
                className="w-full mt-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm resize-none"
              />
            </div>

            <button
              onClick={() => {
                if (!newExercise.name.trim()) return;
                onAddCustom({
                  ...newExercise,
                  id: `custom-${Date.now()}`,
                  isCustom: true,
                });
                setShowAddForm(false);
                setNewExercise({
                  name: '',
                  category: 'Chest',
                  muscleGroup: '',
                  difficulty: 'Beginner',
                  sets: 3,
                  reps: '10-12',
                  restSeconds: 60,
                  instructions: [''],
                });
              }}
              className="w-full py-4 bg-blue-600 rounded-xl font-semibold hover:bg-blue-500 transition-colors"
            >
              Save Exercise
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Exercise Library</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-3 py-2 bg-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
        <Input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search exercises..."
          className="pl-10 bg-neutral-900 border-neutral-800"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {exerciseCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(exercise => (
          <button
            key={exercise.id}
            onClick={() => setSelectedExercise(exercise)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-left hover:border-blue-500/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-sm">{exercise.name}</p>
                <p className="text-xs text-neutral-500">{exercise.muscleGroup}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-0.5 rounded ${
                  exercise.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-500' :
                  exercise.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  {exercise.difficulty}
                </span>
                {exercise.isCustom && (
                  <span className="text-xs text-blue-500 ml-1">Custom</span>
                )}
              </div>
            </div>
            <div className="flex gap-3 mt-2 text-xs text-neutral-500">
              <span>{exercise.sets} sets</span>
              <span>{exercise.reps} reps</span>
              <span>{exercise.restSeconds}s rest</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ HISTORY VIEW ============
function HistoryView({
  dailyLogs,
  workoutLogs,
}: {
  dailyLogs: Record<string, DailyLog>;
  workoutLogs: WorkoutLog[];
}) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const sortedDates = useMemo(() => {
    return Object.keys(dailyLogs).sort().reverse();
  }, [dailyLogs]);

  const selectedLog = selectedDate ? dailyLogs[selectedDate] : null;

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold">History</h2>

      {!selectedLog ? (
        <div className="space-y-2">
          {sortedDates.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No history yet</p>
            </div>
          ) : (
            sortedDates.map(date => {
              const log = dailyLogs[date];
              const hasWorkout = workoutLogs.some(w => w.date === date);
              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-left hover:border-blue-500/50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm">
                        {new Date(date).toLocaleDateString('en-IN', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                      <div className="flex gap-3 mt-1 text-xs text-neutral-500">
                        <span>{log.totalCalories} kcal</span>
                        <span>{log.meals.length} meals</span>
                        {hasWorkout && <span className="text-orange-500">Workout</span>}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-600" />
                  </div>
                </button>
              );
            })
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedDate(null)}
            className="flex items-center gap-2 text-sm text-neutral-400 mb-4 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 mb-4">
            <h3 className="font-bold mb-3">
              {new Date(selectedLog.date).toLocaleDateString('en-IN', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center">
                <p className="text-lg font-bold">{selectedLog.totalCalories}</p>
                <p className="text-[10px] text-neutral-500">kcal</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{selectedLog.totalProtein}g</p>
                <p className="text-[10px] text-neutral-500">protein</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{selectedLog.totalCarbs}g</p>
                <p className="text-[10px] text-neutral-500">carbs</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{selectedLog.totalFat}g</p>
                <p className="text-[10px] text-neutral-500">fat</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Meals</h4>
            {selectedLog.meals.length === 0 ? (
              <p className="text-sm text-neutral-500">No meals logged</p>
            ) : (
              selectedLog.meals.map(meal => (
                <div key={meal.id} className="bg-neutral-900/50 rounded-lg p-3">
                  <p className="font-medium text-sm">{meal.foodName}</p>
                  <p className="text-xs text-neutral-500">
                    {meal.mealType} | {meal.calories} kcal | P:{meal.protein}g C:{meal.carbs}g F:{meal.fat}g
                  </p>
                </div>
              ))
            )}
          </div>

          {workoutLogs.filter(w => w.date === selectedLog.date).map((workout, i) => (
            <div key={i} className="mt-4 bg-orange-600/10 border border-orange-600/20 rounded-xl p-4">
              <h4 className="font-semibold text-sm text-orange-500">Workout: {workout.dayFocus}</h4>
              <p className="text-xs text-neutral-500 mt-1">Duration: {workout.duration} min</p>
              <div className="mt-2 space-y-1">
                {workout.exercises.map((ex, j) => (
                  <p key={j} className="text-xs text-neutral-400">
                    {ex.exerciseName}: {ex.setsCompleted} sets x {ex.repsCompleted} @ {ex.weightUsed}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============ PROFILE VIEW ============
function ProfileView({
  profile,
  onUpdateProfile,
  macroTargets,
}: {
  profile: UserProfile;
  onUpdateProfile: (p: UserProfile) => void;
  macroTargets: { calories: number; protein: number; carbs: number; fat: number };
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  const bmi = profile.weight / Math.pow(profile.height / 100, 2);

  const saveProfile = () => {
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold">Profile</h2>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{profile.name || 'Your Profile'}</h3>
              <p className="text-sm text-neutral-500">
                {profile.age} years | {profile.gender === 'male' ? 'Male' : 'Female'}
              </p>
            </div>
          </div>

          {!isEditing ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-neutral-800 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">{profile.height}</p>
                  <p className="text-xs text-neutral-500">Height (cm)</p>
                </div>
                <div className="bg-neutral-800 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">{profile.weight}</p>
                  <p className="text-xs text-neutral-500">Weight (kg)</p>
                </div>
              </div>
              <div className="bg-neutral-800 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{bmi.toFixed(1)}</p>
                <p className="text-xs text-neutral-500">BMI</p>
                <p className="text-xs mt-1">
                  {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'}
                </p>
              </div>
              <button
                onClick={() => { setEditForm(profile); setIsEditing(true); }}
                className="w-full py-3 bg-neutral-800 rounded-lg text-sm font-semibold hover:bg-neutral-700 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-neutral-400">Name</label>
                <Input
                  value={editForm.name}
                  onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-neutral-800 border-neutral-700 mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400">Age</label>
                  <Input
                    type="number"
                    value={editForm.age}
                    onChange={e => setEditForm(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                    className="bg-neutral-800 border-neutral-700 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400">Gender</label>
                  <select
                    value={editForm.gender}
                    onChange={e => setEditForm(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                    className="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-neutral-400">Height (cm)</label>
                  <Input
                    type="number"
                    value={editForm.height}
                    onChange={e => setEditForm(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                    className="bg-neutral-800 border-neutral-700 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-400">Weight (kg)</label>
                  <Input
                    type="number"
                    value={editForm.weight}
                    onChange={e => setEditForm(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                    className="bg-neutral-800 border-neutral-700 mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-neutral-400">Goal</label>
                <div className="flex gap-2 mt-1">
                  {(['bulking', 'cutting', 'maintenance'] as const).map(g => (
                    <button
                      key={g}
                      onClick={() => setEditForm(prev => ({ ...prev, goal: g }))}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                        editForm.goal === g
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-neutral-400">Activity Level</label>
                <select
                  value={editForm.activityLevel}
                  onChange={e => setEditForm(prev => ({ ...prev, activityLevel: e.target.value as UserProfile['activityLevel'] }))}
                  className="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="sedentary">Sedentary (little/no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="very_active">Very Active (2x/day)</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 bg-neutral-800 rounded-lg text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProfile}
                  className="flex-1 py-3 bg-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-500"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Daily Targets</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-neutral-800 rounded-lg p-3">
              <p className="text-xs text-neutral-500">Calories</p>
              <p className="text-xl font-bold">{macroTargets.calories}</p>
            </div>
            <div className="bg-neutral-800 rounded-lg p-3">
              <p className="text-xs text-neutral-500">Protein</p>
              <p className="text-xl font-bold">{macroTargets.protein}g</p>
            </div>
            <div className="bg-neutral-800 rounded-lg p-3">
              <p className="text-xs text-neutral-500">Carbs</p>
              <p className="text-xl font-bold">{macroTargets.carbs}g</p>
            </div>
            <div className="bg-neutral-800 rounded-lg p-3">
              <p className="text-xs text-neutral-500">Fat</p>
              <p className="text-xl font-bold">{macroTargets.fat}g</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Your Goal</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="bg-neutral-800 rounded-lg p-3">
            <p className="font-semibold capitalize">{profile.goal}</p>
            <p className="text-sm text-neutral-400 mt-1">
              {profile.goal === 'bulking' && 'Focus on calorie surplus +500kcal. Prioritize protein and compound lifts for muscle growth.'}
              {profile.goal === 'cutting' && 'Focus on calorie deficit -500kcal. Maintain protein while reducing carbs and increasing cardio.'}
              {profile.goal === 'maintenance' && 'Keep calories at TDEE level. Balanced macros with regular training for body composition.'}
            </p>
          </div>
        </CardContent>
      </Card>

      <button
        onClick={() => {
          if (confirm('Clear all data? This cannot be undone.')) {
            localStorage.clear();
            window.location.reload();
          }
        }}
        className="w-full py-3 bg-red-600/20 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-600/30 transition-colors"
      >
        Clear All Data
      </button>
    </div>
  );
}
