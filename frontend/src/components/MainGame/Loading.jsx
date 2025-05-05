const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-screen h-screen -translate-y-20">
        <img
          src="/images/loadingvid.gif"
          alt="Loading..."
          className="max-w-[800px] w-full h-auto"
        />
        <div className="flex flex-row w-full justify-center">
          <p className="text-5xl mt-8 font-coiny animate-pulse mr-3">
            Loading{" "}
          </p>
          <div className="w-32 mt-4">
            <img
              src="/images/loading.gif"
              alt="Loading"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
