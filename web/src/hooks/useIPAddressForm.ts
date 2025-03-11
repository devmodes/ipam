import { zodResolver } from "@hookform/resolvers/zod";
import { handleError } from "@lib/error-handler";
import { IPAddress } from "@lib/types/ip-address";
import {
  useCreateIPAddressMutation,
  useUpdateIPAddressMutation,
} from "@store/api/ip-address-api";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ipAddressFormSchema = z.object({
  label: z.string().min(1, { message: "Label is required" }),
  ip: z.string().ip(),
  comment: z.string().optional(),
});

type IPAddressForm = z.infer<typeof ipAddressFormSchema>;

type IPAddressFormArgs = {
  defaultValues?: IPAddressForm;
  id?: string;
};

export const useIPAddressForm: any = ({ defaultValues, id }: IPAddressFormArgs) => {
  const [updateRecord] = useUpdateIPAddressMutation();
  const [createRecord] = useCreateIPAddressMutation();
  const form = useForm<IPAddressForm>({
    resolver: zodResolver(ipAddressFormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  const onSubmit = async (data: IPAddressForm) => {
    try {
      if (id) {
        const body = {
          id,
          label: data.label,
          ip: data.ip,
          comment: data.comment || "",
        } as IPAddress;

        await updateRecord(body).unwrap();
      } else {
        const body = {
          label: data.label,
          ip: data.ip,
          comment: data.comment || "",
        } as IPAddress;

        await createRecord(body).unwrap();
      }
    } catch (error: any) {
      if(error.status === 422) {
        handleError(setError, error.data.errors);
      }
    }
  };

  return {
    form,
    onSubmit: handleSubmit(onSubmit),
    isSubmitting,
    onSuccess: isSubmitSuccessful,
  };
};
