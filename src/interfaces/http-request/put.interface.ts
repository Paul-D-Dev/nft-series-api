export type Put<T> = Partial<Omit<T, 'id' | 'createdAt'>>;
