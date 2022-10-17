<?php
$servername = "localhost";
$database = "beadando";
$username = "root";
$password = "";
$charset = "utf8";

try {
    $dsn = "mysql:host=$servername;port=3306;dbname=$database;charset=$charset";
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo;
}
catch (PDOException $e) {
    echo "Connection failed: ". $e->getMessage();
}
