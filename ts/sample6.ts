// #### Filtering Operators ####

import {from, interval, of, pipe} from 'rxjs';
import {distinctUntilChanged, filter, skip, take} from 'rxjs/operators';

// filter : Observableから流れてくる値に対して、条件がtrueになるものをObservableとして返す
const sample6_1 = () => {
    from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .pipe(
            filter(x => x % 2 === 0)
        )
        .subscribe(
            (x) => console.log(x),
            (error: Error) => console.log(error),
            () => console.log('#### - completed - ####')
        );
};

// take : Observableから流れてくる値に対して、指定した回数だけ、値を受け取る。すべて受け取るとcompleteイベントが発火する
// skip : Observableから流れてくる値に対して、指定した回数だけ、値の受け取りをスキップする。
const sample6_2 = () => {
    interval(1000)
        .pipe(
            skip(2)
        )
        .pipe(
            take(5)
        )
        .subscribe(
            (x) => console.log(x),
            (error: Error) => console.log(error),
            () => console.log('#### - completed - ####')
        );
};

// distinctUntilChanged : Observableから流れてくる値に対して、前回の値から変化したものだけ受けとり、Observableとして返す
// numberやstringのようなプリミティブなものはそのままよしなに前回と比較してくれる
const sample6_3 = () => {
    from([1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4])
        .pipe(
            distinctUntilChanged()
        )
        .subscribe(
            (x) => console.log(x),
            (error: Error) => console.log(error),
            () => console.log('#### - completed - ####')
        );
};

// distinctUntilChanged
// 流れてくる値がObjectの場合は、filterのように条件を書く必要がある
type Person = {
    age: number,
    name: string
}

const sample6_4 = () => {
    of<Person>(
        {age: 4, name: "bob"},
        {age: 5, name: "alice"},
        {age: 6, name: "tom"},
        {age: 7, name: "tom"},
        {age: 8, name: "jakson"})
        .pipe(
            distinctUntilChanged((prev: Person, current: Person) => prev.name == current.name)
        )
        .subscribe(
            (x) => console.log(x),
            (error: Error) => console.log(error),
            () => console.log('#### - completed - ####')
        );
};

export {
    sample6_1,
    sample6_2,
    sample6_3,
    sample6_4
}
