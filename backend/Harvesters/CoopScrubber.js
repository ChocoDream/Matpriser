const fetch = require('node-fetch');
const Scrubber = require('./Scrubber');

module.exports = class CoopScrubber extends Scrubber {
  constructor(mainCategoryId) {
    super(mainCategoryId);
    this.mainCategoryId = mainCategoryId;
  }
  //name, storeId, mainCategoryId, brand, photoUrl, isEco, unit, pricePerUnit, pricePerItem, country, url, modifyDate, articleNumber 
  static translateSchema = {
    name: x => x.name,
    storeId: (x) => 1, // CoopStoreId
    mainCategoryId: (x) => this.mainCategoryId, // testvärde!
    brand: x => x.manufacturer,
    photoUrl: x => {
      //https://res.cloudinary.com/coopsverige/image/upload/374319.png
      //https://res.cloudinary.com/coopsverige/image/upload/fl_progressive,q_90,c_lpad,g_center,h_660,w_660/374319.png
      //https://res.cloudinary.com/coopsverige/image/upload/fl_progressive,q_90,c_lpad,g_center,h_240,w_240/374319.png
      let imgURL = x.images[0].url;
      imgURL = imgURL.replace(/.tiff/g, '.png');
      var n = imgURL.search("upload");
      return imgURL.substring(0, n+6)+'/fl_progressive,q_90,c_lpad,g_center,h_240,w_240'+imgURL.substring(n+6);
    },
    isEco: x => x.name.includes("Eko") ? 1: 0,
    unit: x => {
      /* ' g', 'GRM', 'g', 'gram/bit ungefärlig vikt', 'gram ungefärlig vikt', 'gram/st ungefärlig vikt' */     
        if (x.packageSizeUnit == " g" || x.packageSizeUnit == "G" || x.packageSizeUnit == "g" 
          ||x.packageSizeUnit == "GRM" 
          || x.packageSizeUnit == "gram ungefärlig vikt"){
          return 'gr';
        }
        else {
          return x.packageSizeUnit;
        }
    },      
    pricePerUnit: x => parseFloat(x.comparisonPrice.value),
    pricePerItem: x => x.price.value,
    country: x => {
      let manufacturer = x.manufacturer ? x.manufacturer : null;
      if(manufacturer !== null ){
        manufacturer = manufacturer.replace(/Kl 1./g, '');
        manufacturer = manufacturer.replace(/Kl. 1/g, '');
        manufacturer = manufacturer.replace(/Kl1./g, '');
        manufacturer = manufacturer.trim(' ','');
      }
      return x.manufacturer ? manufacturer : null;
    },
    url: x => "https://www.coop.se"+x.url,        
    modifyDate: (x) => new Date(),
    articleNumber: x => x.code,
    promotionConditionLabel: x => {
      let promotion = x.potentialPromotions[0]; 
      return promotion ? promotion.description : null;
    },
    promotionType: x => null,
    promotionPrice: x => null
  }
}