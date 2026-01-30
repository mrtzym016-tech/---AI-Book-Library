
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component to catch rendering errors and show a fallback UI.
 * Fixed the TypeScript error by explicitly extending Component with generic Props and State.
 */
class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
          <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-[2.5rem] shadow-xl border border-red-100">
            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-gray-900">عذراً، حدث خطأ غير متوقع</h2>
            <p className="text-gray-500 leading-relaxed">
              تعرض التطبيق لمشكلة تقنية مؤقتة. لقد تم تسجيل الخطأ وجاري العمل على حله.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      );
    }

    // Accessing props via 'this.props', which is correctly inherited from Component<Props, State>
    return this.props.children;
  }
}

export default ErrorBoundary;
