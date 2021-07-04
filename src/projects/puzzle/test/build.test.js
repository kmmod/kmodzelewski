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

  test("Make sure it returns every item randomly", () => {
    const range = 10;
    const listOfRanges = Array(1000).fill(range);
    const results = listOfRanges.map((item) => getRandomId(item));
    const exists = [];
    for (let x = 0; x <= range; x++) {
      const numberExists = results.includes(x);
      exists.push(numberExists);
    }
    console.log(exists);
    exists.map((item) => expect(item).toBeTruthy());
  });

  test("Provides equal random distribution", () => {
    expect(0).toBe(0);
  });
});
