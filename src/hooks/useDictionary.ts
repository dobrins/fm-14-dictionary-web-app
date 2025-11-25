import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { DictionaryResponse } from "../types/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useDictionary = (word: string) => {
  return useQuery<DictionaryResponse[0], Error>({
    queryKey: ["word", word],
    enabled: Boolean(word?.trim()),
    queryFn: async () => {
      await delay(500);

      try {
        const { data } = await axios.get<DictionaryResponse>(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );

        if (!data.length) {
          throw new Error("Word not found");
        }

        return data[0];
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          throw new Error("Word not found");
        }
        throw err as Error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });
};
