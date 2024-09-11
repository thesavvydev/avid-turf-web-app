export type TInitialFormState = {
  success: boolean;
  message: string | null;
  error: string | null;
  dismiss: boolean;
};

const initialFormState = {
  success: false,
  message: null,
  error: null,
  dismiss: false,
};

export default initialFormState;
