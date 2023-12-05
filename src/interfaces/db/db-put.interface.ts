export type DbPut<I> = Partial<Omit<I, 'id' | 'created_at'>>;
