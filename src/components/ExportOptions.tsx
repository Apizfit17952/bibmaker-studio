import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileImage, Printer, FileText } from 'lucide-react';
import { BibData, ColorTheme } from '@/types/bib';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportOptionsProps {
  bibData: BibData[];
  theme: ColorTheme;
  backgroundImage?: string;
}

export const ExportOptions = ({ bibData, theme, backgroundImage }: ExportOptionsProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    if (bibData.length === 0) return;

    setIsExporting(true);
    toast.loading('Generating PDF...', { id: 'pdf-export' });

    try {
      // Create PDF with 8.25x5.25 inch pages (including bleed)
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'in',
        format: [8.25, 5.25]
      });

      for (let i = 0; i < bibData.length; i++) {
        const bibElement = document.getElementById(`bib-${bibData[i].bibNumber}`);
        
        if (bibElement) {
          const canvas = await html2canvas(bibElement, {
            width: 792, // 8.25 inches * 96 DPI
            height: 504, // 5.25 inches * 96 DPI
            scale: 2,
            useCORS: true,
            allowTaint: false,
            backgroundColor: null
          });

          const imgData = canvas.toDataURL('image/png');
          
          if (i > 0) {
            pdf.addPage();
          }
          
          pdf.addImage(imgData, 'PNG', 0, 0, 8.25, 5.25);
        }
      }

      pdf.save(`marathon-bibs-${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success('PDF exported successfully!', { id: 'pdf-export' });
    } catch (error) {
      console.error('PDF export error:', error);
      toast.error('Failed to export PDF', { id: 'pdf-export' });
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJPEG = async () => {
    if (bibData.length === 0) return;

    setIsExporting(true);
    toast.loading('Generating JPEG files...', { id: 'jpeg-export' });

    try {
      for (let i = 0; i < bibData.length; i++) {
        const bibElement = document.getElementById(`bib-${bibData[i].bibNumber}`);
        
        if (bibElement) {
          const canvas = await html2canvas(bibElement, {
            width: 792, // 8.25 inches * 96 DPI
            height: 504, // 5.25 inches * 96 DPI
            scale: 2,
            useCORS: true,
            allowTaint: false,
            backgroundColor: '#ffffff'
          });

          // Create download link
          const link = document.createElement('a');
          link.download = `bib-${bibData[i].bibNumber}-${bibData[i].participantName.replace(/\s+/g, '-')}.jpg`;
          link.href = canvas.toDataURL('image/jpeg', 0.9);
          link.click();
        }
      }

      toast.success('JPEG files exported successfully!', { id: 'jpeg-export' });
    } catch (error) {
      console.error('JPEG export error:', error);
      toast.error('Failed to export JPEG files', { id: 'jpeg-export' });
    } finally {
      setIsExporting(false);
    }
  };

  const printBibs = () => {
    if (bibData.length === 0) return;

    // Create a new window with all bibs for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Marathon BIBs - Print</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Roboto+Condensed:wght@300;400;500;600;700;800&display=swap');
            
            * { margin: 0; padding: 0; box-sizing: border-box; }
            
            body {
              font-family: 'Inter', sans-serif;
              background: white;
            }
            
            @page {
              size: 8.25in 5.25in landscape;
              margin: 0;
            }
            
            .bib-card {
              width: 8.25in;
              height: 5.25in;
              page-break-after: always;
              position: relative;
              overflow: hidden;
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            
            .bib-card:last-child {
              page-break-after: avoid;
            }
          </style>
        </head>
        <body>
          ${bibData.map(bib => {
            const bibElement = document.getElementById(`bib-${bib.bibNumber}`);
            return bibElement ? bibElement.outerHTML : '';
          }).join('')}
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);

    toast.success('Print dialog opened');
  };

  return (
    <div className="card-athletic p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Download className="w-5 h-5 text-success" />
        Export Options
      </h3>
      
      <div className="space-y-3">
        <Button
          onClick={exportToPDF}
          disabled={isExporting || bibData.length === 0}
          className="btn-success w-full"
        >
          <FileText className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        
        <Button
          onClick={exportToJPEG}
          disabled={isExporting || bibData.length === 0}
          variant="outline"
          className="w-full"
        >
          <FileImage className="w-4 h-4 mr-2" />
          Download JPEG Files
        </Button>
        
        <Button
          onClick={printBibs}
          disabled={isExporting || bibData.length === 0}
          variant="outline"
          className="w-full"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print All BIBs
        </Button>
      </div>
      
      {bibData.length > 0 && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            • PDF includes cutting bleeds (8.25×5.25")
            <br />
            • JPEG files are high-resolution (300 DPI)
            <br />
            • Print uses optimized settings for professional results
          </p>
        </div>
      )}
    </div>
  );
};