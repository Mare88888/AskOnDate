export const ACTIVITIES = [
  { id: "sporty", label: "Sporty", emoji: "🏃" },
  { id: "casual-drinks", label: "Casual Drinks", emoji: "🍹" },
  { id: "restaurant", label: "Restaurant", emoji: "🍽️" },
  { id: "picnic", label: "Picnic", emoji: "🧺" },
  { id: "road-trip", label: "Road Trip", emoji: "🚗" },
  { id: "relaxed", label: "Relaxed", emoji: "🧖" },
  { id: "movie-night", label: "Movie Night", emoji: "🎬" },
  { id: "activities", label: "Activities", emoji: "🎯" },
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
    { id: "hiking", label: "Hiking", emoji: "🥾" },
    { id: "surprise-sporty", label: "Surprise Me", emoji: "✨" },
  ],
  "casual-drinks": [
    { id: "cocktail-bar", label: "Cocktail Bar", emoji: "🍸" },
    { id: "wine-bar", label: "Wine", emoji: "🍷" },
    { id: "coffee-date", label: "Coffee Date", emoji: "☕" },
    { id: "craft-beer", label: "Pir Pir Pir!", emoji: "🍺" },
    { id: "surprise-casual-drinks", label: "Surprise Me", emoji: "✨" },
  ],
  restaurant: [
    { id: "chinese", label: "Chinese", emoji: "🥡" },
    { id: "steakhouse", label: "Steakhouse", emoji: "🥩" },
    { id: "sushi", label: "Sushi", emoji: "🍣" },
    { id: "kebab", label: "Kebab", emoji: "🥙" },
    { id: "burger-place", label: "Burger Place", emoji: "🍔" },
    { id: "casual-restaurant", label: "Casual Restaurant", emoji: "🕯️" },
    { id: "dessert-tour", label: "Dessert Tour", emoji: "🍰" },
    { id: "brunch", label: "Brunch", emoji: "🥞" },
    { id: "surprise-restaurant", label: "Surprise Me", emoji: "✨" },
  ],
  picnic: [
    { id: "lake", label: "Lake", emoji: "🏞️" },
    { id: "park", label: "Park", emoji: "🌳" },
    { id: "sunset-viewpoint", label: "Sunset Viewpoint", emoji: "🌅" },
    { id: "riverside", label: "Riverside", emoji: "🌊" },
    { id: "surprise-picnic", label: "Surprise Me", emoji: "✨" },
  ],
  "road-trip": [
    { id: "beach", label: "Beach", emoji: "🏖️" },
    { id: "mountains", label: "Mountains", emoji: "⛰️" },
    { id: "nearby-city", label: "Nearby City", emoji: "🏙️" },
    { id: "hidden-gem", label: "Hidden Gem", emoji: "💎" },
    { id: "zoo", label: "Zoo", emoji: "🦁" },
    { id: "surprise-road-trip", label: "Surprise Me", emoji: "✨" },
  ],
  relaxed: [
    { id: "thermal-baths", label: "Therme / Thermal Baths", emoji: "♨️" },
    { id: "walk-drink", label: "Walk & a Drink", emoji: "☕" },
    { id: "sunset-chill", label: "Sunset Chill", emoji: "🌅" },
    { id: "massage", label: "Massage & Relax", emoji: "🧘" },
    { id: "surprise-relaxed", label: "Surprise Me", emoji: "✨" },
  ],
  "movie-night": [
    { id: "cinema", label: "Cinema", emoji: "🎥" },
    { id: "home-movie-night", label: "Home Movie Night", emoji: "🛋️" },
    { id: "surprise-movie-night", label: "Surprise Me", emoji: "✨" },
  ],
  activities: [
    { id: "bowling", label: "Bowling", emoji: "🎳" },
    { id: "arcade", label: "Arcade", emoji: "🕹️" },
    { id: "concert", label: "Concert", emoji: "🎤" },
    { id: "darts", label: "Darts", emoji: "🎯" },
    { id: "pool", label: "Pool", emoji: "🎱" },
    { id: "surprise-activities", label: "Surprise Me", emoji: "✨" },
  ],
  "surprise-me": [
    { id: "trust-your-choice", label: "Trust Your Choice", emoji: "💝" },
  ],
};

