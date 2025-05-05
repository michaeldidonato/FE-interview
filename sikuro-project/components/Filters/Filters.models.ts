export type FiltersProps = {
  dataCategory: Category[];
  handleCategory: (category: string) => void;
  handleSearch: (category: string) => void;
};

export type Category = {
  slug: string;
  name: string;
  url: string;
};

export enum FILTER_TYPE {
  CATEGORY = "category",
  SEARCH = "search",
}
