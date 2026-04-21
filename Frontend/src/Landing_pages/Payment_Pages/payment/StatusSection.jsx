export default function StatusSection() {
  return (
    <div className="text-center md:text-left space-y-6">
      
      <div className="w-28 h-28 flex items-center justify-center rounded-full bg-slate-800 mx-auto md:mx-0">
        <span className="material-symbols-outlined text-red-400 text-5xl">
          error
        </span>
      </div>

      <div>
        <h1 className="text-4xl font-bold">
          Transaction declined
        </h1>
        <p className="text-gray-400 mt-2">
          Your bank declined the payment. Try again or use another method.
        </p>
      </div>

    </div>
  );
}