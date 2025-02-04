"use client"

import { Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { ColumnDef } from "@tanstack/react-table"

interface DatatableProps<TData, TValue> {
    data: TData[]
    columns: ColumnDef<TData, TValue>[]
    caption?: string
}

export default function CollectionTable<TData, TValue>() {
    return (
        <Table>
            <TableCaption>List of Cards</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Card Name</TableHead>
                    <TableHead>Set</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Charizard</TableCell>
                    <TableCell>Base Set</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>$1000</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Pikachu</TableCell>
                    <TableCell>Jungle</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>$50</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}