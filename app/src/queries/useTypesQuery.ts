import { useQuery } from "@tanstack/react-query";
import { typeService } from "../api";

export const typesQueryKey = ["types"] as const;

export const typesQueryFunction = async () => {
  return (await typeService.get()).data;
};

export const useTypesQuery = () =>
  useQuery({
    queryKey: typesQueryKey,
    queryFn: typesQueryFunction,
  });
