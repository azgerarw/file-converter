import AsposePdf from 'asposepdfnodejs';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const POST = async (req: NextRequest) => {
  const form = await req.formData();
  const file = form.get('file') as File | null;
  const to = form.get('to');
  
  console.log(to);
  console.log(file);
  
  if (!file || !to) {
    return NextResponse.json({ error: 'Missing required field: file or to' }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name;
    const ext = path.extname(filename).toLowerCase();
    
    const savePath = path.join(process.cwd(), 'public', 'uploads', filename);
    await fs.writeFile(savePath, buffer);

    const module = await AsposePdf();
    
    const baseName = path.basename(filename, ext);
    const outputFilename = `${baseName}_converted${to}`;
    const outPath = path.join(process.cwd(), 'public', 'uploads', outputFilename);

    let result;
    let fileType;

    
    if (ext !== '.pdf') {
      return NextResponse.json({ error: 'Input must be a PDF file' }, { status: 400 });
    }

    
    switch (to) {
      case '.docx':
        result = module.AsposePdfToDocX(savePath, outPath);
        fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case '.xlsx':
        result = module.AsposePdfToXlsx(savePath, outPath);
        fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case '.pptx':
        result = module.AsposePdfToPptX(savePath, outPath);
        fileType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      default:
        return NextResponse.json({ error: 'Unsupported target format' }, { status: 400 });
    }

    await result;

    const fileBuffer = await fs.readFile(outPath);
        
    await fs.unlink(savePath);

    return new Response(fileBuffer as any, {
      headers: {
        'Content-Type': fileType,
        'Content-Disposition': `attachment; filename=${outputFilename}`
      }
    });

  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json({ 
      error: 'Conversion failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
};
