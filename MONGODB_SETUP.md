# MongoDB Setup Guide for Peace Bake Bakery

This guide walks you through setting up MongoDB for the Peace Bake Bakery application.

## Option 1: MongoDB Atlas (Cloud - Recommended)

### Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and sign up with your email
3. Verify your email address

### Step 2: Create a Cluster

1. After login, click "Create a Deployment"
2. Choose **Shared** (Free tier)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region close to you
5. Give your cluster a name (e.g., "peace-bake")
6. Click "Create Deployment"

### Step 3: Get Connection String

1. In the cluster dashboard, click **"Connect"**
2. Choose **"Drivers"** option
3. Select **"Node.js"** and version **5.9 or later**
4. Copy the connection string
5. Replace `<username>` and `<password>` with your database credentials
6. Replace `myFirstDatabase` with `peace-bake`

Example:

```
mongodb+srv://admin:mypassword@cluster.mongodb.net/peace-bake
```

### Step 4: Set Environment Variable

1. Create a `.env.local` file in your project root
2. Add the MongoDB connection string:

```
MONGODB_URI=mongodb+srv://admin:mypassword@cluster.mongodb.net/peace-bake
AUTH_SECRET=your-random-secret-key-here
DASHBOARD_USERS=[{"username":"admin","password":"your-password","role":"admin"}]
```

## Option 2: Local MongoDB

### Step 1: Install MongoDB

- **macOS**: `brew install mongodb-community`
- **Windows**: Download from [MongoDB Community](https://www.mongodb.com/try/download/community)
- **Linux**: Follow [official guide](https://docs.mongodb.com/manual/installation/)

### Step 2: Start MongoDB

```bash
# macOS
brew services start mongodb-community

# Linux/Windows
mongod
```

### Step 3: Set Environment Variable

Create `.env.local`:

```
MONGODB_URI=mongodb://localhost:27017/peace-bake
AUTH_SECRET=your-random-secret-key-here
DASHBOARD_USERS=[{"username":"admin","password":"your-password","role":"admin"}]
```

## Step 5: Verify MongoDB Connection

### Install Dependencies

```bash
npm install mongoose ts-node dotenv
```

### Run Migration Script

```bash
# Migrate existing sales.json data to MongoDB
node app/scripts/migrate-to-mongodb.js
```

This script will:

- ✅ Migrate all sales records from `sales.json` to MongoDB
- ✅ Create a default admin user
- ✅ Set up MongoDB collections and indexes
- ✅ Load environment variables from `.env.local` (requires dotenv)

**Troubleshooting**: If you get "MONGODB_URI not found", make sure:

1. You've installed dotenv: `npm install dotenv`
2. You've created `.env.local` with your MongoDB URI
3. The script is run from the project root directory

**Note**: To overwrite existing data, use:

```bash
node app/scripts/migrate-to-mongodb.js --force
```

### Test Connection

Start the dev server and check MongoDB logs:

```bash
npm run dev
```

Visit `http://localhost:3000/sales` and login with:

- **Username**: admin
- **Password**: (whatever you set in DASHBOARD_USERS)

## Database Schema

### Sales Collection

```json
{
  "id": "sale-1704067415525",
  "date": "2024-01-01",
  "time": "15:33:35",
  "breadSize": "Jumbo",
  "price": 1500,
  "quantity": 2,
  "amount": 3000,
  "profit": 1844,
  "debtor": "John Doe",
  "customerType": "Consumer",
  "dispatcher": "Dispatcher Name",
  "notes": "Additional notes",
  "createdAt": "2024-01-01T14:33:35.525Z"
}
```

### DashboardUser Collection

```json
{
  "username": "admin",
  "password": "hashedPassword", // In production, should be hashed
  "role": "admin"
}
```

## Common Issues & Solutions

### ❌ "MONGODB_URI not found"

**Solution**: Make sure `.env.local` file exists with `MONGODB_URI` set

### ❌ "Connection refused"

**Solution**:

- For Atlas: Check internet connection and IP whitelist
- For Local: Make sure MongoDB service is running

### ❌ "Authentication failed"

**Solution**: Verify username/password in connection string

## Next Steps

1. Update your admin password in MongoDB for production
2. Create additional dashboard users if needed
3. Set a strong `AUTH_SECRET` for JWT tokens
4. Update privacy policies and contact information

## Useful MongoDB Commands

```bash
# Connect to local MongoDB
mongosh

# List all databases
show databases

# Use peace-bake database
use peace-bake

# View collections
show collections

# View sales records
db.sales.find().pretty()

# View dashboard users
db.dashboardusers.find().pretty()

# Delete all sales (warning: destructive!)
db.sales.deleteMany({})
```

## Production Security Notes

⚠️ **Before deploying to production:**

1. **Change default admin password**

   - Update the password in MongoDB Atlas
   - Generate strong random passwords

2. **Use environment variables**

   - Never commit `.env.local` to git
   - Use `.env.example` as template
   - Set variables in hosting platform (Vercel, Heroku, etc.)

3. **Enable MongoDB authentication**

   - Create separate database users for different roles
   - Use strong passwords (16+ characters)

4. **Set AUTH_SECRET**

   - Generate a random 32+ character string
   - Use a secure random generator: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

5. **Enable IP whitelisting** (MongoDB Atlas)
   - Only allow your application server IP
   - Or use VPN/private endpoint

## Support

For MongoDB help:

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas Support](https://support.mongodb.com/)
