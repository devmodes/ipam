import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@hooks/useAppStore";
import { handleError } from "@lib/error-handler";
import { User } from "@lib/types/user";
import { useSignupMutation } from "@store/api/auth-api";
import { authenticate } from "@store/reducers/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const registerFormSchema = z
  .object({
    name: z.string().min(1, { message: "The name is required" }),
    email: z.string().email(),
    password: z.string().min(6),
    password_confirmation: z.string().min(6),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

type RegisterForm = z.infer<typeof registerFormSchema>;

type ResponseType = {
  data: {
    user: User;
    token: string;
  };
};

export const useRegisterForm = (defaultValues?: RegisterForm) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
  });
  const {
    setError,
    formState: { isSubmitting },
  } = form;
  const [signup] = useSignupMutation();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res: ResponseType = await signup(data).unwrap();

      dispatch(
        authenticate({
          user: res.data.user,
          token: res.data.token,
        })
      );

      navigate("/app");
    } catch (error: any) {
      if (error.status === 422) {
        handleError(setError, error.data.errors);
      }
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting,
  };
};
