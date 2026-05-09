
////// VARIABLES //////
/// Document Variables
var test_el = document.getElementById("test_string");
var name_dropdown = document.getElementById("volunteer_names");
var hours_numeric = document.getElementById("volunteer_hours");
var add_button = document.getElementById("add_to_volunteer_button");
var override_button = document.getElementById("override_volunteer_button");
/// Data Variables
const JSON_URL = "../Database/external.json";





/** 
 * Gets and returns the current JS object in external.json.
 * @param {string} url - The URL to search for the JSON file
 * @returns {} The JSON object.
*/
async function JSONToObject(url) {
    // Get the JSON promise response
    const response = await fetch(url);
    // If the network can't find the file, throw and error
    // If this is thrown, the locator/directory is likely messed up --> fetch("<HERE>")
    if (!response.ok) {throw new Error('Error from network!');} 
    // Convert the response into a JS object
    const volunteers_json = await response.json();
    // Returns an object
    return JSON.parse(JSON.stringify(volunteers_json));
}

async function WriteToDocument() {
    // We await this because JSONToObject returns a Promise 
    // (basically an empty object []) while downloading the data.
    // Using await allows us to pause untill we have the data :)
    const data = await JSONToObject(JSON_URL_VOLUNTEERS);

    // This converts the whole object into an array of volunteer names
    var volunteers = Object.keys(data);


    // Edit the data and display
    for (let i = 0; i < volunteers.length; i++) {
        test_el.innerText += volunteers[i] + ": " + data[volunteers[i]].hours_total + "\n";
    }


    // Make a new option for each volunteer in external.json
    name_dropdown.innerHTML = "<option>..new pick..</option>";

    for (let i = 0; i < volunteers.length; i++) {
        name_dropdown.innerHTML += `<option>${volunteers[i]}</option>`;
    }

    
    test_el.innerText += "\n\n" + JSON.stringify(data) + "\n\n";

    //WriteToJSON(data);

    //test_el.innerText += "\n\n" + JSON.stringify(data) + "\n\n";

}

function WriteToJSON(new_data) {
    fetch(JSON_URL_VOLUNTEERS), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(new_data)
    }
}



/*async function GetCurrentHours() {
    fetch(JSON_URL)
        .then(response => response.json())
        .then(data => {
            const value = data[name_dropdown.value]["hours_total"]; 
            return value;
    });
}*/

WriteToDocument();

add_button.addEventListener("click", async event => {

    // We await this because JSONToObject returns a Promise 
    // (basically an empty object []) while downloading the data.
    // Using await allows us to pause untill we have the data :)
    const data = await JSONToObject(JSON_URL_VOLUNTEERS);

    // This converts the whole object into an array of volunteer names
    var volunteers = Object.keys(data);

    for (i = 0; i < volunteers.length; i++) {
        if (name_dropdown.value == volunteers[i]) {
            data[volunteers[i]].hours_total += +hours_numeric.value;
        }
    }

    WriteToDocument();
    
    test_el.innerText += "\n\n" + JSON.stringify(data) + "\n\n";
    
})


override_button.addEventListener("click", async event => {
    // We await this because JSONToObject returns a Promise 
    // (basically an empty object []) while downloading the data.
    // Using await allows us to pause untill we have the data :)
    const data = await JSONToObject(JSON_URL_VOLUNTEERS);

    // This converts the whole object into an array of volunteer names
    var volunteers = Object.keys(data);

    for (i = 0; i < volunteers.length; i++) {
        if (name_dropdown.value == volunteers[i]) {
            data[volunteers[i]].hours_total = +hours_numeric.value;
        }
    }

    WriteToDocument();
    
    test_el.innerText += "\n\n" + JSON.stringify(data) + "\n\n";
})

////// Program start - document.onLoad()
