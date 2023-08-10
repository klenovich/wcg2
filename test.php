<?php
// Welcome the user with a personalized message
$userName = "John";
echo "Welcome, $userName! This is your personalized test PHP file.<br>";

// Calculate the area of a rectangle
$length = 8;
$width = 5;
$area = $length * $width;
echo "The area of a rectangle with length $length and width $width is: $area<br>";

// Generate a random number between 1 and 10
$randomNumber = rand(1, 10);
echo "Here's a random number for you: $randomNumber<br>";

// Create an associative array of student grades
$studentGrades = array(
    "Alice" => 85,
    "Bob" => 92,
    "Eve" => 78,
    "Mallory" => 60
);

// Display the grades and calculate the average
$totalGrades = 0;
foreach ($studentGrades as $student => $grade) {
    echo "Grade of $student: $grade<br>";
    $totalGrades += $grade;
}

$averageGrade = $totalGrades / count($studentGrades);
echo "Average grade: $averageGrade<br>";

// Perform a string manipulation
$originalString = "Hello, how's it going?";
$uppercaseString = strtoupper($originalString);
$reversedString = strrev($originalString);

echo "Original string: $originalString<br>";
echo "Uppercase string: $uppercaseString<br>";
echo "Reversed string: $reversedString<br>";

// Simulate a simple shopping cart
class Product {
    public $name;
    public $price;

    public function __construct($name, $price) {
        $this->name = $name;
        $this->price = $price;
    }
}

$products = array(
    new Product("Shirt", 25),
    new Product("Jeans", 40),
    new Product("Shoes", 60)
);

$totalPrice = 0;
echo "Products in your cart:<br>";
foreach ($products as $product) {
    echo "{$product->name} - {$product->price}$<br>";
    $totalPrice += $product->price;
}

echo "Total price: $totalPrice$<br>";

// Get the current day of the week
$currentDay = date("l");
echo "Today is $currentDay<br>";

// Thank the user for using the test file
echo "Thank you, $userName, for trying out this PHP script!";
?>
