import Navbar from '@/components/navbar';
import Discription from './home/discription';

export default function Home() {
  return (
    <main className=" w-full h-full">
      <header className=" fixed top-0 left-0 w-full h-14 z-50 dark:bg-[#0a0a0a] bg-white">
        <Navbar />
      </header>

      <div className="pt-16 h-full">
        <Discription />

        <div className="w-full">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i}>content</div>
          ))}
        </div>
      </div>
    </main>
  );
}
