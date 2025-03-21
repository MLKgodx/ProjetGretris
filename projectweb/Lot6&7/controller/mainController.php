<?php
// Include necessary models
require_once '../model/db_connection.php';

// Function to render the home view
function displayHome()
{
    include_once '../view/header.php';
    include_once '../view/home.php';
    include_once '../view/footer.php';
}