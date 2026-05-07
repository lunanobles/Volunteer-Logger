class Volunteer {
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
}


var test_string = document.getElementById("test_string");
var name_dropdown = document.getElementById("volunteer_name");
var name_display = document.getElementById("show_name");
var hours_display = document.getElementById("show_hours");
var last_display = document.getElementById("show_last");

var all_volunteers = [
    new Volunteer("Jane Doe", 20, "01/01/2000"),
    new Volunteer("Jason Borhne", 5000, "02/05/1990"),
    new Volunteer("New Person", 12, "01/01/2026")
];


for (i = 0; i < all_volunteers.length; i++) {

    name_dropdown.innerHTML += `<option>${all_volunteers[i].name}</option>`;

    test_string.innerText += `${all_volunteers[i].name}, ${all_volunteers[i].hours_total}, ${all_volunteers[i].last_update}\n`;
}


name_dropdown.addEventListener("change", event => {

    const current_volunteer = event.target.value;

    test_string.innerText = event.target.value;

    for (i = 0; i < all_volunteers; i++) {
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





