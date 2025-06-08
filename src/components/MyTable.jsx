import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
} from "./ui/table";

function MyTable({ columns, data, numberOfResults }) {
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(), // Enables pagination , shows 10 per page by default
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 10, // Define desired page size here
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected. */}
          <p>{numberOfResults} items found.</p>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MyTable;

// /** TABLE HEADER -----------------------------------------------------
//  * <Table>
//  * <TableHeader>
//  *   table.getHeaderGroups().map(headerGroup)=>
//  *
//  *   <TableRow>
//  *      headerGroup.headers.map(header)=>
//  *
//  *      <TableHead>
//  *      {flexRender(header.column.columnDef.header,header.getContext())}
//  *      </TableHead>
//  *
//  *   </TableRow>
//  *
//  * </TableHeader>
//  *------------------------------------------------------------------------/

//  /** TABLE BODY -----------------------------------------------------------
//   *
//   * <TableBody>
//   *   table.getRowModel().rows().map(row)=>
//   *
//   *   <TableRow>.
//   *      row.getVisibleCells().map(cell)=>
//   *
//   *      <TableCell>
//   *      {flexRender(cell.column.columnDef.cell, cell.getContext())}
//   *      </TableCell>
//   *
//   *   </TableRow>
//   *
//   * </TableBody>
//   * </Table>
//   *--------------------------------------------------------------------------/
