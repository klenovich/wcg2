<?php

// Define a class for managing user accounts
class UserAccount {
  private $username;
  private $password;
  private $email;
  private $firstName;
  private $lastName;
  private $age;
  private $address;

  public function __construct($username, $password, $email, $firstName, $lastName, $age, $address) {
    $this->username = $username;
    $this->password = $password;
    $this->email = $email;
    $this->firstName = $firstName;
    $this->lastName = $lastName;
    $this->age = $age;
    $this->address = $address;
  }

  public function getUsername() {
    return $this->username;
  }

  public function getPassword() {
    return $this->password;
  }

  public function getEmail() {
    return $this->email;
  }

  public function getFullName() {
    return $this->firstName . ' ' . $this->lastName;
  }

  public function getAge() {
    return $this->age;
  }

  public function getAddress() {
    return $this->address;
  }

  public function updateEmail($newEmail) {
    $this->email = $newEmail;
  }

  public function updatePassword($newPassword) {
    $this->password = $newPassword;
  }

  public function updateAddress($newAddress) {
    $this->address = $newAddress;
  }
}

// Create a new user account
$user = new UserAccount('john_doe', 'password123', 'john.doe@example.com', 'John', 'Doe', 25, '123 Main St');

// Display user information
echo "Username: " . $user->getUsername() . "<br>";
echo "Email: " . $user->getEmail() . "<br>";
echo "Full Name: " . $user->getFullName() . "<br>";
echo "Age: " . $user->getAge() . "<br>";
echo "Address: " . $user->getAddress() . "<br>";

// Update user information
$user->updateEmail('john.doe.updated@example.com');
$user->updatePassword('newpassword456');
$user->updateAddress('456 Elm St');

// Display updated user information
echo "<br>Updated Email: " . $user->getEmail() . "<br>";
echo "Updated Address: " . $user->getAddress() . "<br>";

?>
