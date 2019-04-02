import {from, interval, of} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';

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


export {
    sample7_1,
    sample7_2,
    sample7_3
}
