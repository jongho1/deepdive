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
  const $body = document.body;
  $body.innerHTML = `<table id="자판기">
                      <thead>
                        <tr>
                          <td colspan="3">자판기</td>
                        </tr>
                      </thead>
                      <tbody>
                        ${newItem
                          .map((item) => {
                            let tr = '<tr>';
                            item.map((i) => {
                              tr += `<td class="drink" data-name="${i.name}" data-price="${i.price}">${i.name}(${i.price})</td>`;
                            });
                            tr += '</tr>';
                            return tr;
                          })
                          .join('')}
                          <tr>
                        <td>
                          <button type="button" id="insertMoney">돈 넣기</button>
                        </td>
                        <td>잔액 : <span id="money">0</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colspan="3" id="myItem">뽑은 음료수</td>
                      </tr>
                      </tbody>
                      </table>`;
}
makeTable();
const $moneyButton = document.querySelector('#insertMoney');

$moneyButton.addEventListener('click', () => {
  //돈을 입력받는다.
  const money = prompt('돈을 넣어주세요');
  if (money === null) return;
  if (isNaN(Number(money))) return;
  const $money = document.getElementById('money');
  const totalPrice = Number(money) + Number($money.textContent);
  $money.textContent = totalPrice;

  //살수있는음료수에 불을 킨다.

  //1. 아이템이 들어있는 td를 가지고 온다 // ok
  //2. 아이템의 가격이랑 잔액이랑 비교한다.
  //3. 가격이 잔액보다 작거나 같으면 불을 킨다.

  const $tds = document.querySelectorAll('.drink');
  $tds.forEach(($td) => {
    const price = $td.getAttribute('data-price');
    if (totalPrice - price >= 0) {
      $td.classList.add('buyable');
    } else {
      $td.classList.remove('buyable');
    }
  });
});
//여기까지한거 혼자 해봐요.
//음료수 누르면 잔액에서 음료수 가격만큼 빼기
//다시 잔액으로 살수있는 애들만 불들어오게 하기
