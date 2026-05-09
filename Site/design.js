var form_add = document.getElementById("form_existing_volunteer");
var form_new = document.getElementById("form_new_volunteer");
var switch_button = document.getElementById("form_selector_button");

(function() {
    if (switch_button.checked) {
        form_add.style.display = "none";
        form_new.style.display = "block";
    }
    else {
        form_add.style.display = "block";
        form_new.style.display = "none";
    }
})()

switch_button.addEventListener("change", event => {
    if (switch_button.checked) {
        form_add.style.display = "none";
        form_new.style.display = "block";
    }
    else {
        form_add.style.display = "block";
        form_new.style.display = "none";
    }
})