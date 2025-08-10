import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/db/index';
import { userSchema } from '@/app/schemas/user';
import { z } from 'zod';
import { writeFile } from 'node:fs/promises';
import path from 'path';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const data = Object.fromEntries(form.entries());
  const parsed = userSchema.safeParse(data);

  const entry = form.get('image');
  if (!(entry instanceof File)) {
    return NextResponse.json({ error: 'Image is required' }, { status: 400 });
  }
  const file = entry;

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadsDir = path.join(process.cwd(), 'public/usersimages');
  await writeFile(path.join(uploadsDir, file.name), buffer);

  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(z.treeifyError(parsed.error).properties || {}).map(
        ([f, node]) => [f, node?.errors?.[0] || []]
      )
    );
    return NextResponse.json({ errors: { fieldErrors } }, { status: 400 });
  }

  const { username, name, lastname, email, birthdate, phone, country, password, policy } = parsed.data;
  const hash = await bcrypt.hash(password, 10);

  await db.query(
    `INSERT INTO users (username, name, lastname, email, birthdate, phone, country, password, policy, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [username, name, lastname, email, birthdate, phone, country, hash, policy, file.name]
  );

  return NextResponse.json({ success: true }, { status: 201 });
}
