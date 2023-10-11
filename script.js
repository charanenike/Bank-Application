'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Charan Kumar',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i} ${type}</div>
        <div class="movements__value">${mov} &#8377</div>
      </div>
  `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//  Display total balance

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, crr) => acc + crr, 0);
  // console.log(balance);
  labelBalance.textContent = `${acc.balance} \u20B9`;
};

const clacDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income} \u20B9`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} \u20B9
  `;

  const interset = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interset} \u20B9`;
};

// Creating Usernames

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

// Update UI
const updateUI = function (acc) {
  // Dispaly movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  clacDisplaySummary(acc);
};

// Event Handlers

// Login Account

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display message

    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // Clear the input fileds
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    containerApp.style.opacity = 100;

    updateUI(currentAccount);
  }
});

// Transfer Amuont
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }
  updateUI(currentAccount);
});

// Loan Amount
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movements
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Close Account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername &&
    currentAccount.pin === inputClosePin
  ) {
    const index = accounts.findIndex(acc => acc.username === currentAccount);
    accounts.splice(index, 1);
  }

  inputCloseUsername.value = inputClosePin.value = '';
  containerApp.style.opacity = 0;
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURESf

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*

// Arrays

// Simple Methos
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr);

// Slice
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-1));
console.log(arr.slice());
console.log([...arr]);

// Splice
console.log(arr.splice(2));
console.log(arr);

// Reverse
let arr1 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr1);
console.log(arr1.reverse());
console.log(arr1);

// Concat
arr = ['a', 'b', 'c', 'd', 'e'];
const letters = arr.concat(arr1);
console.log(letters);
console.log([...arr, ...arr1]);

// Join
console.log(letters.join(' - '));


// At method
const arr = [11, 22, 33];
console.log(arr[0]);
console.log(arr.at(0));

// getting the array last element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));


// ForEach method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`${i + 1} Deposited : ${movement}`);
  } else {
    console.log(`${i + 1} Withdrew : ${Math.abs(movement)}`);
  }
}

console.log('------ For Each -----');
movements.forEach(function (movement, i, array) {
  if (movement > 0) {
    console.log(`${i + 1} Deposited : ${movement}`);
  } else {
    console.log(`${i + 1} Withdrew : ${Math.abs(movement)}`);
  }
});

// forEach for Maps and Sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

console.log('-------');

const currenciesunique = new Set(['USD', 'ERU', 'USD', 'GBP', 'ERU', 'USD']);

currenciesunique.forEach(function (value, _, map) {
  console.log(`${value}`);
});

// Coding Challenge #1

const juliaData = [3, 5, 2, 12, 7];
const KateData = [4, 1, 15, 8, 3];

const juliaData2 = [9, 16, 6, 8, 3];
const KateData2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  // 1
  let juliaDogs = [...dogsJulia];
  juliaDogs.shift();
  juliaDogs.splice(-2);

  //2
  const totalDogs = [...juliaDogs, ...dogsKate];
  console.log(totalDogs);

  //3

  totalDogs.forEach(function (dog, i) {
    if (dog < 3) {
      console.log(`"Dog number ${i + 1} is still puppy `);
    } else {
      console.log(`"Dog number ${i + 1} is an adult, and is ${dog} years old`);
    }
  });
};

checkDogs(juliaData, KateData);

// The Map method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});
console.log(movementsUSD);
// Arrow Function
const movementsUSDArrow = movements.map(mov => mov * eurToUsd);

console.log(movementsUSD);

const movementsDesc = movements.map(
  (mov, i) => `Movement ${i} : You ${mov > 0 ? 'deposited' : 'Withdrew'}`
);
console.log(movementsDesc);

// Filter Method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(mov => mov > 0);
console.log(deposits);
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);


// The reduce method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce((acc, crr) => acc + crr, 0);
console.log(balance);

const maxValue = movements.reduce((acc, crr) => {
  if (acc > crr) return acc;
  else return crr;
}, movements[0]);
console.log(maxValue);

