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

const SAMPLE_PROPOSAL = `# E-Commerce Platform Redesign — Project Proposal

## Executive Summary
We propose a comprehensive redesign of the existing e-commerce platform to modernize the user experience, improve conversion rates by 25–35%, and establish a scalable architecture capable of supporting the client's projected 3× growth over the next 36 months.

## Problem Statement
The current platform suffers from an outdated UI, poor mobile responsiveness (mobile bounce rate: 62%), slow page load times (avg. 4.8s), and a monolithic backend that limits feature velocity. Customer satisfaction scores have declined 18% year-over-year.

## Proposed Solution
A full-stack redesign leveraging Next.js 15 with server components for blazing-fast page loads, a headless CMS for flexible content management, and a microservices-based backend on AWS. The new platform will feature a mobile-first design system, AI-powered product recommendations, and a streamlined checkout flow reducing steps from 5 to 2.

## Timeline
- **Phase 1 — Discovery & Design (Weeks 1–4):** User research, competitive analysis, wireframes, and high-fidelity prototypes.
- **Phase 2 — Core Development (Weeks 5–14):** Frontend build, API development, payment integration, and CMS setup.
- **Phase 3 — QA & Optimization (Weeks 15–18):** Performance tuning, accessibility audit, cross-browser testing, and load testing.
- **Phase 4 — Launch & Handoff (Weeks 19–20):** Staged rollout, team training, documentation, and post-launch monitoring.

## Budget Breakdown
| Category | Cost |
|---|---|
| UX/UI Design | $45,000 |
| Frontend Development | $85,000 |
| Backend & DevOps | $70,000 |
| QA & Testing | $25,000 |
| Project Management | $20,000 |
| Contingency (10%) | $24,500 |
| **Total** | **$269,500** |

## Expected Outcomes
- 30% increase in conversion rate within 6 months post-launch
- Mobile bounce rate reduced from 62% to under 35%
- Page load time under 1.5 seconds (Core Web Vitals compliant)
- 99.95% uptime SLA with auto-scaling infrastructure

## Risk Assessment
- **Scope Creep:** Mitigated by fixed-phase contracts and bi-weekly stakeholder reviews.
- **Third-Party API Dependencies:** Backup providers identified for payment and shipping integrations.
- **Data Migration:** Incremental migration strategy with rollback capability to minimize downtime.
- **Timeline Delays:** 10% buffer built into each phase; parallel workstreams where feasible.`;

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

  const handleExample = () => {
    setData({
      clientName: "NovaMart Inc.",
      projectName: "E-Commerce Platform Redesign",
      industry: "Retail & E-Commerce",
      budget: "$269,500",
      timeline: "20 weeks",
      requirements:
        "Full-stack redesign with Next.js, headless CMS, microservices backend, mobile-first design, AI recommendations, streamlined checkout.",
    });
    setProposal(SAMPLE_PROPOSAL);
    setStep(3);
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
          {step === 0 && (
            <button
              onClick={handleExample}
              className="w-full mb-6 py-3 px-4 border-2 border-dashed border-gold/40 rounded-lg text-gold/80 hover:border-gold hover:text-gold transition-colors text-sm font-mono cursor-pointer"
            >
              ⚡ Try Example — E-Commerce Proposal
            </button>
          )}

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
