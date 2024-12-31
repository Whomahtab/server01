import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/components/ui/pagination";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/components/ui/dropdown-menu";

import APP from "../../../dataCred.js";

import { EllipsisVertical } from "lucide-react";
import { NavLink } from "react-router-dom";

const OrderPending = () => {
  const [pendingOrders, setPendingOrder] = useState(null);

  const getTOKEN = localStorage.getItem("AppID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${APP.BACKEND_URL}/api/admin/order/`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${getTOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/json, application/xml",
            "Accept-Language": "en_US",
          },
        });
        const data = await res.json();

        const filteredData = data.filter((order, i) => {
          return order?.status == "Pending";
        });

        // console.log(filteredData);
        setPendingOrder(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
          {pendingOrders &&
            pendingOrders.map((order) => {
              const date = new Date(order.createdAt);
              const day = String(date.getDate()).padStart(2, "0");
              const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
              const year = date.getFullYear();

              // Format the date as dd/mm/yyyy
              const formattedDate = `${day}/${month}/${year}`;

              return (
                <TableRow key={order.order_id}>
                  <TableCell className="font-medium">
                    <NavLink
                      to={`${APP && APP.APP_URL}/dashboard/order/${
                        order && order._id
                      }`}
                    >
                      {order.order_id}
                    </NavLink>
                  </TableCell>
                  <TableCell>
                    <span className="text-orange-500 font-semibold">
                      {order.status}
                    </span>
                  </TableCell>
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

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default OrderPending;
