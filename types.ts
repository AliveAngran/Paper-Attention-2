export enum SectionId {
  INTRO = 'intro',
  RNN_VS_TRANSFORMER = 'rnn-vs-transformer',
  EMBEDDINGS = 'embeddings',
  POSITIONAL = 'positional',
  QKV = 'qkv',
  SCALED_DOT = 'scaled-dot',
  SELF_ATTENTION = 'self-attention',
  MULTI_HEAD = 'multi-head',
  RESIDUAL = 'residual',
  MASKED = 'masked',
  RESULTS = 'results'
}

export interface NavItem {
  id: SectionId;
  label: string;
  shortLabel: string;
}

export interface Author {
  name: string;
  affiliation: string;
  note?: string;
}

export const AUTHORS: Author[] = [
  { name: "Ashish Vaswani", affiliation: "Google Brain" },
  { name: "Noam Shazeer", affiliation: "Google Brain" },
  { name: "Niki Parmar", affiliation: "Google Research" },
  { name: "Jakob Uszkoreit", affiliation: "Google Research" },
  { name: "Llion Jones", affiliation: "Google Research" },
  { name: "Aidan N. Gomez", affiliation: "University of Toronto" },
  { name: "Łukasz Kaiser", affiliation: "Google Brain" },
  { name: "Illia Polosukhin", affiliation: "Independent" },
];