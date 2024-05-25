import { ColumnDef } from "@tanstack/react-table";
import { Task } from "./data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import {
  CircleArrowUp,
  CircleChevronRight,
  Compass,
  Hourglass,
  LucideIcon,
  UserRoundX,
  UserSearch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type TripStatusesType = {
  label: string;
  icon: LucideIcon;
};
const TripStatuses: TripStatusesType[] = [
  {
    label: "Пошук попутників",
    icon: UserSearch,
  },
  {
    label: "Очікується",
    icon: Hourglass,
  },
  {
    label: "Місць немає",
    icon: UserRoundX,
  },
];

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "route",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Початок - місце призначення"
      />
    ),
    cell: ({ row }) => {
      const startTime = new Date(row.original.startTime).toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      );

      const endTime = new Date(row.original.endTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return (
        <div className="w-[300px]">
          <div className="flex items-center">
            <CircleArrowUp className="w-5 h-5 mr-1" />
            {startTime} -
            <span className="ml-1 text-muted-foreground">
              {row.original.source.name}
            </span>
          </div>
          <br />
          <div className="flex items-center">
            <Compass className="w-5 h-5 mr-1" />
            {endTime} -
            <span className="ml-1 text-muted-foreground">
              {row.original.destination.name}
            </span>
          </div>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "distance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Приблизна дистанція" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.distance.toFixed(2)} км
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Статус поїздки" />
    ),
    cell: ({ row }) => {
      const status = TripStatuses[row.original.status];

      return (
        <div className="flex space-x-2 items-center">
          <status.icon className="w-5 h-5" />
          <span className="max-w-[500px] truncate font-medium">
            {status.label}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ціна поїздки" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 items-center">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.price} ₴
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "driver",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Водій" />
  //   ),
  //   cell: async ({ row }) => {
  //     if (!row.original.driverId) return;

  //     const driver = await requestUserData(row.original.driverId.toString());

  //     if (driver?.details) return;

  //     return (
  //       <div className="flex space-x-2 items-center">
  //         <span className="max-w-[500px] truncate font-medium">
  //           {driver?.lastName} {driver?.firstName}
  //         </span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: "rideBtn",
    header: () => "",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 items-center">
          <Link href={`/trips/${row.original.id}`}>
            <Button className="" variant="link">
              Переглянути поїздку{" "}
              <CircleChevronRight className="pl-2 w-6 h-6" />
            </Button>
          </Link>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
];
