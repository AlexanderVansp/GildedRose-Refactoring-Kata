var { Shop, Item } = require('../src/gilded_rose.js');

const testCases = require('../legacy.json');

describe("Gilded Rose", function () {

  /**
   * Helper functions to generate all possible values.
   * 
   * According to the technical specifications, we know the limit of certain values.
   * We generate all possible combinations and feed them into the shop and update the quality.
   * This way we can compare and check that our refactoring doesn't affect the legacy logic.
   */
  function generateTestCases() {
    const possibleNames = [
      'Aged Brie',
      'Backstage passes to a TAFKAL80ETC concert',
      'Sulfuras, Hand of Ragnaros',
      'other'
    ];

    // based on edgecases checks in legacy code +/- 1.
    const minSellIn = -1;
    const maxSellIn = 12;
    const minQuality = -1;
    const maxQuality = 51;

    let result = [];

    possibleNames.forEach(name => {
      for (let sellIn = minSellIn; sellIn <= maxSellIn; sellIn++) {
        for (let quality = minQuality; quality <= maxQuality; quality++) {
          const gildedRose = new Shop([new Item(name, sellIn, quality)]);
          const items = gildedRose.updateQuality();
          result.push({ input: { name: name, sellIn: sellIn, quality: quality }, result: { sellIn: items[0].sellIn, quality: items[0].quality } });
        }
      }
    });

    console.log(JSON.stringify(result));
  }

  // To generate the legacy test data, pipe this to a file.
  // Can't do this at runtime, cause the logic of the code might change the result and still be happy.
  // generateTestCases()

  describe("Test for expected result updateQuality", function () {

    testCases.forEach(singleTest => {
      it(JSON.stringify(singleTest), function () {
        const gildedRose = new Shop([new Item(singleTest.input.name, singleTest.input.sellIn, singleTest.input.quality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).toEqual(singleTest.result.sellIn);
        expect(items[0].quality).toEqual(singleTest.result.quality);
      })
    });

    it("Conjured test normal", function () {
      const inputSellIn = 10;
      const inputQuality = 10;

      const gildedRose = new Shop([new Item("NormalItem", inputSellIn, inputQuality), new Item("Conjured Mana Cake", inputSellIn, inputQuality)]);
      const items = gildedRose.updateQuality();
      
      const updatedNormal = items[0];
      const updatedConjured = items[1];

      expect(updatedNormal.sellIn).toEqual(updatedConjured.sellIn);
      // Difference in quality should be twice as big.
      expect(2 * (updatedNormal.quality - inputQuality)).toEqual(updatedConjured.quality - inputQuality);
    })

    it("Conjured test negative sellIn", function () {
      const inputSellIn = -1;
      const inputQuality = 10;

      const gildedRose = new Shop([new Item("NormalItem", inputSellIn, inputQuality), new Item("Conjured Mana Cake", inputSellIn, inputQuality)]);
      const items = gildedRose.updateQuality();
      
      const updatedNormal = items[0];
      const updatedConjured = items[1];

      expect(updatedNormal.sellIn).toEqual(updatedConjured.sellIn);
      // Difference in quality should be twice as big.
      expect(2 * (updatedNormal.quality - inputQuality)).toEqual(updatedConjured.quality - inputQuality);
    })
  });

});
