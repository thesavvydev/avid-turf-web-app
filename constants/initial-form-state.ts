export type TInitialFormState = {
  success: boolean;
  message: string | null;
  error: string | null;
  dismiss: boolean;
  data: any;
};

export const initialFormState = {
  success: false,
  message: null,
  error: null,
  dismiss: false,
  data: null,
};

export function formStateResponse<T>(overrides: Partial<TInitialFormState>) {
  return {
    ...initialFormState,
    ...overrides,
  };
}

export default initialFormState;
