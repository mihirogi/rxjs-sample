import {ConnectableObservable, interval, of, Subject} from 'rxjs';
import {map, publish, refCount, take, tap} from 'rxjs/operators';

// subscribeしないと値が流れないパターン : COLD

// subscribeしない限りは、値が流れない例
// (tap : 昔あったdo operatorの新しいやつ)
const sample7_1 = () => {
    of(1, 2, 3, 4, 5)
        .pipe(take(5))
        .pipe(tap(console.log));
};

// 値が流れる例
const sample7_2 = () => {
    of(11, 22, 33, 44, 55)
        .pipe(take(5))
        .pipe(tap(console.log))
        .subscribe();
};

// COLDの場合は、同じObservableをsubscribeした場合、ストリームが複製される

const sample7_3 = () => {
    const clock$ = interval(1000)
        .pipe(take(5))
        .pipe(map(x => {
            console.log(`do : ${x}`);
            return x;
        }));

    clock$.subscribe(x => console.log(`     A : ${x}`));

    setTimeout(() => {
        clock$.subscribe(x => console.log(`         B : ${x}`))
    }, 2500)
};


// subscribeしなくても値が流れるパターン : HOT
// connect : ConnectableObservableの値を、Subscribeされていなくても、ストリームに流す
const sample7_4 = () => {
    const clock$ = interval(1000)
        .pipe(
            take(10),
            tap(x => {
                console.log(`do : ${x}`);
            }),
            publish()
        ) as ConnectableObservable<number>;

    clock$.connect();

    setTimeout(() => {
        clock$.subscribe(x => console.log(`         B : ${x}`))
    }, 2500);
};

// ストリームの分岐
const sample7_5 = () => {
    const clock$ = interval(1000)
        .pipe(
            take(10),
            tap(x => {
                console.log(`do : ${x}`);
            }),
            publish()
        ) as ConnectableObservable<number>;

    clock$.connect();

    setTimeout(() => {
        clock$
            .pipe(map(x => x * 10))
            .subscribe(x => console.log(`         B : ${x}`))
    }, 2500);
};

// refCount : Observer(Subscribeしてる)が1つ以上あるときはConnectを維持して、0になるとConnectを解除する
// 最初にSubscribeされた瞬間に、ストリームに値が流れ出す
const sample7_6 = () => {
    const clock$ = interval(1000)
        .pipe(
            take(10),
            tap(x => {
                console.log(`do : ${x}`);
            }),
            publish(),
            refCount()
        ) as ConnectableObservable<number>;

    clock$.pipe(
        map(x => x * 10)
    ).subscribe(x => console.log(`         B : ${x}`));
};


export {
    sample7_1,
    sample7_2,
    sample7_3,
    sample7_4,
    sample7_5,
    sample7_6
}
