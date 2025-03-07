"use client";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
}

function CreateModal(props: IProps) {
  const { showModalCreate, setShowModalCreate } = props;

  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = async ()=>{
    if(title === '' || author === '' || content === '') return toast.error('Please fill in all fields');
    const res = await fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, author: author, content: content})
      }).then(res => res.json()).then(res=>{
        if(res) return toast.success('New blog added successfully');
      }).catch(() => toast.error('Failed to add new blog'));
      console.log(res);
      handleClose();
      mutate('http://localhost:8000/blogs');
  }

  const handleClose = () => {
    setTitle('');
    setAuthor('');
    setContent('');
    setShowModalCreate(false);
  };

  return (
    <>
      <Modal
        show={showModalCreate}
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

export default CreateModal;