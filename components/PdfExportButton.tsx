'use client';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type ReportData = {
  date: string;
  client: string;
  notes: string;
};

const sampleReports: ReportData[] = [
  { date: '2025-07-01', client: 'Alice S.', notes: 'Therapy session on anxiety' },
  { date: '2025-07-05', client: 'Bob J.', notes: 'Cognitive behavior assessment' },
  { date: '2025-07-15', client: 'Carol P.', notes: 'Follow-up session' },
];

export default function PdfExportButton() {
  function generatePdf() {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(79, 70, 229); // Indigo color
    doc.text('Therapy Reports', 14, 22);

    // Draw a line under title
    doc.setDrawColor(79, 70, 229);
    doc.setLineWidth(0.5);
    doc.line(14, 24, 196, 24);

    // Prepare table data
    const tableColumn = ['Date', 'Client', 'Notes'];
    const tableRows: (string | number)[][] = [];

    sampleReports.forEach(report => {
      const reportData = [report.date, report.client, report.notes];
      tableRows.push(reportData);
    });

    // Add table
    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 12 },
      headStyles: { fillColor: [79, 70, 229] }, // Indigo header
      margin: { left: 14, right: 14 },
      didDrawPage: (data) => {
        // Use 'any' type assertion to fix TS errors
        const internal: any = doc.internal;
        const pageCount = internal.getNumberOfPages();
        const pageCurrent = internal.getCurrentPageInfo
          ? internal.getCurrentPageInfo().pageNumber
          : internal.pageNumber;

        const footerStr = `Page ${pageCurrent} of ${pageCount}`;
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(footerStr, data.settings.margin.left, doc.internal.pageSize.height - 10);

        const dateStr = new Date().toLocaleString();
        doc.text(
          `Generated: ${dateStr}`,
          doc.internal.pageSize.width - data.settings.margin.right - 80,
          doc.internal.pageSize.height - 10
        );
      },
    });

    // Save the PDF
    doc.save('therapy_reports.pdf');
  }

  return (
    <button
      onClick={generatePdf}
      className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition"
      aria-label="Export reports as PDF"
    >
      Export Reports as PDF
    </button>
  );
}
