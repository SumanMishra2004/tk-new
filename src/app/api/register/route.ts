import { NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

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

    const {
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY,
      GOOGLE_SHEET_ID,
    } = process.env;

    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
      console.warn("Google Sheets credentials are not configured in environment variables.");
      return NextResponse.json(
        { error: "Server misconfiguration: Google Sheets credentials missing." },
        { status: 500 }
      );
    }

    // Format the private key to handle literal \n strings if passed from .env
    const formattedPrivateKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");

    const auth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: formattedPrivateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, auth);
    await doc.loadInfo(); // Loads document properties and worksheets

    const sheet = doc.sheetsByIndex[0];

    // Append the row
    await sheet.addRow({
      Date: new Date().toLocaleString(),
      "Pass ID": passId,
      Name: name,
      College: college,
      Domain: domain,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to save registration to Google Sheets" },
      { status: 500 }
    );
  }
}
