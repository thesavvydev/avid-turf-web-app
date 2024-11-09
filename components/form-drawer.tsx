"use client";

import initialFormState, {
  TInitialFormState,
} from "@/constants/initial-form-state";
import { Drawer } from "flowbite-react";
import {
  PropsWithChildren,
  ReactNode,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from "react";
import ErrorAlert from "./error-alert";

type TFormDrawer = PropsWithChildren<{
  FormAction: (
    prevState: TInitialFormState,
    formData: FormData,
  ) => Promise<TInitialFormState>;
  renderTrigger: (arg: () => void) => ReactNode;
  title: string;
  titleIcon: () => ReactNode;
}>;

export default function FormDrawer({
  children,
  FormAction,
  renderTrigger,
  title,
  titleIcon,
}: TFormDrawer) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action] = useActionState(FormAction, initialFormState);

  useEffect(() => {
    if (state.success && state.dismiss) setIsOpen(() => false);
  }, [state.success, state.dismiss, setIsOpen]);

  const toggle = useCallback(() => setIsOpen((prevState) => !prevState), []);

  return (
    <>
      {renderTrigger(toggle)}
      {isOpen && (
        <Drawer open={isOpen} onClose={() => setIsOpen(false)} position="right">
          <Drawer.Header title={title} titleIcon={titleIcon} />
          <Drawer.Items>
            {state.error && (
              <div className="my-4">
                <ErrorAlert message={state.error} />
              </div>
            )}
            <form action={action} className="my-4">
              {children}
            </form>
          </Drawer.Items>
        </Drawer>
      )}
    </>
  );
}
