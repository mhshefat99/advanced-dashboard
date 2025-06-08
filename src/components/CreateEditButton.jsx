// Imports /////////////////////////////////////////////////
import { useState } from "react";
import { Button } from "./ui/button";
import ProductForm from "@/features/products/ProductForm";
// import IconBtn from "./IconBtn";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

function CreateEditButton({
  sessionType,
  itemToEdit = {},
  createBtn,
  editBtn,
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const onFormSubmission = () => setDialogOpen(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {/* {sessionType === "edit" ? (
          <Pencil size={20} className="hover:bg-green-400" />
        ) : (
          <Button className="cursor-pointer bg-white text-black shadow-xl hover:bg-white/70">
            Create
          </Button>
        )} */}
        {sessionType === "edit" ? editBtn : createBtn}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <ProductForm
          sessionType={sessionType}
          productToEdit={itemToEdit}
          onFormSubmission={onFormSubmission}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CreateEditButton;
