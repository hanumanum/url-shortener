import { EntitySchema } from 'typeorm';

export interface IUrl {
  id: number;
  slug: string;
  shortCode: string;
  originalUrl: string;
  userId: number | null;
  createdAt: Date;
}

export const UrlEntity = new EntitySchema<IUrl>({
  name: 'urls',
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: 'increment',
    },
    userId: {
      type: 'int',
      default: null, //TODO: remove after implementing a user module
    },
    shortCode: {
      type: 'text',
      unique: true,
    },
    originalUrl: {
      type: 'text',
      unique: true,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
});
