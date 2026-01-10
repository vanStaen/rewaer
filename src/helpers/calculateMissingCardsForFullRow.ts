/**
 * Calculates the number of missing cards needed to fill the last row
 * @param {number} containerWidth - The width of the container in pixels
 * @param {number} totalItems - The total number of items to display
 * @param {number} cardWidth - The width of each card (default: 238px)
 * @param {number} horizontalGap - The gap between cards (default: 20px)
 * @param {number} containerPadding - The total horizontal padding (default: 40px)
 * @returns {number} The number of missing cards to fill the last row
 */
export const calculateMissingCardsForFullRow = (
  containerWidth: number,
  totalItems: number,
  cardWidth: number = 238,
  horizontalGap: number = 20,
  containerPadding: number = 40,
): number => {
  if (containerWidth === 0 || totalItems === 0) {
    return 0;
  }

  const availableWidth = containerWidth - containerPadding;

  // Calculate how many cards fit: for N cards we need N*cardWidth + (N-1)*gap <= availableWidth
  let numberPerRow = 1;
  while (
    numberPerRow * cardWidth + (numberPerRow - 1) * horizontalGap <=
    availableWidth
  ) {
    numberPerRow++;
  }
  numberPerRow = Math.max(1, numberPerRow - 1);

  // Calculate missing cards in the last row
  const numberFullRow = Math.floor(totalItems / numberPerRow);
  const itemsInLastRow = totalItems - numberFullRow * numberPerRow;
  return itemsInLastRow > 0 ? numberPerRow - itemsInLastRow : 0;
};
