const Loader = ({ size = "default" }) => {
  const sizeClasses = {
    small: "h-5 w-5 border-2",
    default: "h-8 w-8 border-2",
    large: "h-12 w-12 border-3",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-t-yellow-600 border-yellow-200`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader; 