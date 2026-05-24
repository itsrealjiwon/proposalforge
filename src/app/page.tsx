"use client";

import { useState } from "react";
import WizardSteps from "@/components/WizardSteps";
import Step1ClientInfo from "@/components/Step1ClientInfo";
import Step2ProjectScope from "@/components/Step2ProjectScope";
import Step3Generating from "@/components/Step3Generating";
import Step4Preview from "@/components/Step4Preview";

interface FormData {
  clientName: string;
  projectName: string;
  industry: string;
  budget: string;
  timeline: string;
  requirements: string;
}

const INITIAL: FormData = {
  clientName: "",
  projectName: "",
  industry: "",
  budget: "",
  timeline: "",
  requirements: "",
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [proposal, setProposal] = useState("");
  const [error, setError] = useState("");

  const updateData = (partial: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const handleGenerate = async () => {
    setStep(2);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Generation failed");
      const result = await res.json();
      if (result.error) throw new Error(result.error);

      setProposal(result.proposal);
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep(1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setData(INITIAL);
    setProposal("");
    setError("");
  };

  return (
    <div className="flex flex-col min-h-screen grid-bg">
      {/* Header */}
      <header className="border-b border-navy-mid py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📜</span>
            <div>
              <h1 className="text-lg font-display font-bold text-ivory tracking-tight">ProposalForge</h1>
              <p className="text-xs text-slate">AI-powered business proposals</p>
            </div>
          </div>
          <span className="text-xs text-gold/60 font-mono px-3 py-1 border border-gold/20 rounded-full">
            Powered by MiMo v2.5 Pro
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <WizardSteps current={step} />

          {error && (
            <div className="mb-6 bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
              <p className="text-red-400 text-sm font-mono">⚠️ {error}</p>
            </div>
          )}

          {step === 0 && (
            <Step1ClientInfo data={data} onChange={updateData} onNext={() => setStep(1)} />
          )}
          {step === 1 && (
            <Step2ProjectScope
              data={data}
              onChange={updateData}
              onNext={handleGenerate}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && <Step3Generating />}
          {step === 3 && (
            <Step4Preview
              proposal={proposal}
              clientName={data.clientName}
              projectName={data.projectName}
              onReset={handleReset}
              onBack={() => setStep(1)}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-navy-mid py-4 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-slate/50 font-mono">
            Composed by MiMo v2.5 Pro • ProposalForge © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
