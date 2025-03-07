'use client';
import { useRouter } from 'next/navigation'

const TiktokPage = () => {
    const router = useRouter()
    const back = ()=>{
        router.push('/')
    }
  return (
    <div>
      <h1>Tiktok Page</h1>
      <button onClick={back}>return</button>
    </div>
  );
}
export default TiktokPage;