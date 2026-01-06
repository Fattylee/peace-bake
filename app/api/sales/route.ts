import { NextRequest, NextResponse } from "next/server";
import { SalesRecord } from "@/app/data/salesTypes";
import { validateToken, getTokenFromHeader } from "@/app/lib/auth";
import {
  loadSalesData,
  saveSalesData,
  initializeSalesData,
} from "@/app/lib/salesData";

// Initialize sales data on first API call
let initialized = false;

// Middleware to verify authentication
function verifyAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  const token = getTokenFromHeader(authHeader);

  if (!token) return false;
  const payload = validateToken(token);
  return payload !== null;
}

// GET: Fetch all sales records or filter by date
export async function GET(request: NextRequest) {
  // Initialize on first call
  if (!initialized) {
    initializeSalesData();
    initialized = true;
  }

  // Verify authentication
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid or missing token" },
      { status: 401 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  let sales = loadSalesData();

  // Filter by single date
  if (date) {
    sales = sales.filter((s) => s.date === date);
  }

  // Filter by date range
  if (startDate && endDate) {
    sales = sales.filter((s) => s.date >= startDate && s.date <= endDate);
  }

  // Sort by date and time (newest first)
  sales.sort(
    (a, b) =>
      new Date(`${b.date} ${b.time}`).getTime() -
      new Date(`${a.date} ${a.time}`).getTime()
  );

  return NextResponse.json(sales);
}

// POST: Create new sales record
export async function POST(request: NextRequest) {
  // Verify authentication
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid or missing token" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const newRecord: SalesRecord = {
      id: `sale-${Date.now()}`,
      date: body.date || new Date().toISOString().split("T")[0],
      time: body.time || new Date().toTimeString().split(" ")[0],
      breadSize: body.breadSize,
      price: body.price,
      quantity: body.quantity,
      amount: body.amount,
      profit: body.profit,
      debtor: body.debtor,
      customerType: body.customerType,
      dispatcher: body.dispatcher,
      notes: body.notes,
      createdAt: new Date().toISOString(),
    };

    const sales = loadSalesData();
    sales.push(newRecord);
    saveSalesData(sales);

    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating sales record:", errorMessage);
    return NextResponse.json(
      { error: `Failed to create sales record: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// PUT: Update sales record
export async function PUT(request: NextRequest) {
  // Verify authentication
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid or missing token" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id } = body;

    const sales = loadSalesData();
    const index = sales.findIndex((s) => s.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Sales record not found" },
        { status: 404 }
      );
    }

    sales[index] = {
      ...sales[index],
      ...body,
      id, // preserve id
      createdAt: sales[index].createdAt, // preserve original creation time
    };

    saveSalesData(sales);
    return NextResponse.json(sales[index]);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error updating sales record:", errorMessage);
    return NextResponse.json(
      { error: `Failed to update sales record: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// DELETE: Delete sales record
export async function DELETE(request: NextRequest) {
  // Verify authentication
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid or missing token" },
      { status: 401 }
    );
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter required" },
        { status: 400 }
      );
    }

    const sales = loadSalesData();
    const filteredSales = sales.filter((s) => s.id !== id);

    if (filteredSales.length === sales.length) {
      return NextResponse.json(
        { error: "Sales record not found" },
        { status: 404 }
      );
    }

    saveSalesData(filteredSales);
    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error deleting sales record:", errorMessage);
    return NextResponse.json(
      { error: `Failed to delete sales record: ${errorMessage}` },
      { status: 500 }
    );
  }
}
