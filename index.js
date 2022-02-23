const Nightmare = require("nightmare");
const nightmare = Nightmare();

const getNFTdata = (suffix) => {
  nightmare
    .goto("https://opensea.io/assets/" + suffix)
    .wait(
      "div.TradeStation--main > div.TradeStation--price-container > div.TradeStation--price > div.Price--amount"
    )
    .evaluate(
      () =>
        document.querySelector(
          "div.TradeStation--main > div.TradeStation--price-container > div.TradeStation--price > div.Price--amount"
        ).innerText
    )
    .end()
    .then((price) => {
      console.log("NFT price", price);
      return;
    })
    .catch((error) => {
      console.error("Search failed:", error);
    });
};

const nftURLSuffix = "0xb4d06d46a8285f4ec79fd294f78a881799d8ced9/6838";

const nftAuctionPrice = getNFTdata(nftURLSuffix);
