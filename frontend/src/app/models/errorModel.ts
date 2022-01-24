export interface CategoryError {
  name: string;
  errors: SelectableError[];
}

export type SelectableError = GroupError | CheckboxError;

export interface GroupError {
  kind: "group";
  name: string;
  should: string;
  actual: string;
  varErr: VariableError[];
}

export interface CheckboxError {
  kind: "box";
  name: string;
  should: boolean;
  actual: boolean;
  varErr: VariableError[];
}

export type VariableError = VariableRatioError | VariableMCError | VariableValueError;

export interface VariableCommonError {
  id: string;
}

export interface VariableMCError extends VariableCommonError {
  kind: "mc";
  should: string[];
  actual: string[];
}

export interface VariableRatioError extends VariableCommonError{
  kind: "ratio";
  shouldNum: number;
  shouldDenom: number;
  actualNum: number;
  actualDenom: number;
}

export interface VariableValueError extends VariableCommonError {
  kind: "value";
  should: string | number;
  actual: string | number;
}
