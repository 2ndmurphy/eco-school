const PagePlaceholder = () => {
  return (
    <>
      <header className="w-full h-16 flex px-6 py-10 justify-between items-center border-b border-neutral-500">
        
      </header>

      <div className="h-full w-full overflow-y-scroll bg-red-800">
        <section className="min-w-full h-full flex flex-col justify-start items-center px-6 py-3 space-y-4">
          
          {/* Card Word */}

          <div className="w-full flex flex-col justify-center items-center space-y-4">
            <div className="media flex justify-center items-center w-full">
              <h1 className="text-2xl font-bold text-white grow">
                What`s new today
              </h1>
              
            </div>

            {/* Media */}
          </div>
        </section>
      </div>
    </>
  );
}

export default PagePlaceholder;