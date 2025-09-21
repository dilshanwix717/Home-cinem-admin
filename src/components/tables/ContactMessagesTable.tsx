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
import { ArrowUpDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ContactMessageTableProps {
  messages: ContactMessage[];
  onSort: (field: "createdAt" | "name" | "email") => void;
  sortField: "createdAt" | "name" | "email";
  sortOrder: "asc" | "desc";
}

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export const ContactMessageTable: React.FC<ContactMessageTableProps> = ({
  messages,
  onSort,
  sortField,
  sortOrder,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 10;

  // Paginate messages
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  const totalPages = Math.ceil(messages.length / messagesPerPage);

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
                onClick={() => onSort("name")}
                className="flex items-center gap-1"
              >
                Name
                {sortField === "name" && (
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
                onClick={() => onSort("email")}
                className="flex items-center gap-1"
              >
                Email
                {sortField === "email" && (
                  <ArrowUpDown
                    className={`h-4 w-4 ${
                      sortOrder === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Button>
            </TableHead>
            <TableHead>Message</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => onSort("createdAt")}
                className="flex items-center gap-1"
              >
                Date
                {sortField === "createdAt" && (
                  <ArrowUpDown
                    className={`h-4 w-4 ${
                      sortOrder === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentMessages.map((message) => (
            <TableRow key={message._id}>
              {/* Name */}
              <TableCell>{message.name}</TableCell>

              {/* Email */}
              <TableCell>{message.email}</TableCell>

              {/* Message */}
              <TableCell>{message.message}</TableCell>

              {/* Date */}
              <TableCell>
                <Tooltip>
                  <TooltipTrigger>
                    <span>
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {new Date(message.createdAt).toLocaleString()}
                  </TooltipContent>
                </Tooltip>
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
