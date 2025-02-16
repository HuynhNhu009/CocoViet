export const Button = ({ children, className = "", onClick }) => {
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
