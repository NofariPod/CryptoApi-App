//get more info
async function getMoreInfo(event) {
  let coinDataId = `${event.target.id}`;
  let url = URL_2 + `${coinDataId}`;
  const res1 = await fetch(url);
  const copyRes1 = res1.clone();
  const coinsIds = await res1.json().then(function (data) {
    //console.log(data); //coin data
    caches.open("my-cache").then(async function (cache) {
      //console.log(coinsIds);
      //const cacheMemory = await caches.open("my-cache");
      const cachePut = await cache.put(url, copyRes1);
      $(".loader").hide();
      displayMoreInfo(data, coinDataId);
    });
  });
  $(".loader").show();
}

//display html more info
function displayMoreInfo(coin) {
  console.log("this is coin id" + coin.id);
  console.log(coin.market_data.current_price.usd);
  let layout = document
    .getElementById(`${coin.id}`)
    .querySelectorAll(".collapse");
  layout[0].innerHTML = "";
  if (`${coin.market_data.current_price.usd}` !== "undefined") {
    layout[0].innerHTML += `
            <div class="card-header primary-card-title">
                <img class="card-img-top img-fluid" src="${coin.image.large} alt=coin-id">
            </div>
            <div class="card-body">
                <div class="card-title" color="black">Price:</div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">${coin.market_data.current_price.usd} $</li>
                    <li class="list-group-item">${coin.market_data.current_price.eur} &euro;</li>
                    <li class="list-group-item">${coin.market_data.current_price.ils} &#8362;</li>
                  </ul> 
                    <a class="btn btn-primary" id="btnClose" onclick="closeMoreInfo('${coin.id}')">Close</a>
            </div>`;
  } else {
    layout[0].innerHTML = `there is no info about this coin <a class="btn btn-primary" id="btnClose" onclick="closeMoreInfo('${coin.id}')">Close</a>
`;
  }
  $(layout[0]).show();
}

//button close more info
function closeMoreInfo(coin_id) {
  let el = document.getElementById(`${coin_id}`).querySelector(".collapse");
  el.innerHTML = "";
}
