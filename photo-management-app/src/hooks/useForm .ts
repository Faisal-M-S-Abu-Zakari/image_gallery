import { useRef } from "react";
import { User } from "../types";

export const useForm = () => {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const check = useRef<HTMLInputElement>(null);

  const getFormData = (): User | null => {
    if (
      email.current?.value &&
      password.current?.value &&
      (name.current?.value || true) // Allow for no name on login form
    ) {
      return {
        name: name.current?.value,
        email: email.current?.value,
        password: password.current?.value,
        check: check.current?.checked,
      };
    }
    return null;
  };

  return { name, email, password, check, getFormData };
};
