import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { updateSaleAndAccess } from "@/app/actions/payments";

const HM_TOKEN = process.env.HOTTOK;

export const POST = async (req: Request) => {
  try {
    // Validate Hotmart token
    const hmReceivedToken = headers().get("x-hotmart-hottok") ?? "";

    if (HM_TOKEN !== hmReceivedToken) {
      return new NextResponse(
        JSON.stringify({ error: "Invalid Hotmart token" }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Parse the raw body of the request
    const rawBody = await req.json();
    // Extract relevant data from the webhook payload
    console.log("rawbody", rawBody);

    const { id, event, data } = rawBody;

    console.log("id", id);
    console.log("event", event);
    console.log("data", data);

    // Handle different event types
    switch (event) {
      case "PURCHASE_APPROVED":
        console.log("purchase approved");
      case "PURCHASE_COMPLETE":
        console.log('purchase Complete')
        await updateSaleAndAccess(data);
        break;
      case "PURCHASE_CANCELED":
        console.log("purchase cancelled");
      case "PURCHASE_REFUNDED":
      case "PURCHASE_CHARGEBACK":
        console.log(`Purchase cancelled or refunded: ${event}`);
        break;
      case "PURCHASE_DELAYED":
        console.log("Purchase delayed");
        break;
      default:
        console.log(`Unhandled event type: ${event}`);
    }

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
