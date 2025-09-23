import { ColorTheme, COLOR_THEMES } from '@/types/bib';
import { Check } from 'lucide-react';

interface ColorThemeSelectorProps {
  selectedTheme: ColorTheme;
  onThemeSelect: (theme: ColorTheme) => void;
}

export const ColorThemeSelector = ({ selectedTheme, onThemeSelect }: ColorThemeSelectorProps) => {
  return (
    <div className="card-athletic p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <div className="w-5 h-5 rounded-full bg-gradient-primary"></div>
        Color Theme
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {COLOR_THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeSelect(theme)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 group hover:scale-105 ${
              selectedTheme.id === theme.id 
                ? 'border-primary shadow-athletic' 
                : 'border-border/30 hover:border-primary/50'
            }`}
            style={{ background: theme.background }}
          >
            <div className="relative z-10">
              <div className="text-center text-white">
                <div className="font-semibold text-sm mb-1">{theme.name}</div>
                <div className="text-xs opacity-80">Preview</div>
              </div>
              
              {selectedTheme.id === theme.id && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        ))}
      </div>
    </div>
  );
};