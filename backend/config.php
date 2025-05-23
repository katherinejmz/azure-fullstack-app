<?php

$host = 'mysql-backend-php-snk.mysql.database.azure.com';
$dbname = 'app_db';
$user = 'katherine@mysql-backend-php-snk';
$pass = getenv('DB_PASSWORD'); // variable d'environnement

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connexion réussie";
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}
?>
