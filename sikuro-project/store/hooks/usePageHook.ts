import { useState } from "react";

const usePageHook = () => {
  const limit = 30;
  const [skip, setSkip] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const handleSkip = (currentPage: number, nextPage: number) => {
    if (nextPage > currentPage) {
      const gap = nextPage - currentPage;
      setSkip(skip + limit * gap);
    } else {
      const gap = currentPage - nextPage;
      setSkip(skip - limit * gap);
    }
  };

  const handleCategory = (value: string) => {
    setCategory(value);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return {
    skip,
    limit,
    category,
    search,
    handleSkip,
    handleCategory,
    handleSearch,
  };
};

export default usePageHook;
