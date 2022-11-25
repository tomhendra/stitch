import { sampleOne } from './main';

test('samples a random array value', () => {
  const randomNum = sampleOne([1, 2, 3]);
  const arrayOfNums = [1, 2, 3];
  expect(arrayOfNums).toContain(randomNum);
});
