class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const Names = {
  BRIE: 'Aged Brie',
  BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  CONJURED: 'Conjured Mana Cake'
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }


  adjustQuality(item, adjustment) {
    var newQuality = Math.max(0, item.quality + adjustment);
    newQuality = Math.min(50, item.quality + adjustment);
    item.quality = newQuality;
  }

  /** 
   * Handles special case of item with name: {@link Names.BRIE}
   */
  handleBrie(item) {
    if (item.quality < 50) {
      this.adjustQuality(item, 1);
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality < 50) {
      this.adjustQuality(item, 1);
    }
  }

  /** 
   * Handles special case of item with name: {@link Names.BACKSTAGE}
   */
  handleBackstage(item) {
    if (item.quality < 50) {
      this.adjustQuality(item, 1);
      if (item.sellIn < 11 && item.quality < 50) {
        this.adjustQuality(item, 1);
      }

      if (item.sellIn < 6 && item.quality < 50) {
        this.adjustQuality(item, 1);
      }
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      item.quality = item.quality - item.quality;
    }
  }

  /** 
   * Handles special case of item with name: {@link Names.SULFURAS}
   */
  handleSulfuras(item) {
    // nothing to do in this case
  }

  /** 
   * Handles special case of item with name: {@link Names.Conjured}
   */
   handleConjured(item) {
    if (item.quality > 0) {
      this.adjustQuality(item, -2);
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality > 0) {
      this.adjustQuality(item, -2);
    }
  }

   /** 
   * Handles all the other cases, that are not considered special
   */
  handleOther(item) {
    if (item.quality > 0) {
      this.adjustQuality(item, -1);
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality > 0) {
      this.adjustQuality(item, -1);
    }
  }

  updateQuality() {
    this.items.forEach(item => {

      switch (item.name) {
        case Names.BRIE:
          this.handleBrie(item)
          break;
        case Names.BACKSTAGE:
          this.handleBackstage(item)
          break;
        case Names.SULFURAS:
          this.handleSulfuras(item)
          break;
        case Names.CONJURED:
            this.handleConjured(item)
            break;
        default:
          this.handleOther(item);
          break
      }
      
    })

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
