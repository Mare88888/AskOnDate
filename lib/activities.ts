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

export type ActivityOption = {
  id: string;
  label: string;
  emoji: string;
};

export const ACTIVITY_DETAILS: Record<ActivityId, ActivityOption[]> = {
  sporty: [
    { id: "swimming", label: "Swimming", emoji: "🏊" },
    { id: "cycling", label: "Cycling", emoji: "🚴" },
    { id: "running", label: "Running", emoji: "🏃" },
    { id: "mini-golf", label: "Mini Golf", emoji: "⛳" },
    { id: "tennis", label: "Tennis", emoji: "🎾" },
    { id: "hiking", label: "Hiking", emoji: "🥾" },
  ],
  "casual-drinks": [
    { id: "cocktail-bar", label: "Cocktail Bar", emoji: "🍸" },
    { id: "wine-bar", label: "Wine Bar", emoji: "🍷" },
    { id: "coffee-date", label: "Coffee Date", emoji: "☕" },
    { id: "craft-beer", label: "Craft Beer", emoji: "🍺" },
  ],
  restaurant: [
    { id: "italian", label: "Italian", emoji: "🍝" },
    { id: "steakhouse", label: "Steakhouse", emoji: "🥩" },
    { id: "sushi", label: "Sushi", emoji: "🍣" },
    { id: "burger-place", label: "Burger Place", emoji: "🍔" },
    { id: "fine-dining", label: "Fine Dining", emoji: "🕯️" },
  ],
  picnic: [
    { id: "lake", label: "Lake", emoji: "🏞️" },
    { id: "park", label: "Park", emoji: "🌳" },
    { id: "sunset-viewpoint", label: "Sunset Viewpoint", emoji: "🌅" },
    { id: "riverside", label: "Riverside", emoji: "🌊" },
  ],
  "road-trip": [
    { id: "beach", label: "Beach", emoji: "🏖️" },
    { id: "mountains", label: "Mountains", emoji: "⛰️" },
    { id: "nearby-city", label: "Nearby City", emoji: "🏙️" },
    { id: "hidden-gem", label: "Hidden Gem", emoji: "💎" },
  ],
  "food-adventure": [
    { id: "street-food", label: "Street Food", emoji: "🌮" },
    { id: "dessert-tour", label: "Dessert Tour", emoji: "🍰" },
    { id: "brunch", label: "Brunch", emoji: "🥞" },
    { id: "food-festival", label: "Food Festival", emoji: "🎪" },
  ],
  "movie-night": [
    { id: "cinema", label: "Cinema", emoji: "🎥" },
    { id: "home-movie-night", label: "Home Movie Night", emoji: "🛋️" },
    { id: "drive-in", label: "Drive-In", emoji: "🚗" },
  ],
  "surprise-me": [
    { id: "trust-your-choice", label: "Trust Your Choice", emoji: "💝" },
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
  const option = options?.find((o) => o.id === optionId);
  if (!option) return optionId;
  if (option.id === "trust-your-choice") {
    return `${option.label} ❤️`;
  }
  return option.label;
}

export function isValidActivityId(id: string): id is ActivityId {
  return ACTIVITIES.some((a) => a.id === id);
}
