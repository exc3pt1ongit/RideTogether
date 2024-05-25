import React from "react";
import Image from "next/image";
import { DataTable } from "@/components/pages/trips/data-table";
import { columns } from "@/components/pages/trips/columns";
import { z } from "zod";
import { taskSchema } from "@/components/pages/trips/data/schema";
import { UserNav } from "@/components/pages/trips/user-nav";
// import TasksListComponent from "@/components/pages/trips/data/tasks";
import MainContainer from "@/components/containers/MainContainer";

export default function TripsPage() {
  // const tasks = TasksListComponent();

  return (
    // <MainContainer className="fixed h-screen w-screen" title="Поїздки">
    //   <div className="flex px-20 pt-5">
    //     <ul>
    //       Список поїздок:
    //       {data.map((trip: any) => (
    //         <li key={trip.id}>
    //           <Link href={`/trips/${trip.id}`}>
    //             {trip.source.name} - {trip.destination.name}
    //           </Link>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </MainContainer>
    <MainContainer className="fixed h-screen w-screen" title="Поїздки">
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 px-20 md:flex overflow-y-auto">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        {/* <DataTable data={tasks} columns={columns} /> */}
      </div>
    </MainContainer>
  );
}

// export async function getServerSideProps() {
//   try {
//     const res = await fetch(`http://localhost:5035/api/Trips`);
//     const data = await res.json();

//     console.log(data);

//     return { props: { data } };
//   } catch {
//     return { notFound: true };
//   }
// }
