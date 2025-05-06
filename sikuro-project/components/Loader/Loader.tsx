import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const Loader = () => {
  const isSomeQueryPending = useSelector((state: any) =>
    Object.values(state.api.queries).some(
      (query: any) => query.status === "pending"
    )
  );
  const isSomeMutationPending = useSelector((state: any) =>
    Object.values(state.api.mutations).some(
      (mutation: any) => mutation.status === "pending"
    )
  );

  return (
    (isSomeQueryPending || isSomeMutationPending) && (
      <div>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
  );
};

export default Loader;
