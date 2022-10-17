<?php
include("database.php");
$_POST = json_decode(file_get_contents("php://input"), true);

try {
    $relationship = [
        ':username' => $_POST["username"],
        ':points' => $_POST["points"]
    ];
    
    $sql = "INSERT INTO scoreboard (username, points) VALUES (:username, :points)";
    $stmt= $pdo->prepare($sql);
    $stmt->execute($relationship);

} catch(Exception $e) {
    $pdo = null;
    echo json_encode($e->getMessage());
    return;
}

$pdo = null;

echo json_encode("OK");