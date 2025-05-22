const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const app = express();
const port = process.env.PORT || 3000;

// Middleware CORS : autoriser le frontend hébergé sur Azure
app.use(cors({
  origin: 'https://frontendfullstack.azurewebsites.net'
}));

// Middleware pour parser les corps JSON (utile pour les POST)
app.use(express.json());

// Récupération du mot de passe via Azure Key Vault
async function getDbPassword() {
  const credential = new DefaultAzureCredential();
  const vaultUrl = "https://fullstackvault.vault.azure.net"; // Remplace par le nom exact de ton Key Vault
  const client = new SecretClient(vaultUrl, credential);
  const secret = await client.getSecret("db-password"); // Nom exact du secret
  return secret.value;
}

// Route de test : connexion à la base et lecture du premier message
app.get('/api/hello', async (req, res) => {
  try {
    const dbPassword = await getDbPassword();

    const config = {
      user: 'katherine', // Ton identifiant SQL
      password: dbPassword,
      server: 'snk-sql-server2k25.database.windows.net',
      database: 'snk_fullstack_db',
      options: {
        encrypt: true
      }
    };

    await sql.connect(config);
    const result = await sql.query`SELECT TOP 1 message FROM messages`;
    res.json({ message: result.recordset[0]?.message || 'Aucun message trouvé' });

  } catch (error) {
    console.error('Erreur de connexion ou de requête SQL :', error);
    res.status(500).send('Erreur serveur');
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
