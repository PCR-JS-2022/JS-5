## JS#5
Друг Кеши Борис (тот самый вредный товарищ, который раскритиковал сайт с фотографиями) уже давно мечтает открыть свою кофейню. В этом году он скопил достаточный капитал и уже нашел помещение, которое вот-вот возьмет в аренду.

На старте своего нового бизнеса Борис не хочет много тратиться на зарплаты сотрудникам, поэтому решил автоматизировать процесс варки кофе и заказал в одном популярном китайском магазине кофемашину (никогда так не делайте, не повторяйте ошибок Бориса).

Но вот незадача, когда Борис распаковал свою новую кофемашину, он обнаружил, что она не работает. Боря пришел к Кеше, и они, недолго думая, решили обратиться к вам за помощью, чтобы вы переписали программное обеспечение для кофемашины.

Вам предстоит реализовать достаточно простую программу, которая будет предоставлять два класса.

Класс ``Coffee`` для сущности кофе. Он должен содержать всего два поля: ``coffeName`` и ``preparationTime`` – название кофе и время его приготовления. Оба должны инициализироваться в конструкторе из аргументов.

Класс ``CoffeeMachine``. У класса кофейной машины должно быть одно обязательное поле: ``maxCup`` – максимальное кол-во чашек кофе, для которых может вариться кофе параллельно. Это поле должно инициализироваться в конструкторе из аргументов.

А еще у кофемашины должен быть один обязательный метод – ``createCoffe``. Этот метод принимает экземпляр класса ``Coffe``. Ваша задача реализовать метод ``createCoffe`` так, чтобы он возвращал ``Promise``, который выполнится только тогда, когда закончится приготовление переданного в метод ``createCoffe`` кофе.

В ``resolve`` функцию после приготовления кофе передавайте его объект.

❗Обратите внимание: кофемашина может параллельно готовить кофе только для того кол-во чашек, которое указано в поле ``maxCup``. Если у кофемашины освободилось место под новую чашку, а в очереди, кто-то ждет кофе, значит это место надо занять приготовлением нового кофе.

### Пример работы кофемашины
```js
const log = (coffee) => console.log(coffee.coffeName);

const machine = new CoffeeMachine(2);

const cappuccino = new Coffee('Капучино', 6000);
const latte = new Coffee('Латте', 1000);
const americano = new Coffee('Американо', 3000);

machine
  .createCoffee(cappuccino)
  .then(log);
machine
  .createCoffee(americano)
  .then(log);
machine
  .createCoffee(latte)
  .then(log);
machine
  .createCoffee(americano)
  .then(log);

/*
  Американо
  Латте
  Капучино
  Американо
*/
```

⭐Все мы знаем, что такие вещи, как кофемашины (особенно, с китайского магазина) имеют уровень износа.
Добавьте в класс ``CoffeeMachine`` еще одно поле: ``wearLevel``, которое будет инициализироваться из аргумента конструктора и иметь по умолчанию значение 4.
Адаптируйте логику работы метода ``createCoffe`` с учетом уровня износа кофемашины: если он выше нуля, то выполняйте приготовление, если равен или ниже, то из промиса вызывается функцию ``reject``, передавая в нее объект не приготовленного кофе.

**![](https://lh6.googleusercontent.com/5ccLqBTZxkh8w4kvXmPjhuH5gnFX8ssE3GGSa8JFlIHu5ACyUjvKakfr6E5FsrMEVa93uFQQFtC9cecB4xuDvJVtdVzRfgFOw90Rz-Hrwj5YOr33Ad9gbhXY6fWqjL7cJXHBOZSp)**
