import { NextRequest, NextResponse } from "next/server";
import { SalesRecord } from "@/app/data/salesTypes";
import * as fs from "fs";
import * as path from "path";

// Path to sales data file
const getSalesFilePath = () => {
  return path.join(process.cwd(), "data", "sales.json");
};

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Load sales data from file
const loadSalesData = (): SalesRecord[] => {
  ensureDataDir();
  const filePath = getSalesFilePath();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading sales data:", error);
  }
  return [];
};

// Save sales data to file
const saveSalesData = (data: SalesRecord[]) => {
  ensureDataDir();
  const filePath = getSalesFilePath();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET: Fetch all sales records or filter by date
export async function GET(request: NextRequest) {
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
    console.error("Error creating sales record:", error);
    return NextResponse.json(
      { error: "Failed to create sales record" },
      { status: 500 }
    );
  }
}

// PUT: Update sales record
export async function PUT(request: NextRequest) {
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
    console.error("Error updating sales record:", error);
    return NextResponse.json(
      { error: "Failed to update sales record" },
      { status: 500 }
    );
  }
}

// DELETE: Delete sales record
export async function DELETE(request: NextRequest) {
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
    console.error("Error deleting sales record:", error);
    return NextResponse.json(
      { error: "Failed to delete sales record" },
      { status: 500 }
    );
  }
}
