"use client"


/////exaple usige this pagination component /////

//  {/* Pagination Component Call */}
//       <PaginationComponent
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={loadUsers}
//       />
  // const [currentPage, setCurrentPage] = useState(1);    // Current page
  // const [totalPages, setTotalPages] = useState(10);     // Backend থেকে আসবে


import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (!totalPages || totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | "...")[] = []

    if (currentPage > 3) pages.push(1)
    if (currentPage > 4) pages.push("...")

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 0 && i <= totalPages) pages.push(i)
    }

    if (currentPage < totalPages - 3) pages.push("...")
    if (currentPage < totalPages - 2) pages.push(totalPages)

    return pages
  }

  const pages = getPageNumbers()

  return (
    <Pagination className="w-full mt-5 ">
      {/* Align pagination to the RIGHT */}
      <PaginationContent className="justify-end w-full">

        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {/* Numbers */}
        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  )
}



