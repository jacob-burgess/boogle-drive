import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadForm } from "@/components/upload-form";

export function UploadDialog() {
  return (
    <Dialog>
      <DialogTrigger>Upload</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a file</DialogTitle>
          <DialogDescription>
            Select a file to upload to your drive.
          </DialogDescription>
        </DialogHeader>
        <UploadForm />
      </DialogContent>
    </Dialog>
  );
}
