import type { TypeEnum } from '@/types/schema';

type RecordType<T> = { [key: string]: T };

export const getCompareFnByType = (type: TypeEnum, id: string) => {
  if (type === 'float' || type === 'integer')
    return (a: RecordType<number>, b: RecordType<number>) => a?.[id] - b?.[id];

  if (type === 'boolean')
    return (a: RecordType<boolean>, b: RecordType<boolean>) => {
      const left = a?.[id];
      const right = b?.[id];

      if (left === right) return 0;
      if (left > right) return 1;
      return -1;
    };

  return (a: RecordType<string>, b: RecordType<string>) =>
    (a?.[id] as string).localeCompare(b?.[id]);
};
