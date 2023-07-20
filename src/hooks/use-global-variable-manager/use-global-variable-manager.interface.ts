export declare namespace IUseGlobalVariableManager {
  export type AnyFunction = (...args: any) => any;

  export type Value = string | number | AnyFunction;

  export type VariableItem = {
    name: string;
    value: Value;
  }

  export interface Props {
    isAutoDeleteAtUnmounted?: boolean;
    variableItems?: VariableItem[];
  }
}