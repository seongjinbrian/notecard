export interface Note {
    id?: string;
    title: string;
    isChecked: boolean;
    isPinned: boolean;
    isArchived: boolean;
    bgColor: string;
    content: string;
    labels: string[];
  }