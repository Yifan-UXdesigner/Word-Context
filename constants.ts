import { PhaseData, PhaseId } from './types';

export const PHASES: PhaseData[] = [
  {
    id: PhaseId.Food,
    title: "Phase 1: Physical Food Product",
    year: "1937–1950s",
    description: "SPAM, a canned luncheon meat product, became a household name.",
    colorTheme: "text-spam-yellow"
  },
  {
    id: PhaseId.Repetition,
    title: "Phase 2: Repetition as a Pattern",
    year: "1970s",
    description: "SPAM became associated with endless repetition through comedy sketches and media culture.",
    colorTheme: "text-green-400"
  },
  {
    id: PhaseId.Accumulation,
    title: "Phase 3: Accumulation & Loss of Control",
    year: "1990s",
    description: "SPAM became a metaphor for digital noise, especially in emails and online forums.",
    colorTheme: "text-cyan-300"
  },
  {
    id: PhaseId.Warning,
    title: "Phase 4: Warning and Interruption",
    year: "2000s",
    description: "SPAM became synonymous with unsolicited and annoying digital content, like email spam.",
    colorTheme: "text-alert-red"
  },
  {
    id: PhaseId.Noise,
    title: "Phase 5: Environmental Noise",
    year: "2010s–Now",
    description: "Today: SPAM is a constant presence in digital spaces, flooding our lives with unwanted content.",
    colorTheme: "text-purple-400"
  },
  {
    id: PhaseId.Summary,
    title: "Summary",
    year: "The Evolution",
    description: "From shelf to screen: The journey of a word.",
    colorTheme: "text-white"
  }
];