// Coding Challenge #2

const dogsAge = [5, 2, 4, 1, 15, 8, 3];
const dogsAge1 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAge);
  const adultDogs = humanAge.filter(adultAge => adultAge >= 18);
  console.log(adultDogs);
  const calcAverageHumanAge =
    adultDogs.reduce((acc, humanage) => acc + humanage, 0) / adultDogs.length;

  console.log(calcAverageHumanAge);
};

calcAverageHumanAge(dogsAge);
calcAverageHumanAge(dogsAge1);

// The method chaining

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const totalDepositsUsd = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUsd);


// Coding Challenge #3


const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)f
    .reduce((acc, humanage, i, arr) => acc + humanage / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


// The find method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const withdrawal = movements.find(mov => mov > 0);
console.log(withdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.username === 'js');
console.log(account);


// some & every methods

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.includes(-400));
console.log(movements.some(mov => mov > 0));
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// falt and faltMap method

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr);
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat());
console.log(arrDeep.flat(2));

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

// Sorting arrays

const owners = ['charan', 'sujith', 'Ammu', 'yassu', 'jaanu'];
console.log(owners);
console.log(owners.sort());

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
console.log(movements.sort());

// return < 0 => A, B (Keep order)
// return > 0 => B, A (Switch order)

// Ascending order
movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});

console.log(movements);

movements.sort((a, b) => a - b);
console.log(movements);

// Descending order

movements.sort((a, b) => b - a);
console.log(movements);


// Other methods for creation and filling

// fill method

const x = new Array(7);
console.log(x);
x.fill(1);
console.log(x);
x.fill(56, 2, 5);
console.log(x);

// Array.form method

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

let sum = 0;
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => {
      return Number(el.textContent.replace('\u20B9', ''));
      // sum += Number(el.textContent.replace('\u20B9', ''));
      // sum = sum + add;
    }
  );
  console.log(movementsUI);
  // console.log(sum);
  // const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  // console.log(movementsUI2);
});


// Coding Challenge #4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(dog => (dog.recommended = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2.
const sarahsDogs = dogs.find(dog => dog.owners.includes('Sarah'));
const limit =
  sarahsDogs.curFood > sarahsDogs.recommended
    ? `Sarahs's dog is eating too much`
    : `Sarahs's dog is eating too little`;
console.log(limit);

//3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommended)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommended)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// 4.
let str = '';
let str1 = '';
const muchStr = 'dogs eat too much!';
const littleStr = 'dogs eat too little!';
const tooMuchStr = ownersEatTooMuch.forEach((owner, i) => {
  str += `${
    ownersEatTooMuch.length - 1 === i ? `${owner}'s ` : `${owner} and `
  }`;
});

const ownersTooMuch = str.concat(muchStr);
console.log(ownersTooMuch);

const tooLittleStr = ownersEatTooLittle.forEach((owner, i) => {
  str1 += `${
    ownersEatTooLittle.length - 1 === i ? `${owner}'s ` : `${owner} and `
  }`;
});
const ownersTooLittle = str1.concat(littleStr);
console.log(ownersTooLittle);

// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5.
const exactly = dogs.some(dog => dog.curFood === dog.recommended);
console.log(exactly);

// 6.
const okay = dogs.some(
  dog =>
    dog.curFood > dog.recommended * 0.9 && dog.curFood < dog.recommended * 1.1
);
console.log(okay);

// 7.
const okayDogs = dogs.filter(dog => {
  if (
    dog.curFood > dog.recommended * 0.9 &&
    dog.curFood < dog.recommended * 1.1
  ) {
    return dog;
  }
});
console.log(okayDogs);

// 8.
const dogsCopy = dogs.slice().sort((a, b) => {
  if (a.recommended > b.recommended) {
    return 1;
  } else {
    return -1;
  }
});
console.log(dogsCopy);

*/
