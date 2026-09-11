import { Component, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex min-h-[400px] items-center justify-center px-4">
          <div className="max-w-md text-center space-y-6 animate-fade-in">
            <div className="size-16 rounded-full bg-[#d96b52]/10 flex items-center justify-center mx-auto">
              <AlertTriangle className="size-8 text-[#d96b52]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#163b2e]">Something went wrong</h2>
              <p className="mt-2 text-[#556157]">
                We're sorry, but something unexpected happened. Our team has been notified.
              </p>
              {this.state.error && process.env.NODE_ENV === "development" && (
                <details className="mt-4 text-left text-xs text-[#717a73] bg-[#f0ede6] p-3 rounded">
                  <summary className="font-mono cursor-pointer">Error details</summary>
                  <pre className="mt-2 overflow-auto">{this.state.error.stack}</pre>
                </details>
              )}
            </div>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={this.handleRetry} className="flex items-center gap-2">
                <RefreshCw className="size-4" />
                Try again
              </Button>
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link to="/">
                  <Home className="size-4" />
                  Go home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
