import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Film } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PaymentTableProps } from "@/types/PaymentTypes";

export const PaymentTable: React.FC<PaymentTableProps> = ({
  payments,
  onSort,
  sortField,
  sortOrder,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 10;

  // Paginate payments
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = payments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const totalPages = Math.ceil(payments.length / paymentsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("amount")}
                className="flex items-center gap-1"
              >
                User ID
              </Button>
            </TableHead>
            <TableHead>Payment ID</TableHead>

            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("date")}
                className="flex items-center gap-1"
              >
                Date
                {sortField === "date" && (
                  <ArrowUpDown
                    className={`h-4 w-4 ${
                      sortOrder === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Button>
            </TableHead>

            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("amount")}
                className="flex items-center gap-1"
              >
                Amount
                {sortField === "amount" && (
                  <ArrowUpDown
                    className={`h-4 w-4 ${
                      sortOrder === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Button>
            </TableHead>

            <TableHead>Movies</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPayments.map((payment) => (
            <TableRow key={payment._id}>
              <TableCell>
                <span className="font-medium">{payment.userId}</span>
              </TableCell>
              <TableCell>
                <span className="font-medium">{payment._id}</span>
              </TableCell>
              <TableCell>
                {payment.date ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <span>{new Date(payment.date).toLocaleDateString()}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {new Date(payment.date).toLocaleString()}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <span className="text-gray-500">No Date Available</span>
                )}
              </TableCell>

              <TableCell className="font-bold">
                LKR {payment.amount.toFixed(2)}
              </TableCell>

              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Film className="h-4 w-4 mr-2" />
                      {payment.purchasedMovies.length} Movies
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-white">
                    <div className="space-y-2">
                      <h4 className="font-medium">Purchased Movies</h4>
                      <div className="max-h-48 overflow-auto">
                        {payment.purchasedMovies.map((movie, index) => (
                          <div
                            key={movie.movieId}
                            className="flex items-start space-x-2 py-2 border-b last:border-0"
                          >
                            <span className="font-medium text-[#CA168C] min-w-6">
                              {index + 1}.
                            </span>
                            <div className="flex-1">
                              <p className="font-medium">{movie.title}</p>
                              <p className="text-xs text-gray-500">
                                ID: {movie.movieId}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>

              <TableCell>
                <Badge
                  className={`px-2 py-1 rounded-md ${
                    payment.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : payment.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {payment.status.charAt(0).toUpperCase() +
                    payment.status.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => handlePageChange(page)}
                className="px-3 py-1"
              >
                {page}
              </Button>
            )
          )}
        </div>

        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </>
  );
};
