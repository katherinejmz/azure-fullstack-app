<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = htmlspecialchars($_POST["name"]);
  $email = htmlspecialchars($_POST["email"]);

  echo "Merci, $name. Nous avons bien reçu votre message à $email.";
} else {
  echo "Méthode non autorisée.";
}
?>