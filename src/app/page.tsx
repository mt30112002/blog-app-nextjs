'use client';
import React from "react";
import useSWR from "swr";
import Link from 'next/link'
import AppTable from './components/app.table';

const Home = () => {
  
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "http://localhost:8000/blogs",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );
  if(!data) return <div>Loading...</div>
  if(error) return <div>Error</div>

  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li><Link href={'/client/youtube'}>Youtube</Link></li>
        <li><Link href={'/client/tiktok'}>Tiktok</Link></li>
        <li><Link href={'/client/facebook'}>Facebook</Link></li>
      </ul>
      <AppTable blogs={data} />
    </div>
  );
}
export default Home;