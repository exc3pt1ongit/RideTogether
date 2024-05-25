import MainContainer from "@/components/containers/MainContainer";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default function UsersPage({ data }: any) {
  return (
    <MainContainer className="fixed h-screen w-screen" title="Користувач">
      <div className="flex px-20 pt-5">
        <ul>
          Список користувачів:
          {data.map((user: any) => (
            <li key={user.id}>
              <Link href={`/users/${user.id}`}>{user.nickname}</Link>
            </li>
          ))}
        </ul>
      </div>
    </MainContainer>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.SERVER_URI}/Users`);
    const data = await res.json();

    return !data?.details ? { props: { data } } : { notFound: true };
  } catch {
    return { notFound: true };
  }
}
