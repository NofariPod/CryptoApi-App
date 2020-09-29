let chosenCoins = []; //the coins that the user choose
let chosenToggles = []; //the toggles id of the 5 coins

//choose 5 coins to create graph
function toggleFunc(current, coin_name) {
  let toggleId = current.id;
  let coinSymIndex = chosenCoins.indexOf(coin_name);
  let liveToggleIndex = chosenToggles.indexOf(toggleId);

  if (coinSymIndex != -1) {
    chosenCoins.splice(coinSymIndex, 1);
    updateCoinSpan();
    chosenToggles.splice(liveToggleIndex, 1);
  } else {
    //push 5 coins to array of coins&toggles
    if (chosenCoins.length < 5) {
      chosenCoins.push(coin_name);
      updateCoinSpan();
      chosenToggles.push(toggleId);
    }
    //the chosen is more than 5
    else {
      $("#modalbody").empty();
      $(`#${toggleId}`).prop("checked", false);
      $("#modalbody").html(
        "to choose <b>" +
          coin_name +
          "</b>, you must unselect one from this coins : "
      );
      $("#myModal").css("display", "block");
      //button to cancel change of coin
      $("#keepcurrent").on("click", () => {
        $("#myModal").css("display", "none");
      });

      let counter = 1;
      for (let i = 0; i < chosenCoins.length; i++) {
        $("#modalbody").append(
          `<div id="modaldiv">
            <div class="card" id="modalcard">
              <div class="card-body" id="modalcardbody">
                <h6 id="modalcoinname" class="card-title">${chosenCoins[i]}</h6>
              </div>      
              <label class="switch" id="modalswitch">
              <input type="checkbox" class="checkboxes" id="chosenToggle${counter}"> <span class="slider round" id="modalslider"></span>
              </label>
            </div>
        </div>`
        );

        $(`#chosenToggle${counter}`).prop("checked", true);
        //replace beteen toggles
        $(`#chosenToggle${counter}`).on("change", () => {
          let coinIndexToRemove = chosenCoins.indexOf(chosenCoins[i]);
          let setToggleToFalse = chosenToggles[coinIndexToRemove];

          chosenCoins.splice(coinIndexToRemove, 1);
          updateCoinSpan();
          chosenToggles.splice(coinIndexToRemove, 1);

          chosenCoins.push(coin_name);
          updateCoinSpan();
          chosenToggles.push(toggleId);

          $("#myModal").css("display", "none");

          $(`#${setToggleToFalse}`).prop("checked", false);
          doubleCheckToggle();
        });
        counter++;
      }
    }

    console.log("this is coins : " + chosenCoins);
    console.log("this is toggles : " + chosenToggles);
  }
}

//render 5 coins to html
function updateCoinSpan() {
  let coinSpanData = "";
  for (let i = 0; i < chosenCoins.length; i++) {
    if (i == chosenCoins.length - 1) {
      coinSpanData += chosenCoins[i];
    } else {
      coinSpanData += chosenCoins[i] + ",";
    }
  }
  $("#chosenCoins").html(coinSpanData);
}

//set toggles check to true
function doubleCheckToggle() {
  for (let i = 0; i < chosenToggles.length; i++) {
    $(`#${chosenToggles[i]}`).prop("checked", true);
  }
}
