//1. 가변인자를 처리하여 아래와 같은 결과를 리턴하는 함수를 만들기
arguments(1); // 1
arguments(1, 2); // 3
arguments(1, 2, 3); // 6
arguments(1, 2, 3, 4); // 10
arguments(1, 2, 3, 4, 5); // 15
function arguments() {}
//2. var, let, const 의 차이점을 호이스팅과 관련지어서 설명

//3. Falsy 한 값 아는대로 적고 false 와 falsy의 차이점 적기
{
  //4.
  const a = '가나' && (!'다라' || !'마바'); // a = ?
  //5. 위 a값에 '가나' 가 할당되게 논리 연산자를 바꾸기
}

{
  //6. 아래 a를 true로 바꾸기
  const a = 'aa';
}

{
  //7. 아래의 객체에 age 프로퍼티 추가하고 자기 나이 넣기
  const a = { name: '이름' };
  //8. move라는 메소드 추가하기
}

{
  //9.다음 코드에서 잘 못된 부분 수정하기
  const a = { name: 'product', cnt: 10 };
  function product(product) {
    if (product.cnt < 10) product.cnt += 10;
  }
  product(a);
}

{
  //10. 다음함수의 결과값은?
  function fn(f, l) {
    let num = 10;
    return function () {
      for (let i = 0; i < l.length; i++) {
        num += f(l[i]);
      }
      return num;
    };
  }

  const a = fn((n) => n, [1, 2, 3]);
  a(); // ?
}
