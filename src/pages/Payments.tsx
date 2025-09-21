import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { PaymentTable } from "../components/tables/PaymentsTable";
import { fetchPayments } from "../api/payments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Payment, RawPayment } from "@/types/PaymentTypes";

const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"amount" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchPaymentsData();
  }, []);

  const fetchPaymentsData = async () => {
    try {
      const data: RawPayment[] = await fetchPayments();
      const processedData: Payment[] = data.map((payment) => ({
        _id: payment._id,
        userId: payment.userId,
        purchasedMovies: payment.purchasedMovies.map((movie) => ({
          movieId: movie.movieId,
          title: movie.title,
        })),
        amount: payment.amount,
        date: payment.date,
        status: ["pending", "completed", "failed"].includes(payment.status)
          ? (payment.status as "pending" | "completed" | "failed")
          : "pending",
      }));
      setPayments(processedData);
    } catch (error) {
      toast.error("Failed to fetch movies");
      console.error(error);
    }
  };

  const filteredPayments = payments
    .filter(
      (payment) =>
        payment.userId &&
        payment.userId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const compareValue =
        sortField === "date"
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : b.amount - a.amount;
      return sortOrder === "asc" ? -compareValue : compareValue;
    });

  const toggleSort = (field: "amount" | "date") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-[#CA168C]">
          Payments Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#CA168C]" />
              <Input
                placeholder="Search by User ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <PaymentTable
            payments={filteredPayments}
            onSort={toggleSort}
            sortField={sortField}
            sortOrder={sortOrder}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentsPage;
