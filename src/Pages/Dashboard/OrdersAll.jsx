import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/components/ui/table";

import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/components/ui/dropdown-menu";

const OrdersAll = [
  {
    id: 1,
    name: "Manish Maurya",
    status: "Paid",
    paymentMethod: "Credit Card",
    amount: "₹1280",
    invoiceNo: "INV123456",
    transactionDate: "12-Dec-2024",
  },
  {
    id: 2,
    name: "Priya Sharma",
    status: "Unpaid",
    paymentMethod: "Debit Card",
    amount: "₹2500",
    invoiceNo: "INV123457",
    transactionDate: "11-Dec-2024",
  },
  {
    id: 3,
    name: "John Doe",
    status: "Paid",
    paymentMethod: "PayPal",
    amount: "₹3200",
    invoiceNo: "INV123458",
    transactionDate: "10-Dec-2024",
  },
  {
    id: 4,
    name: "Ravi Kumar",
    status: "Paid",
    paymentMethod: "Credit Card",
    amount: "₹1850",
    invoiceNo: "INV123459",
    transactionDate: "09-Dec-2024",
  },
  {
    id: 5,
    name: "Sita Rani",
    status: "Unpaid",
    paymentMethod: "Bank Transfer",
    amount: "₹1500",
    invoiceNo: "INV123460",
    transactionDate: "08-Dec-2024",
  },
  {
    id: 6,
    name: "Arvind Yadav",
    status: "Paid",
    paymentMethod: "Cash",
    amount: "₹500",
    invoiceNo: "INV123461",
    transactionDate: "07-Dec-2024",
  },
  {
    id: 7,
    name: "Simran Kaur",
    status: "Paid",
    paymentMethod: "Credit Card",
    amount: "₹2200",
    invoiceNo: "INV123462",
    transactionDate: "06-Dec-2024",
  },
  {
    id: 8,
    name: "Amit Kumar",
    status: "Unpaid",
    paymentMethod: "Debit Card",
    amount: "₹3000",
    invoiceNo: "INV123463",
    transactionDate: "05-Dec-2024",
  },
  {
    id: 9,
    name: "Meena Patel",
    status: "Paid",
    paymentMethod: "PayPal",
    amount: "₹1800",
    invoiceNo: "INV123464",
    transactionDate: "04-Dec-2024",
  },
  {
    id: 10,
    name: "Karan Singh",
    status: "Unpaid",
    paymentMethod: "Credit Card",
    amount: "₹2000",
    invoiceNo: "INV123465",
    transactionDate: "03-Dec-2024",
  },
  {
    id: 11,
    name: "Shivani Verma",
    status: "Paid",
    paymentMethod: "Cash",
    amount: "₹700",
    invoiceNo: "INV123466",
    transactionDate: "02-Dec-2024",
  },
  {
    id: 12,
    name: "Nina Gupta",
    status: "Paid",
    paymentMethod: "Bank Transfer",
    amount: "₹1400",
    invoiceNo: "INV123467",
    transactionDate: "01-Dec-2024",
  },
  {
    id: 13,
    name: "Deepak Chauhan",
    status: "Unpaid",
    paymentMethod: "Debit Card",
    amount: "₹2100",
    invoiceNo: "INV123468",
    transactionDate: "30-Nov-2024",
  },
  {
    id: 14,
    name: "Rita Das",
    status: "Paid",
    paymentMethod: "Credit Card",
    amount: "₹800",
    invoiceNo: "INV123469",
    transactionDate: "29-Nov-2024",
  },
  {
    id: 15,
    name: "Asha Devi",
    status: "Unpaid",
    paymentMethod: "PayPal",
    amount: "₹900",
    invoiceNo: "INV123470",
    transactionDate: "28-Nov-2024",
  },
];

import APP from "../../../dataCred.js";

import { EllipsisVertical } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function LinksTable() {
  const [Orders, setOrder] = useState(null);
  const getTOKEN = localStorage.getItem("AppID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${APP.BACKEND_URL}/api/admin/order/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getTOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/json, application/xml",
            "Accept-Language": "en_US",
          },
        });
        const data = await res.json();
        setOrder(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // ['Pending', 'Processing', 'Shipped', 'Delivered', 'Success', 'Cancelled', 'Returned', 'Refunded', 'Failed', 'On Hold', 'Awaiting Payment', 'Out for Delivery', 'Declined'],

  const changeOrderStatusColor = (status) => {
    if (status == "Pending") {
      return (
        <>
          <span className="text-orange-500">{status}</span>
        </>
      );
    }

    if (status == "Success" || status == "Delivered" || status == "Shipped") {
      return (
        <>
          <span className="text-green-500">{status}</span>
        </>
      );
    }

    if (status == "Failed" || status == "Declined") {
      return (
        <>
          <span className="text-red-500">{status}</span>
        </>
      );
    }

    console.log(status);
  };

  return (
    <div className="w-full">
      <Table>
        <TableCaption>.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Invoice No. </TableHead>
            <TableHead className="text-right">Transaction Date</TableHead>
            {/* <TableHead className="text-right">Actions</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Orders &&
            Orders.map((order) => {
              const date = new Date(order.createdAt);
              const day = String(date.getDate()).padStart(2, "0");
              const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
              const year = date.getFullYear();

              // Format the date as dd/mm/yyyy
              const formattedDate = `${day}/${month}/${year}`;

              return (
                <TableRow key={order.order_id}>
                  <TableCell className="font-medium">
                    <NavLink to={`${order._id}`}>{order.order_id}</NavLink>
                  </TableCell>
                  <TableCell>{changeOrderStatusColor(order.status)}</TableCell>
                  <TableCell>{order.payment_method}</TableCell>
                  <TableCell className="text-right">
                    {order.total_amount}
                  </TableCell>
                  <TableCell className="text-right">{Math.random()}</TableCell>
                  <TableCell className="text-right">{formattedDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          View More
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:text-red-800 cursor-pointer">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
