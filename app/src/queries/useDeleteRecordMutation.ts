import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { recordsQueryKey } from "./useRecordsQuery";
import { recordService } from "../api";

const deleteRecord = async (id: number) => {
  return await recordService.remove(id);
};

export const useDeleteRecordMutation = () => {
  return useMutation({
    mutationFn: deleteRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recordsQueryKey });
    },
  });
};
