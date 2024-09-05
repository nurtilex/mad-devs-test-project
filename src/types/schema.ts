import { z } from 'zod';

const ALIGN_ENUM = z.enum(['left', 'center', 'right']).optional();
const TYPE_ENUM = z.enum(['string', 'float', 'integer', 'boolean']);

const columnSchema = z.object({
  id: z.string(),
  type: TYPE_ENUM,
  caption: z.string(),
  align: ALIGN_ENUM,
});

const primitiveCellSchema = z.union([z.string(), z.number(), z.boolean()]);

const cellSchema = z.union([
  primitiveCellSchema,
  z.object({
    data: z.union([z.string(), z.number(), z.boolean()]),
    color: z.string().optional(),
  }),
]);

export const jsonSchema = z.object({
  header: z.array(columnSchema),
  data: z.array(z.array(cellSchema)),
});

export type ColumnSchema = z.infer<typeof columnSchema>;
export type CellSchema = z.infer<typeof cellSchema>;
export type PrimitiveCellType = z.infer<typeof primitiveCellSchema>;
export type AlignEnum = z.infer<typeof ALIGN_ENUM>;
export type TypeEnum = z.infer<typeof TYPE_ENUM>;
