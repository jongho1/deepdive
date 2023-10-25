//상품데이터
const item = [
  { name: '콜라', price: 1000, count: 0 },
  { name: '사이다', price: 1000, count: 5 },
  { name: '삼다수', price: 800, count: 5 },
  { name: '하늘보리', price: 1200, count: 5 },
  { name: '제로콜라', price: 1200, count: 5 },
  { name: '환타', price: 900, count: 5 },
];

const pickItem = {}; // 내가 뽑은 상품

const chunkArray = (array, chunkSize) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

//빈 아이템 넣기
function addEmptyItem(item, number) {
  while (number--) item.push({ name: '', price: 0, count: 0 });
}
// 잔액 가지고 오기
function getTotalMoney(money = 0) {
  const remainMoney = Number(document.getElementById('money').textContent);
  return remainMoney + money;
}
//잔액 업데이트 하기
function updateTotalMoney(money = 0) {
  document.getElementById('money').textContent = money;
}

//구입가능한 상품 표시
function updateBuyable() {
  const $tds = document.querySelectorAll('.drink');
  $tds.forEach(($td) => {
    const price = $td.getAttribute('data-price');
    const count = $td.getAttribute('data-count');
    if (count > 0 && getTotalMoney() - price >= 0) {
      $td.classList.add('buyable');
    } else {
      $td.classList.remove('buyable');
    }
  });
}
//내가 구입한 상품 표시
function updatePickDrink(name) {
  if (pickItem[name]) pickItem[name] = ++pickItem[name];
  else pickItem[name] = 1;
  document.getElementById('pick').textContent = Object.entries(pickItem)
    .map(([key, value]) => `${key}X${value}`)
    .join(', ');
}
//아이템 가지고오기
function getItem(name) {
  return item.find((i) => i.name == name);
}
//아이템 갯수 조정
function setItemCount(name, count) {
  getItem(name).count = Number(count);
}

/* ==화면그리는 함수== */

//상품목록표시
function drawItem() {
  const $currentItem = document.getElementById('currentItem');
  $currentItem.innerHTML = `${item
    .map(
      (i) => `<button onclick="removeItem('${i.name}')">🥤 ${i.name}</button>`
    )
    .join('')}`;
}
//자판기그리기
function drawTable({ totalPrice = getTotalMoney(), pickItemName = '' } = {}) {
  drawTbody(chunkArray(item, 3));
  updateTotalMoney(totalPrice);
  updateBuyable();
  if (pickItemName) updatePickDrink(pickItemName);
}

function drawTbody(newItem) {
  const $tbody = document.getElementById('tbody');
  $tbody.innerHTML = `${newItem
    .map((item) => {
      if (item.length < 3) addEmptyItem(item, 3 - item.length);
      let tr = '<tr>';
      item.map((i) => {
        tr += `<td
                  class="drink"
                  data-name="${i.name}"
                  data-price="${i.price}"
                  data-count="${i.count}"
                  onclick="clickItem(this)"
                >
                ${i.name ? makeInnerTd(i) : ''}
              </td>`;
      });
      tr += '</tr>';
      return tr;
    })
    .join('')}`;
}

function makeInnerTd(i) {
  let icon = '';
  let count = i.count;
  while (count--) icon += `<span>🥤</span>`;
  return `<div>${i.name}</div>
  <div>${i.price}원</div>
  <div>${icon}</div>`;
}

function draw() {
  drawTable();
  drawItem();
}

/* == 이벤트 함수 == */

//돈입력
function insertMoney(text = '돈을 넣어주세요') {
  const money = Number(prompt(text));
  if (isNaN(money)) return;
  drawTable({ totalPrice: getTotalMoney(money) });
}
//상품클릭
function clickItem($td) {
  const name = $td.getAttribute('data-name');
  const price = Number($td.getAttribute('data-price'));
  const count = Number($td.getAttribute('data-count'));
  if (!name) return;
  if (count <= 0) return plusItemCount(name);
  const balance = getTotalMoney() - price;
  if (balance < 0) return insertMoney('잔액이 부족합니다. 돈을 넣어주세요');
  setItemCount(name, count - 1);
  drawTable({ totalPrice: balance, pickItemName: name });
}

//거스름돈받기
function getChange() {
  alert(`거스름돈 : ${getTotalMoney()}원`);
  drawTable({ totalPrice: 0 });
}
//재고추가
function plusItemCount(name) {
  const count = Number(prompt(`${name} 재고소진, 수량을 입력하세요`));
  if (isNaN(count)) return;
  setItemCount(name, count);
  drawTable();
}

//아이템 추가
function addItem() {
  if (getTotalMoney() !== 0) return alert('잔액이 남아있습니다.');
  const name = prompt('추가할 아이템 정보 입력');
  if (!name) return;
  if (getItem(name)) return alert('이미 있는 음료수');
  item.push({ name, price: 1000, count: 5 });
  draw();
}
//아이템 삭제
function removeItem(name) {
  if (getTotalMoney() !== 0) return alert('잔액이 남아있습니다.');
  const index = item.findIndex((i) => i.name === name);
  item.splice(index, 1);
  draw();
}

draw();
