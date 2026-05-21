/// VARIABLES ///
/// Document Variables
var test_el = document.getElementById("test_string");
var name_dropdown = document.getElementById("volunteer_names");
var logger_signin = document.getElementById("sign_in");
var hours_numeric = document.getElementById("volunteer_hours");
var event_date_box = document.getElementById("event_date");
var event_desc_box = document.getElementById("volunteer_opprotunity");
var new_name = document.getElementById("new_volunteer_name");
var new_hours = document.getElementById("new_volunteer_hours");
var add_button = document.getElementById("add_to_volunteer_button");
var override_button = document.getElementById("override_volunteer_button");
var create_button = document.getElementById("new_volunteer_button");
/// Data Variables
const JSON_URL_VOLUNTEERS = "../Database/volunteers.json";
const JSON_URL_LOGGERS = "../Database/loggers.json";
const PHP_URL = "./server_side.php";

(async function() {

    
    const data_volunteers   = await GetJSONData(JSON_URL_VOLUNTEERS);
    const volunteers        = await Object.keys(data_volunteers);
    const data_loggers      = await GetJSONData(JSON_URL_LOGGERS);
    const loggers           = await Object.keys(data_loggers);

    // Make a new option for each volunteer and logger in .jsons
    name_dropdown.innerHTML = "<option>..new pick..</option>";
    logger_signin.innerHTML = "<option>... Not Signed In ...</option>";

    for (let i = 0; i < volunteers.length; i++)
        name_dropdown.innerHTML += `<option>${volunteers[i]}</option>`;

    for (let i = 0; i < loggers.length; i++)
        logger_signin.innerHTML += `<option>${loggers[i]}</option>`;


    /**
     * Finds and returns a JSON file at url as a JSON.parse
     * @param {string} url 
     * @returns A JSON.stringify() of the data found at `url`
     */
    async function GetJSONData(url) {
        // Get the JSON promise response
        const response = await fetch(url);
        // If the network can't find the file, throw and error
        // If this is thrown, the locator/directory is likely messed up --> fetch("<HERE>")
        if (!response.ok) {throw new Error('Error from network!');} 
        // Convert the response into a JS object
        const volunteers_json = await response.json();
        // Returns an object
        return volunteers_json;
    }

    /**
     * On click of the add-to-volunter-hours button, we edit and update the data in the JSON.
     */
    add_button.addEventListener("click", async event => {
    
        const current_volunteer = name_dropdown.value;
        const event_hours       = parseFloat(hours_numeric.value);
        const event_date        = event_date_box.value;
        const event_description = event_desc_box.value;
        const log_name          = logger_signin.value;
        const log_date          = new Date().toLocaleDateString();

        const new_entry = [event_hours, event_description, event_date, log_date, log_name];

        // Grab fresh data
        const all_volunteers = await GetJSONData(JSON_URL_VOLUNTEERS);

        // Edit data
        all_volunteers[current_volunteer].push(new_entry);

        // Return edited data
        const response = await fetch('server_side.php', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(all_volunteers)
        });

        // Check the response from PHP
        const result = await response.json();

        if (response.ok && result.status === "success") {
            test_el.innerText += "Successfully updated via XAMPP Apache!" + "\nNew Data: " + JSON.stringify(all_volunteers);
        } else {
            test_el.innerText += "Server Error: " + result.message;
        }

    });


    /**
     * On click of the override-volunter-hours button, we edit and update the data in the JSON.
     */
    override_button.addEventListener("click", async event => {
        
    })


    /**
     * On click of the override-volunter-hours button, we create a new volunteer and add it to the JSON.
     */
    create_button.addEventListener("click", async event => {
        
    });





})()