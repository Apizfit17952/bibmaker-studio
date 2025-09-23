export interface BibData {
  eventName: string;
  raceCategory: string;
  bibNumber: string;
  participantName: string;
  date: string;
}

export interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'athletic-blue',
    name: 'Athletic Blue',
    primary: '#3B82F6',
    secondary: '#1E40AF',
    accent: '#DBEAFE',
    background: 'linear-gradient(135deg, #3B82F6, #1E40AF)',
    text: '#FFFFFF'
  },
  {
    id: 'energy-orange',
    name: 'Energy Orange',
    primary: '#EA580C',
    secondary: '#DC2626',
    accent: '#FED7AA',
    background: 'linear-gradient(135deg, #EA580C, #DC2626)',
    text: '#FFFFFF'
  },
  {
    id: 'victory-green',
    name: 'Victory Green',
    primary: '#059669',
    secondary: '#047857',
    accent: '#A7F3D0',
    background: 'linear-gradient(135deg, #059669, #047857)',
    text: '#FFFFFF'
  },
  {
    id: 'champion-purple',
    name: 'Champion Purple',
    primary: '#7C3AED',
    secondary: '#5B21B6',
    accent: '#DDD6FE',
    background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
    text: '#FFFFFF'
  },
  {
    id: 'fire-red',
    name: 'Fire Red',
    primary: '#DC2626',
    secondary: '#991B1B',
    accent: '#FECACA',
    background: 'linear-gradient(135deg, #DC2626, #991B1B)',
    text: '#FFFFFF'
  },
  {
    id: 'thunder-yellow',
    name: 'Thunder Yellow',
    primary: '#D97706',
    secondary: '#B45309',
    accent: '#FDE68A',
    background: 'linear-gradient(135deg, #D97706, #B45309)',
    text: '#FFFFFF'
  }
];