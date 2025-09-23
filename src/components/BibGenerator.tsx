import { useState } from 'react';
import { BibData, ColorTheme, COLOR_THEMES } from '@/types/bib';
import { FileUpload } from './FileUpload';
import { ColorThemeSelector } from './ColorThemeSelector';
import { BibPreview } from './BibPreview';
import { ExportOptions } from './ExportOptions';
import { Button } from '@/components/ui/button';
import { PlayCircle, Eye, Zap } from 'lucide-react';
import { toast } from 'sonner';

export const BibGenerator = () => {
  const [bibData, setBibData] = useState<BibData[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(COLOR_THEMES[0]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const [previewIndex, setPreviewIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDataLoaded = (data: BibData[]) => {
    setBibData(data);
    if (data.length > 0) {
      setPreviewIndex(0);
    }
  };

  const generateBibs = async () => {
    if (bibData.length === 0) {
      toast.error('Please upload a CSV file first');
      return;
    }

    setIsGenerating(true);
    toast.loading('Generating BIB cards...', { id: 'generating' });

    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsGenerating(false);
    toast.success(`Generated ${bibData.length} BIB cards!`, { id: 'generating' });
  };

  const nextPreview = () => {
    if (bibData.length > 0) {
      setPreviewIndex((prev) => (prev + 1) % bibData.length);
    }
  };

  const previousPreview = () => {
    if (bibData.length > 0) {
      setPreviewIndex((prev) => (prev - 1 + bibData.length) % bibData.length);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Header */}
      <div className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center animate-runner-bounce">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl font-black text-athletic">
              Marathon BIB Generator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create professional 8×5-inch marathon bib cards with cutting bleeds. 
            Upload your participant data and generate beautiful, print-ready bibs in seconds.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <FileUpload 
              onDataLoaded={handleDataLoaded}
              onBackgroundImageLoaded={setBackgroundImage}
            />
            
            <ColorThemeSelector 
              selectedTheme={selectedTheme}
              onThemeSelect={setSelectedTheme}
            />
            
            {/* Generate Button */}
            <div className="card-athletic p-6">
              <Button
                onClick={generateBibs}
                disabled={bibData.length === 0 || isGenerating}
                className="btn-hero w-full"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate BIB Cards'}
              </Button>
              
              {bibData.length > 0 && (
                <p className="text-center text-sm text-muted-foreground mt-3">
                  Ready to generate {bibData.length} BIB card{bibData.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {bibData.length > 0 && (
              <ExportOptions 
                bibData={bibData}
                theme={selectedTheme}
                backgroundImage={backgroundImage}
              />
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-2">
            <div className="card-athletic p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  BIB Preview
                </h3>
                
                {bibData.length > 1 && (
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={previousPreview}>
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {previewIndex + 1} of {bibData.length}
                    </span>
                    <Button variant="outline" size="sm" onClick={nextPreview}>
                      Next
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                {bibData.length > 0 ? (
                  <div className="transform scale-75 origin-center">
                    <BibPreview
                      bibData={bibData[previewIndex]}
                      theme={selectedTheme}
                      backgroundImage={backgroundImage}
                      className="animate-bib-generate"
                    />
                  </div>
                ) : (
                  <div className="bib-card flex items-center justify-center bg-muted/20 border-dashed border-2 border-muted">
                    <div className="text-center text-muted-foreground">
                      <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Upload CSV to Preview</p>
                      <p className="text-sm">Your BIB cards will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample CSV Info */}
      <div className="bg-muted/20 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-4">Sample CSV Format</h3>
          <div className="bg-card rounded-xl p-6 text-left overflow-x-auto">
            <code className="text-sm">
              Event Name,Race Category,BIB Number,Participant Name,Date<br/>
              Boston Marathon 2024,Full Marathon,001,John Smith,2024-04-15<br/>
              Boston Marathon 2024,Half Marathon,002,Jane Doe,2024-04-15<br/>
              Boston Marathon 2024,10K Run,003,Mike Johnson,2024-04-15
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};