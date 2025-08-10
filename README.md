# Website to conver files

This is a full-stack web application built with:

- **Frontend**: Nextjs, TailwindCSS, TypeScript
- **Backend**: Node.js, Nextjs, TypeScript, PostgreSQL

---

## ✨ Features

Users can:

- Create an account
- Convert files according to the available options and download them
- Leave a review on the website

---

## 🚀 Getting Started

bash

### 1. Clone the repository

```
git clone https://github.com/azgerarw/file-converter.git
cd file-converter
```

### 2. Install dependencies

```
npm install
```
This will install dependencies for both frontend and backend.


## 4. Enviromental variables

You will need a .env file in the root folder with your configuration.
If you have not created one yet, make sure to define:

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NEXTAUTH_SECRET=secret_password
```
### 4. Run the development server

```
npm run dev
```
This command will start both the frontend and backend with Nextjs.
Access the app at http://localhost:3000.

### 5. How to use the app

Convert to Excel: upload a file among the following types .csv, .json, .ods o .txt, click on "Convert" and download the .xlsx file.

Convert to PDF: upload a file among the following types .doc, .docx, .xlsx o .pptx and the app will convert it into PDF automatically.

Convert from PDF: upload a PDF file and select the output file type among the following (.docx, .xlsx, .pptx).

### 6. Project folder structure

├── pages/ or app/        # Next.js routes and logic
├── public/               # Static files and converted files to download
├── lib/                  # Funciones compartidas (ej. conversión)
├── components/           # Client components (buttons, forms, etc...)
├── api/                  # Endpoints
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
└── .env.local            # enviroment variables

### 7. Credits
Based on frameworks and open source libraries like Next.js, Aspose for Node.js, Puppeteer and more. Thanks to all authors and communities for their job.

### 8. License
This project is licensed under the MIT License. If you wish to contribute or use the code, feel free to do so.

### 9. Contact
If you have any questions, feel free to open an issue or submit a pull request.
