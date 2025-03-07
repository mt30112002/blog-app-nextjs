"use client";
import { use } from "react"; // Import use() từ React
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Viewdetails = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = use(params); // Dùng use() để lấy giá trị id từ Promise

    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/blogs/${id}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data.</div>;
    if (!data) return <div>No data found.</div>;

    return (
        <>
            <Button variant="primary" href="/blogs">
                Back to Blogs</Button>
            <Card className="text-center">
                <Card.Header>{data.title}</Card.Header>
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>{data.content || "No content available."}</Card.Text>
                    <Button variant="primary">Read More</Button>
                </Card.Body>
                <Card.Footer className="text-muted">
                    {data.createdAt ? `Posted on ${new Date(data.createdAt).toDateString()}` : "Unknown Date"}
                </Card.Footer>
            </Card>
        </>

    );
};

export default Viewdetails;
