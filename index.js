const Nightmare = require("nightmare");
const nightmare = Nightmare();

const base_url = "https://opensea.io/assets/";

const getNFTdata = async (suffix) => {
  const nftData = await nightmare
    .goto(base_url + suffix)
    .wait(
      "div.TradeStation--main > div.TradeStation--price-container > div.TradeStation--price > div.Price--amount"
    )
    .wait("div.TradeStation--header > div > div > div > span:nth-child(2)")
    .evaluate(() => {
      return {
        price: +document.querySelector(
          "div.TradeStation--main > div.TradeStation--price-container > div.TradeStation--price > div.Price--amount"
        ).innerText,
        endDate: document.querySelector(
          "div.TradeStation--header > div > div > div> span:nth-child(2)"
        ).innerText,
        info: "Info Property",
      };
    })
    .end();
  return nftData;
};

const fetchData = async () => {
  const nftURLSuffix = "0xb4d06d46a8285f4ec79fd294f78a881799d8ced9/2940";
  const full_url = base_url + nftURLSuffix;
  console.log(`Fetch data for: \n  ${full_url}`);
  const nftAuctionData = await getNFTdata(nftURLSuffix);
  console.log("nftAuctionData :", nftAuctionData);
};

fetchData();
