import { iterate } from '../array/array';

/**
 * Generates a random number between min and max
 *
 * @example
 *
 * ```ts
 * random(0, 100) // => a random number between 0 and 100
 * ```
 */
export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Draw a random item from a list. Returns
 * null if the list is empty
 *
 * @example
 *
 * ```ts
 * const fish = ['marlin', 'bass', 'trout']
 *
 * draw(fish) // => a random fish
 * ```
 */
export const draw = <T>(array: readonly T[]): T | null => {
  const max = array.length;

  if (max === 0) {
    return null;
  }

  const index = random(0, max - 1);

  return array[index];
};

/**
 * Randomly shuffle an array
 *
 * @example
 *
 * ```ts
 * const fish = [
 *   {
 *     name: 'Marlin',
 *     weight: 105,
 *     source: 'ocean'
 *   },
 *   {
 *     name: 'Salmon',
 *     weight: 22,
 *     source: 'river'
 *   },
 *   {
 *     name: 'Salmon',
 *     weight: 22,
 *     source: 'river'
 *   }
 * ]
 *
 * shuffle(fish)
 * ```
 */
export const shuffle = <T>(array: readonly T[]): T[] => {
  return array
    .map((a) => ({ rand: Math.random(), value: a }))
    .sort((a, b) => a.rand - b.rand)
    .map((a) => a.value);
};

/**
 * Generates a unique string with optional special characters.
 *
 * @example
 *
 * ```ts
 * uid(7) // => UaOKdlW
 * uid(20, '*') // => dyJdbC*NsEgcnGjTHS
 * ```
 */
export const uid = (length: number, specials = '') => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + specials;

  return iterate(
    length,
    (acc) => {
      return acc + characters.charAt(random(0, characters.length - 1));
    },
    ''
  );
};
