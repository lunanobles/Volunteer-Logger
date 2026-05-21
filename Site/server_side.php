<?php

//* Allowing headers
header("Access-Control-Allow-Origin: *"); // Allow from anywhere
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content
header("Content-Type: application/json"); // Allow JSON


// Handles POST requests from files
if ($_SERVER['REQUEST_METHOD'] === 'POST')
{

    // Get the JSON from the information.js fetch()
    $json_data = file_get_contents("php://input");

    // Define a path to the JSON file
    $json_path = __DIR__ . "../Database/volunteers.json";

    // Write the incoming data to the .json file
    if (file_put_contents($json_path, $json_data) !== false)
    {
        http_response_code(200); // Let the host know it worked
        echo json_encode(["status" => "success", "message" => "Volunteers updated successfully!"]); // encode
    }
    else {
        http_response_code(500); // Invalid permmission
        echo json_encode(["status" => "error", "message" => "Failed to write!"]); // ugh
    }
        

}

>