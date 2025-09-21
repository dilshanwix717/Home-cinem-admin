import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ContactMessageTable } from "../components/tables/ContactMessagesTable";
import { fetchContactMessages } from "../api/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const ContactMessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"createdAt" | "name" | "email">(
    "createdAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchMessagesData();
  }, []);

  const fetchMessagesData = async () => {
    try {
      const data = await fetchContactMessages();
      setMessages(data);
    } catch (error) {
      toast.error("Failed to fetch messages");
      console.error(error);
    }
  };

  const filteredMessages = messages
    .filter(
      (message) =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const compareValue =
        sortField === "createdAt"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : a.name.localeCompare(b.name);
      return sortOrder === "asc" ? compareValue : -compareValue;
    });

  const toggleSort = (field: "createdAt" | "name" | "email") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <Card className="m-6">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-[#CA168C]">
          Contact Us Messages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#CA168C]" />
              <Input
                placeholder="Search by Name, Email or Message"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <ContactMessageTable
            messages={filteredMessages}
            onSort={toggleSort}
            sortField={sortField}
            sortOrder={sortOrder}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactMessagesPage;
