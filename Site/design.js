/// Show/Hide Delete Form

var delete_form = document.getElementById("form_delete");
var switch_input = document.getElementById("show_hide_delete_form");

switch_input.addEventListener("click", event => {
    if (delete_form.style.display === "none" ||
        delete_form.style.display === "")
        delete_form.style.display = "block";
    else
        delete_form.style.display = "none";
});