import { DashboardUser } from "@/app/data/salesTypes";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Get dashboard users from environment
function getDashboardUsers(): DashboardUser[] {
  try {
    const usersEnv = process.env.DASHBOARD_USERS;
    if (!usersEnv) {
      console.error("DASHBOARD_USERS environment variable not set");
      return [];
    }
    return JSON.parse(usersEnv);
  } catch (error) {
    console.error("Failed to parse DASHBOARD_USERS:", error);
    return [];
  }
}

// Simple JWT-like token generation (note: in production, use a proper JWT library)
function generateToken(data: { username: string; role: string }): string {
  // Create a secure token by combining timestamp, data, and a secret
  const payload = Buffer.from(
    JSON.stringify({
      ...data,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    })
  ).toString("base64");

  // Sign it with a simple hash (in production, use proper JWT library with HS256)
  const secret =
    process.env.AUTH_SECRET || "peace-bake-secret-key-change-in-production";
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64");

  return `${payload}.${signature}`;
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Find user from environment (in production, query a secure database)
    const dashboardUsers = getDashboardUsers();
    const user = dashboardUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      // Delay response on failed attempts to prevent brute force
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      username: user.username,
      role: user.role,
    });

    // Return success response with token
    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          username: user.username,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
