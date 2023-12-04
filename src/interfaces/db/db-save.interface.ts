export type DbSave<I> = Omit<I, 'id' | 'created_at' | 'updated_at'>;
