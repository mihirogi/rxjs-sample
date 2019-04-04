// ObservableとObserverの復習

import {BehaviorSubject, interval, Observable, Observer, of, Subject} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';

const sample8_1 = () => {
    let observable$: Observable<number>;
    observable$ = interval(1000)
        .pipe(take(5))
        .pipe(map(x => {
            console.log(`do : ${x}`);
            return x;
        }));

    const observer: Observer<number> = {
        next: x => console.log(`     A : ${x}`),
        error: error => console.log(error),
        complete: () => console.log('#### - completed - ####')
    };

    observable$.subscribe(observer);
};

// subject : 任意のタイミングでイベントを流す
const sample8_2 = () => {
    const observerA: Observer<number> = {
        next: (x) => console.log(`A next: ${x}`),
        error: (err) => console.log(`A error: ${err}`),
        complete: () => console.log(`A -------- complete --------`)
    };

    const observerB: Observer<number> = {
        next: (x) => console.log(`B next: ${x}`),
        error: (err) => console.log(`B error: ${err}`),
        complete: () => console.log(`B -------- complete --------`)
    };

    const subject: Subject<number> = new Subject();
    subject.subscribe(observerA);

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.complete();

    setTimeout(() => subject.subscribe(observerB), 2000);

};

// BehaviorSubject : 直近の値を記憶して、subscribeおよびnextのタイミングで流す
const sample8_3 = () => {
    const observerA: Observer<number> = {
        next: (x) => console.log(`A next: ${x}`),
        error: (err) => console.log(`A error: ${err}`),
        complete: () => console.log(`A -------- complete --------`)
    };

    const observerB: Observer<number> = {
        next: (x) => console.log(`B next: ${x}`),
        error: (err) => console.log(`B error: ${err}`),
        complete: () => console.log(`B -------- complete --------`)
    };

    // 引数は初期値になる
    const subject: BehaviorSubject<number> = new BehaviorSubject(0);
    subject.subscribe(observerA);

    subject.next(1);
    subject.next(2);
    subject.next(3);

    setTimeout(() => subject.subscribe(observerB), 2000);

    // これをすると、直近の値はなくなる
    // subject.complete()
};


export {
    sample8_1,
    sample8_2,
    sample8_3
}
