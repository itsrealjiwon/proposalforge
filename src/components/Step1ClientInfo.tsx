"use client";

interface FormData {
  clientName: string;
  projectName: string;
  industry: string;
  budget: string;
  timeline: string;
  requirements: string;
}

interface StepProps {
  data: FormData;
  onChange: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance", "Education", "E-commerce",
  "Real Estate", "Manufacturing", "Marketing", "Legal", "Other",
];

export default function Step1ClientInfo({ data, onChange, onNext }: StepProps) {
  const isValid = data.clientName && data.projectName && data.industry;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-ivory mb-1">Client Information</h2>
        <p className="text-sm text-slate">Tell us about your client and the project.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-gold mb-2 uppercase tracking-wider">Client / Company Name</label>
          <input
            type="text"
            value={data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            placeholder="Acme Corporation"
            className="w-full px-4 py-3 bg-navy-light border border-navy-mid rounded-lg text-ivory placeholder:text-slate/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gold mb-2 uppercase tracking-wider">Project Name</label>
          <input
            type="text"
            value={data.projectName}
            onChange={(e) => onChange({ projectName: e.target.value })}
            placeholder="Website Redesign"
            className="w-full px-4 py-3 bg-navy-light border border-navy-mid rounded-lg text-ivory placeholder:text-slate/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gold mb-2 uppercase tracking-wider">Industry</label>
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind}
              onClick={() => onChange({ industry: ind })}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                data.industry === ind
                  ? "bg-gold text-navy border-gold font-semibold"
                  : "bg-navy-light text-slate border-navy-mid hover:border-gold/50"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="px-8 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next: Project Scope →
        </button>
      </div>
    </div>
  );
}
