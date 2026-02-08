// Configuration for the Storyline Slide
// Edit this file to customize all content and theming

export interface TileConfig {
  number: number;
  header: string;
  subline: string;
}

export interface StorylineConfig {
  title: string;
  subtitle: string;
  tiles: TileConfig[];
  footerLabel: string;
  theme: {
    accentColor: 'teal' | 'amber';
    animationDuration: number; // total cycle in seconds
  };
}

export const storylineConfig: StorylineConfig = {
  title: "The Delivery: Your Panel-Friendly Storyline",
  subtitle: "Structure your final presentation with this 9-point agenda.",
  tiles: [
    { number: 1, header: "Exec Summary", subline: "Rec & Logic" },
    { number: 2, header: "Outcomes + KPI Tree", subline: "Baselines & Targets" },
    { number: 3, header: "Current State", subline: "Root Causes only" },
    { number: 4, header: "Capability Gaps", subline: "Prioritized" },
    { number: 5, header: "TOM + Arch", subline: "Build/Buy Stance" },
    { number: 6, header: "Roadmap", subline: "Waves & Dependencies" },
    { number: 7, header: "Business Case", subline: "ROI & Assumptions" },
    { number: 8, header: "Risks + Mitigations", subline: "Top 5" },
    { number: 9, header: "Next 30 Days", subline: "Mobilization" },
  ],
  footerLabel: "Common Failure Modes to Avoid: Skipping stakeholder alignment, overloading slides, missing the 'so what'",
  theme: {
    accentColor: 'teal',
    animationDuration: 24,
  },
};

// Accent color palette options
export const accentColors = {
  teal: {
    primary: '174 78% 33%', // #1E8E8A
    glow: '174 78% 33% / 0.15',
  },
  amber: {
    primary: '30 65% 46%', // #C47C2A
    glow: '30 65% 46% / 0.15',
  },
};
