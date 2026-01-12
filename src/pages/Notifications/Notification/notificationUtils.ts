export const NOTIFICATION_TYPE_TO_BUCKET: Record<number, string> = {
  1: "users", // Friend request
  2: "users", // New Follower
  14: "users", // Friend new avatar
  3: "mails", // New Mail
  4: "items", // friends new item
  6: "items", // Item liked/disliked, or item shared
  5: "looks", // friends new Look
  13: "looks", // Look liked
  16: "looks", // Look disliked
};

export const getNotificationBucket = (type: number): string => {
  return NOTIFICATION_TYPE_TO_BUCKET[type] || "users";
};
