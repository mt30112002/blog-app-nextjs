'use client';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import CreateModal from './create.modal';
import UpdateModel from './update.modal';
import DeleteModal from './delete.model';
import { useState } from 'react';
import Link from 'next/link';

interface IProps {
  blogs: IBlog[];
}
const AppTable = (props: IProps) => {

  const { blogs } = props;
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [showModelEdit, setShowModelEdit] = useState<boolean>(false);
  const [showModelDelete, setShowModelDelete] = useState<boolean>(false);
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const sortedBlogs = [...blogs].sort((a, b) => b.id - a.id);

  return (
    <>
      <div className='mb-3 d-flex justify-content-between'>
        <h3>Blog List</h3>
        <Button variant='secondary' onClick={() => setShowModalCreate(true)}>Add New</Button>
      </div>
      <Table striped bordered hover variant="white">
        <thead>
          <tr>
            <th>NO</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedBlogs?.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>
                <Link href={`/blogs/${item.id}`} className='btn btn-primary'>View</Link>
                <Button variant='warning' className='mx-3'
                  onClick={() => {
                    setBlog(item); // Gán blog vào state
                    setShowModelEdit(true); // Hiển thị modal edit
                  }}>
                  Edit
                </Button>
                <Button variant='danger'
                  onClick={() => {
                    setBlog(item); // Gán blog vào state
                    setShowModelDelete(true); // Hiển thị modal edit
                  }}>
                  Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateModal showModalCreate={showModalCreate} setShowModalCreate={setShowModalCreate} />
      <UpdateModel showModelEdit={showModelEdit} setShowModelEdit={setShowModelEdit} blog={blog} setBlog={setBlog} />
      <DeleteModal showModelDelete={showModelDelete} setShowModelDelete={setShowModelDelete} blog={blog} setBlog={setBlog} />
    </>
  );
};
export default AppTable;