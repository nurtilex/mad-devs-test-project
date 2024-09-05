import type { ColumnType as AntColumnType } from 'ant-design-vue/lib/table/interface';
import type { TableProps } from 'ant-design-vue/lib/table/Table';
import type { DefaultRecordType } from 'ant-design-vue/lib/vc-table/interface';

import type {
  ColumnSchema,
  CellSchema,
  TypeEnum,
  AlignEnum,
  PrimitiveCellType,
} from '@/types/schema';
import { getCompareFnByType } from './getCompareFnByType';

type AntDataSourceType = TableProps['dataSource'];

const DEFAULT_ALIGN: Record<TypeEnum, AlignEnum> = {
  string: 'left',
  float: 'right',
  integer: 'right',
  boolean: 'center',
};

export const getColumns = (headers: ColumnSchema[]): AntColumnType[] => {
  return headers.map((rawHeader) => ({
    key: rawHeader.id,
    dataIndex: rawHeader.id,
    align: rawHeader.align || DEFAULT_ALIGN[rawHeader.type] || 'left',
    title: rawHeader.caption,
    sorter: getCompareFnByType(rawHeader.type, rawHeader.id),
  }));
};

export const getDataSource = (data: CellSchema[][], headers: ColumnSchema[]): AntDataSourceType => {
  const getValueByType = (value: CellSchema, type: TypeEnum): PrimitiveCellType => {
    if (typeof value === 'object') return getValueByType(value.data, type);
    if (type === 'boolean') return value.toString();
    return value;
  };

  const reducerFn = (acc: DefaultRecordType, item: CellSchema, currentIndex: number) => {
    const { id, type } = headers[currentIndex];

    return {
      ...acc,
      [id]: getValueByType(item, type),
    };
  };

  return data.map((dataRow, dataRowIndex) => dataRow.reduce(reducerFn, { key: dataRowIndex }));
};
