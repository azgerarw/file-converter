import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/db/index';
import { z } from 'zod';
import { reviewSchema } from '@/app/schemas/review';


export async function POST(req: NextRequest) {
  const form = await req.formData();
  const data = Object.fromEntries(form.entries());
  const parsed = reviewSchema.safeParse(data);

  if (!parsed.success) {
    const tree = z.treeifyError(parsed.error);

    
    const fieldErrors = tree.properties
      ? Object.fromEntries(
          Object.entries(tree.properties).map(([field, node]) => [
            field,
            node?.errors?.[0] || []
          ])
        )
      : {};

    return NextResponse.json({ errors: { fieldErrors } }, { status: 400 });
  }

  const { rating, content, user_id } = parsed.data;

  const user = await db.query('SELECT * FROM users WHERE id = $1', [user_id]);

  await db.query(
    `INSERT INTO reviews (rating, content, user_id, user_image, username) VALUES ($1, $2, $3, $4, $5)`,
    [rating, content, user_id, user.rows[0].image, user.rows[0].username]
  );

  return NextResponse.json({ success: true }, { status: 201 });
}

export async function GET() {
  try {
    const reviews = await db.query('SELECT * FROM reviews');
    return NextResponse.json({ reviews: reviews.rows, success: true }, { status: 200}); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

