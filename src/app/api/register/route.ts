import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, college, domain, passId } = body;

    if (!name || !college || !domain || !passId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "registrations.xlsx");
    const workbook = new ExcelJS.Workbook();
    let worksheet: ExcelJS.Worksheet;

    if (fs.existsSync(filePath)) {
      await workbook.xlsx.readFile(filePath);
      worksheet = workbook.getWorksheet("Registrations") || workbook.addWorksheet("Registrations");
    } else {
      worksheet = workbook.addWorksheet("Registrations");
      worksheet.columns = [
        { header: "Date", key: "date", width: 20 },
        { header: "Pass ID", key: "passId", width: 15 },
        { header: "Name", key: "name", width: 30 },
        { header: "College", key: "college", width: 40 },
        { header: "Domain", key: "domain", width: 25 },
      ];
      // Make header row bold
      worksheet.getRow(1).font = { bold: true };
    }

    worksheet.addRow({
      date: new Date().toLocaleString(),
      passId,
      name,
      college,
      domain,
    });

    await workbook.xlsx.writeFile(filePath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving registration:", error);
    return NextResponse.json(
      { error: "Failed to save registration" },
      { status: 500 }
    );
  }
}
