import Link from 'next/link'
import AppTable from './components/app.table';
const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li><Link href={'/client/youtube'}>Youtube</Link></li>
        <li><Link href={'/client/tiktok'}>Tiktok</Link></li>
        <li><Link href={'/client/facebook'}>Facebook</Link></li>
      </ul>
      <AppTable />
    </div>
  );
}
export default Home;