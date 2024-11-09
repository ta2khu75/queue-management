import Link from 'next/link'
import { redirect } from 'next/navigation'
export default function Home() {
  return (
    <div>
      <h1>Welcome to queue management Create by Alta Software</h1>
      <div >
        <div>
          <span>tk:</span><span>minh</span>
        </div>
        <div>
          <span>mk:</span><span>minh</span>
        </div>
        <p>You can test with <Link className='text-blue-500 cursor-pointer' href={"/login"}>Login</Link></p>
      </div>
    </div>
  )
}
