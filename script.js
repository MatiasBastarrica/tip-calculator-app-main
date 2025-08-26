const billInput = document.querySelector("#bill");
const tipButtons = document.querySelectorAll(".tip");
const customTipInput = document.querySelector("#custom-tip");
const peopleNum = document.querySelector("#num-of-people");

const tipAmountDisplay = document.querySelector(".tip-amount__number");
const totalDisplay = document.querySelector(".total__number");
const resetBtn = document.querySelector(".reset-btn");

function getSelectedTip() {
  if (customTipInput.value) {
    return customTipInput.value;
  } else {
    let tipBtnSelected;
    tipButtons.forEach((tipButton) => {
      if (tipButton.classList.contains("checked")) {
        tipBtnSelected = parseInt(tipButton.textContent);
      }
    });
    return tipBtnSelected;
  }
}

function unselectTip() {
  tipButtons.forEach((tipButton) => {
    if (tipButton.classList.contains("checked")) {
      tipButton.classList.remove("checked");
    }
  });
}

function calcTip() {
  let totalPerPerson;
  let tipAmountPerPerson;

  let totalTip = Number(billInput.value) * (getSelectedTip() / 100);
  tipAmountPerPerson = (totalTip / Number(peopleNum.value)).toFixed(2);
  totalPerPerson = (
    (Number(billInput.value) + totalTip) /
    Number(peopleNum.value)
  ).toFixed(2);

  return {
    totalPerPerson,
    tipAmountPerPerson,
  };
}

function displayResults(totalPerPerson, tipAmountPerPerson) {
  tipAmountDisplay.textContent = `$${tipAmountPerPerson}`;
  totalDisplay.textContent = `$${totalPerPerson}`;
}

function enableBtn(resetBtn) {
  resetBtn.classList.remove("disabled");
}

function resetCalc() {
  billInput.value = "";
  customTipInput.value = "";
  tipButtons[2].classList.add("checked");
  peopleNum.value = "";
  resetBtn.classList.add("disabled");
  tipAmountDisplay.textContent = "$0.00";
  totalDisplay.textContent = "$0.00";
}

peopleNum.addEventListener("input", () => {
  if (peopleNum.value >= 1 && billInput.value) {
    const results = calcTip();
    displayResults(results.totalPerPerson, results.tipAmountPerPerson);
    enableBtn(resetBtn);
    resetBtn.addEventListener("click", () => {
      resetCalc();
    });
  }
});

customTipInput.addEventListener("input", () => {
  unselectTip();
});

tipButtons.forEach((tipButton) => {
  tipButton.addEventListener("click", () => {
    unselectTip();
    tipButton.classList.add("checked");
  });
});
