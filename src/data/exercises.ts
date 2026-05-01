export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroup: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sets: number;
  reps: string;
  restSeconds: number;
  instructions: string[];
  isCustom?: boolean;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  goal: 'bulking' | 'cutting' | 'maintenance';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  schedule: WorkoutDay[];
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: string[]; // exercise IDs
}

// Exercise Database
export const exerciseDatabase: Exercise[] = [
  // Chest
  { id: "e1", name: "Bench Press", category: "Chest", muscleGroup: "Chest", difficulty: "Intermediate", sets: 4, reps: "8-12", restSeconds: 90, instructions: ["Lie flat on bench", "Grip bar slightly wider than shoulders", "Lower bar to chest", "Press up explosively"] },
  { id: "e2", name: "Incline Dumbbell Press", category: "Chest", muscleGroup: "Upper Chest", difficulty: "Intermediate", sets: 3, reps: "10-12", restSeconds: 60, instructions: ["Set bench to 30-45 degrees", "Hold dumbbells at shoulder level", "Press up and slightly inward", "Lower with control"] },
  { id: "e3", name: "Push-ups", category: "Chest", muscleGroup: "Chest", difficulty: "Beginner", sets: 3, reps: "15-20", restSeconds: 45, instructions: ["Start in plank position", "Lower body until chest nearly touches floor", "Push back up", "Keep core tight throughout"] },
  { id: "e4", name: "Cable Flyes", category: "Chest", muscleGroup: "Chest", difficulty: "Intermediate", sets: 3, reps: "12-15", restSeconds: 45, instructions: ["Set cables to chest height", "Step forward slightly", "Bring arms together in hugging motion", "Squeeze chest at peak"] },
  { id: "e5", name: "Dips", category: "Chest", muscleGroup: "Lower Chest", difficulty: "Intermediate", sets: 3, reps: "10-15", restSeconds: 60, instructions: ["Grip parallel bars", "Lean slightly forward", "Lower until shoulders are below elbows", "Push up explosively"] },

  // Back
  { id: "e6", name: "Deadlift", category: "Back", muscleGroup: "Back/Legs", difficulty: "Advanced", sets: 3, reps: "5-8", restSeconds: 120, instructions: ["Stand with feet hip-width apart", "Grip bar just outside legs", "Keep back straight", "Lift by extending hips and knees", "Stand tall at top"] },
  { id: "e7", name: "Pull-ups", category: "Back", muscleGroup: "Lats", difficulty: "Intermediate", sets: 4, reps: "8-12", restSeconds: 90, instructions: ["Hang from bar with palms facing away", "Pull body up until chin clears bar", "Lower with control", "Keep core engaged"] },
  { id: "e8", name: "Bent Over Rows", category: "Back", muscleGroup: "Middle Back", difficulty: "Intermediate", sets: 4, reps: "8-12", restSeconds: 60, instructions: ["Bend at hips, back straight", "Grip bar with palms down", "Pull bar to lower chest", "Squeeze shoulder blades"] },
  { id: "e9", name: "Lat Pulldown", category: "Back", muscleGroup: "Lats", difficulty: "Beginner", sets: 4, reps: "10-12", restSeconds: 60, instructions: ["Sit with thighs secured", "Grip bar wider than shoulders", "Pull bar to upper chest", "Slow controlled return"] },
  { id: "e10", name: "T-Bar Rows", category: "Back", muscleGroup: "Middle Back", difficulty: "Intermediate", sets: 3, reps: "10-12", restSeconds: 60, instructions: ["Straddle T-bar", "Bend at hips", "Pull weight to chest", "Squeeze back muscles"] },
  { id: "e11", name: "Seated Cable Rows", category: "Back", muscleGroup: "Middle Back", difficulty: "Beginner", sets: 4, reps: "12-15", restSeconds: 45, instructions: ["Sit upright with slight knee bend", "Pull handle to lower abs", "Squeeze shoulder blades", "Extend arms fully"] },
  { id: "e12", name: "Hyperextensions", category: "Back", muscleGroup: "Lower Back", difficulty: "Beginner", sets: 3, reps: "15-20", restSeconds: 45, instructions: ["Position on hyperextension bench", "Lower torso until nearly vertical", "Lift using lower back and glutes", "Don't overextend"] },

  // Shoulders
  { id: "e13", name: "Overhead Press", category: "Shoulders", muscleGroup: "Front Deltoids", difficulty: "Intermediate", sets: 4, reps: "8-10", restSeconds: 90, instructions: ["Stand with bar at upper chest", "Press bar overhead", "Don't arch back excessively", "Lower with control"] },
  { id: "e14", name: "Lateral Raises", category: "Shoulders", muscleGroup: "Side Deltoids", difficulty: "Beginner", sets: 4, reps: "12-15", restSeconds: 45, instructions: ["Hold dumbbells at sides", "Raise arms to shoulder height", "Slight bend in elbows", "Lower slowly"] },
  { id: "e15", name: "Front Raises", category: "Shoulders", muscleGroup: "Front Deltoids", difficulty: "Beginner", sets: 3, reps: "12-15", restSeconds: 45, instructions: ["Hold dumbbells in front", "Raise to shoulder height", "Alternate or together", "Control the movement"] },
  { id: "e16", name: "Face Pulls", category: "Shoulders", muscleGroup: "Rear Deltoids", difficulty: "Beginner", sets: 4, reps: "15-20", restSeconds: 30, instructions: ["Set cable at face height", "Pull rope to face level", "Flare elbows out", "Squeeze rear delts"] },
  { id: "e17", name: "Arnold Press", category: "Shoulders", muscleGroup: "All Deltoids", difficulty: "Intermediate", sets: 3, reps: "10-12", restSeconds: 60, instructions: ["Start with palms facing you", "Rotate as you press", "End with palms facing away", "Reverse on way down"] },
  { id: "e18", name: "Upright Rows", category: "Shoulders", muscleGroup: "Traps/Side Delts", difficulty: "Intermediate", sets: 3, reps: "10-12", restSeconds: 60, instructions: ["Hold barbell in front", "Pull straight up to chin", "Elbows higher than hands", "Lower slowly"] },

  // Arms - Biceps
  { id: "e19", name: "Barbell Curls", category: "Biceps", muscleGroup: "Biceps", difficulty: "Beginner", sets: 4, reps: "10-12", restSeconds: 60, instructions: ["Grip bar shoulder-width", "Keep elbows at sides", "Curl up and squeeze", "Lower with control"] },
  { id: "e20", name: "Hammer Curls", category: "Biceps", muscleGroup: "Brachialis", difficulty: "Beginner", sets: 3, reps: "12-15", restSeconds: 45, instructions: ["Hold dumbbells with neutral grip", "Keep elbows at sides", "Curl up", "Lower slowly"] },
  { id: "e21", name: "Incline Curls", category: "Biceps", muscleGroup: "Outer Biceps", difficulty: "Intermediate", sets: 3, reps: "10-12", restSeconds: 60, instructions: ["Set bench to 45 degrees", "Let arms hang straight", "Curl up fully", "Feel stretch at bottom"] },
  { id: "e22", name: "Concentration Curls", category: "Biceps", muscleGroup: "Biceps Peak", difficulty: "Beginner", sets: 3, reps: "12-15", restSeconds: 45, instructions: ["Sit on bench", "Rest elbow on inner thigh", "Curl dumbbell up", "Squeeze at top"] },
  { id: "e23", name: "Preacher Curls", category: "Biceps", muscleGroup: "Lower Biceps", difficulty: "Intermediate", sets: 3, reps: "10-12", restSeconds: 60, instructions: ["Position arms on preacher bench", "Curl bar up", "Don't swing", "Full range of motion"] },

  // Arms - Triceps
  { id: "e24", name: "Tricep Pushdowns", category: "Triceps", muscleGroup: "Triceps", difficulty: "Beginner", sets: 4, reps: "12-15", restSeconds: 45, instructions: ["Stand at cable station", "Keep elbows at sides", "Push bar down", "Squeeze triceps at bottom"] },
  { id: "e25", name: "Overhead Extensions", category: "Triceps", muscleGroup: "Long Head", difficulty: "Beginner", sets: 3, reps: "12-15", restSeconds: 45, instructions: ["Hold dumbbell overhead", "Lower behind head", "Keep elbows steady", "Extend fully"] },
  { id: "e26", name: "Skull Crushers", category: "Triceps", muscleGroup: "Triceps", difficulty: "Intermediate", sets: 3, reps: "10-12", restSeconds: 60, instructions: ["Lie on bench", "Lower bar to forehead", "Keep upper arms still", "Extend arms fully"] },
  { id: "e27", name: "Diamond Push-ups", category: "Triceps", muscleGroup: "Triceps", difficulty: "Intermediate", sets: 3, reps: "10-15", restSeconds: 45, instructions: ["Form diamond with hands", "Lower chest to hands", "Push up", "Keep elbows close to body"] },
  { id: "e28", name: "Close Grip Bench", category: "Triceps", muscleGroup: "Triceps", difficulty: "Intermediate", sets: 3, reps: "8-10", restSeconds: 90, instructions: ["Grip bar shoulder-width", "Lower to chest", "Keep elbows close", "Press up forcefully"] },

  // Legs
  { id: "e29", name: "Squats", category: "Legs", muscleGroup: "Quads", difficulty: "Intermediate", sets: 4, reps: "8-12", restSeconds: 120, instructions: ["Stand with feet shoulder-width", "Bar on upper traps", "Squat down to parallel", "Drive through heels to stand"] },
  { id: "e30", name: "Leg Press", category: "Legs", muscleGroup: "Quads", difficulty: "Beginner", sets: 4, reps: "12-15", restSeconds: 90, instructions: ["Sit in leg press machine", "Feet shoulder-width on platform", "Lower until knees at 90 degrees", "Press up without locking knees"] },
  { id: "e31", name: "Lunges", category: "Legs", muscleGroup: "Quads/Glutes", difficulty: "Beginner", sets: 3, reps: "12 each", restSeconds: 60, instructions: ["Step forward", "Lower until both knees at 90 degrees", "Push back to starting position", "Alternate legs"] },
  { id: "e32", name: "Leg Extensions", category: "Legs", muscleGroup: "Quads", difficulty: "Beginner", sets: 4, reps: "15-20", restSeconds: 45, instructions: ["Sit in extension machine", "Hook feet under pad", "Extend legs fully", "Squeeze quads at top"] },
  { id: "e33", name: "Romanian Deadlift", category: "Legs", muscleGroup: "Hamstrings", difficulty: "Intermediate", sets: 4, reps: "10-12", restSeconds: 90, instructions: ["Hold bar in front", "Push hips back", "Lower bar along legs", "Feel hamstring stretch", "Drive hips forward"] },
  { id: "e34", name: "Leg Curls", category: "Legs", muscleGroup: "Hamstrings", difficulty: "Beginner", sets: 4, reps: "12-15", restSeconds: 45, instructions: ["Lie on curl machine", "Hook heels under pad", "Curl heels to glutes", "Squeeze hamstrings"] },
  { id: "e35", name: "Calf Raises", category: "Legs", muscleGroup: "Calves", difficulty: "Beginner", sets: 5, reps: "15-20", restSeconds: 30, instructions: ["Stand on edge of platform", "Lower heels below level", "Rise up on toes", "Hold at top"] },
  { id: "e36", name: "Hack Squats", category: "Legs", muscleGroup: "Quads", difficulty: "Intermediate", sets: 4, reps: "10-12", restSeconds: 90, instructions: ["Position on hack squat machine", "Lower by bending knees", "Keep back against pad", "Drive through heels"] },
  { id: "e37", name: "Front Squats", category: "Legs", muscleGroup: "Quads", difficulty: "Advanced", sets: 4, reps: "6-8", restSeconds: 120, instructions: ["Bar across front delts", "Elbows up", "Squat to parallel", "Drive up with quads"] },
  { id: "e38", name: "Bulgarian Split Squats", category: "Legs", muscleGroup: "Quads", difficulty: "Intermediate", sets: 3, reps: "10 each", restSeconds: 60, instructions: ["Rear foot elevated on bench", "Hold dumbbells at sides", "Lower until knee nearly touches", "Drive up"] },

  // Core
  { id: "e39", name: "Plank", category: "Core", muscleGroup: "Abs/Core", difficulty: "Beginner", sets: 3, reps: "30-60 sec", restSeconds: 30, instructions: ["Support on forearms and toes", "Keep body straight", "Don't let hips sag", "Hold position"] },
  { id: "e40", name: "Crunches", category: "Core", muscleGroup: "Upper Abs", difficulty: "Beginner", sets: 4, reps: "20-25", restSeconds: 30, instructions: ["Lie on back, knees bent", "Hands behind head", "Curl shoulders off floor", "Don't pull on neck"] },
  { id: "e41", name: "Leg Raises", category: "Core", muscleGroup: "Lower Abs", difficulty: "Beginner", sets: 3, reps: "15-20", restSeconds: 30, instructions: ["Lie on back", "Keep legs straight", "Lift to vertical", "Lower with control"] },
  { id: "e42", name: "Russian Twists", category: "Core", muscleGroup: "Obliques", difficulty: "Beginner", sets: 3, reps: "20 each", restSeconds: 30, instructions: ["Sit with knees bent", "Lean back slightly", "Rotate torso side to side", "Touch weight to floor"] },
  { id: "e43", name: "Mountain Climbers", category: "Core", muscleGroup: "Full Core", difficulty: "Intermediate", sets: 3, reps: "30-40 sec", restSeconds: 30, instructions: ["Start in plank position", "Drive knees to chest", "Alternate quickly", "Keep hips level"] },
  { id: "e44", name: "Hanging Leg Raises", category: "Core", muscleGroup: "Lower Abs", difficulty: "Advanced", sets: 3, reps: "12-15", restSeconds: 60, instructions: ["Hang from bar", "Keep legs straight", "Raise to parallel or above", "Lower with control"] },
  { id: "e45", name: "Cable Crunches", category: "Core", muscleGroup: "Upper Abs", difficulty: "Intermediate", sets: 3, reps: "15-20", restSeconds: 30, instructions: ["Kneel at cable station", "Hold rope behind head", "Crunch down", "Squeeze abs at bottom"] },
  { id: "e46", name: "Dead Bug", category: "Core", muscleGroup: "Full Core", difficulty: "Beginner", sets: 3, reps: "12 each", restSeconds: 30, instructions: ["Lie on back, arms up", "Opposite arm and leg extend", "Lower back against floor", "Alternate sides"] },
  { id: "e47", name: "Flutter Kicks", category: "Core", muscleGroup: "Lower Abs", difficulty: "Beginner", sets: 3, reps: "30 sec", restSeconds: 20, instructions: ["Lie on back", "Legs straight up slightly", "Kick up and down", "Keep core tight"] },
  { id: "e48", name: "Bicycle Crunches", category: "Core", muscleGroup: "Obliques", difficulty: "Beginner", sets: 3, reps: "20 each", restSeconds: 30, instructions: ["Lie on back, hands behind head", "Opposite elbow to knee", "Rotate torso", "Extend other leg"] },

  // Cardio
  { id: "e49", name: "Running", category: "Cardio", muscleGroup: "Full Body", difficulty: "Beginner", sets: 1, reps: "20-30 min", restSeconds: 0, instructions: ["Maintain steady pace", "Land mid-foot", "Keep arms relaxed", "Breathe rhythmically"] },
  { id: "e50", name: "HIIT Sprints", category: "Cardio", muscleGroup: "Legs", difficulty: "Intermediate", sets: 8, reps: "30 sec on/30 sec off", restSeconds: 30, instructions: ["Sprint at max effort", "Walk or jog to recover", "Repeat 8-10 times", "Warm up first"] },
  { id: "e51", name: "Jump Rope", category: "Cardio", muscleGroup: "Full Body", difficulty: "Beginner", sets: 5, reps: "2 min", restSeconds: 30, instructions: ["Hold handles at hip height", "Rotate with wrists", "Jump on balls of feet", "Land softly"] },
  { id: "e52", name: "Burpees", category: "Cardio", muscleGroup: "Full Body", difficulty: "Intermediate", sets: 4, reps: "12-15", restSeconds: 60, instructions: ["Drop to push-up position", "Do push-up", "Jump feet to hands", "Jump up with arms overhead"] },
  { id: "e53", name: "Jumping Jacks", category: "Cardio", muscleGroup: "Full Body", difficulty: "Beginner", sets: 4, reps: "1 min", restSeconds: 15, instructions: ["Jump feet apart", "Raise arms overhead", "Jump back to start", "Keep rhythm"] },
  { id: "e54", name: "Stair Climbing", category: "Cardio", muscleGroup: "Legs/Glutes", difficulty: "Beginner", sets: 5, reps: "2 min", restSeconds: 30, instructions: ["Step on each stair", "Push through heel", "Swing arms", "Maintain steady pace"] },
  { id: "e55", name: "Rowing Machine", category: "Cardio", muscleGroup: "Full Body", difficulty: "Beginner", sets: 1, reps: "15-20 min", restSeconds: 0, instructions: ["Drive with legs first", "Pull handle to lower chest", "Extend arms first on return", "Keep back straight"] },
  { id: "e56", name: "Battle Ropes", category: "Cardio", muscleGroup: "Arms/Core", difficulty: "Intermediate", sets: 4, reps: "30 sec", restSeconds: 30, instructions: ["Hold ropes with both hands", "Alternate waves", "Keep knees bent", "Generate power from core"] },

  // Yoga/Stretching
  { id: "e57", name: "Sun Salutation", category: "Yoga", muscleGroup: "Full Body", difficulty: "Beginner", sets: 5, reps: "1 round", restSeconds: 0, instructions: ["Start standing", "Reach up, fold forward", "Step back to plank", "Flow through sequence"] },
  { id: "e58", name: "Downward Dog", category: "Yoga", muscleGroup: "Full Body", difficulty: "Beginner", sets: 3, reps: "30 sec", restSeconds: 10, instructions: ["Form inverted V", "Hands and feet on floor", "Press heels toward floor", "Lengthen spine"] },
  { id: "e59", name: "Warrior Pose", category: "Yoga", muscleGroup: "Legs/Core", difficulty: "Beginner", sets: 2, reps: "45 sec each", restSeconds: 15, instructions: ["Wide stance", "Bend front knee 90 degrees", "Arms extended parallel", "Hold position"] },
  { id: "e60", name: "Cat-Cow Stretch", category: "Yoga", muscleGroup: "Spine", difficulty: "Beginner", sets: 2, reps: "10 reps", restSeconds: 0, instructions: ["On hands and knees", "Arch back on inhale (cow)", "Round on exhale (cat)", "Move with breath"] },
  { id: "e61", name: "Child's Pose", category: "Yoga", muscleGroup: "Back/Shoulders", difficulty: "Beginner", sets: 1, reps: "60 sec", restSeconds: 0, instructions: ["Kneel and sit back", "Extend arms forward", "Rest forehead on floor", "Breathe deeply"] },
  { id: "e62", name: "Pigeon Pose", category: "Yoga", muscleGroup: "Hips/Glutes", difficulty: "Intermediate", sets: 2, reps: "45 sec each", restSeconds: 15, instructions: ["Front leg bent under chest", "Back leg extended", "Square hips", "Fold forward"] },
];

