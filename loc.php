<?php
// Function to get IP address
function getIPAddress() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

// Function to get location data from IP address using an API
function getLocationData($ip) {
    $apiKey = "YOUR_API_KEY"; // Replace with your actual API key
    $locationAPIURL = "http://ip-api.com/json/$ip?fields=city,regionName,country";
    
    $ch = curl_init($locationAPIURL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $locationData = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($locationData, true);
}

// Get user's IP address
$userIP = getIPAddress();

// Get location data using an external API
$locationData = getLocationData($userIP);

// Extract relevant location information
$city = $locationData['city'];
$region = $locationData['regionName'];
$country = $locationData['country'];

// Open or create an SQLite database
$db = new SQLite3('location_data.db');

// Create the table if it doesn't exist
$query = "CREATE TABLE IF NOT EXISTS user_locations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip_address TEXT,
            city TEXT,
            region TEXT,
            country TEXT
          )";
$db->exec($query);

// Insert user location data into the database
$insertQuery = "INSERT INTO user_locations (ip_address, city, region, country)
                VALUES ('$userIP', '$city', '$region', '$country')";
$db->exec($insertQuery);

// Close the database connection
$db->close();

echo "Location data for IP $userIP (City: $city, Region: $region, Country: $country) has been retrieved and stored in the database.";
?>
