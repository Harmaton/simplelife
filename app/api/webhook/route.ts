import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from '../../../lib/db';
import { updateSaleAndAccess } from "@/app/actions/payments";
// Define your expected Hotmart token here
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
    const {
      id,
      event,
      data
    } = rawBody;

    // Handle different event types
    switch (event) {
      case "PURCHASE_APPROVED":
      case "PURCHASE_COMPLETE":
        const buyerDetails = {
          email: data.buyer.email,
          name: data.buyer.name,
          phone: data.buyer.checkout_phone,
          address: data.buyer.address
        };
        const productDetails = {
          name: data.product.name,
          id: data.product.id,
          ucode: data.product.ucode
        };
        await updateSaleAndAccess(data, id, buyerDetails, productDetails);
        break;
      case "PURCHASE_CANCELED":
      case "PURCHASE_REFUNDED":
      case "PURCHASE_CHARGEBACK":
        // Here you can add logic to handle cancellations, refunds, or chargebacks
        console.log(`Purchase cancelled or refunded: ${event}`);
        break;
      case "PURCHASE_BILLET_PRINTED":
        console.log("Billet printed");
        break;
      case "PURCHASE_PROTEST":
        console.log("Purchase under protest");
        break;
      case "PURCHASE_EXPIRED":
        console.log("Purchase expired");
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
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
