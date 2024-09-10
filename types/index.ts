export interface FooterItem {
    title: string
    items: {
      title: string
      href: string
      external?: boolean
    }[]
  }

  export interface PurchaseData {
    id: string;
    creation_date: number;
    event: string;
    version: string;
    data: {
      product: {
        id: number;
        ucode: string;
        name: string;
        has_co_production: boolean;
      };
      affiliates: {
        affiliate_code: string;
        name: string;
      }[];
      buyer: {
        email: string;
        name: string;
        checkout_phone: string;
        address: {
          zipcode: string;
          country: string;
          number: string;
          address: string;
          city: string;
          state: string;
          neighborhood: string;
          complement: string;
          country_iso: string;
        };
      };
      producer: {
        name: string;
      };
      commissions: {
        value: number;
        currency_value: string;
        source: string;
        currency_conversion?: {
          converted_value: number;
          converted_to_currency: string;
          conversion_rate: number;
        };
      }[];
      purchase: {
        approved_date: number;
        full_price: {
          value: number;
          currency_value: string;
        };
        original_offer_price: {
          currency_value: string;
          value: number;
        };
        price: {
          value: number;
          currency_value: string;
        };
        offer: {
          code: string;
        };
        recurrence_number: number;
        subscription_anticipation_purchase: boolean;
        checkout_country: {
          name: string;
          iso: string;
        };
        origin: {
          xcod: string;
        };
        order_bump: {
          is_order_bump: boolean;
          parent_purchase_transaction: string;
        };
        order_date: string;
        date_next_charge: number;
        status: string;
        transaction: string;
        payment: {
          billet_barcode: string;
          billet_url: string;
          installments_number: number;
          pix_code: string;
          pix_expiration_date: number;
          pix_qrcode: string;
          refusal_reason: string;
          type: string;
        };
      };
      subscription: {
        status: string;
        plan: {
          id: number;
          name: string;
        };
        subscriber: {
          code: string;
        };
      };
    };
  }
