import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
// import useDeleteProduct from "./useDeleteProduct";
import CreateEditButton from "@/components/CreateEditButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Columns = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "coverImage",
    header: "",
    cell: ({ row }) => {
      return (
        <div>
          <img
            src={row.getValue("coverImage")}
            alt="img"
            className="aspect-auto size-16"
          />
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div>
          {
            <Link to={`/products/${row.original.id}`}>
              {row.getValue("name")}
            </Link>
          }
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="!p-0"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <span>Price</span>
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{`${row.getValue("price")}$`}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="!p-0"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <span>Stock</span> <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("stock")}</div>;
    },
  },
  {
    // accessorKey: "action",
    id: "action",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreHorizontal />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`/products/${row.original.id}`}>View Details</Link>
              {/* <Link to={`/products/${row.getValue("id")}`}>View details</Link> */}
              {/* View Details */}
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <CreateEditButton
                sessionType="edit"
                itemToEdit={row.original}
                editBtn={
                  <Button type="submit" className="">
                    Edit
                  </Button>
                }
              />
            </DropdownMenuItem> */}
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <CreateEditButton
                sessionType="edit"
                itemToEdit={row.original}
                editBtn={
                  <Button type="button" variant="ghost" className="p-0">
                    Edit
                  </Button>
                }
              />
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default Columns;
