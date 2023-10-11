//자판기 물품
const item = [
  { name: '콜라', price: 1000, count: 5 },
  { name: '사이다', price: 1000, count: 5 },
  { name: '삼다수', price: 800, count: 5 },
  { name: '하늘보리', price: 1200, count: 5 },
  { name: '제로콜라', price: 1200, count: 5 },
  { name: '환타', price: 900, count: 5 },
];

const myItem = [];

//물품 만들기
// function makeItem() {
//   const $table = document.querySelector('#items table');
//   item.forEach((i) => {
//     const $tr = document.createElement('tr');
//     const $td1 = document.createElement('td');
//     const $td2 = document.createElement('td');
//     const $td3 = document.createElement('td');
//     $td1.innerHTML = i.name;
//     $td2.innerHTML = `가격 : <input type="number" value="${i.price}">`;
//     $td3.innerHTML = `수량 : <input type="number" value="${i.count}">`;
//     $tr.appendChild($td1);
//     $tr.appendChild($td2);
//     $tr.appendChild($td3);
//     $table.querySelector('tbody').appendChild($tr);
//   });
// }

//자판기에 물품 넣기
function insertItems() {
  const $table = document.querySelector('#자판기');
  const $tds = $table.querySelectorAll('.item-td');
  $tds.forEach(($td, i) => {
    $td.innerHTML = `<button type="button" class="item" data-name="${item[i].name}" data-price="${item[i].price}" onClick="selectItem(this)">${item[i].name}(${item[i].price}원)</button>`;
  });
}

// makeItem();
insertItems();
