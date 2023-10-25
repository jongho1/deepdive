const item = [
  { name: '콜라', price: 1000, count: 5 },
  { name: '사이다', price: 1000, count: 5 },
  { name: '삼다수', price: 800, count: 5 },
  { name: '하늘보리', price: 1200, count: 5 },
  { name: '제로콜라', price: 1200, count: 5 },
  { name: '환타', price: 900, count: 5 },
];

function chunkArray(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

function makeTable() {
  let newItem = chunkArray(item, 3);
  const $tbody = document.getElementById('tbody');
  $tbody.innerHTML = `${newItem
    .map((item) => {
      let tr = '<tr>';
      item.map((i) => {
        tr += `<td class="drink" data-name="${i.name}" data-price="${i.price}" data-count="${i.count}" >${i.name}(${i.price})(${i.count})</td>`;
      });
      tr += '</tr>';
      return tr;
    })
    .join('')}`;
}

makeTable();

const $moneyButton = document.querySelector('#moneyButton');
const $Items = document.querySelectorAll('.drink');
const $money = document.getElementById('money');
const $selectedItems = document.getElementById('pick');
const selectedItems = []; // 뽑은 음료수 보관

// 돈 넣기
// 반복된 코드는 함수로 만들 것
$moneyButton.addEventListener('click', () => {
  const money = prompt('돈을 넣어주세요');
  if (money === null) return;
  if (isNaN(Number(money))) return;

  const totalPrice = Number(money) + Number($money.textContent);
  $money.textContent = totalPrice;

  $Items.forEach(($td) => {
    const price = $td.getAttribute('data-price');
    if (totalPrice - price >= 0) {
      $td.classList.add('buyable');
    } else {
      $td.classList.remove('buyable');
    }
  });

  // const money = Number(prompt('돈을 넣어주세요'));
  // if (isNaN(money)) return;
  // const totalPrice = money + Number($money.textContent);
  // $money.textContent = totalPrice;
  // updateBuyable();
});

// 각 항목 클릭
// 잔액부족시 잔액 추가 할 수 있게하기
// 쓸데없는 파라미터 최소화
$Items.forEach((mitem) => {
  mitem.addEventListener('click', () => {
    const itemName = mitem.getAttribute('data-name'); // 각 항목 이름
    const itemPrice = Number(mitem.getAttribute('data-price')); // 각 항목 가격
    const currentMoney = Number($money.textContent); // 잔액

    if (currentMoney >= itemPrice) {
      음료comparePrice({ currentMoney, itemPrice });
      음료count({ mitem, itemName, itemPrice });
      음료list({ itemName });
    }
    // const itemName = mitem.getAttribute('data-name'); // 각 항목 이름
    // const itemPrice = Number(mitem.getAttribute('data-price')); // 각 항목 가격
    // const itemCount = Number(mitem.getAttribute('data-count'));
    // const balance = Number($money.textContent) - itemPrice; // 잔액
    // if (itemCount <= 0) return addItem(mitem);
    // if (balance < 0) return insertMoney();
    // $money.textContent = balance;
    // 음료count({ mitem, itemName, itemPrice });
    // 음료list({ itemName });
    // updateBuyable();
  });
});

function 음료comparePrice({ currentMoney, itemPrice }) {
  const newMoney = currentMoney - itemPrice;
  $money.textContent = newMoney;

  // 다시 잔액으로 살 수 있는 음료수 항목에 불켜기
  $Items.forEach(($item) => {
    if (newMoney >= itemPrice) {
      $item.classList.add('buyable');
    } else {
      $item.classList.remove('buyable');
    }
  });
}

//재고 추가 시 취소 누르거나 그냥 확인누르거나 0입력해도 잔액차감되고 뽑은 음료수에 추가됨
//숫자아닌 문자넣으면 버그남
function 음료count({ mitem, itemName, itemPrice }) {
  const findItem = item.find((i) => i.name === itemName);
  if (findItem.count > 0) {
    findItem.count--;
  } else {
    alert(`${itemName} 재고가 없습니다.`);
    const addItem = prompt('재고를 넣어주세요');
    if (addItem !== null) findItem.count = Number(addItem);
  }
  mitem.textContent = `${itemName}(${itemPrice})(${findItem.count})`;
  // 수량이 0이면 배경색 제거
  if (findItem.count === 0) {
    mitem.classList.remove('buyable');
  }
  // const findItem = item.find((i) => i.name === itemName);
  // findItem.count--;
  // mitem.textContent = `${itemName}(${itemPrice})(${findItem.count})`;
  // mitem.setAttribute('data-count', findItem.count);
}

function 음료list({ itemName }) {
  selectedItems.push(itemName);
  $selectedItems.textContent = `뽑은 음료수: ${selectedItems.join(', ')}`;
}

// function updateBuyable() {
//   const $tds = document.querySelectorAll('.drink');
//   $tds.forEach(($td) => {
//     const price = $td.getAttribute('data-price');
//     const count = $td.getAttribute('data-count');
//     if (count > 0 && $money.textContent - price >= 0) {
//       $td.classList.add('buyable');
//     } else {
//       $td.classList.remove('buyable');
//     }
//   });
// }

// function insertMoney() {
//   const money = Number(prompt('돈을 넣어주세요'));
//   if (isNaN(money)) return;
//   const totalPrice = money + Number($money.textContent);
//   $money.textContent = totalPrice;
//   updateBuyable();
// }

// function addItem(mitem) {
//   const itemName = mitem.getAttribute('data-name');
//   const itemPrice = mitem.getAttribute('data-price');
//   const findItem = item.find((i) => i.name === itemName);
//   alert(`${itemName} 재고가 없습니다.`);
//   let addNumber = Number(prompt('재고를 넣어주세요'));
//   if (isNaN(addNumber)) addNumber = 0;
//   findItem.count += addNumber;
//   mitem.textContent = `${itemName}(${itemPrice})(${findItem.count})`;
//   mitem.setAttribute('data-count', findItem.count);
//   updateBuyable();
// }