/** Old activity IDs kept for labels on existing invite responses */
const LEGACY_ACTIVITY_ALIASES: Record<string, ActivityId> = {
  "food-adventure": "relaxed",
  bowling: "activities",
  arcade: "activities",
  concert: "activities",
  zoo: "road-trip",
};

const LEGACY_ACTIVITY_LABELS: Record<string, string> = {
  "food-adventure": "Relaxed",
  bowling: "Activities",
  arcade: "Activities",
  concert: "Activities",
  zoo: "Road Trip",
};

const LEGACY_ACTIVITY_OPTIONS: Record<string, ActivityOption[]> = {
  bowling: [
    { id: "classic-bowling", label: "Classic Bowling", emoji: "🎳" },
    { id: "glow-bowling", label: "Glow Bowling", emoji: "✨" },
    { id: "bowling-food", label: "Bowling & Bites", emoji: "🍕" },
    { id: "surprise-bowling", label: "Surprise Me", emoji: "✨" },
  ],
  arcade: [
    { id: "retro-arcade", label: "Retro Arcade", emoji: "🕹️" },
    { id: "vr-games", label: "VR Games", emoji: "🥽" },
    { id: "game-bar", label: "Game Bar", emoji: "🎮" },
    { id: "surprise-arcade", label: "Surprise Me", emoji: "✨" },
  ],
  concert: [
    { id: "live-band", label: "Live Band", emoji: "🎸" },
    { id: "classical", label: "Classical / Opera", emoji: "🎻" },
    { id: "festival", label: "Festival", emoji: "🎪" },
    { id: "small-venue", label: "Small Venue Gig", emoji: "🎤" },
    { id: "surprise-concert", label: "Surprise Me", emoji: "✨" },
  ],
  zoo: [
    { id: "local-zoo", label: "Local Zoo", emoji: "🦁" },
    { id: "aquarium", label: "Aquarium", emoji: "🐠" },
    { id: "safari-park", label: "Safari Park", emoji: "🦒" },
    { id: "surprise-zoo", label: "Surprise Me", emoji: "✨" },
  ],
};

export function getActivityLabel(id: string): string {
  if (LEGACY_ACTIVITY_LABELS[id]) return LEGACY_ACTIVITY_LABELS[id];
  return ACTIVITIES.find((a) => a.id === id)?.label ?? id;
}

export function getActivityOptionLabel(
  activityId: string,
  optionId: string,
): string {
  const resolvedActivityId = resolveActivityId(activityId);
  const options = resolvedActivityId
    ? ACTIVITY_DETAILS[resolvedActivityId]
    : undefined;
  const option = options?.find((o) => o.id === optionId);

  if (option) {
    if (option.id === "trust-your-choice") {
      return `${option.label} ❤️`;
    }
    return option.label;
  }

  const legacyOptions = LEGACY_ACTIVITY_OPTIONS[activityId];
  const legacyOption = legacyOptions?.find((o) => o.id === optionId);
  if (legacyOption) return legacyOption.label;

  return optionId;
}

export function isValidActivityId(id: string): id is ActivityId {
  return (
    ACTIVITIES.some((a) => a.id === id) || id in LEGACY_ACTIVITY_ALIASES
  );
}

export function resolveActivityId(id: string): ActivityId | null {
  if (id in LEGACY_ACTIVITY_ALIASES) {
    return LEGACY_ACTIVITY_ALIASES[id];
  }
  return isValidActivityId(id) ? id : null;
}

export function getActivityOptions(activityId: string): ActivityOption[] {
  const resolved = resolveActivityId(activityId);
  return resolved ? ACTIVITY_DETAILS[resolved] : [];
}
