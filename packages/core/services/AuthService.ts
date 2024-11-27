import { AuthFormFields } from "@repo/core/types/forms/auth-form";
import hc from "../helpers/api";

export const AuthService = {
  login: async (values: AuthFormFields) => {
    try {
      const data = await hc.auth["sign-in"].$post({
        json: { email: values.email, password: values.password },
      });

      if (!data.ok) {
        const error = await data.json();
        throw new Error(error.message);
      }

      return await data.json();
    } catch (error) {
      throw error;
    }
  },
  signup: async (values: AuthFormFields) => {
    try {
      const data = await hc.auth["sign-up"].$post({
        json: {
          email: values.email,
          password: values.password,
          first_name: values.first_name!,
          last_name: values.last_name!,
          phone_number: values.phone_number!,
        },
      });

      if (!data.ok) {
        const error = await data.json();
        throw new Error(error.message);
      }

      return await data.json();
    } catch (error) {
      throw error;
    }
  },
};
