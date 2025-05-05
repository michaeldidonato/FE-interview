export type PaginationComponentProps = {
  totalPages: number;
  handleSkip: (currentPage: number, nextPage: number) => void;
  ["data-testid"]?: string;
};
