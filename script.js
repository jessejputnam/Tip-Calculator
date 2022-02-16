"use strict";
/*
Table of Contents

#defining elements
#initializing variables
#input rules
#bill
#select tip
#custom tip
#people
#tip amount
#total
#reset
*/

/////////////// #defining elements ///////////////
const inputs = document.querySelectorAll(".display");
const bill = document.querySelector(".display--bill");
const billInvalid = document.querySelector(".bill-invalid");
const btnsTipAmount = document.querySelectorAll(".btn__tip");
const btnTipCustom = document.querySelector(".display--customtip");
const people = document.querySelector(".display--people");
const peopleInvalid = document.querySelector(".people-invalid");
const tipAmount = document.querySelector(".tip-amount");
const totalOwed = document.querySelector(".total-owed");
const reset = document.querySelector(".btn__reset");

/////////////// #initializing variables ///////////////
let billTotal,
  tipPercent,
  tipTotal,
  peopleAmt,
  tipAmtPerPerson,
  billAmtPerPerson,
  totalAmt,
  activeBtnsTip;

/////////////// #initial state ///////////////
const init = function () {
  billTotal = 0;
  billTotal = 0;
  tipPercent = 0;
  tipTotal = 0;
  peopleAmt = 0;
  tipAmtPerPerson = 0;
  billAmtPerPerson = 0;
  totalAmt = 0;
  activeBtnsTip = null;
  for (let i = 0; i < btnsTipAmount.length; i++) {
    btnsTipAmount[i].classList.remove("btn-active");
  }
  btnTipCustom.classList.remove("btn-active");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
};
init();

/////////////// #input rules ///////////////
const invalidChars = ["-", "+", "e", "ArrowLeft"];
const charExceptions = ["Backspace", "ArrowRight"];

// Input listener for keyboard
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keydown", function (e) {
    // do not allow invalid chars
    if (invalidChars.includes(e.key)) e.preventDefault();
    // limit char count while allowing backspace
    if (inputs[i].value.length > 8) {
      if (!charExceptions.includes(e.key)) e.preventDefault();
    }

    // limit decimal places to 2
    if (inputs[i].value.includes(".")) {
      let decimalCheck = inputs[i].value.toString().split(".");
      if (decimalCheck[1].length > 1) {
        if (!charExceptions.includes(e.key)) e.preventDefault();
      }
    }
    // restrict multiple zeroes
    if (inputs[0].value === "0") {
      if (e.key === "0") e.preventDefault();
    }
  });

  // restrict negatives
  document.addEventListener("keyup", function () {
    if (inputs[i].value[0] === "-") inputs[i].value = "0";
  });
}

// Event listener for touchscreen
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("ontouchstart", function (e) {
    // do not allow invalid chars
    if (invalidChars.includes(e.key)) e.preventDefault();
    // limit char count while allowing backspace
    if (inputs[i].value.length > 8) {
      if (!charExceptions.includes(e.key)) e.preventDefault();
    }

    // limit decimal places to 2
    if (inputs[i].value.includes(".")) {
      let decimalCheck = inputs[i].value.toString().split(".");
      if (decimalCheck[1].length > 1) {
        if (!charExceptions.includes(e.key)) e.preventDefault();
      }
    }
    // restrict multiple zeroes
    if (inputs[0].value === "0") {
      if (e.key === "0") e.preventDefault();
    }
  });

  // restrict negatives
  document.addEventListener("ontouchend", function () {
    if (inputs[i].value[0] === "-") inputs[i].value = "0";
  });
}

/////////////// #bill ///////////////

document.addEventListener("keyup", function () {
  if (bill.value === "0") {
    billInvalid.classList.remove("hidden");
    bill.classList.add("invalid-input");
  }
  if (bill.value !== "0") {
    billInvalid.classList.add("hidden");
    bill.classList.remove("invalid-input");
  }

  // Store bill amount
  bill.value === "" ? (billTotal = 0) : (billTotal = parseFloat(bill.value));
});

