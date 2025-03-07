'use client';
import { useRouter } from 'next/navigation'

const Youtube = ()=>{
    const router = useRouter()
    const back = ()=>{
        router.push('/')
    }
    return(
        <div>
            <h1>Youtube</h1>
            <button onClick={back}>return</button>
        </div>
    )
}
export default Youtube;