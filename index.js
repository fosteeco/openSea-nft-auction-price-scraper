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

const getNumericMonth = (monthAbbr) => {
  return String(
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ].indexOf(monthAbbr) + 1
  ).padStart(2, "0");
};

const formatDate = (dateText) => {
  // this is the format of a date that was scraped from OpenSea
  // const dateText = "February 28, 2022 at 11:23pm \n  GMT";
  const stringArray = dateText.split(" ");
  const numericMonth = getNumericMonth(stringArray[0]);
  const timeText = stringArray[4];
  const timeSplit = timeText.substring(timeText.length - 2, 0);
  const amPmSplit = timeText.slice(-2);
  const timeCombined = timeSplit + " " + amPmSplit;
  const dateString =
    stringArray[2] +
    "-" +
    numericMonth +
    "-" +
    stringArray[1].replace(/,/g, "") +
    " " +
    timeCombined;
  return dateString;
};

const fetchData = async () => {
  const nftURLSuffix = "0xb4d06d46a8285f4ec79fd294f78a881799d8ced9/2940";
  const full_url = base_url + nftURLSuffix;
  console.log(`Fetch data for: \n  ${full_url}`);
  const nftAuctionData = await getNFTdata(nftURLSuffix);
  nftAuctionData.endDate = new Date(formatDate(nftAuctionData.endDate));
  console.log("nftAuctionData :", nftAuctionData);
};

fetchData();
