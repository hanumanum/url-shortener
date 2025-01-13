import { EntitySchema } from 'typeorm';

export interface IUrlUsageStats {
  id: number;
  shortCode: string;
  number: number;
  createdAt: Date;
}

export const UrlUsageStatsEntity = new EntitySchema<IUrlUsageStats>({
  name: 'url_usage_stats', 
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment',
    },
    shortCode: {
      type: 'text',
    },
    number: {
      type: 'bigint',
      default: 0
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    }
  },
  indices: [
    {
      name: 'IDX_SHORT_CODE',
      columns: ['shortCode'],
    },
  ],
});
