"use client";

interface Step {
  label: string;
  icon: string;
}

const STEPS: Step[] = [
  { label: "Client Info", icon: "👤" },
  { label: "Project Scope", icon: "📋" },
  { label: "Generate", icon: "🤖" },
  { label: "Preview", icon: "📄" },
];

interface WizardStepsProps {
  current: number;
}

export default function WizardSteps({ current }: WizardStepsProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 transition-all ${
                i < current
                  ? "bg-gold text-navy border-gold"
                  : i === current
                  ? "bg-navy-mid text-gold border-gold"
                  : "bg-navy-light text-slate border-navy-mid"
              }`}
            >
              {i < current ? "✓" : step.icon}
            </div>
            <span
              className={`text-xs mt-2 font-medium ${
                i <= current ? "text-gold" : "text-slate/50"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-16 sm:w-24 h-0.5 mx-2 mb-6 ${
                i < current ? "bg-gold" : "bg-navy-mid"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
