const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-4 max-w-[85%]">
      <div className="bg-surface-container-high p-4 rounded-2xl flex gap-1">
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-400"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;