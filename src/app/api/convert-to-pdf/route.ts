import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { execFile } from 'child_process';
import puppeteer from 'puppeteer';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

export const POST = async (req: NextRequest) => {
  const browser = await puppeteer.launch({ headless: true });

  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const filename = file.name;
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  
  const inputPath = path.join(process.cwd(), 'public', 'uploads', filename);
  await fs.mkdir(path.dirname(inputPath), { recursive: true });
  await fs.writeFile(inputPath, Buffer.from(await file.arrayBuffer()));

  let outputBuffer: Buffer;

  if (ext === 'docx') {
    
    const htmlPath = inputPath.replace(/\.docx$/i, '.html');
    await execFileAsync('pandoc', [
      inputPath, '-s', '-t', 'html', '-o', htmlPath, '--embed-resources'
    ]);
    const html = await fs.readFile(htmlPath, 'utf8');
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const obuffer = await page.pdf({ format: 'A4', printBackground: true });
    outputBuffer = Buffer.from(obuffer);
    await page.close();

  } else if (ext === 'pptx' || ext === 'xlsx') {
    
    await execFileAsync('libreoffice', [
      '--headless', '--convert-to', 'pdf', inputPath,
      '--outdir', path.dirname(inputPath)
    ]);
    const pdfPath = inputPath.replace(/\.[^.]+$/, '.pdf');
    outputBuffer = await fs.readFile(pdfPath);

  } else {
    await browser.close();
    return NextResponse.json({ error: 'Unsupported format' }, { status: 400 });
  }

  await browser.close();
  const responseBody = Buffer.from(outputBuffer);
  return new Response(responseBody, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename.replace(/\.[^/.]+$/, '')}.pdf"`,
    },
  });
};
