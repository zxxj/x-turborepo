const ArticleLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="w-full flex justify-center ">
      <div className="w-full max-w-full lg:max-w-2/3 mt-10 mb-24 ">
        {children}
      </div>
    </main>
  );
};

export default ArticleLayout;
