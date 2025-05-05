import { Pagination } from "@mui/material";
import { PaginationComponentProps } from "./PaginationComponent.models";
import { useState } from "react";

const PaginationComponent = ({
  totalPages,
  handleSkip,
  ["data-testid"]: dataTestId,
}: PaginationComponentProps) => {
  const [page, setPage] = useState<number>(1);

  const onChangePagination = (value: number) => {
    setPage(value);
    handleSkip(page, value);
  };

  return (
    <Pagination
      id={dataTestId}
      sx={{ display: "flex", justifyContent: "center", my: 4 }}
      count={totalPages}
      page={page}
      onChange={(_, value) => onChangePagination(value)}
    />
  );
};
export default PaginationComponent;
