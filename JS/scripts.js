let URL_1 = "https://api.coingecko.com/api/v3/coins/list/";
let URL_2 = `https://api.coingecko.com/api/v3/coins/`;
let coinsList = document.querySelector(".coinsCards");
let inputSearch = document.getElementById("inputSearch");
let filteredCoin = [];

//navigate between other pages
$(".nav-link").on("click", (event) => {
  $(".coinsCards").empty();

  let menuId = event.target.id;

  switch (menuId) {
    case "liveData":
      $.ajax({
        type: "GET",
        url: `/HTML/liveData.html`,
        beforeSend: function () {
          $(".loader").show();
        },
        success: function (result) {
          $(".loader").hide();
          $(".coinsCards").empty();
          $(".coinsCards").append(result);
        },
      });
      break;
    case "about":
      $.ajax({
        type: "GET",
        url: `/HTML/about.html`,
        beforeSend: function (result) {
          $(".loader").show();
        },
        success: function (result) {
          $(".loader").hide();
          $(".coinsCards").empty();
          $(".coinsCards").append(result);
        },
      });
      break;
    default:
      $.ajax({
        type: "GET",
        url: `/HTML/index.html`,
        beforeSend: function () {
          $(".loader").show();
        },
        success: function (result) {
          $(".loader").hide();
          $(".coinsCards").empty();
          loadCoins();
          displayCoins();
        },
      });
      break;
  }
});

//event of search coin
inputSearch.addEventListener("keyup", (e) => {
  let searchStr = e.target.value.toLowerCase();
  const filteredC = filteredCoin.filter((coin) => {
    return coin.symbol.toLowerCase().includes(searchStr);
  });
  console.log(filteredC);
  displayCoins(filteredC);
});

//get coins from api
const loadCoins = async () => {
  try {
    const res = await fetch(URL_1);
    $(".loader").show();
    filteredCoin = await res.json();
    $(".loader").hide();
    displayCoins(filteredCoin);
    console.log(filteredCoin);
  } catch (err) {
    console.error(err);
  }
};

//display coins in html
const displayCoins = (coins) => {
  const htmlString = coins
    .map((coin) => {
      return `
            <div class="card" id=${coin.id}>
            <div class="coin-data">
                <div class="card-title coin-symbol">${coin.symbol.toUpperCase()}</div>
                <div class="card-subtitle coin-name">${coin.name}</div>
            </div>
            <button id="${coin.id}" onclick="getMoreInfo(event)" 
            class="btn btn-info toggle mb-2" 
            type="button" data-toggle="collapse" 
            data-target="#${coin.id}">
                        More Info
                    </button>
                    <div class="collapse id="${coin.id}"">
                    </div>
            <label class="switch">
                <input type="checkbox" onchange="toggleFunc(this,'${coin.symbol.toUpperCase()}')" id="check${coin.symbol.toUpperCase()}">
                <span class="slider round"></span>
            </label>
          </div>`;
    })
    .join("");
  coinsList.innerHTML = htmlString;
};
