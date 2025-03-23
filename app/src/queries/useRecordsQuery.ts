import { useQuery } from "@tanstack/react-query";
import { recordService } from "../api";

export const recordsQueryKey = ["records"] as const;

export const recordsQueryFunction = async () =>
  (await recordService.get()).data;

export const useRecordsQuery = () =>
  useQuery({
    queryKey: recordsQueryKey,
    queryFn: recordsQueryFunction,
  });
