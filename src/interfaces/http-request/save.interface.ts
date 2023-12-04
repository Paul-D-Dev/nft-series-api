export type Save<I> = Omit<I, 'id' | 'createdAt' | 'updateAt'>;
