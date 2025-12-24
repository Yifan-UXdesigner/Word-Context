export enum PhaseId {
  Food = 0,
  Repetition = 1,
  Accumulation = 2,
  Warning = 3,
  Noise = 4,
  Summary = 5
}

export interface PhaseData {
  id: PhaseId;
  title: string;
  year: string;
  description: string;
  colorTheme: string; // Tailwind class for text/accent
}

export interface InteractiveElementProps {
  isActive: boolean;
  scrollProgress: number; // 0 to 1 within the phase
}