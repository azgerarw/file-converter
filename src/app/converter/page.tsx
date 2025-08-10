'use client'
import Button from "@/components/button";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Converter() {


  const [file, setFile] = useState<File | null>(null);
  const [ext, setExt] = useState<string>('');

  const [downloadUrlExcel, setDownloadUrlExcel] = useState<string | null>(null);
  const [downloadUrlPdf, setDownloadUrlPdf] = useState<string | null>(null);
  const [downloadUrlDXP, setDownloadUrlDXP] = useState<string | null>(null);

  const [excelFileStatus, setExcelFileStatus] = useState<string | null>(null);
  const [pdfFileStatus, setPdfFileStatus] = useState<string | null>(null);
  const [dxpFileStatus, setDXPFileStatus] = useState<string | null>(null);


  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    
  }

  async function convertToExcel() {

    setExcelFileStatus('loading');

    const formData = new FormData();
    formData.append('file', file ?? '');
    formData.append('to', 'excel');

    const res = await fetch('/api/convert-to-excel', {
      method: 'POST',
      body: formData,
    });
    const data = await res.blob();
    
    const url = URL.createObjectURL(data);
    setDownloadUrlExcel(url);
    setExcelFileStatus('loaded');
  }

  async function convertToPdf() {

    setPdfFileStatus('loading');

    const formData = new FormData();
    formData.append('file', file ?? '');
    

    const res = await fetch('/api/convert-to-pdf', {
      method: 'POST',
      body: formData,
    });
    const data = await res.blob();
    
    const url = URL.createObjectURL(data);
    setDownloadUrlPdf(url);
    setPdfFileStatus('loaded');
  }


  async function convertToDXP() {

    setDXPFileStatus('loading');
    console.log(ext);
    const formData = new FormData();
    formData.append('file', file ?? '');
    formData.append('to', ext.toString());

    const res = await fetch('/api/convert-from-pdf', {
      method: 'POST',
      body: formData,
    });
    const data = await res.blob();
    
    const url = URL.createObjectURL(data);
    setDownloadUrlDXP(url);
    setDXPFileStatus('loaded');
  }

  return (
    

      <div className="min-h-[500px] w-[50%] mx-auto my-[50px] flex flex-col gap-10">
        <div className="h-[33%] w-full flex flex-col justify-center items-center">
          <form  className="shadow-md flex flex-col gap-2 h-auto w-[80%] items-center p-[10px]">
            <label htmlFor="excel">Convert any .csv, .json, .ods, .txt file to <strong>Excel</strong></label>
            <input name='excel' onChange={handleFileChange} className="w-[90%] border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer" type="file" accept=".csv, .json, .ods, .txt" />
            
            <Button disabled={!file} onClick={convertToExcel}>Convert</Button>
            {excelFileStatus == 'loaded' ?
            downloadUrlExcel && (
              <a
                href={downloadUrlExcel}
                download="converted_file.xlsx"
                className="mt-2 text-blue-500 underline"
              >
                Download converted file
              </a>
            )
            : 
            excelFileStatus == 'loading' 
            ?
            (
              <span className="flex flex-row gap-2 items-center justify-center">
                Converting file... <AiOutlineLoading className="animate-spin" />
              </span>
            )
            : 
            ''}
          </form>
        </div>
        <div className="h-[33%] w-full flex flex-col justify-center items-center">
          <form className="shadow-md flex flex-col gap-2 h-auto w-[80%] items-center p-[10px]">
            <label htmlFor="pdf">Convert .doc, .docx, .xlsx, .pptx file to <strong>Pdf</strong></label>
            <input name="pdf" onChange={handleFileChange} className="w-[90%] border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer" type="file" accept=".doc, .docx, .xlsx, .pptx" />
            <Button disabled={!file} onClick={convertToPdf}>Convert</Button>
            {
            pdfFileStatus == 'loaded' ?
            downloadUrlPdf && (
              <a
                href={downloadUrlPdf}
                download="converted_file.pdf"
                className="mt-2 text-blue-500 underline"
              >
                Download converted file
              </a>
            )
            : 
            pdfFileStatus == 'loading' 
            ?
            (
              <span className="flex flex-row gap-2 items-center justify-center">
                Converting file... <AiOutlineLoading className="animate-spin" />
              </span>
            )
            : 
            ''
            }
          </form>
        </div>
        <div className="h-[33%] w-full flex flex-col justify-center items-center">
          <form className="shadow-md flex flex-col gap-2 h-auto w-[80%] items-center p-[10px]">
            <label htmlFor="from-pdf">Convert a <strong>Pdf</strong> file to .docx, .xlsx, or .pptx </label>
            <input name="from-pdf" onChange={handleFileChange} className="w-[90%] border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer" type="file" accept=".pdf" />
            <label htmlFor="type">Convert to</label>
            <select onChange={(e) => setExt(e.target.value)} name="type" id="type" value={ext} className="cursor-pointer border-b-2 border-gray-500" >
              <option value="">select one</option>
              <option value=".docx">word</option>
              <option value=".xlsx">excel</option>
              <option value=".pptx">power point</option>
            </select>
            <Button disabled={!file} onClick={convertToDXP}>Convert</Button>
            {
            dxpFileStatus == 'loaded' ?
            downloadUrlDXP && (
              <a
                href={downloadUrlDXP}
                download="converted_file"
                className="mt-2 text-blue-500 underline"
              >
                Download converted file
              </a>
            )
            : 
            dxpFileStatus == 'loading' 
            ?
            (
              <span className="flex flex-row gap-2 items-center justify-center">
                Converting file... <AiOutlineLoading className="animate-spin" />
              </span>
            )
            : 
            ''
            }
          </form>
        </div>
      </div>
      
  );
}
