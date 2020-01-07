export interface UploadingProgress {
  fileName: string;
  loaded: number;
  total: number;
}

// defines the state of the authoring content items
export type UploadingState = Record<string, UploadingProgress>;
