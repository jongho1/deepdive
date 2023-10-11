function insertMoney() {
  //자판기 돈 입력하고 표시하기
  const v = prompt('돈 입력');
  if (v === null) return;
  let money = Number(v);
  if (isNaN(money)) {
    alert('숫자만 입력 가능!');
    money = 0;
  }
  //해당금액으로 살 수 있는 것들 표시하기.
  const $money = document.getElementById('money');
  let totalPrice = Number($money.innerText);
  checkBuyableItem(money + totalPrice);
}

function checkBuyableItem(money) {
  document.getElementById('money').innerText = money;
  const $table = document.querySelector('#자판기');
  const $btns = $table.querySelectorAll('.item');

  $btns.forEach(($btn) => {
    const price = Number($btn.dataset.price);
    if (price <= money) $btn.classList.add('buyable');
    else $btn.classList.remove('buyable');
  });
}

function selectItem($btn) {
  const $money = document.getElementById('money');
  let totalPrice = Number($money.innerText);
  const itemPrice = Number($btn.dataset.price);
  if (itemPrice > totalPrice) return alert('돈을 더 넣으세요');
  checkBuyableItem(totalPrice - itemPrice);

  //뽑은 아이템 표시
  const $myItem = document.getElementById('myItem');
  const itemName = $btn.dataset.name;

  $myItem.innerText += ` ${itemName}`;
}

document.getElementById('insertMoney').addEventListener('click', insertMoney);
