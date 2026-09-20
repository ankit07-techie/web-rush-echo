import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Enterprise-grade Error Boundary for the ECHOES Sonic Archive.
 * Captures uncaught runtime exceptions and renders an archival forensic fallback UI.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Forensic Archive Exception Caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.hash = '';
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#11131b] text-[#e2e1ee] flex items-center justify-center p-6 font-sans">
          <div className="max-w-xl w-full bg-[#191b24] border border-[#ff6e80]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Header Badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#ff6e80]/20 text-[#ff6e80] flex items-center justify-center border border-[#ff6e80]/40">
                <span className="material-symbols-outlined text-2xl">error</span>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#ff6e80] uppercase block">
                  Telemetric Fault Detected
                </span>
                <h2 className="text-xl font-syne font-bold text-white">Archive Ledger Disruption</h2>
              </div>
            </div>

            <p className="text-sm text-[#cbc3d7] mb-6 leading-relaxed">
              A runtime anomaly occurred while rendering the current sonic telemetry view. The core audio and
              data models remain intact. You can reset the archive workspace or review the fault diagnostics below.
            </p>

            {/* Error Message Display */}
            {this.state.error && (
              <div className="bg-[#11131b] rounded-xl p-4 border border-[#33343e] font-mono text-xs text-[#ff6e80] mb-6 overflow-x-auto">
                <span className="text-[#958ea0] block mb-1 font-bold">Error Diagnostic:</span>
                {this.state.error.toString()}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                id="btn-error-reset-archive"
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-xl bg-[#d0bcff] hover:bg-white text-[#3c0091] font-syne text-xs font-bold tracking-wider transition-all duration-150 active:scale-95 shadow-lg flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">restart_alt</span>
                Reset Archive Workspace
              </button>

              <button
                id="btn-error-return-home"
                onClick={() => {
                  this.setState({ hasError: false, error: null, errorInfo: null });
                }}
                className="px-4 py-2.5 rounded-xl bg-[#282a32] hover:bg-[#33343e] text-[#e2e1ee] text-xs font-mono border border-[#494454] transition-colors flex items-center gap-1.5"
              >
                Dismiss & Retry
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
