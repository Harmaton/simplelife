export interface FooterItem {
    title: string
    items: {
      title: string
      href: string
      external?: boolean
    }[]
  }

  export interface PurchaseData {
    product: {
      has_co_production: boolean;
      name: string;
      id: number;
      ucode: string;
    };
    commissions: {
      currency_value: string;
      source: string;
      value: number;
      currency_conversion?: any; // You might want to define this more precisely if needed
    }[];
    purchase: {
      original_offer_price: { currency_value: string; value: number };
      subscription_anticipation_purchase: boolean;
      checkout_country: { iso: string; name: string };
      order_bump: { is_order_bump: boolean };
      approved_date: number;
      offer: { code: string };
      order_date: number;
      price: { currency_value: string; value: number };
      buyer_ip: string;
      payment: { installments_number: number; type: string };
      full_price: { currency_value: string; value: number };
      invoice_by: string;
      transaction: string;
      status: string;
    };
    affiliates: { affiliate_code: string; name: string }[];
    producer: { name: string };
    buyer: {
      address: { country: string; country_iso: string };
      document: string;
      name: string;
      email: string;
    };
  }

  // app/schemas/category.ts
import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  productCode: z.coerce.number().min(1, "El código de producto debe ser mayor que 0"),
});

export type CategoryInput = z.infer<typeof categorySchema>;



import { User, Category, SubCategory, Chapter } from '@prisma/client'

export type ExtendedCourse = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price: number | null;
  isPublished: boolean;
  categoryId: string | null;
  teacherId: string;
  startDate: Date | null;
  averageRating: number | null;
  User: User | null;
  category: Category | null;
  subcategory: SubCategory | null;
  Chapter: (Chapter & { position: number })[];
};