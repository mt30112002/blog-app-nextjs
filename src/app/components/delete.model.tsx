"use client";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
    showModelDelete: boolean;
    setShowModelDelete: (value: boolean) => void;
    blog: IBlog | null;
    setBlog: (value: IBlog | null) => void;
  }

const DeleteModal = (props: IProps) => {

  const { showModelDelete, setShowModelDelete, blog, setBlog } = props;
  const [id, setId] = useState<number>(0);
  useEffect(() => {
    if (blog && blog.id) {
      setId(blog.id);
    }
  }, [blog]);

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:8000/blogs/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()).then(res => {
      if (res) return toast.success('Delete successfully');
    }).catch(() => toast.error('Failed to delete blog'));
    console.log(res);
    handleClose();
    mutate('http://localhost:8000/blogs');
  }

  const handleClose = () => {
    setBlog(null);
    setShowModelDelete(false);
  };

  return (
    <>
      <Modal show={showModelDelete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Are you sure you want to delete this blog?</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteModal;