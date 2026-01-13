export const NOTIFICATION_TYPE_TO_BUCKET: Record<number, string> = {
  1: "users", // New Friend request
  2: "users", // New Follower
  3: "users", // New Mail
  4: "items", // friends new item
  5: "looks", // friends new Look
  6: "items", // Someone shared an item with you (theirs)
  7: "items", // Someone wants to share an item (yours)
  8: "looks", // Someone made you a Look
  9: "items", // Someone has an Item for sale
  10: "items", // Someone has an Item to give away
  11: "items", // Someone used your Item in a Look
  12: "items", // Item liked
  13: "looks", // Look liked
  14: "users", // Friend new avatar
  15: "items", // Item disliked
  16: "looks", // Look disliked
  17: "users", // Friend requested accepted
};

export const getNotificationBucket = (type: number): string => {
  return NOTIFICATION_TYPE_TO_BUCKET[type] || "users";
};
