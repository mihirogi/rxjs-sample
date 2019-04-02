// #### Transforming Operators ####

import {from, fromEvent} from 'rxjs';
import {map, mapTo, scan} from 'rxjs/operators';

// map : Observableから流れてくる値に、任意の関数を適用して、Observableを返す
const sample5_1 = () => {
    from([1, 2, 3])
        .pipe(
            map(value => value * 10)
        )
        .subscribe(
            (x) => console.log(x),
            (error: Error) => console.log(error),
            () => console.log('#### - completed - ####')
        );

};

// mapTo : Observableから流れてくる値を、任意の値にして、Observableを返す
const sample5_2 = () => {
    fromEvent(document.querySelector('.button5-2')!, 'click')
        .pipe(
            mapTo(1)
        )
        .subscribe(
            (x) => console.log(x),
            (error: Error) => console.log(error),
            () => console.log('#### - completed - ####')
        );
};

// scan : Observableから流れてくる値に、任意の関数を適用して、Observableを返す。前回までの累積結果も一緒に流れてくる
// accは前回の値（中間累積値）
// oneは今回の値
// seedは、初期値?。実装みるとオプション引数
const sample5_3 = () => {
    fromEvent(document.querySelector('.button5-3')!, 'click')
        .pipe(
            mapTo(1)
        )
        .pipe(
            scan((acc, one) => acc + one)
        )
        .subscribe(
            (x) => console.log(x),
            (error: Error) => console.log(error),
            () => console.log('#### - completed - ####')
        );
};

// switchMap:



export {
    sample5_1,
    sample5_2,
    sample5_3
};
