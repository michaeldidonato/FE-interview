import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { FILTER_TYPE, FiltersProps } from "./Filters.models";
import { useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Filters = ({
  dataCategory,
  handleCategory,
  handleSearch,
}: FiltersProps) => {
  const [filterType, setFilterType] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const handleFilterType = (value: string) => {
    setFilterType(value);
    value === FILTER_TYPE.SEARCH ? handleCategory("") : handleSearch("");
  };

  console.log({ dataCategory });
  const optionsCategory = useMemo(() => {
    return dataCategory?.map((category) => ({
      label: category.name,
      value: category.slug,
    }));
  }, [dataCategory]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", my: 4, gap: "16px" }}>
      {filterType === FILTER_TYPE.CATEGORY && (
        <Autocomplete
          onChange={(_, opt) => handleCategory(opt?.value ?? "")}
          disablePortal
          options={optionsCategory ?? []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Categories" />}
        />
      )}

      {filterType === FILTER_TYPE.SEARCH && (
        <>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            sx={{ width: 300 }}
            onBlur={(e) => setSearch(e.target.value)}
          />

          <IconButton onClick={() => handleSearch(search)} size="large">
            <SearchIcon />
          </IconButton>
        </>
      )}

      <Button
        onClick={() => handleFilterType(FILTER_TYPE.CATEGORY)}
        variant="outlined"
      >
        Filtro Categoria
      </Button>

      <Button
        onClick={() => handleFilterType(FILTER_TYPE.SEARCH)}
        variant="outlined"
      >
        Filtro Ricerca
      </Button>
    </Box>
  );
};

export default Filters;
