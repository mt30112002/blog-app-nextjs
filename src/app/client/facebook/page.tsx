'use client';
import { useRouter } from 'next/navigation'
import { Button } from 'react-bootstrap';
const FacebookPage = () => {
    const router = useRouter()
    const back = ()=>{
        router.push('/')
    }
  return (
    <div>
      <h1>Facebook Page</h1>
        <Button variant='success'>Youtube</Button>
        <button onClick={back}>return</button>
    </div>
  );
}
export default FacebookPage;