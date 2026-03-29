"use client";

type LoadingVariant = "professional" | "personal";

type RouteLoadingOverlayProps = {
  variant: LoadingVariant;
  title?: string;
  subtitle?: string;
};

function ProfessionalLoader() {
  return (
    <div className="relative h-28 w-28">
      <div className="absolute inset-0 rounded-3xl border-4 border-cyan-300/80 animate-spin" />
      <div className="absolute inset-3 rounded-2xl border-4 border-blue-400/70 animate-pulse" />
      <div className="absolute inset-6 rounded-xl bg-gradient-to-br from-cyan-300 to-blue-500 shadow-[0_0_40px_rgba(34,211,238,0.6)]" />
      <div className="absolute inset-0 flex items-center justify-center text-black font-black text-xl">{`</>`}</div>
    </div>
  );
}

function PersonalLoader() {
  return (
    <div className="relative h-28 w-28">
      <div className="absolute inset-0 rounded-full border-4 border-pink-300/80 animate-spin" />
      <div className="absolute inset-3 rounded-full border-4 border-rose-400/70 animate-ping" />
      <div className="absolute inset-6 rounded-full bg-gradient-to-br from-pink-400 to-red-500 shadow-[0_0_45px_rgba(244,114,182,0.65)]" />
      <div className="absolute inset-0 flex items-center justify-center text-white font-black text-2xl">★</div>
    </div>
  );
}

export default function RouteLoadingOverlay({ variant, title = "Loading", subtitle = "Please wait..." }: RouteLoadingOverlayProps) {
  const themeClass =
    variant === "professional"
      ? "from-cyan-500/25 via-blue-600/20 to-slate-900/90"
      : "from-pink-500/30 via-rose-600/20 to-purple-900/90";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className={`relative mx-4 w-full max-w-md rounded-3xl border border-white/15 bg-gradient-to-br ${themeClass} p-8 text-center shadow-2xl`}>
        <div className="mb-6 flex justify-center">
          {variant === "professional" ? <ProfessionalLoader /> : <PersonalLoader />}
        </div>
        <h2 className="text-2xl font-black text-white drop-shadow-md">{title}</h2>
        <p className="mt-2 text-sm font-semibold text-white/85">{subtitle}</p>
        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className={`h-full w-full rounded-full ${
              variant === "professional" ? "bg-cyan-300" : "bg-pink-300"
            } animate-pulse`}
          />
        </div>
      </div>
    </div>
  );
}
