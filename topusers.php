<?php
include("database.php");

try {
    $sql = "SELECT username, points FROM scoreboard ORDER BY points DESC LIMIT 10";
    $stmt= $pdo->prepare($sql);
    $stmt->execute();
    
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch(Exception $e) {
    $pdo = null;
    echo json_encode($e->getMessage());
    return;
}

$pdo = null;

echo json_encode($data);

