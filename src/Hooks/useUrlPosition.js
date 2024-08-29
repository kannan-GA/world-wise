import { useSearchParams } from "react-router-dom";

function useUrlPosition() {
  const [search, setSearch] = useSearchParams();
  const lat = search.get("lat");
  const lng = search.get("lng");

  return [lat, lng];
}

export { useUrlPosition };
