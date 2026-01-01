import Discription from './home/discription';

export default function Home() {
  return (
    <main className=" w-full h-[calc(100%-57px)] mt-16">
      <div className="h-full">
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
