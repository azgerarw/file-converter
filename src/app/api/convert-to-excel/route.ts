import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import * as XLSX from 'xlsx';



export const POST = async (req: NextRequest) => {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  const to = form.get('to');
  if (!file || !to) return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });

  const buffer = Buffer.from(await (file as File).arrayBuffer());
  const filename = (file as File).name;
  const savePath = path.join(process.cwd(), 'public', 'uploads', filename);
  await fs.writeFile(savePath, buffer);

  const ext = path.extname(filename).toLowerCase();
  let objectsArray: unknown[] = [];

  if (ext === '.json') {
    const raw = await fs.readFile(savePath, 'utf8');
    objectsArray = JSON.parse(raw);
  } else if (ext === '.txt') {
    const data = await fs.readFile(savePath, 'utf8');
    const lines = data.split('\n');
    
        lines.forEach(line => {
          const elements = line.trim().split(',');
          const pairs = [];

          for (let i = 0; i < elements.length; i += 2) {
            const key = elements[i];
            const value = elements[i + 1];
            if (key && value) {
              pairs.push([key.trim(), value.trim()]);
            }
          }

          if (pairs.length > 0) {
            const obj = Object.fromEntries(pairs);
            objectsArray.push(obj);
          }
        });
  } else {
    const buf = await fs.readFile(savePath);
    const wb = XLSX.read(buf, { type: 'buffer' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    objectsArray = XLSX.utils.sheet_to_json(ws);
  }

  
  
  const ws2 = XLSX.utils.json_to_sheet(objectsArray);
  const wb2 = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb2, ws2, 'Sheet1');
  const excelBuffer = XLSX.write(wb2, { bookType: 'xlsx', type: 'buffer' });

  return new Response(excelBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="converted.xlsx"',
    },
  });
};
