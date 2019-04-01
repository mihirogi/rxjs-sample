// const button = document.querySelector('.button');
// button!.addEventListener('click', (event: any) => {
//     console.log(`${(event.target as HTMLButtonElement).textContent} is clicked!!`);
// });

import {fromEvent} from 'rxjs';

const button = document.querySelector('.button');

fromEvent(button!, 'click')
  .subscribe(
      (event: any) => {
          console.log(`${(event.target as HTMLButtonElement).textContent} is clicked!!`);
      }
  );
