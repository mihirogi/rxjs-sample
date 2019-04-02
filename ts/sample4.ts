import {interval} from 'rxjs';

// #### Time-based Operators ####

// interval : 指定した間隔ごとに、連番を発行する
// subscribeをやめたいときは、unsubscribeする
const sample4_1 = () => {
    const intervalSource = interval(1000);
    const subscription = intervalSource.subscribe(
        (x) => console.log(x),
        (error: Error) => console.log(error),
        () => console.log('#### - completed - ####')
    );
    setTimeout(() => subscription.unsubscribe(),5000);
};

export {
    sample4_1
};
