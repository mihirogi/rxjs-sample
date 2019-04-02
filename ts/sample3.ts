import {concat, from, of} from "rxjs";

// #### Converting events to Operators ####

// of : 引数の値を発行するObservableを作成する
const sample3_1 = () => {
    const number = of(1);
    number.subscribe(
        (x) => console.log(x),
        (error: Error) => console.log(error),
        () => console.log('#### - completed - ####')
    );
};

// of : 引数が可変長でもok
const sample3_2 = () => {
    const numbers = of(10, 20, 30);
    numbers.subscribe(
        (x) => console.log(x),
        (error: Error) => console.log(error),
        () => console.log('#### - completed - ####')
    );
};

// concat : 引数のObservableを連結したObservableを作成する
const sample3_3 = () => {
    const numbers = of(10, 20, 30);
    const letters = of('foo', 'bar', 'baz');

    concat(numbers, letters).subscribe(
        (x) => console.log(x),
        (error: Error) => console.log(error),
        () => console.log('#### - completed - ####')
    );
};

// from : 配列などのIterableな引数を、順番に流すObservableを作成する
const sample3_4 = () => {
    const array = from(['a','b','c']);
    array.subscribe(
        (x) => console.log(x),
        (error: Error) => console.log(error),
        () => console.log('#### - completed - ####')
    );
};

// from : 文字列を渡した場合は、1文字ずつIterateするStringIteratorに変換される
const sample3_5 = () => {
    const array = from('Hello');
    array.subscribe(
        (x) => console.log(x),
        (error: Error) => console.log(error),
        () => console.log('#### - completed - ####')
    );
};

export {
    sample3_1,
    sample3_2,
    sample3_3,
    sample3_4,
    sample3_5
};
