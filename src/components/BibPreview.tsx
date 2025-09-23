import { BibData, ColorTheme } from '@/types/bib';
import { Trophy, MapPin, Calendar, User } from 'lucide-react';

interface BibPreviewProps {
  bibData: BibData;
  theme: ColorTheme;
  backgroundImage?: string;
  className?: string;
}

export const BibPreview = ({ bibData, theme, backgroundImage, className = '' }: BibPreviewProps) => {
  return (
    <div className={`bib-card ${className}`} id={`bib-${bibData.bibNumber}`}>
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: backgroundImage 
            ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.1)), url(${backgroundImage})`
            : theme.background,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Cutting Guidelines */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner Marks */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black/20"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black/20"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black/20"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black/20"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full p-8 flex flex-col">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Trophy className="w-6 h-6" style={{ color: theme.text }} />
            <h1 
              className="text-2xl font-bold tracking-wide uppercase"
              style={{ color: theme.text }}
            >
              {bibData.eventName}
            </h1>
          </div>
          
          <div 
            className="text-lg font-medium px-4 py-2 rounded-full inline-block"
            style={{ 
              backgroundColor: `${theme.text}20`,
              color: theme.text,
              border: `2px solid ${theme.text}40`
            }}
          >
            {bibData.raceCategory}
          </div>
        </div>
        
        {/* BIB Number - Main Focus */}
        <div className="flex-1 flex items-center justify-center">
          <div 
            className="text-8xl font-black text-center px-8 py-4 rounded-2xl border-4"
            style={{ 
              color: theme.text,
              backgroundColor: `${theme.text}10`,
              borderColor: `${theme.text}30`
            }}
          >
            {bibData.bibNumber}
          </div>
        </div>
        
        {/* Participant Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5" style={{ color: theme.text }} />
            <span 
              className="text-xl font-semibold"
              style={{ color: theme.text }}
            >
              {bibData.participantName}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: theme.text }} />
              <span 
                className="text-sm font-medium"
                style={{ color: theme.text }}
              >
                {bibData.date}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: theme.text }} />
              <span 
                className="text-sm font-medium"
                style={{ color: theme.text }}
              >
                FINISH LINE
              </span>
            </div>
          </div>
        </div>
        
        {/* Motivational Text */}
        <div className="text-center mt-4 pt-4 border-t" style={{ borderColor: `${theme.text}30` }}>
          <p 
            className="text-sm font-bold tracking-widest uppercase"
            style={{ color: theme.text }}
          >
            RUN • ACHIEVE • INSPIRE
          </p>
        </div>
      </div>
    </div>
  );
};