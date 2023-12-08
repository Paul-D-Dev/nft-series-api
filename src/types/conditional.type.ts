export type Conditional<P, T, Condition = void> = P extends Condition ? T : P;
