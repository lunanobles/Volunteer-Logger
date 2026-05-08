/*class Volunteer {
    constructor(name, hours_total, last_update) {
        this.name = name;
        this.hours_total = hours_total;
        this.last_update = last_update;
    }

    AddHours(hours) {
        this.hours_total += hours;
    }

    SubtractHours(hours) {
        this.hours_total -= hours;
    }

    OverrideHours(hours) {
        this.hours_total = hours;
    }
}*/

LoadData();

var test_string = document.getElementById("test_string");
var name_dropdown = document.getElementById("volunteer_name");
var hours_box = document.getElementById("add_hours");
var submit_button = document.getElementById("submit_button");
var name_display = document.getElementById("show_name");
var hours_display = document.getElementById("show_hours");
var last_display = document.getElementById("show_last");

async function LoadData() {
    const response = await fetch("./Database/external.json");
    
    if (!response.ok) {throw new Error('Error from network!');} // If the network can't find the file

    const volunteers = await response.json();

    WriteData(volunteers);

    return volunteers;
}

function WriteData(volunteer_data) {
    for (let i = 0; i < Object.keys(volunteer_data).length; i++) {
        name_dropdown.innerHTML += `<option>${Object.keys(volunteer_data)[i]}</option>`;
    }
}

submit_button.addEventListener("click", event => {
    alert(`${name_dropdown.value}, ${hours_box.value}`);
    
    // Looking for a way to edit, and then save volunteers.json
    
    // This DOWNLOADS a new JSON
    const blob = new Blob([Object.keys(LoadData())], {type:"application/json"});

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "volunteers.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})






/*name_dropdown.addEventListener("change", event => {

    const current_volunteer = event.target.value;

    test_string.innerText = event.target.value;

    for (let i = 0; i < all_volunteers; i++) {
        if (current_volunteer == all_volunteers[i].name) {
            name_display.innerText  = all_volunteers[i].name;
            hours_display.innerText = all_volunteers[i].hours_total;
            last_display.innerText  = all_volunteers[i].last_update;
        }
        else {
            test_string.innerText = "ERR";
        }
    }

});
*/




