/**
 * Utility functions for random operations
 */
export class Randomizer {
  /**
   * Generate a random index from array length
   * @param arrayLength - The length of the array
   * @returns Random index between 0 and arrayLength-1
   */
  static getRandomIndex(arrayLength: number): number {
    return Math.floor(Math.random() * arrayLength);
  }

  /**
   * Generate a random number between min and max (inclusive)
   * @param min - Minimum value
   * @param max - Maximum value
   * @returns Random number between min and max
   */
  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Select a random item from an array
   * @param array - Array to select from
   * @returns Random item from the array
   */
  static getRandomItem<T>(array: T[]): T {
    const randomIndex = this.getRandomIndex(array.length);
    return array[randomIndex];
  }

  /**
   * Generate a random boolean value
   * @returns Random boolean (true or false)
   */
  static getRandomBoolean(): boolean {
    return Math.random() < 0.5;
  }
}
