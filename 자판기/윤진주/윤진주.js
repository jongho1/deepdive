const item = [
  { name: '콜라', price: 1000, count: 5 },
  { name: '사이다', price: 1000, count: 5 },
  { name: '삼다수', price: 800, count: 5 },
  { name: '하늘보리', price: 1200, count: 5 },
  { name: '제로콜라', price: 1200, count: 5 },
  { name: '환타', price: 900, count: 5 },
];

let myDrink = [];
let totalPrice = 0;

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

const $moneyButton = document.querySelector('#insertMoney');
const $drinkInsertButton = document.querySelector('#insertDrink');
const $returnMoneyButton = document.querySelector('#getChangButton');
const $drinkButtons = document.querySelectorAll('.drink');
const $money = document.getElementById('money');

//이벤트리스너에 넣은 함수들, 재사용 가능하게 함수로 추출하기

// 돈넣기
//예외조건 먼저처리하기
//변수사용 최소화. 선언 된 변수 사용
$moneyButton.addEventListener('click', () => {
  const money = prompt('돈을 넣어주세요');
  totalPrice = $money.textContent;
  if (money === null) return;

  if (isNaN(Number(money))) return;
  const $nowMoney = totalPrice;

  totalPrice = Number(money) + Number($nowMoney);
  setDrinkList(totalPrice);

  // const money = Number(prompt('돈을 넣어주세요'));
  // if (isNaN(money)) return;
  // totalPrice = money + totalPrice;
  // setDrinkList(totalPrice);
});

// 드링크넣기
// 갯수 입력시 숫자만 받기 => 문자넣으면 에러
// $drinkButtons대신 아이템에서 찾기
// forEach 대신 findIndex쓰기
// forEach등의 함수에서는 return문 안 먹힘
$drinkInsertButton.addEventListener('click', () => {
  const drinkName = prompt('어떤 음료수를 넣을건가요?');
  const drinkCount = prompt('몇개넣을건가요');
  $drinkButtons.forEach((td, index) => {
    const selectDrinkName = td.getAttribute('data-name');

    if (drinkName === selectDrinkName) {
      item[index].count += Number(drinkCount);
      return;
    }
  });
  setDrinkList();

  // const drinkName = prompt('어떤 음료수를 넣을건가요?');
  // let drinkCount = Number(prompt('몇개넣을건가요'));
  // if (isNaN(drinkCount)) drinkCount = 0;
  // const index = item.findIndex((i) => i.name === drinkName);
  // if (index !== -1) item[index].count += drinkCount;
  // setDrinkList();
});

// 잔액반환
$returnMoneyButton.addEventListener('click', () => {
  totalPrice = 0;
  setDrinkList();
});

//return 사용한 곳은 else문 없애기
$drinkButtons.forEach((td, index) => {
  td.addEventListener('click', () => {
    const remainMoney = Number(totalPrice);
    const selectDrinkPrice = Number(td.getAttribute('data-price'));
    let drinkCount = Number(td.getAttribute('data-count'));
    const balanceMoney = remainMoney - selectDrinkPrice;
    if (balanceMoney < 0) return alert('잔액이 부족합니다');
    else {
      if (drinkCount === 0) {
        return alert('해당상품은 품절입니다');
      } else {
        totalPrice = balanceMoney;

        td.setAttribute('data-count', --drinkCount);
        item[index].count = drinkCount;

        const selectDrinkName = td.getAttribute('data-name');
        myDrink.push(selectDrinkName);
        setMyDrink();
      }
    }
    setDrinkList();

    // const remainMoney = totalPrice;
    // const selectDrinkPrice = Number(td.getAttribute('data-price'));
    // let drinkCount = Number(td.getAttribute('data-count'));
    // const balanceMoney = remainMoney - selectDrinkPrice;
    // if (drinkCount === 0) return alert('해당상품은 품절입니다');
    // if (balanceMoney < 0) return alert('잔액이 부족합니다');
    // totalPrice = balanceMoney;
    // td.setAttribute('data-count', --drinkCount);
    // item[index].count = drinkCount;
    // const selectDrinkName = td.getAttribute('data-name');
    // myDrink.push(selectDrinkName);
    // setMyDrink();
    // setDrinkList();
  });
});

// 표 상태 업데이트

function setDrinkList() {
  $drinkButtons.forEach(($td, index) => {
    const price = $td.getAttribute('data-price');

    if (totalPrice - price >= 0 && item[index].count > 0) {
      $td.classList.add('buyable');
      $td.setAttribute('data-count', item[index].count);
    } else $td.classList.remove('buyable');

    $td.textContent =
      item[index].name +
      '(' +
      item[index].price +
      ')' +
      '(' +
      item[index].count +
      ')';
    $money.textContent = totalPrice;
  });
}

// 뽑은 음료수
function setMyDrink() {
  const myDrinkText = document.querySelector('#pick');
  myDrinkText.textContent = myDrink.toString();
}
