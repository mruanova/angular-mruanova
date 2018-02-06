let arr = ["3px", "23px", "43px", "63px", "83px", "103px", "123px"],
    el = document.getElementById('selector'),
    i = 0;
function updateText() {
    el.style.top = arr[i];
    i++;
    if (i == arr.length) {
        i = 0;
    }
}
setInterval(updateText, 300);