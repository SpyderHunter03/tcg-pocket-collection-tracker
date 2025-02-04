"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Pokemon } from "./pokemon"

export const columns: ColumnDef<Pokemon>[] = [
    {
        id: "id",
        header: "ID",
    },
    {
        id: "name",
        header: "Name",
    },
    {
        id: "rarity",
        header: "Rarity",
    },
    {
        id: "card_type",
        header: "Type",
    },
]