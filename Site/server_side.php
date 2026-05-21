<?php
// Allow requests from your local server (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // 3Read the raw JSON payload sent by JavaScript fetch()
    $jsonData = file_get_contents('php://input');

    // 4. Validate that the data is actual JSON
    if (json_decode($jsonData) === null) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid JSON data received."]);
        exit;
    }

    // 5. Define the path to your JSON file 
    // This points to "../Database/volunteers.json" relative to where this PHP file sits
    $filePath = __DIR__ . '/../Database/volunteers.json';

    // 6. Write the data to the file
    if (file_put_contents($filePath, $jsonData) !== false) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Volunteers updated successfully!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to write data to file. Check folder permissions."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method Not Allowed. Use POST."]);
}
?>