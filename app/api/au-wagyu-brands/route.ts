import { NextResponse } from 'next/server';
import auWagyuData from '@/data/au-wagyu-brands.json';

export async function GET() {
  return NextResponse.json(auWagyuData);
}
