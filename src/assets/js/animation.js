let tops = ["3px", "23px", "43px", "63px", "83px", "103px", "123px"],
    photos = ["assets/img/mau.jpg","assets/img/selfie.jpg","assets/img/sunglasses.jpg"],
    selector1 = document.getElementById('selector'),
    photo1 = document.getElementById('photo'),
    i = 0,
    j = 0;
function updateText() {
    selector1.style.top = tops[i];
    photo1.src = photos[j];
    i++;
    if (i == tops.length) {
        i = 0;
        j++;
        if (j == photos.length) {
            j = 0;
        }
    }
}
setInterval(updateText, 300);
