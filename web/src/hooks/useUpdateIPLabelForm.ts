import { zodResolver } from "@hookform/resolvers/zod";
import { handleError } from "@lib/error-handler";
import { IPAddress } from "@lib/types/ip-address";
import { useUpdateIPAddressLabelMutation } from "@store/api/ip-address-api";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  label: z.string().min(1),
});

type FormSchema = z.infer<typeof formSchema>;

type HookParams = {
  defaultValues?: { label: string };
  id?: string;
};

export const useUpdateIPLabelForm = ({ defaultValues, id }: HookParams) => {
  const [updateIPAddressLabel] = useUpdateIPAddressLabelMutation();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const onSubmit = async (data: FormSchema) => {
    try {
      const formData = {
        label: data.label,
        id,
      } as IPAddress;

      await updateIPAddressLabel(formData).unwrap();
    } catch (error: any) {
      handleError(setError, error);
    }
  };

  return {
    form,
    onSubmit: handleSubmit(onSubmit),
    isSubmitting,
    onSuccess: isSubmitSuccessful,
  };
};
