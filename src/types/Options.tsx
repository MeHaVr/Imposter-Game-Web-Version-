export type Option = {
  value: string;
  label: string;
};

export type LanguageOption = {
  value: string;
  label: string;
};

export const languageOptions: LanguageOption[] = [
  { value: "de", label: "Deutsch" },
  { value: "en", label: "English" },
];

export type UploadWord = { word: string; tips: string[] };
