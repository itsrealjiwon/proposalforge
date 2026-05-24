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
  onBack: () => void;
}

const BUDGETS = ["$5,000 – $10,000", "$10,000 – $25,000", "$25,000 – $50,000", "$50,000 – $100,000", "$100,000+"];
const TIMELINES = ["2 weeks", "1 month", "2-3 months", "3-6 months", "6+ months"];

export default function Step2ProjectScope({ data, onChange, onNext, onBack }: StepProps) {
  const isValid = data.budget && data.timeline && data.requirements;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-ivory mb-1">Project Scope</h2>
        <p className="text-sm text-slate">Define the budget, timeline, and requirements.</p>
      </div>

      <div>
        <label className="block text-xs font-medium text-gold mb-2 uppercase tracking-wider">Budget Range</label>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <button
              key={b}
              onClick={() => onChange({ budget: b })}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                data.budget === b
                  ? "bg-gold text-navy border-gold font-semibold"
                  : "bg-navy-light text-slate border-navy-mid hover:border-gold/50"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gold mb-2 uppercase tracking-wider">Timeline</label>
        <div className="flex flex-wrap gap-2">
          {TIMELINES.map((t) => (
            <button
              key={t}
              onClick={() => onChange({ timeline: t })}
              className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                data.timeline === t
                  ? "bg-gold text-navy border-gold font-semibold"
                  : "bg-navy-light text-slate border-navy-mid hover:border-gold/50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gold mb-2 uppercase tracking-wider">Requirements & Details</label>
        <textarea
          value={data.requirements}
          onChange={(e) => onChange({ requirements: e.target.value })}
          placeholder="Describe the project requirements, goals, deliverables, any specific technologies or constraints..."
          rows={5}
          className="w-full px-4 py-3 bg-navy-light border border-navy-mid rounded-lg text-ivory placeholder:text-slate/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 resize-none"
        />
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 text-slate border border-navy-mid rounded-lg hover:border-gold/50 transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className="px-8 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-dark disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Generate Proposal 🤖
        </button>
      </div>
    </div>
  );
}
