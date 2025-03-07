'use client';

import React from "react";
import useSWR from "swr";
import Link from 'next/link';
import AppTable from './components/app.table';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Home = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li><Link href="/client/youtube">Youtube</Link></li>
        <li><Link href="/client/tiktok">Tiktok</Link></li>
        <li><Link href="/client/facebook">Facebook</Link></li>
      </ul>
      <AppTable blogs={data} />
    </div>
  );
};

export default Home;
