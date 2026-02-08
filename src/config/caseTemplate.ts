// ============================================================
// CASE TEMPLATE — Edit this file to swap in your real case
// All slide content is driven from this config
// ============================================================

export interface KPI {
  label: string;
  base: string;
  target: string;
  horizon: string;
}

export interface Branch {
  name: string;
  icon: 'onboarding' | 'sales' | 'service' | 'operations' | 'finance';
  kpis: KPI[];
}

export interface RootCause {
  id: number;
  label: string;
  evidence: string;
  kpiDrag?: string;
}

export interface CapabilityTile {
  name: string;
  description?: string;
}

export interface Wave {
  name: string;
  time: string;
  items: string[];
  valueIncrement?: string;
}

export interface Risk {
  risk: string;
  likelihood: 'Low' | 'Med' | 'High';
  impact: 'Low' | 'Med' | 'High';
  mitigation: string;
}

export interface WeekPlan {
  week: string;
  items: string[];
}

export interface CaseData {
  // Meta
  clientName: string;
  date: string;
  accentColor: 'teal' | 'amber';

  // Slide 1: Exec Summary
  execSummary: {
    recommendation: string[];
    logic: string[];
    constraintsChips: string[];
  };

  // Slide 2: Outcomes + KPI Tree
  outcomes: {
    objective: string;
    branches: Branch[];
  };

  // Slide 3: Current State
  currentState: {
    rootCauses: RootCause[];
  };

  // Slide 4: Capability Gaps
  capabilities: {
    tiles: CapabilityTile[];
    priority: {
      now: string[];
      next: string[];
      later: string[];
    };
  };

  // Slide 5: TOM + Arch
  tomArch: {
    tom: {
      businessOwners: string[];
      productOwners: string[];
      dataOwner: string;
      securityOwner: string;
      cadence: string[];
    };
    principles: string[];
    buildBuy: string[];
  };

  // Slide 6: Roadmap
  roadmap: {
    waves: Wave[];
    dependencies: string[];
  };

  // Slide 7: Business Case
  businessCase: {
    benefits: {
      revenue: string[];
      cost: string[];
      risk: string[];
    };
    costs: {
      oneTime: string[];
      run: string[];
      change: string[];
    };
    payback: string;
    sensitivities: string[];
  };

  // Slide 8: Risks + Mitigations
  risks: {
    top5: Risk[];
  };

  // Slide 9: Next 30 Days
  next30: {
    workplan: WeekPlan[];
    outputs: string[];
  };
}

// ============================================================
// DEFAULT TEMPLATE DATA — Replace with your actual case
// ============================================================

