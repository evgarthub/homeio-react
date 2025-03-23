import { useMutation } from "@tanstack/react-query";
import { Record, recordService } from "../api";
import { recordsQueryKey } from "./useRecordsQuery";
import { queryClient } from "./queryClient";

const updateRecord = async (record: Record) => {
  if (!record.id) {
    return await recordService.post(record);
  }

  return await recordService.put(record.id, record);
};

export const useUpdateRecordMutation = () => {
  return useMutation({
    mutationFn: updateRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recordsQueryKey });
    },
  });
};
