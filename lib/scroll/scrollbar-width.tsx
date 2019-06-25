export default function scrollbarWidth() {
    let
        div = document.createElement('div'),
        boxStyle = div.style,
        width;

    boxStyle.position = 'absolute';
    boxStyle.top = boxStyle.left = '-9999px';
    boxStyle.width = boxStyle.height = '100px';
    boxStyle.overflow = 'scroll';

    document.body.appendChild(div);

    width = div.offsetWidth - div.clientWidth;

    document.body.removeChild(div);

    return width;
}

