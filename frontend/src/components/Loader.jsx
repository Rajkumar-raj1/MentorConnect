const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

      <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium text-center">
        {text}
      </p>
    </div>
  );
};

export default Loader;