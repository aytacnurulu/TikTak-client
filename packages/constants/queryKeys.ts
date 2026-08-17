/**
 * Centralized React Query Key Factory
 * Ensures consistency and maintainability of all query keys across the application
 */

export const queryKeys = {
  // Auth related queries
  auth: {
    all: ["auth"] as const,
    login: ["auth", "login"] as const,
    logout: ["auth", "logout"] as const,
  },

  // Profile related queries
  profile: {
    all: ["profile"] as const,
    detail: ["profile", "detail"] as const,
  },

  // Orders related queries
  orders: {
    all: ["orders"] as const,
    list: ["orders", "list"] as const,
    detail: (id: number) => ["orders", "detail", id] as const,
  },

  // Basket/Cart related queries
  basket: {
    all: ["basket"] as const,
    list: ["basket", "list"] as const,
  },

  // Favorites related queries
  favorites: {
    all: ["favorites"] as const,
    list: ["favorites", "list"] as const,
  },

  // Landing/Campaign related queries
  landing: {
    all: ["landing"] as const,
    campaigns: ["landing", "campaigns"] as const,
    categories: ["landing", "categories"] as const,
  },

  // Products related queries
  products: {
    all: ["products"] as const,
    list: ["products", "list"] as const,
    detail: (id: number) => ["products", "detail", id] as const,
    search: (query: string) => ["products", "search", query] as const,
  },

  // Checkout related queries
  checkout: {
    all: ["checkout"] as const,
    profile: ["checkout", "profile"] as const,
  },
} as const;

/**
 * Legacy query keys (for backward compatibility during migration)
 * These are deprecated - use queryKeys object instead
 */
export const BASKET_QUERY_KEY = queryKeys.basket.all;
export const FAVORITES_QUERY_KEY = queryKeys.favorites.all;
