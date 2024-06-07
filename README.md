## Créer la base de données

**Dans votre client MySQL,** créez la base de données :

```sql
CREATE DATABASE main;
```

## Installer les dépendances

Assurez-vous d'être à la racine du répertoire du projet :

```bash
cd e-learning/
```

Installez les dépendances en utilisant le gestionnaire de paquets de votre choix :

```bash
npm install
# ou
pnpm install
```

## Définir les variables d'environnement

À la racine du projet, créez un fichier `.env`. Le fichier doit contenir les clés suivantes :

```
# Utilisé pour se connecter à la base de données MySQL
DB_HOST=localhost
DB_USER=root
DB_PASS=pass
DB_NAME=main

# Utilisé pour chiffrer les cookies de session
SECRET_KEY=thisisntaverygoodsecretkey
```

## Créer les tables

Générez un script de migration à partir des fichiers `schema.ts` :

```bash
npm run generate
# ou
pnpm generate
```

Exécutez le script de migration pour créer les tables de la base de données :

```bash
npm run migrate
# ou
pnpm migrate
```

## Remplir la base de données

**Dans votre client MySQL,** exécutez `populate.sql` pour insérer des données factices dans la base de données :

```
-- Assurez-vous d'ajuster le chemin pour qu'il pointe correctement vers le script
source /tmp/e-learning/populate.sql;
```

## Démarrer le serveur

Vous pouvez maintenant démarrer le serveur de développement :

```bash
npm run dev
# ou
pnpm dev
```

Depuis votre navigateur, accédez à l'application à l'adresse `http://localhost:5173/`
