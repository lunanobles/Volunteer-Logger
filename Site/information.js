/// VARIABLES ///
/// Document Variables
var test_el         = document.getElementById("test_string");
var name_dropdown   = document.getElementById("volunteer_names");
var name_custom     = document.getElementById("volunteer_names_new");
var logger_signin   = document.getElementById("sign_in");
var hours_numeric   = document.getElementById("volunteer_hours");
var event_date_box  = document.getElementById("event_date");
var event_dropdown  = document.getElementById("volunteer_opprotunity");
var event_custom    = document.getElementById("volunteer_opprotunity_new");
var name_delete     = document.getElementById("volunteer_to_delete");
var event_delete    = document.getElementById("event_to_delete_dropdown");
var delete_message  = document.getElementById("confirmation_text_to_copy");
var delete_input    = document.getElementById("delete_confirmation");
var delete_mode     = document.getElementById("show_hide_volunteer_mode");

var submit_button   = document.getElementById("submit_button");
var delete_button   = document.getElementById("delete_button");
var download_button = document.getElementById("download_button");

var table_body      = document.getElementById("volunteers_table_body");
var switch_form    = document.getElementById("show_hide_delete_form");


/// Data Variables
const JSON_URL_VOLUNTEERS = "../Database/volunteers.json";
const JSON_URL_LOGGERS = "../Database/loggers.json";
const PHP_URL = "./server_side.php";


