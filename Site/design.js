/// Show/Hide Delete Form

var logger_signin   = document.getElementById("sign_in");
var name_dropdown   = document.getElementById("volunteer_names");
var delete_form    = document.getElementById("form_delete");
var volunteer_mode = document.getElementById("delete_volunteer");
var event_mode     = document.getElementById("delete_event");
var switch_form    = document.getElementById("show_hide_delete_form");
var delete_event   = document.getElementById("event_to_delete_dropdown");
var name_delete    = document.getElementById("volunteer_to_delete");
var delete_message = document.getElementById("confirmation_text_to_copy");
var delete_input   = document.getElementById("delete_confirmation");
var delete_mode    = document.getElementById("show_hide_volunteer_mode");

switch_form.addEventListener("click", event => {

    if (logger_signin.value === "...Not Signed In...")
    {
        switch_form.checked = false;
        alert("You must be signed in to use this feature.");
        return;
    }

    if (name_dropdown.value === "...Select a Volunteer...")
    {
        switch_form.checked = false;
        alert("You must select a volunteer to use this feature.");
        return;
    }

    if (name_dropdown.value === "...New Volunteer...")
    {
        switch_form.checked = false;
        alert("You must select a volunteer to use this feature; you may not use new volunteers.");
        return;
    }

    if (delete_form.style.display === "none" ||
        delete_form.style.display === "")
        delete_form.style.display = "block";
    else
        delete_form.style.display = "none";
});

delete_mode.addEventListener("click", event => {
    if (volunteer_mode.style.display === "none" ||
        volunteer_mode.style.display === "")
    {
        volunteer_mode.style.display = "block";
        event_mode.style.display = "none";
        delete_input.value = "";
    }
    else
    {
        volunteer_mode.style.display = "none";
        event_mode.style.display = "block";
        delete_input.value = "";

        
        if (delete_input.value === delete_message.innerText)
        {
            delete_button.removeAttribute("disabled");
        }
        else
        {
            delete_button.setAttribute("disabled", true);
        }
    }
});

delete_input.addEventListener("change", event => {
    if (delete_input.value === delete_message.innerText)
    {
        delete_button.removeAttribute("disabled");
    }
    else
    {
        delete_button.setAttribute("disabled", true);
    }
});