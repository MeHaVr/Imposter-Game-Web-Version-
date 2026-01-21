export type WordSetListItem = {
  id: string;
  title: string;
  desc: string;
  updatedAt: string;
};

export type WordSetDetail = {
  id: string;
  title: string;
  desc: string;
  words: { word: string; tips: string[] }[];
  createdAt: string;
  updatedAt: string;
};
