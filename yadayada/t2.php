<?php

// Include the previous file
require_once 'yadayada/t2.php';

// Define a class for managing user orders
class UserOrder {
  private $orderId;
  private $user;
  private $items;
  private $totalPrice;
  private $shippingAddress;

  public function __construct($orderId, $user, $items, $totalPrice, $shippingAddress) {
    $this->orderId = $orderId;
    $this->user = $user;
    $this->items = $items;
    $this->totalPrice = $totalPrice;
    $this->shippingAddress = $shippingAddress;
  }

  public function getOrderId() {
    return $this->orderId;
  }

  public function getUser() {
    return $this->user;
  }

  public function getItems() {
    return $this->items;
  }

  public function getTotalPrice() {
    return $this->totalPrice;
  }

  public function getShippingAddress() {
    return $this->shippingAddress;
  }

  public function addItem($item) {
    $this->items[] = $item;
  }

  public function removeItem($itemId) {
    foreach ($this->items as $key => $item) {
      if ($item['id'] === $itemId) {
        unset($this->items[$key]);
        break;
      }
    }
  }

  public function updateTotalPrice() {
    $total = 0;
    foreach ($this->items as $item) {
      $total += $item['price'];
    }
    $this->totalPrice = $total;
  }

  public function updateShippingAddress($newAddress) {
    $this->shippingAddress = $newAddress;
  }
}

// Create a new user order
$order = new UserOrder('123456', $user, [], 0, '789 Oak St');

// Add items to the order
$order->addItem(['id' => 'item1', 'name' => 'Item 1', 'price' => 10]);
$order->addItem(['id' => 'item2', 'name' => 'Item 2', 'price' => 20]);
$order->addItem(['id' => 'item3', 'name' => 'Item 3', 'price' => 30]);

// Update the total price of the order
$order->updateTotalPrice();

// Display order information
echo "Order ID: " . $order->getOrderId() . "<br>";
echo "User: " . $order->getUser()->getFullName() . "<br>";
echo "Items: <br>";
foreach ($order->getItems() as $item) {
  echo "- " . $item['name'] . " ($" . $item['price'] . ")<br>";
}
echo "Total Price: $" . $order->getTotalPrice() . "<br>";
echo "Shipping Address: " . $order->getShippingAddress() . "<br>";

// Update the shipping address of the order
$order->updateShippingAddress('456 Maple St');

// Display updated order information
echo "<br>Updated Shipping Address: " . $order->getShippingAddress() . "<br>";

?>
