import { fromEvent } from 'rxjs';

const sample2 = () => {
    const button = document.querySelector('.button2');

    fromEvent(button!, 'click')
        .subscribe(
            (event: any) => {
                console.log(`${(event.target as HTMLButtonElement).textContent} is clicked!!`);
            }
        );
}

export {sample2};