export const caseData: CaseData = {
  clientName: "Field Services Co. (Calgary)",
  date: "2026-02-08",
  accentColor: "teal",

  execSummary: {
    recommendation: [
      "Deploy unified field service platform within 12 months",
      "Consolidate 4 legacy systems into single source of truth",
      "Enable mobile-first technician experience with offline sync"
    ],
    logic: [
      "KPI gaps → Root causes in workflow fragmentation → Capability solution",
      "Proven ROI from similar deployments (18-month payback)",
      "Strategic alignment with digital-first customer expectations"
    ],
    constraintsChips: ["99.5% Uptime", "RBAC/Audit", "Change capacity", "Budget $2.5M"]
  },

  outcomes: {
    objective: "Faster, more reliable service → retention + profitable growth",
    branches: [
      {
        name: "Onboarding",
        icon: "onboarding",
        kpis: [
          { label: "Time-to-first-job", base: "10 days", target: "3 days", horizon: "12 mo" },
          { label: "Onboarding NPS", base: "32", target: "65", horizon: "12 mo" }
        ]
      },
      {
        name: "Sales Conversion",
        icon: "sales",
        kpis: [
          { label: "Quote-to-close", base: "23%", target: "35%", horizon: "18 mo" },
          { label: "Response time", base: "48 hrs", target: "4 hrs", horizon: "6 mo" }
        ]
      },
      {
        name: "Service Reliability",
        icon: "service",
        kpis: [
          { label: "First-time fix rate", base: "67%", target: "85%", horizon: "12 mo" },
          { label: "Repeat visits", base: "28%", target: "12%", horizon: "12 mo" }
        ]
      }
    ]
  },

  currentState: {
    rootCauses: [
      { id: 1, label: "Workflow fragmentation", evidence: "Re-keying data across 4 systems, email handoffs", kpiDrag: "-15% efficiency" },
      { id: 2, label: "No single customer view", evidence: "Disconnected CRM, billing, service history", kpiDrag: "-20% CSAT" },
      { id: 3, label: "Manual scheduling", evidence: "Dispatcher bottleneck, no optimization", kpiDrag: "+25% travel time" },
      { id: 4, label: "Paper-based field ops", evidence: "Delayed invoicing, lost documentation", kpiDrag: "-12% margin" },
      { id: 5, label: "Limited visibility", evidence: "No real-time tracking, reactive management", kpiDrag: "-18% SLA" }
    ]
  },

  capabilities: {
    tiles: [
      { name: "Lead→Quote→Onboard workflow", description: "End-to-end automation" },
      { name: "Customer/Job master data", description: "Single source of truth" },
      { name: "Intelligent scheduling", description: "Route optimization + skills matching" },
      { name: "Mobile field app", description: "Offline-first, photo capture" },
      { name: "Real-time dashboards", description: "KPI visibility for all levels" },
      { name: "Integration layer", description: "API-first architecture" }
    ],
    priority: {
      now: ["Customer/Job master data", "Mobile field app"],
      next: ["Lead→Quote→Onboard workflow", "Intelligent scheduling"],
      later: ["Real-time dashboards", "Integration layer"]
    }
  },

  tomArch: {
    tom: {
      businessOwners: ["VP Operations", "VP Sales"],
      productOwners: ["Digital Transformation Lead", "IT Director"],
      dataOwner: "Chief Data Officer",
      securityOwner: "CISO",
      cadence: ["Monthly steerco", "Quarterly stage gates", "Weekly delivery sync"]
    },
    principles: [
      "System-of-record boundaries clearly defined",
      "API-first integration layer (no point-to-point)",
      "Canonical entities + KPI layer",
      "SSO/MFA + RBAC + audit logs"
    ],
    buildBuy: [
      "Bias to buy standard workflow platforms",
      "Build only true differentiators (proprietary algorithms)",
      "Extend via configuration, not code"
    ]
  },

  roadmap: {
    waves: [
      { name: "Wave 0", time: "0–4 weeks", items: ["Baseline KPIs", "Vendor selection", "Team mobilization"], valueIncrement: "Foundation" },
      { name: "Wave 1", time: "Months 2–4", items: ["Core platform setup", "Customer master", "Basic scheduling"], valueIncrement: "Quick wins" },
      { name: "Wave 2", time: "Months 5–8", items: ["Mobile app rollout", "Advanced scheduling", "Integration layer"], valueIncrement: "Scale" },
      { name: "Wave 3", time: "Months 9–12", items: ["Analytics dashboards", "Process optimization", "Full automation"], valueIncrement: "Optimize" }
    ],
    dependencies: [
      "Baselines before benefits measurement",
      "Identity/SSO before system access",
      "Master data before workflow automation",
      "Training before rollout"
    ]
  },

  businessCase: {
    benefits: {
      revenue: ["$1.2M from improved conversion", "$800K from faster onboarding"],
      cost: ["$600K labor efficiency", "$200K reduced travel"],
      risk: ["$300K avoided SLA penalties", "$150K reduced compliance risk"]
    },
    costs: {
      oneTime: ["$1.5M platform license", "$600K implementation"],
      run: ["$300K/yr maintenance", "$150K/yr support"],
      change: ["$200K training", "$100K change management"]
    },
    payback: "18–24 months (illustrative)",
    sensitivities: ["Benefits -50% → 30 mo payback", "Costs +25% → 26 mo payback", "6-mo adoption delay → 28 mo payback"]
  },

  risks: {
    top5: [
      { risk: "Adoption lag", likelihood: "Med", impact: "High", mitigation: "Named benefits owners + training plan" },
      { risk: "Data quality issues", likelihood: "High", impact: "Med", mitigation: "Data cleansing sprint in Wave 0" },
      { risk: "Integration complexity", likelihood: "Med", impact: "Med", mitigation: "API-first design + staging env" },
      { risk: "Vendor lock-in", likelihood: "Low", impact: "High", mitigation: "Contractual data portability clause" },
      { risk: "Change fatigue", likelihood: "Med", impact: "Med", mitigation: "Phased rollout + quick wins first" }
    ]
  },

  next30: {
    workplan: [
      { week: "Week 1", items: ["Kick-off workshop", "Stakeholder mapping", "Current state validation"] },
      { week: "Week 2", items: ["Vendor demos", "Requirements finalization", "Baseline data collection"] },
      { week: "Weeks 3–4", items: ["Vendor selection", "Contract negotiation", "Wave 1 backlog creation"] }
    ],
    outputs: ["Baseline KPI dashboard", "SOR boundary decisions", "Wave 1 prioritized backlog", "Release plan v1.0", "RACI matrix"]
  }
};
