import { sampleOne } from '~/utils';

describe('Utils', () => {
  test('samples a random value from an array', () => {
    const arrayOfNums = [1, 2, 3];
    const randomNum = sampleOne(arrayOfNums);
    expect(arrayOfNums).toContain(randomNum);
  });
});
