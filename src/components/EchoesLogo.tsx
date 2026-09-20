import React from 'react';

export interface EchoesLogoProps {
  variant?: 'full' | 'horizontal' | 'badge' | 'compact';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
  interactive?: boolean;
}

export const EchoesLogo: React.FC<EchoesLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showSubtitle = true,
  interactive = false,
}) => {
  // Dimension tokens
  const badgeSizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-24 h-24',
  };

  const titleSizeMap = {
    xs: 'text-xs tracking-wider',
    sm: 'text-sm tracking-widest',
    md: 'text-base tracking-[0.18em]',
    lg: 'text-xl tracking-[0.22em]',
    xl: 'text-3xl tracking-[0.25em]',
  };

  const subtitleSizeMap = {
    xs: 'text-[7px] tracking-[0.15em]',
    sm: 'text-[8px] tracking-[0.2em]',
    md: 'text-[9px] tracking-[0.22em]',
    lg: 'text-[11px] tracking-[0.25em]',
    xl: 'text-xs tracking-[0.3em]',
  };

  if (variant === 'badge') {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden ${badgeSizeMap[size]} ${
          interactive ? 'transition-transform duration-300 hover:scale-105 group' : ''
        } ${className}`}
      >
        <img
          src="/echoes-emblem.svg"
          alt="Echoes Emblem"
          className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
          referrerPolicy="no-referrer"
        />
        {/* Specular sheen effect on hover */}
        {interactive && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Circular Emblem */}
        <div className="relative mb-3.5 group">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.8),0_0_24px_rgba(123,60,237,0.2)] border border-[#ffffff]/10">
            <img
              src="/echoes-emblem.svg"
              alt="Echoes Chrome Emblem"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Subtle Ambient Purple Glow */}
          <div className="absolute -inset-1 rounded-full bg-[#7c3aed]/15 blur-xl -z-10 pointer-events-none" />
        </div>

        {/* 3D Stylized Typography: ECHOES with Receipt in 'O' */}
        <div className="relative flex items-center justify-center mb-1">
          <span
            className="font-syne font-black text-3xl sm:text-4xl tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#cfd4e3] to-[#8a55e8] drop-shadow-[0_3px_8px_rgba(123,60,237,0.4)]"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 12px rgba(123,60,237,0.3)',
            }}
          >
            ECH
          </span>

          {/* Styled 'O' with Mini Receipt icon */}
          <div className="relative inline-flex items-center justify-center mx-0.5">
            <span
              className="font-syne font-black text-3xl sm:text-4xl tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#cfd4e3] to-[#8a55e8]"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 12px rgba(123,60,237,0.3)',
              }}
            >
              O
            </span>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="material-symbols-outlined text-[12px] sm:text-[14px] text-[#e2e1ee] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-bold">
                receipt
              </span>
            </div>
          </div>

          <span
            className="font-syne font-black text-3xl sm:text-4xl tracking-[0.22em] text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#cfd4e3] to-[#8a55e8] drop-shadow-[0_3px_8px_rgba(123,60,237,0.4)]"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 0 12px rgba(123,60,237,0.3)',
            }}
          >
            ES
          </span>
        </div>

        {/* Subtitle: YOUR LIFE, IN RECEIPTS */}
        {showSubtitle && (
          <p className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.32em] text-[#c5c8d4] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            YOUR LIFE, IN RECEIPTS
          </p>
        )}
      </div>
    );
  }

  // Default: 'horizontal' lockup (ideal for headers and sidebars)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Circular Emblem */}
      <div
        className={`relative shrink-0 rounded-full overflow-hidden ${badgeSizeMap[size]} shadow-[0_4px_14px_rgba(0,0,0,0.6)] border border-[#ffffff]/10`}
      >
        <img
          src="/echoes-emblem.svg"
          alt="Echoes Logo Emblem"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center">
          <span
            className={`font-syne font-black ${titleSizeMap[size]} text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#e2e5f0] to-[#9d5bf0] leading-none block`}
            style={{
              textShadow: '0 2px 6px rgba(0,0,0,0.8), 0 0 10px rgba(123,60,237,0.25)',
            }}
          >
            ECHOES
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-mono font-semibold ${subtitleSizeMap[size]} text-[#c5c8d4]/90 uppercase leading-none mt-1 whitespace-nowrap block`}
          >
            Your Life, In Receipts
          </span>
        )}
      </div>
    </div>
  );
};
