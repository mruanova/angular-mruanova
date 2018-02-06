let modal = document.getElementById('myModal');
let btn = document.getElementById("about");
let span = document.getElementsByClassName("close")[0];

// show modal ABOUT
btn.onclick = function () {
    modal.style.display = "block";
};

// hide modal ABOUT on click X
span.onclick = function () {
    modal.style.display = "none";
};

// hide modal ABOUT on click anywhere outside the modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};