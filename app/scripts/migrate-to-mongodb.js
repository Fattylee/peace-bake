#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * MongoDB Migration Script (CommonJS)
 * Migrates sales data from JSON file to MongoDB and initializes default admin user
 *
 * Usage:
 *   npx ts-node app/scripts/migrate-to-mongodb.js
 *   OR
 *   node app/scripts/migrate-to-mongodb.js (if compiled)
 */

// Try to load environment variables from .env.local using dotenv
try {
  require("dotenv").config({ path: ".env.local" });
} catch (error) {
  console.warn("⚠️  dotenv not installed. Install with: npm install dotenv");
  console.warn(
    "Alternatively, set environment variables before running this script:"
  );
  console.warn("  export MONGODB_URI=your_mongodb_uri");
  console.warn("  node app/scripts/migrate-to-mongodb.js\n");
}

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI environment variable not set");
  console.error("\nPlease either:");
  console.error("1. Install dotenv and create .env.local:");
  console.error("   npm install dotenv");
  console.error("   cp .env.example .env.local");
  console.error("   # Edit .env.local with your MongoDB URI");
  console.error("\n2. Or set environment variable directly:");
  console.error("   export MONGODB_URI=mongodb+srv://...");
  console.error("   node app/scripts/migrate-to-mongodb.js");
  process.exit(1);
}

// Define schemas inline
const salesSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
      required: true,
      index: true,
    },
    time: {
      type: String,
      required: true,
    },
    breadSize: {
      type: String,
      enum: ["Jumbo", "Family", "Family-Mini", "Solo"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
    debtor: {
      type: String,
      required: false,
    },
    customerType: {
      type: String,
      required: true,
      index: true,
    },
    dispatcher: String,
    notes: String,
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

const dashboardUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["sales_rep", "admin"],
      default: "sales_rep",
    },
  },
  { timestamps: true }
);

const Sales = mongoose.models.Sales || mongoose.model("Sales", salesSchema);
const DashboardUserModel =
  mongoose.models.DashboardUser ||
  mongoose.model("DashboardUser", dashboardUserSchema);

async function migrateSalesData() {
  console.log("\n📊 Migrating sales data from JSON to MongoDB...");

  const filePath = path.join(process.cwd(), "data", "sales.json");

  if (!fs.existsSync(filePath)) {
    console.log("⚠️  No sales.json file found - skipping sales migration");
    return;
  }

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const salesData = JSON.parse(data);

    console.log(`Found ${salesData.length} sales records to migrate...`);

    // Check existing records
    const existingCount = await Sales.countDocuments();
    if (existingCount > 0) {
      console.log(
        `⚠️  ${existingCount} sales records already exist in MongoDB`
      );
      console.log(
        "Run with --force flag to overwrite: node app/scripts/migrate-to-mongodb.js --force"
      );

      if (!process.argv.includes("--force")) {
        return;
      }

      console.log("Deleting existing records...");
      await Sales.deleteMany({});
    }

    // Insert sales data
    const result = await Sales.insertMany(salesData);
    console.log(`✅ Successfully migrated ${result.length} sales records`);
  } catch (error) {
    console.error("❌ Error migrating sales data:", error);
    throw error;
  }
}

async function initializeDefaultUser() {
  console.log("\n👤 Initializing default admin user...");

  try {
    const adminUser = {
      username: "admin",
      password: "admin123",
      role: "admin",
    };

    // Check if admin user exists
    const existing = await DashboardUserModel.findOne({
      username: adminUser.username,
    });

    if (existing) {
      console.log("⚠️  Admin user already exists in MongoDB");
      return;
    }

    // Create admin user
    const user = await DashboardUserModel.create(adminUser);
    console.log(`✅ Created default admin user`);
    console.log(`   Username: ${user.username}`);
    console.log(`   ⚠️  Please change the password in production!`);
  } catch (error) {
    console.error("❌ Error initializing user:", error);
    throw error;
  }
}

async function main() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    await migrateSalesData();
    await initializeDefaultUser();

    console.log("\n✅ Migration completed successfully!");
    console.log("\n📝 Next steps:");
    console.log(
      "1. Update dashboard users in MongoDB with your own credentials"
    );
    console.log("2. Start the development server: npm run dev");
    console.log("3. Login with your credentials at /sales");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

main();
