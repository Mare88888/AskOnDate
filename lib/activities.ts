export const ACTIVITIES = [
  { id: "sporty", label: "Sporty", emoji: "🏃" },
  { id: "casual-drinks", label: "Casual Drinks", emoji: "🍹" },
  { id: "restaurant", label: "Restaurant", emoji: "🍽️" },
  { id: "picnic", label: "Picnic", emoji: "🧺" },
  { id: "road-trip", label: "Road Trip", emoji: "🚗" },
  { id: "food-adventure", label: "Food Adventure", emoji: "🌮" },
  { id: "movie-night", label: "Movie Night", emoji: "🎬" },
  { id: "surprise-me", label: "Surprise Me", emoji: "✨" },
] as const;

export type ActivityId = (typeof ACTIVITIES)[number]["id"];

export const ACTIVITY_DETAILS: Record<ActivityId, { id: string; label: string }[]> = {
  sporty: [
    { id: "swimming", label: "Swimming" },
    { id: "cycling", label: "Cycling" },
    { id: "running", label: "Running" },
    { id: "mini-golf", label: "Mini Golf" },
    { id: "tennis", label: "Tennis" },
    { id: "hiking", label: "Hiking" },
  ],
  "casual-drinks": [
    { id: "cocktail-bar", label: "Cocktail Bar" },
    { id: "wine-bar", label: "Wine Bar" },
    { id: "coffee-date", label: "Coffee Date" },
    { id: "craft-beer", label: "Craft Beer" },
  ],
  restaurant: [
    { id: "italian", label: "Italian" },
    { id: "steakhouse", label: "Steakhouse" },
    { id: "sushi", label: "Sushi" },
    { id: "burger-place", label: "Burger Place" },
    { id: "fine-dining", label: "Fine Dining" },
  ],
  picnic: [
    { id: "lake", label: "Lake" },
    { id: "park", label: "Park" },
    { id: "sunset-viewpoint", label: "Sunset Viewpoint" },
    { id: "riverside", label: "Riverside" },
  ],
  "road-trip": [
    { id: "beach", label: "Beach" },
    { id: "mountains", label: "Mountains" },
    { id: "nearby-city", label: "Nearby City" },
    { id: "hidden-gem", label: "Hidden Gem" },
  ],
  "food-adventure": [
    { id: "street-food", label: "Street Food" },
    { id: "dessert-tour", label: "Dessert Tour" },
    { id: "brunch", label: "Brunch" },
    { id: "food-festival", label: "Food Festival" },
  ],
  "movie-night": [
    { id: "cinema", label: "Cinema" },
    { id: "home-movie-night", label: "Home Movie Night" },
    { id: "drive-in", label: "Drive-In" },
  ],
  "surprise-me": [
    { id: "trust-your-choice", label: "Trust Your Choice ❤️" },
  ],
};

export function getActivityLabel(id: string): string {
  return ACTIVITIES.find((a) => a.id === id)?.label ?? id;
}

export function getActivityOptionLabel(
  activityId: string,
  optionId: string
): string {
  const options = ACTIVITY_DETAILS[activityId as ActivityId];
  return options?.find((o) => o.id === optionId)?.label ?? optionId;
}

export function isValidActivityId(id: string): id is ActivityId {
  return ACTIVITIES.some((a) => a.id === id);
}
