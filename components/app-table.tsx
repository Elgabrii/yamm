"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AppPagination from "./app-pagination"

export type Column<T> = {
  /** Header text for the column */
  header: string
  /**
   * Either a key of the data item or a function that receives the row data and returns a React node.
   * If both `accessor` and `cell` are provided, `cell` takes precedence.
   */
  accessor: keyof T | ((row: T) => React.ReactNode)
  /** Optional custom cell renderer for this column */
  cell?: (row: T) => React.ReactNode
}

export interface DataTableProps<T> {
  /** Array of data items */
  data: T[]
  /** Column configuration */
  columns: Column<T>[]
  /** Number of records to show per page (defaults to 10) */
  recordsPerPage?: number
}

export default function DataTable<T>({
  data,
  columns,
  recordsPerPage = 10,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length / recordsPerPage)
  const paginatedData = data.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  )

  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col, colIndex) => {
                let cellContent: React.ReactNode
                if (col.cell) {
                  cellContent = col.cell(row)
                } else if (typeof col.accessor === "function") {
                  cellContent = col.accessor(row)
                } else {
                  cellContent = row[col.accessor] as unknown as React.ReactNode
                }
                return <TableCell key={colIndex}>{cellContent}</TableCell>
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
