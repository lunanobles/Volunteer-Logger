<?php
// Allow requests from your local server (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
// Don't allow caching (because this data is fluid)
header("Expires: Thu, 01 Jan 1970 00:00:00 UTC");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
// General information
header("Content-Type: application/json");

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Read the raw JSON payload sent by JavaScript fetch()
    $json_data = file_get_contents('php://input');

    // Validating that the data is actual JSON
    if (json_decode($json_data) === null) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid JSON data received."]);
        exit;
    }

    // Define the path to your JSON file 
    // This points to "../Database/volunteers.json" relative to where this PHP file sits
    $file_path = __DIR__ . '/../Database/volunteers.json';

    // Write the data to the file
    if (file_put_contents($file_path, $json_data) !== false) {
        http_response_code(200); // All good
        echo json_encode(["status" => "success", "message" => "Volunteers updated successfully!"]); // Yayy!
    } else {
        http_response_code(500); // Server error
        echo json_encode(["status" => "error", "message" => "Failed to write data to file, check folder permissions."]); // AGGOUHGFUOSHGPOUHSGF:OJH
    }
}
?>