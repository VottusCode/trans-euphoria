export interface SuccessPartial<TData extends object = object> {
  success: true;
  data: TData;
}

export interface RestError {
  kind: string;
  message: string;
}

export interface ErrorPartial {
  success: false;
  error: RestError;
}

export type SuccessOrErrorPartial<TData extends object = object> =
  | SuccessPartial<TData>
  | ErrorPartial;
