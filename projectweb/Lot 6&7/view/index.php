<?php
// Start the session and include the controller
session_start();
require_once '../controller/mainController.php';

// Render the home page
displayHome();