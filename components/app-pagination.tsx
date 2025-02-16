import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
  type AppPaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }
  
  export default function AppPagination({
    currentPage,
    totalPages,
    onPageChange,
  }: AppPaginationProps) {
    // Create an array of page numbers to display
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  
    return (
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) {
                onPageChange(currentPage - 1)
              }
            }}
          />
          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(page)
                }}
                aria-label={`Goto page ${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1)
              }
            }}
          />
        </PaginationContent>
      </Pagination>
    )
  }
  