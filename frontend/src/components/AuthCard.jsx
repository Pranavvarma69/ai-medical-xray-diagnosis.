export default function AuthCard({ title, children }) {
    return (
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          {title}
        </h2>
        {children}
      </div>
    );
  }