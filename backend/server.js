const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
  origin: 'https://<votre-front>.azurestaticapps.net'
}));

// Function to get DB password from Key Vault
async function getDbPassword() {
  const credential = new DefaultAzureCredential();
  const vaultUrl = "https://<votre-keyvault>.vault.azure.net";
  const client = new SecretClient(vaultUrl, credential);
  const secret = await client.getSecret("db-password");
  return secret.value;
}

// Connect to DB and define API
app.get('/api/hello', async (req, res) => {
  try {
    const dbPassword = await getDbPassword();

    const config = {
      user: '<votre-user>',
      password: dbPassword,
      server: '<votre-server>.database.windows.net',
      database: 'fullstack-database',
      options: {
        encrypt: true
      }
    };

    await sql.connect(config);
    const result = await sql.query`SELECT TOP 1 message FROM messages`;
    res.json({ message: result.recordset[0].message });

  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});