// Workout Plans
export const workoutPlans: WorkoutPlan[] = [
  {
    id: "p1",
    name: "Beginner Bulking",
    description: "Build muscle mass with fundamental compound exercises. Focus on progressive overload and proper form.",
    goal: "bulking",
    difficulty: "Beginner",
    schedule: [
      { day: "Monday", focus: "Chest & Triceps", exercises: ["e3", "e1", "e4", "e24", "e25"] },
      { day: "Tuesday", focus: "Back & Biceps", exercises: ["e9", "e8", "e11", "e19", "e22"] },
      { day: "Wednesday", focus: "Rest or Light Cardio", exercises: ["e49"] },
      { day: "Thursday", focus: "Legs", exercises: ["e30", "e31", "e34", "e35", "e39"] },
      { day: "Friday", focus: "Shoulders & Abs", exercises: ["e13", "e14", "e16", "e40", "e41"] },
      { day: "Saturday", focus: "Full Body or Active Recovery", exercises: ["e3", "e9", "e49", "e39"] },
      { day: "Sunday", focus: "Rest", exercises: [] },
    ],
  },
  {
    id: "p2",
    name: "Intermediate Hypertrophy",
    description: "Advanced muscle building with higher volume and intensity techniques. For experienced lifters.",
    goal: "bulking",
    difficulty: "Intermediate",
    schedule: [
      { day: "Monday", focus: "Push (Chest/Shoulders/Triceps)", exercises: ["e1", "e2", "e4", "e13", "e14", "e15", "e24", "e26", "e28"] },
      { day: "Tuesday", focus: "Pull (Back/Biceps/Rear Delts)", exercises: ["e7", "e9", "e10", "e8", "e11", "e19", "e20", "e16"] },
      { day: "Wednesday", focus: "Legs", exercises: ["e29", "e31", "e33", "e34", "e35", "e36", "e39", "e41"] },
      { day: "Thursday", focus: "Rest", exercises: [] },
      { day: "Friday", focus: "Push", exercises: ["e2", "e5", "e17", "e13", "e25", "e27", "e15"] },
      { day: "Saturday", focus: "Pull", exercises: ["e6", "e7", "e12", "e21", "e23", "e22", "e10"] },
      { day: "Sunday", focus: "Legs & Active Recovery", exercises: ["e30", "e32", "e37", "e38", "e49"] },
    ],
  },
  {
    id: "p3",
    name: "Advanced Mass Gain",
    description: "High-intensity muscle building program for maximum hypertrophy. Requires recovery focus.",
    goal: "bulking",
    difficulty: "Advanced",
    schedule: [
      { day: "Monday", focus: "Chest & Back", exercises: ["e1", "e2", "e5", "e7", "e6", "e10", "e4", "e11"] },
      { day: "Tuesday", focus: "Legs", exercises: ["e29", "e37", "e33", "e38", "e34", "e35", "e35"] },
      { day: "Wednesday", focus: "Shoulders & Arms", exercises: ["e13", "e17", "e14", "e18", "e19", "e20", "e24", "e26", "e28", "e23"] },
      { day: "Thursday", focus: "Rest", exercises: [] },
      { day: "Friday", focus: "Chest & Triceps", exercises: ["e1", "e2", "e5", "e4", "e24", "e26", "e28", "e25"] },
      { day: "Saturday", focus: "Back & Biceps", exercises: ["e6", "e7", "e8", "e10", "e19", "e21", "e22", "e23"] },
      { day: "Sunday", focus: "Legs & Core", exercises: ["e30", "e31", "e32", "e33", "e36", "e34", "e39", "e44", "e45"] },
    ],
  },
  {
    id: "p4",
    name: "Fat Loss Beginner",
    description: "Start your weight loss journey with a mix of strength training and cardio.",
    goal: "cutting",
    difficulty: "Beginner",
    schedule: [
      { day: "Monday", focus: "Full Body Strength", exercises: ["e3", "e9", "e13", "e19", "e30", "e39"] },
      { day: "Tuesday", focus: "Cardio", exercises: ["e49", "e51", "e53"] },
      { day: "Wednesday", focus: "Full Body Strength", exercises: ["e3", "e8", "e14", "e24", "e31", "e40"] },
      { day: "Thursday", focus: "Cardio & Core", exercises: ["e50", "e39", "e40", "e41", "e42"] },
      { day: "Friday", focus: "Full Body Strength", exercises: ["e3", "e9", "e16", "e20", "e30", "e41"] },
      { day: "Saturday", focus: "Active Recovery", exercises: ["e49", "e57", "e59", "e61"] },
      { day: "Sunday", focus: "Rest", exercises: [] },
    ],
  },
  {
    id: "p5",
    name: "Shredding Protocol",
    description: "High-intensity program combining weights and HIIT for maximum fat loss while preserving muscle.",
    goal: "cutting",
    difficulty: "Intermediate",
    schedule: [
      { day: "Monday", focus: "Upper Body + HIIT", exercises: ["e1", "e2", "e7", "e8", "e13", "e14", "e50", "e52"] },
      { day: "Tuesday", focus: "Lower Body + Cardio", exercises: ["e29", "e31", "e33", "e34", "e35", "e49", "e51"] },
      { day: "Wednesday", focus: "HIIT & Core", exercises: ["e50", "e52", "e53", "e39", "e43", "e44", "e45", "e48"] },
      { day: "Thursday", focus: "Upper Body", exercises: ["e4", "e5", "e9", "e11", "e17", "e15", "e19", "e20", "e24", "e25"] },
      { day: "Friday", focus: "Lower Body", exercises: ["e30", "e32", "e36", "e37", "e38", "e29", "e39", "e41", "e42"] },
      { day: "Saturday", focus: "Full Body Circuit + Cardio", exercises: ["e3", "e8", "e13", "e24", "e31", "e35", "e50", "e55"] },
      { day: "Sunday", focus: "Active Recovery", exercises: ["e57", "e58", "e59", "e60", "e61", "e62"] },
    ],
  },
  {
    id: "p6",
    name: "Maintenance & Toning",
    description: "Balanced routine to maintain muscle while staying lean. Perfect for long-term fitness.",
    goal: "maintenance",
    difficulty: "Beginner",
    schedule: [
      { day: "Monday", focus: "Push Day", exercises: ["e3", "e9", "e13", "e14", "e19", "e24", "e39"] },
      { day: "Tuesday", focus: "Pull Day", exercises: ["e8", "e11", "e16", "e20", "e25", "e34", "e40"] },
      { day: "Wednesday", focus: "Cardio & Core", exercises: ["e49", "e51", "e39", "e41", "e42"] },
      { day: "Thursday", focus: "Legs", exercises: ["e30", "e31", "e33", "e35", "e40", "e41"] },
      { day: "Friday", focus: "Upper Body", exercises: ["e3", "e2", "e8", "e14", "e19", "e24", "e39"] },
      { day: "Saturday", focus: "Full Body or Sports", exercises: ["e49", "e50", "e3", "e31", "e35"] },
      { day: "Sunday", focus: "Rest or Yoga", exercises: ["e57", "e58", "e61"] },
    ],
  },
  {
    id: "p7",
    name: "Athletic Conditioning",
    description: "Functional training for overall athletic performance, strength, and endurance.",
    goal: "maintenance",
    difficulty: "Intermediate",
    schedule: [
      { day: "Monday", focus: "Power & Explosiveness", exercises: ["e29", "e6", "e52", "e50", "e55"] },
      { day: "Tuesday", focus: "Strength Endurance", exercises: ["e1", "e7", "e13", "e19", "e24", "e30", "e39"] },
      { day: "Wednesday", focus: "Cardio & Mobility", exercises: ["e49", "e53", "e57", "e58", "e59", "e60"] },
      { day: "Thursday", focus: "Strength", exercises: ["e2", "e5", "e8", "e10", "e14", "e20", "e31", "e33", "e35"] },
      { day: "Friday", focus: "Circuit Training", exercises: ["e3", "e31", "e13", "e8", "e24", "e35", "e43", "e50"] },
      { day: "Saturday", focus: "Active Recovery", exercises: ["e49", "e61", "e62", "e57", "e55"] },
      { day: "Sunday", focus: "Rest", exercises: [] },
    ],
  },
  {
    id: "p8",
    name: "Home Workout - No Equipment",
    description: "Complete bodyweight workout plan you can do at home without any equipment.",
    goal: "maintenance",
    difficulty: "Beginner",
    schedule: [
      { day: "Monday", focus: "Upper Body", exercises: ["e3", "e3", "e3", "e27", "e27", "e42", "e48", "e39"] },
      { day: "Tuesday", focus: "Lower Body", exercises: ["e31", "e31", "e31", "e38", "e38", "e35", "e35", "e39", "e41"] },
      { day: "Wednesday", focus: "Cardio & Core", exercises: ["e52", "e52", "e53", "e53", "e43", "e43", "e39", "e40", "e41", "e42", "e48"] },
      { day: "Thursday", focus: "Upper Body", exercises: ["e3", "e3", "e27", "e27", "e27", "e42", "e42", "e48", "e48", "e39"] },
      { day: "Friday", focus: "Lower Body & Cardio", exercises: ["e31", "e31", "e38", "e38", "e35", "e35", "e52", "e52", "e53", "e53"] },
      { day: "Saturday", focus: "Full Body Circuit", exercises: ["e3", "e31", "e27", "e38", "e43", "e52", "e53", "e39", "e41"] },
      { day: "Sunday", focus: "Rest or Yoga", exercises: ["e57", "e58", "e59", "e60", "e61"] },
    ],
  },
];

export const getExerciseById = (id: string): Exercise | undefined => {
  return exerciseDatabase.find(ex => ex.id === id);
};

export const getExercisesByCategory = (category: string): Exercise[] => {
  return exerciseDatabase.filter(ex => ex.category === category);
};

export const exerciseCategories = [
  "All",
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Legs",
  "Core",
  "Cardio",
  "Yoga",
];
