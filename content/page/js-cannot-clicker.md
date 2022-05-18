# JS cannot clicker

```js
// A useless script that will create a div that follows the mouse and prevents you from clicking anywhere
// Also because when scrolling, the mousemove does not trigger, we make the div bigger

const div = document.createElement('div');

div.style.zIndex = 99999;

let lastDivOffsetTop;

const f = (e) => {
    div.style.top = `${e.pageY - 25}px`;
    div.style.left = `${e.pageX - 25}px`;
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.position = 'absolute';

    lastDivOffsetTop = div.offsetTop; // i dont event remember what this does
};

const f2 = () => {
    div.style.top = `0px`;
    div.style.left = `0px`;
    div.style.width = '100vw';
    div.style.height = '100vh';
    div.style.position = 'fixed';
};

const f3 = () => {
    div.style.cursor = 'pointer';
};

const f4 = () => {
    div.style.cursor = 'initial';
};

document.addEventListener('mousemove', f);
document.addEventListener('scroll', f2);
document.addEventListener('mousedown', f3);
document.addEventListener('mouseup', f4);

document.querySelector('body').append(div);
```
