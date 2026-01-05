const CategorySection: React.FC = () => {
  return (
    <>
      <h1 className=" font-bold text-[#f3bf74] mb-9">Browse By Category</h1>

      <div className=" w-full h-full flex flex-wrap text-sm ">
        <div className="py-0.5 px-3 border border-black dark:border-white rounded-[6px] mb-4 mr-3 cursor-pointer">
          HTML
        </div>
        <div className="py-0.5 px-3 border border-black dark:border-white rounded-[6px] mb-4 mr-3 cursor-pointer">
          CSS
        </div>
        <div className="py-0.5 px-3 border border-black dark:border-white rounded-[6px] mb-4 mr-3 cursor-pointer">
          javaScript
        </div>
        <div className="py-0.5 px-3 border border-black dark:border-white rounded-[6px] mb-4 mr-3 cursor-pointer">
          Nest
        </div>
        <div className="py-0.5 px-3 border border-black dark:border-white rounded-[6px] mb-4 mr-3 cursor-pointer">
          React
        </div>
        <div className="py-0.5 px-3 border border-black dark:border-white rounded-[6px] mb-4 mr-3 cursor-pointer">
          Vue
        </div>
      </div>
    </>
  );
};

export default CategorySection;
