"use client";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  showModelEdit: boolean;
  setShowModelEdit: (value: boolean) => void;
  blog: IBlog | null;
  setBlog: (value: IBlog | null) => void;
}


function UpdateModal(props: IProps) {
  const { showModelEdit, setShowModelEdit, blog, setBlog } = props;

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (blog && blog.id) {
      setId(blog.id);
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
    }
  }, [blog]);

  const handleSubmit = async ()=>{
    if(title === '' || author === '' || content === '') return toast.error('Please fill in all fields');
    const res = await fetch(`http://localhost:8000/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, author: author, content: content})
      }).then(res => res.json()).then(res=>{
        if(res) return toast.success('Update successfully');
      }).catch(() => toast.error('Failed to update blog'));
      console.log(res);
      handleClose();
      mutate('http://localhost:8000/blogs');
  }

  const handleClose = () => {
    setTitle('');
    setAuthor('');
    setContent('');
    setBlog(null);
    setShowModelEdit(false);
  };

  return (
    <>
      <Modal
        show={showModelEdit}
        onHide={() => handleClose()}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="..."   
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="..." 
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} 
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;