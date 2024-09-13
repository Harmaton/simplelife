import { NextResponse } from 'next/server';
import { makeGetRequest, makePostRequest } from '@/lib/hotmart-products';

export async function GET() {
  try {
    const products = await makeGetRequest('products')
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newProduct = await makePostRequest('products');
    console.log('new product -->',newProduct)
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}