/////////////// #select tip ///////////////
//
for (let i = 0; i < btnsTipAmount.length; i++) {
  btnsTipAmount[i].addEventListener("click", function (e) {
    e.currentTarget.classList.add("btn-active");

    if (activeBtnsTip !== null && activeBtnsTip !== btnsTipAmount[i]) {
      activeBtnsTip.classList.remove("btn-active");
    }

    // make active button current target
    activeBtnsTip = e.currentTarget;
    // store tip percent from the active button
    tipPercent = parseInt(activeBtnsTip.innerHTML) / 100;
  });
}

/////////////// #custom tip ///////////////
// Limit string length
btnTipCustom.addEventListener("keypress", function (e) {
  if (btnTipCustom.value.length > 3 && e.key !== "Backspace")
    e.preventDefault();
});

// Custom tip active styling
btnTipCustom.addEventListener("keyup", function () {
  if (btnTipCustom.value === "%") btnTipCustom.value === "";
  // if (btnTipCustom.value.length > 0) btnTipCustom.value = `${btnTipCustom.value}\%`;
});

// Custom tip functionality
btnTipCustom.addEventListener("click", function (e) {
  e.currentTarget.classList.add("btn-active");

  if (activeBtnsTip !== null && activeBtnsTip !== btnTipCustom) {
    activeBtnsTip.classList.remove("btn-active");
  }

  activeBtnsTip = e.currentTarget;
});

let tipNew = btnTipCustom.value;

// make Tip Percent custom when highlighted
document.addEventListener("keyup", function () {
  if (btnTipCustom.classList.contains("btn-active")) {
    btnTipCustom.value === ""
      ? (tipPercent = 0)
      : (tipPercent = parseFloat(btnTipCustom.value) / 100);
  }
});

/////////////// #people ///////////////
// Limit number of people AND limit number to integers
people.addEventListener("keydown", function (e) {
  if (people.value.length > 2 && !charExceptions.includes(e.key))
    e.preventDefault();
  if (e.key === ".") e.preventDefault();
});

// Check for invalid input (keypress)
document.addEventListener("keyup", function () {
  if (people.value === "0") {
    peopleInvalid.classList.remove("hidden");
    people.classList.add("invalid-input");
  }
  if (people.value !== "0") {
    peopleInvalid.classList.add("hidden");
    people.classList.remove("invalid-input");
  }
});

// store people amount
document.addEventListener("keyup", function () {
  people.value === "" ? (peopleAmt = 0) : (peopleAmt = parseInt(people.value));
});

/////////////// #tip amount ///////////////

// Store total tip amount
document.addEventListener("click", function () {
  tipTotal = billTotal * tipPercent;
});

document.addEventListener("keyup", function () {
  tipTotal = billTotal * tipPercent;
});

// store Tip/Person and Bill/Person amounts
document.addEventListener("click", function () {
  if (peopleAmt === 0) {
    tipAmtPerPerson = 0;
    billAmtPerPerson = 0;
  } else {
    tipAmtPerPerson = tipTotal / peopleAmt;
    billAmtPerPerson = billTotal / peopleAmt;
  }

  tipAmount.innerHTML = `$${tipAmtPerPerson.toFixed(2)}`;
});

document.addEventListener("keyup", function () {
  if (peopleAmt === 0) {
    tipAmtPerPerson = 0;
    billAmtPerPerson = 0;
  } else {
    tipAmtPerPerson = tipTotal / peopleAmt;
    billAmtPerPerson = billTotal / peopleAmt;
  }

  tipAmount.innerHTML = `$${tipAmtPerPerson.toFixed(2)}`;
});

/////////////// #total ///////////////
document.addEventListener("keyup", function () {
  totalAmt = tipAmtPerPerson + billAmtPerPerson;

  totalOwed.innerHTML = `$${totalAmt.toFixed(2)}`;
});

document.addEventListener("click", function () {
  totalAmt = tipAmtPerPerson + billAmtPerPerson;

  totalOwed.innerHTML = `$${totalAmt.toFixed(2)}`;
});

/////////////// #reset ///////////////
reset.addEventListener("click", function () {
  init();
});
