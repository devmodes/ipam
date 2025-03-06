import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Spinner } from "@components/ui/spinner";
import { useUpdateIPLabelForm } from "@hooks/useUpdateIPLabelForm";
import { IPAddress } from "@lib/types/ip-address";
import { PropsWithChildren, useEffect, useState } from "react";

type EditIPLabelDialogProps = PropsWithChildren & {
  item: IPAddress;
};

function EditIPLabelDialog({ item, children }: EditIPLabelDialogProps) {
  const [open, setOpen] = useState(false);
  const { form, onSubmit, isSubmitting, onSuccess } = useUpdateIPLabelForm({
    defaultValues: {
      label: item.label,
    },
    id: item.id,
  });

  useEffect(() => {
    setOpen(false);
  }, [onSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>{item.ip}</DialogTitle>
              <DialogDescription>
                Change the label for this IP Address
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2 my-2">
              <div className="grid flex-1 gap-2">
                <FormField
                  name="label"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IP Label</FormLabel>
                      <FormControl>
                        <Input placeholder="IP Address label" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" size="sm" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button size="sm" disabled={isSubmitting}>
                {isSubmitting && <Spinner />}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditIPLabelDialog;
