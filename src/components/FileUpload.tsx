import { useCallback, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Papa from 'papaparse';
import { BibData } from '@/types/bib';

interface FileUploadProps {
  onDataLoaded: (data: BibData[]) => void;
  onBackgroundImageLoaded: (imageUrl: string) => void;
}

export const FileUpload = ({ onDataLoaded, onBackgroundImageLoaded }: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.name.endsWith('.csv'));
    
    if (csvFile) {
      handleCsvFile(csvFile);
    } else {
      toast.error('Please drop a CSV file');
    }
  }, []);

  const handleCsvFile = (file: File) => {
    setCsvFile(file);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          toast.error('Error parsing CSV file');
          return;
        }

        const data = results.data as any[];
        const bibData: BibData[] = data.map((row, index) => ({
          eventName: row['Event Name'] || row.eventName || 'Marathon Event',
          raceCategory: row['Race Category'] || row.raceCategory || 'Full Marathon',
          bibNumber: row['BIB Number'] || row.bibNumber || (index + 1).toString(),
          participantName: row['Participant Name'] || row.participantName || 'Runner',
          date: row['Date'] || row.date || new Date().toLocaleDateString(),
        }));

        onDataLoaded(bibData);
        toast.success(`Loaded ${bibData.length} participants`);
      },
      error: () => {
        toast.error('Failed to parse CSV file');
      }
    });
  };

  const handleBackgroundImage = (file: File) => {
    setBackgroundImage(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onBackgroundImageLoaded(e.target.result as string);
        toast.success('Background image loaded');
      }
    };
    reader.readAsDataURL(file);
  };

  const removeCsvFile = () => {
    setCsvFile(null);
    onDataLoaded([]);
  };

  const removeBackgroundImage = () => {
    setBackgroundImage(null);
    onBackgroundImageLoaded('');
  };

  return (
    <div className="space-y-6">
      {/* CSV Upload */}
      <div className="card-athletic p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Upload CSV File
        </h3>
        
        {!csvFile ? (
          <div
            className={`upload-zone ${isDragOver ? 'dragover' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('csv-input')?.click()}
          >
            <div className="text-center">
              <Upload className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-lg font-medium mb-2">Drop CSV file here or click to browse</p>
              <p className="text-sm text-muted-foreground">
                Required columns: Event Name, Race Category, BIB Number, Participant Name, Date
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-xl">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-success" />
              <div>
                <p className="font-medium">{csvFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(csvFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeCsvFile}
              className="text-destructive hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
        
        <input
          id="csv-input"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleCsvFile(file);
          }}
        />
      </div>

      {/* Background Image Upload */}
      <div className="card-athletic p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5 text-secondary" />
          Background Image (Optional)
        </h3>
        
        {!backgroundImage ? (
          <div
            className="upload-zone border-secondary/30 hover:border-secondary/50 hover:bg-secondary/10"
            onClick={() => document.getElementById('bg-input')?.click()}
          >
            <div className="text-center">
              <Upload className="w-8 h-8 text-secondary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-medium mb-1">Upload Background Image</p>
              <p className="text-sm text-muted-foreground">
                PNG, JPG up to 5MB
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-secondary/10 border border-secondary/20 rounded-xl">
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5 text-secondary" />
              <div>
                <p className="font-medium">{backgroundImage.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(backgroundImage.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeBackgroundImage}
              className="text-destructive hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
        
        <input
          id="bg-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleBackgroundImage(file);
          }}
        />
      </div>
    </div>
  );
};