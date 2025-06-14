import { NextResponse } from 'next/server';

// Mock data for accounting records
const accountingData = [
  { name: "工资", price: 5000 },
  { name: "房租", price: -2000 },
  { name: "购物", price: -500 },
  { name: "兼职收入", price: 1200 },
];

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return NextResponse.json({
      success: true,
      data: accountingData
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
