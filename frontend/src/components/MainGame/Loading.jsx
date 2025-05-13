const Loading = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-screen h-screen translate-y-[-80px]">
          <img
            src="/images/loadingvid.gif"
            alt="Loading..."
            className="w-[800px] h-auto"
          />
          <div className="flex flex-row justify-center mt-6 w-[800px]">
            <p className="text-5xl font-coiny animate-pulse mr-4 text-center">
              Loading
            </p>
            <img
              src="/images/loading.gif"
              alt="Loading Spinner"
              className="w-28 h-auto animate-pulse"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Loading;
  