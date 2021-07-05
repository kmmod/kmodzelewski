import { getRandomId } from "../core/build";

describe("Random functions tests", () => {
  beforeEach(() => {});

  test("Returns ID as integer", () => {
    const result = getRandomId(10);
    expect(Number.isInteger(result)).toBe(true);
  });

  test("Provides random Id in range", () => {
    const result = getRandomId(10);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(10);
  });

  test("Returns every item in range", () => {
    const range = 10;
    const listOfRanges = Array(1000).fill(range);
    const results = listOfRanges.map((item) => getRandomId(item));
    const exists = [];
    for (let x = 0; x <= range; x++) {
      const numberExists = results.includes(x);
      exists.push(numberExists);
    }
    exists.map((item) => expect(item).toBeTruthy());
  });

  test("Provides equal random distribution", () => {
    const range = 10;
    const listOfRanges = Array(10000).fill(range);
    const results = listOfRanges.map((item) => getRandomId(item));
    const countOccurrences = (arr, val) =>
      arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    const occurrences = Array(range)
      .fill(0)
      .map((item, index) => {
        return countOccurrences(results, index);
      });
    const average = occurrences.reduce((a, b) => a + b) / occurrences.length;
    const tolerance = 0.1;
    occurrences.map((item) => {
      expect(item).toBeLessThan(average * (1 + tolerance));
      expect(item).toBeGreaterThan(average * (1 - tolerance));
    });
    expect(0).toBe(0);
  });
});
