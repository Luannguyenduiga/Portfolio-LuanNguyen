import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <nav className="fixed top-0 z-40 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="text-lg font-bold tracking-wide hover:opacity-70 transition-opacity">
            Luan
          </a>
        </div>
      </nav>

      <div className="relative z-10 text-center px-4 mt-16">
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl font-bold mb-4 tracking-tight">404</h1>
          <p className="text-2xl sm:text-3xl font-bold text-foreground mb-4 tracking-tight">Page Not Found</p>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto font-light">
            The page you're looking for doesn't exist, but there's plenty to explore on my portfolio!
          </p>
        </div>

        <a
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-foreground text-background rounded-sm hover:opacity-80 transition-opacity font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