(async function() {







    //~~~~~~~~~~~~~~~~~~~~~~~~//
    /// AddEventListener()s! ///
    //~~~~~~~~~~~~~~~~~~~~~~~~//


//#region SUBMIT
    /**
     * On click of the add-to-volunter-hours button, we edit and update the data in the JSON.
     */
    submit_button.addEventListener("click", async event => {
    
        const current_volunteer = name_dropdown.value;
        const event_hours       = parseFloat(hours_numeric.value);
        const event_date        = event_date_box.value;
        const event_description = event_dropdown.value;
        const log_name          = logger_signin.value;
        const log_date          = new Date();


        // Check if any data is missing
        if (current_volunteer == "...Select a Volunteer..." ||
            event_hours       == NaN ||
            event_date        == "" ||
            event_description == "..Select an Event...")
        {
            alert("⚠️ Some data fields are missing. Please complete all information areas.")
            return;
        }



        const new_entry = [event_hours, event_description, event_date, log_date, log_name];

        // Grab fresh data
        const all_volunteers = await GetJSONData(JSON_URL_VOLUNTEERS);

        // Edit data
        if (current_volunteer === "...New Volunteer...")
        {
            all_volunteers[name_custom.value] = [
                [
                    event_hours,
                    event_description,
                    event_date,
                    log_date,
                    log_name
                ]
            ]
        }
        else
        {
            all_volunteers[current_volunteer].push(new_entry);
        }

        // Return edited data
                                  // I wrote my own PHP handler for the POST HTTP
        const response = await fetch('server_side.php', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(all_volunteers)
        });

        // Check the response from PHP
        const result = await response.json();

        if (response.ok && result.status === "success") { // If everything is good
            alert("🎉 Successfully updated! 🎉\n🕒 This page will reload ~30s after sumbit, to reload data for the site.");

            setTimeout(() => {
                location.reload(); // reload the page to update the table
            }, 30000); // wait 30sec to allow for seeing the success message
                       // and so the data can be parsed in time

        } else { // If stuff failed :(
            alert("⚠️ Server Error: " + result.message);
        }


        //location.reload(); // Update the table by refershing and getting data again

    });
//#endregion

//#region Old override and create buttons
    /**
     * On click of the override-volunteer-hours button, we edit and update the data in the JSON.
     */
//    override_button.addEventListener("click", async event => {
//        
//    })


    /**
     * On click of the create-new-volunteer button, we create a new volunteer and add it to the JSON.
     */
    // create_button.addEventListener("click", async event => {

    //     event.preventDefault(); // Tells the button to not do the defualt, but act based on the code below

    //     const current_volunteer = new_name.value;
    //     const event_hours       = parseFloat(new_hours.value);
    //     const event_date        = new_event_date_box.value;
    //     const event_description = new_event_desc_box.value;
    //     const log_date          = new Date().toLocaleDateString();
    //     const log_name          = logger_signin.value;

    //     //const new_entry = {[event_hours, event_description, event_date, log_date, log_name]};


    //     //? I'd like to do an if check here for when we are in Design V3,
    //     //? where the user can select a dropdown of volunteers, OR, seemlessly,
    //     //? create a new one by selecting "New..." and entering a name

    //     // Grab fresh data
    //     const all_volunteers = await GetJSONData(JSON_URL_VOLUNTEERS);

    //     // Edit data
    //     all_volunteers[current_volunteer] = [
    //         [
    //             event_hours,
    //             event_description,
    //             event_date,
    //             log_date,
    //             log_name
    //         ]
    //     ];

    //     // Return edited data
    //                               // I wrote my own PHP handler for the POST HTTP
    //     const response = await fetch('server_side.php', { 
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(all_volunteers)
    //     });

    //     // Check the response from PHP
    //     const result = await response.json();

    //     if (response.ok && result.status === "success") { // If everything is good
    //         test_el.innerText += "Successfully updated via XAMPP Apache!" + "\nNew Data: " + JSON.stringify(all_volunteers);

    //         setTimeout(() => {
    //             location.reload(); // reload the page to update the table
    //         }, 10000); // wait 10sec to allow for seeing the success message
    //                    // and so the data can be parsed in time

    //     } else { // If stuff failed :(
    //         test_el.innerText += "Server Error: " + result.message;
    //     }


    //     //location.reload(); // Update the table by refershing and getting data again

    // });
//#endregion

//#region DOWNLOAD
    download_button.addEventListener("click", async event => {

        test_el.innerText = "Onclick Activated";

        const content = await GetJSONData(JSON_URL_VOLUNTEERS); // Get the freshest data

        const json_string = JSON.stringify(content, null, 4); // found that 'null, 4' adds indent to the file

        const blob = new Blob([json_string], { type: 'application/json' }); // Format the data into a new URL
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `volunteer-data${new Date().toLocaleDateString().replaceAll('/', '-')/*Replace All makes date slashes into hyphen*/}.json`; // Default new file name
        link.click();
        
        // Clean up
        URL.revokeObjectURL(url);
    })
//#endregion


//#region DELETE

    delete_button.addEventListener("click", event => {

        var is_volunteer_mode = delete_mode.checked;

        if (is_volunteer_mode)
        {
            const message = delete_message.innerText;
            const input = delete_input.value;
            const current_volunteer = name_delete.value;

            if (input === message)
            {
                //! Delete the volunteer

                alert(`You have successfully deleted ${current_volunteer}.`);
            }
            else
            {
                delete_button.setAttribute("disabled", true);
            }
        }
        else 
        {



        }
        

    });



    name_dropdown.addEventListener("change", event => {

        
        name_delete.innerText = name_dropdown.value;
        

        event_delete.innerHTML = `<option>...Select an Event...</option>`;

        const local_events = [];

        
        var event_data = data_volunteers[name_dropdown.value]; // Get that volunteer's event data
        
        for (let i = 0; i < event_data.length; i++)
        {
            local_events.push(
                event_data[i][1] // And add every event to the Set
            );
        }

        local_events.forEach(event => {
            event_delete.innerHTML += `<option>${event}</option>`; // Add the data to the HTML
        });
    })


//#endregion



    //~~~~~~~~~~~~~~~~~~//
    /// Fetching Data! ///
    /// Editing HTML!  ///
    //~~~~~~~~~~~~~~~~~~//
//#region Fetching Data & Editing HTML


    const data_volunteers   = await GetJSONData(JSON_URL_VOLUNTEERS);
    const volunteers        = await Object.keys(data_volunteers);
    const data_loggers      = await GetJSONData(JSON_URL_LOGGERS);
    const loggers           = await Object.keys(data_loggers);

    // Make a new option for each volunteer and logger in .jsons
    name_dropdown.innerHTML  = "<option selected disabled>...Select a Volunteer...</option>\n<option>...New Volunteer...</option>";
    logger_signin.innerHTML  = "<option selected disabled>...Not Signed In...</option>";
    event_dropdown.innerHTML = "<option selected disabled>...Select an Event...</option>\n<option>...New Event...</option>";

    for (let i = 0; i < volunteers.length; i++)
    {
        name_dropdown.innerHTML += `<option>${volunteers[i]}</option>`;
    }

    for (let i = 0; i < loggers.length; i++)
        logger_signin.innerHTML += `<option>${loggers[i]}</option>`;



    // createing new events for the dropdown

    const unique_events = new Set();

    for (const volunteer_name in data_volunteers) /*For each volunteer in the list*/
    {
        const event_data = data_volunteers[volunteer_name]; // Get that volunteer's event data

        for (let i = 0; i < event_data.length; i++)
        {
            unique_events.add(
                event_data[i][1] // And add every event to the Set
            );
        }
    }

    unique_events.forEach(event => {
        event_dropdown.innerHTML += `<option>${event}</option>`; // Add the data to the HTML
    })

    




    //#region The Table 😭

    // Heavy commenting because OMG JS IS **NOT** C#... AT ALL

    // Creating the table elements
    table_body.innerHTML = ""; // Remove any placeholder data and whatnot


    if (!data_volunteers) // if the data isn't loading
    {
        table_body.innerHTML = `<tr><td colspan="3">Loading Volunteer Data...</td></tr>`;
    }


    let volunteer_index = 0; // Not using a for loop's i because I want to use this var for ID naming

    var grand_total_hours = 0;

    for (const [volunteer_name,                events] of Object.entries(data_volunteers))
             // ^ current volunteer's name     ^ [[],...] of event details //
    {

        //* Getting total hours for this volunteer
        const total_hours = events.reduce((total, current_event) => {
            grand_total_hours += Number(current_event[0]);
            return total + Number(current_event[0]);
        }, 0); // reduce() is a bit of foreign function to me, but it seems to work, so I won't question it



        //* Creating a new sub-table for the dropdown portion of the content (IT WEIRD ToT)
        // Building the sub-table FIRST to have the data prepared to embed into the overall one
        // make the header
        var per_event_HTML = 
        ` 
            <table class="table_details">
                <thead>
                    <tr>
                        <th>Event Description</th>
                        <th>Date</th>
                        <th>Hours</th>
                    </tr>
                </thead>
                <tbody>
        `;

        events.forEach(event => {
            // events is an array of arrays of data
            // for every event in events,
            // there is an array that had hours, desc, and date -- as per the JSON
            const hours = event[0];       // hours from THIS event
            const description = event[1]; // desc of this event
            const date = event[2];        // date of this event
            // event[] is in this order because of the JSON order
            //// event[3] is Log Date()

            per_event_HTML += 
            //* this creates a new row for every event any one volunteer has
            `
                <tr>
                    <td>${description}</td>
                    <td>${date}</td>
                    <td>${hours}</td>
                </tr>
            `; 
        });

        per_event_HTML +=  `</tbody></table>`; // close the table



        //* Constructing the actual main/overview table row
        const detail_row_ID = `details-${volunteer_index}`; // define a unique ID for each volunteer
        
        const per_volunteer_HTML = 
        `
            <tr class="volunteer_row">
                <td>${volunteer_name}</td>
                <td>${total_hours.toFixed(2) /*this is number:D2 in C#*/}</td>
                <td>
                    <button type="button" onclick="toggle_events_details('${detail_row_ID  /*this function is PER VOLUNTEER!!!! :D*/}')">
                        <span class="material-symbols-rounded">arrow_drop_down</span>
                    </button>
                </td>
            </tr>
            <tr id="${detail_row_ID}" class="event_row">
                <td colspan="3">
                    <div class="table_more_info">
                        ${per_event_HTML /*this creates a whole bunch of rows of events*/}
                    </div>
                </td>
            </tr>
        `;

        table_body.insertAdjacentHTML('beforeend', per_volunteer_HTML); // place the new data at the end

        volunteer_index++; // start everything over with the next volunteer
    }

    table_body.insertAdjacentHTML('beforebegin', `<tr><td>Total</td><td>${grand_total_hours}</td></tr><br/>`)

    //#endregion

    test_el.innerText = "JS finished";

//#endregion


    //~~~~~~~~~~~~~~~~~~~~~//
    /// Helper Functions! ///
    //~~~~~~~~~~~~~~~~~~~~~//
//#region Helper Functions!


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


    //#region Checking for overlap in custom textboxes

    name_custom.addEventListener("change", event => {
        // Check if name already exists and warn if so
        for (let i = 0; i < volunteers.length; i++)
        {
            if (name_custom.value.toLowerCase() === volunteers[i].toLowerCase()) // using toLowerCase() to ingore capitalisation
            {
                alert("This volunteer already exists. Use a different name, or select this volunteer from the dropdown.")
                name_custom.value = ""; // prevent the user from using the name
            }
        }
    })


    

    event_custom.addEventListener("change", event => {

        var event_titles = unique_events.keys();

        // Check if event already exists and warn if so
        for (let i = 0; i < unique_events.size; i++)
        {
            var input = event_custom.value;
            var check = event_titles.next().value;

            if (input.toLowerCase() === check.toLowerCase()) // using toLowerCase() to ingore capitalisation
            {
                alert("This event title already exists. Use a different name, or select this event from the dropdown.")
                event_custom.value = ""; // prevent the user from using the name
                break; // break to stop checking
            }
        }
    })

    //#endregion

//#endregion

})()


