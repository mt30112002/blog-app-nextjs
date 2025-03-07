'use client';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import CreateModal from './create.modal';
import { useState } from 'react';
interface IProps {
  blogs: IBlog[];
}
const AppTable = (props: IProps) => {
    const { blogs } = props;
    const  [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const sortedBlogs = [...blogs].sort((a, b) => b.id - a.id);
    return (
      <>
        <div className='mb-3 d-flex justify-content-between'>
          <h3>Blog List</h3>
          <Button variant='secondary' onClick={()=>setShowModalCreate(true)}>Add New</Button>
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
            {sortedBlogs?.map((blog, index) => (
              <tr key={blog.id}>
                <td>{index + 1}</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>
                  <Button>View</Button>
                  <Button variant='warning' className='mx-3'>
                    Edit
                  </Button>
                  <Button variant='danger'>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <CreateModal showModalCreate={showModalCreate} setShowModalCreate={setShowModalCreate}/>
      </>
    );
};
export default AppTable;