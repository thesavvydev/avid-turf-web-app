export type TInitialFormState = {
  success: boolean;
  message: string | null;
  error: string | null;
  dismiss: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export const initialFormState = {
  success: false,
  message: null,
  error: null,
  dismiss: false,
  data: null,
};

export function formStateResponse(overrides: Partial<TInitialFormState>) {
  return {
    ...initialFormState,
    ...overrides,
  };
}

export default initialFormState;