// This is the toggle function for individual volunteer's event data
// Placed outside of async all function to avoid errors
function toggle_events_details(row_ID)
{
    const more_information = document.getElementById(row_ID); // this is where making an ID for every element helps us!

    if (more_information.style.display === "none" ||
        more_information.style.display === "") // if not showing
    // I put "none" first because that is the starting case
        more_information.style.display = "table-row"; // show it
    else
        more_information.style.display = "none"; // otherwise, hide it
}


//#region Active/Inactive custom textboxes

name_dropdown.addEventListener("change", event => {
    // Enable name_custom if "...New Volunteer..." is selected
    if (name_dropdown.value === "...New Volunteer...")
    {
        name_custom.removeAttribute("disabled");
        name_custom.setAttribute("required", true);
        name_custom.setAttribute("title", "Create a new volunteer by entering a unique name...");
        name_custom.setAttribute("placeholder", "Jane Doe");
    }
    else
    {
        name_custom.setAttribute("disabled", true);
        name_custom.removeAttribute("required");
        name_custom.setAttribute("title", "Select '...New Volunteer...' to use this...");
        name_custom.setAttribute("placeholder", "...");
    }
})



event_dropdown.addEventListener("change", event => {
    // Enable name_custom if "...New Volunteer..." is selected
    if (event_dropdown.value === "...New Event...")
    {
        event_custom.removeAttribute("disabled");
        event_custom.setAttribute("required", true);
        event_custom.setAttribute("title", "Create a new volunteer by entering a unique name...");
        event_custom.setAttribute("placeholder", "Jane Doe");
    }
    else
    {
        event_custom.setAttribute("disabled", true);
        event_custom.removeAttribute("required");
        event_custom.setAttribute("title", "Select '...New Volunteer...' to use this...");
        event_custom.setAttribute("placeholder", "...");
    }
})

//#endregion