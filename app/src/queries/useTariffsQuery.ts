import { useQuery } from "@tanstack/react-query";
import { tariffService } from "../api";

export const tariffsQueryKey = ["tariffs"] as const;

export const tariffsQueryFunction = async () => {
  return (await tariffService.get()).data;
};

export const useTariffsQuery = () =>
  useQuery({
    queryKey: tariffsQueryKey,
    queryFn: tariffsQueryFunction,
  });
