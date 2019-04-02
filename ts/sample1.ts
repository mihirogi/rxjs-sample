const sample1 = () => {
    const button = document.querySelector('.button1');
    button!.addEventListener('click', (event: any) => {
        console.log(`${(event.target as HTMLButtonElement).textContent} is clicked!!`);
    });
}

export { sample1 };