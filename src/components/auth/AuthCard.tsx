import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description: string;
  topAction?: ReactNode;
  banner?: ReactNode;
  contextNote?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export default function AuthCard({
  title,
  description,
  topAction,
  banner,
  contextNote,
  footer,
  children,
}: AuthCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm sm:p-10">
      <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10">
        {topAction ? <div className="mb-6">{topAction}</div> : null}

        <div className="mb-8 space-y-3">
          {banner ? <div>{banner}</div> : null}

          <div className="space-y-3">
            <h2 className="font-poppins text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </h2>
            <p className="max-w-lg font-inter text-sm leading-relaxed text-slate-500 sm:text-base">
              {description}
            </p>
            {contextNote ? (
              <p className="font-inter text-sm text-slate-400">{contextNote}</p>
            ) : null}
          </div>
        </div>

        <div className="space-y-6">{children}</div>

        {footer ? <div className="mt-6 border-t border-slate-100 pt-5">{footer}</div> : null}
      </div>
    </div>
  );
}
