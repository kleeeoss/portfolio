export interface ProjectMetric {
  label: string;
  value: string;
  verified: boolean;
  benchmarkContext?: string;
}

export interface FlagshipProject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  deploymentBadge: string;
  githubUrl: string;
  liveUrl?: string;
  techStack: string[];
  keyInvariants: string[];
  metrics: ProjectMetric[];
  highlights: string[];
}

export interface SecondaryProject {
  id: string;
  name: string;
  domain: string;
  description: string;
  githubUrl: string;
  techStack: string[];
  architectureNotes: string;
}

export interface EmpiricalInvariant {
  id: string;
  system: string;
  evaluatedInvariant: string;
  benchmarkMetric: string;
  verificationMechanism: string;
  status: 'VERIFIED' | 'NOMINAL';
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialBadge: string;
  verificationTopic: string;
}

export interface TerminalEntry {
  id: string;
  type: 'command' | 'output' | 'error' | 'system';
  content: string;
  timestamp: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'amber' | 'rose';
}
