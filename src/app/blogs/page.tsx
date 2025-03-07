"use client";
import AppTable from "../components/app.table";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const BlogsPage = () => {
    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/blogs",
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
    return (
        <div>
            <AppTable blogs={data} />
        </div>
    );
};
export default BlogsPage;
