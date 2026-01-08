import { NextRequest, NextResponse } from "next/server";
import { SalesRecord } from "@/app/data/salesTypes";
import { validateToken, getTokenFromHeader } from "@/app/lib/auth";
import { connectToDatabase } from "@/app/lib/db";
import { Sales } from "@/app/lib/models";

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
  // Verify authentication
  if (!verifyAuth(request)) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid or missing token" },
      { status: 401 }
    );
  }

  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    interface QueryFilter {
      date?: string | { $gte: string; $lte: string };
    }
    const query: QueryFilter = {};

    // Filter by single date
    if (date) {
      query.date = date;
    }

    // Filter by date range
    if (startDate && endDate) {
      query.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const sales = await Sales.find(query).sort({ createdAt: -1 }).lean().exec();

    return NextResponse.json(sales);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Error fetching sales:", errorMessage);
    return NextResponse.json(
      { error: `Failed to fetch sales: ${errorMessage}` },
      { status: 500 }
    );
  }
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
    await connectToDatabase();
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

    const sale = await Sales.create(newRecord);
    return NextResponse.json(sale.toObject(), { status: 201 });
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
    await connectToDatabase();
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter required" },
        { status: 400 }
      );
    }

    const sale = await Sales.findOneAndUpdate(
      { id },
      { $set: { ...body, id } },
      { new: true }
    ).lean();

    if (!sale) {
      return NextResponse.json(
        { error: "Sales record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(sale);
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
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter required" },
        { status: 400 }
      );
    }

    const result = await Sales.deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Sales record not found" },
        { status: 404 }
      );
    }

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
