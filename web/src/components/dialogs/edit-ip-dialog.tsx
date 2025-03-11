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
import { useIPAddressForm } from "@hooks/useIPAddressForm";
import { IPAddress } from "@lib/types/ip-address";
import { PropsWithChildren, useEffect, useState } from "react";

type EditIPDialogProps = PropsWithChildren & {
  item: IPAddress;
};

function EditIPDialog({ item, children }: EditIPDialogProps) {
  const [open, setOpen] = useState(false);
  const { form, onSubmit, isSubmitting, onSuccess } = useIPAddressForm({
    id: item.id,
    defaultValues: {
      ip: item.ip,
      label: item.label,
      comment: item.comment,
    },
  });

  useEffect(() => {
    if (onSuccess) {
      setOpen(false);
    }
  }, [onSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item.ip}</DialogTitle>
          <DialogDescription>Modify this IP Address Record</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-2 my-2">
              <div className="grid my-1 gap-2">
                <FormField
                  name="ip"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IP Address</FormLabel>
                      <FormControl>
                        <Input placeholder="xxx.xxx.xxx.xxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid my-1 gap-2">
                <FormField
                  name="label"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input placeholder="Your IP Label" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid my-1 gap-2">
                <FormField
                  name="comment"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comment</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Comment here (optional)"
                          {...field}
                        />
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

export default EditIPDialog;
