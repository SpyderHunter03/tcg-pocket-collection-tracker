"use client"

import { Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

interface DatatableProps<TData, TValue> {
    data: TData[]
    columns: ColumnDef<TData, TValue>[]
    caption?: string
}

export default function DynamicTable<TData, TValue>({ 
    data, 
    columns, 
    caption,
}: DatatableProps<TData, TValue>
) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })



    return (
        <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                                HOLA
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length? (
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
                        <TableCell colSpan={columns.length}>No data</TableCell>
                    </TableRow>
                )
                }
                
            </TableBody>
        </Table>
    )
}