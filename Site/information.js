/// VARIABLES ///
/// Document Variables
var test_el = document.getElementById("test_string");
var name_dropdown = document.getElementById("volunteer_names");
var logger_signin = document.getElementById("sign_in");
var hours_numeric = document.getElementById("volunteer_hours");
var new_name = document.getElementById("new_volunteer_name");
var new_hours = document.getElementById("new_volunteer_hours");
var add_button = document.getElementById("add_to_volunteer_button");
var override_button = document.getElementById("override_volunteer_button");
var create_button = document.getElementById("new_volunteer_button");
/// Data Variables
const JSON_URL_VOLUNTEERS = "../Database/volunteers.json";
const JSON_URL_LOGGERS = "../Database/loggers.json";

(async function() {

    
    const data_volunteers = await GetJSONAsString(JSON_URL_VOLUNTEERS);
    const volunteers      = await Object.keys(data_volunteers);
    const data_loggers    = await GetJSONAsString(JSON_URL_LOGGERS);
    const loggers         = await Object.keys(data_loggers);

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
     * @returns A JSON.parse() of the data found at url
     */
    async function GetJSONAsString(url) {
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

    /**
     * On click of the add-to-volunter-hours button, we edit and update the data in the JSON.
     */
    add_button.addEventListener("click", async event => {

        for (i = 0; i < volunteers.length; i++) {
            if (name_dropdown.value == volunteers[i]) {
                data_volunteers[volunteers[i]].hours_total += +hours_numeric.value;
                data_volunteers[volunteers[i]].updated_when = new Date();
                data_volunteers[volunteers[i]].updated_by_whom = logger_signin.value;

                var updated_volunteer = {
                    'hours_total':hours_numeric.value + data_volunteers[volunteers[i]].hours_total,
                    'updated_when':new Date(),
                    'updated_by_whom':logger_signin.value
                }

                fetch(JSON_URL_VOLUNTEERS, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(new_volunteer)
                });
            }
        }

        test_el.innerText += JSON.stringify(data_volunteers) + 
                             "\n-------------------------------\n";
    })


    /**
     * On click of the override-volunter-hours button, we edit and update the data in the JSON.
     */
    override_button.addEventListener("click", async event => {
        for (i = 0; i < volunteers.length; i++) {
            if (name_dropdown.value == volunteers[i]) {
                // my concern is that this doesn't actually edit the JSON yet
                data_volunteers[volunteers[i]].hours_total = +hours_numeric.value;
                data_volunteers[volunteers[i]].updated_when = new Date();
                data_volunteers[volunteers[i]].updated_by_whom = logger_signin.value;

                var updated_volunteer = {
                    'hours_total':hours_numeric.value,
                    'updated_when':new Date(),
                    'updated_by_whom':logger_signin.value
                }

                fetch(JSON_URL_VOLUNTEERS, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(new_volunteer)
                });
            }
        }

        test_el.innerText += JSON.stringify(data_volunteers) + 
                             "\n-------------------------------\n";
    })


    /**
     * On click of the override-volunter-hours button, we create a new volunteer and add it to the JSON.
     */
    create_button.addEventListener("click", async event => {
        var new_volunteer = {
            [new_name.value]: {
                'hours_total':new_hours.value,
                'updated_when':new Date(),
                'updated_by_whom':logger_signin.value
            }
        }

        fetch(JSON_URL_VOLUNTEERS, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(new_volunteer)
        });

        test_el.innerText += JSON.stringify(new_volunteer) + 
                             "\n-------------------------------\n";
    });



    

})()