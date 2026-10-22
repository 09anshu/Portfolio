'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

// Projects pulled from the resume
const PROJECTS: Record<string, string> = {
  xray: "Hybrid Explainability for Chest X-Ray Analysis",
  bazaar: "BuildBazaar (Full-Stack E-Commerce)",
  debate: "DebateForge (Real-Time AI Debate Platform)",
  paper: "LSTM vs Transformer Forecasting Paper (Springer, ICIDA 2025)",
};

const PROJECT_CHIPS = [
  { key: "xray", label: "Chest X-Ray" },
  { key: "bazaar", label: "BuildBazaar" },
  { key: "debate", label: "DebateForge" },
  { key: "paper", label: "Research Paper" },
];

interface Skill {
  name: string;
  projects: string[];
}

interface Category {
  title: string;
  skills: Skill[];
}

// `projects` lists where the skill appears in your resume projects.
// Edit these arrays to change what lights up.
const CATEGORIES: Category[] = [
  {
    title: "Programming",
    skills: [
      { name: "Python", projects: ["xray", "debate"] },
      { name: "JavaScript", projects: ["bazaar", "debate"] },
      { name: "SQL", projects: [] },
    ],
  },
  {
    title: "Libraries",
    skills: [
      { name: "Pandas", projects: [] },
      { name: "NumPy", projects: [] },
      { name: "Scikit-learn", projects: [] },
      { name: "PyTorch", projects: ["xray"] },
      { name: "TensorFlow / Keras", projects: [] },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", projects: ["bazaar"] },
      { name: "Express.js", projects: ["bazaar"] },
      { name: "REST APIs", projects: ["bazaar"] },
      { name: "FastAPI", projects: ["debate"] },
      { name: "WebSockets", projects: ["bazaar"] },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React.js", projects: ["bazaar"] },
      { name: "Next.js", projects: ["debate"] },
      { name: "HTML", projects: [] },
      { name: "CSS", projects: [] },
      { name: "Tailwind CSS", projects: [] },
    ],
  },
  {
    title: "AI / ML",
    skills: [
      { name: "Machine Learning", projects: ["xray"] },
      { name: "Deep Learning", projects: ["xray", "paper"] },
      { name: "Transformers", projects: ["paper"] },
    ],
  },
  {
    title: "Generative AI",
    skills: [
      { name: "LLMs", projects: ["xray", "bazaar", "debate"] },
      { name: "LangChain", projects: ["xray"] },
      { name: "LangGraph", projects: [] },
      { name: "RAG", projects: [] },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", projects: ["bazaar"] },
      { name: "MySQL", projects: [] },
    ],
  },
  {
    title: "Deployment & Tools",
    skills: [
      { name: "Git", projects: [] },
      { name: "Docker", projects: [] },
      { name: "Vercel", projects: [] },
      { name: "Render", projects: [] },
    ],
  },
];

const ALL_SKILLS = CATEGORIES.flatMap((c) => c.skills);

export default function Skills() {
  const [project, setProject] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const focus = hovered ?? pinned;
  const focusSkill = ALL_SKILLS.find((s) => s.name === focus);
  const litCount = project
    ? ALL_SKILLS.filter((s) => s.projects.includes(project)).length
    : 0;

  // Terminal readout text
  let command = "hover or tap a skill";
  let output =
    "a dot marks skills I've used in a project. pick a project above to light them all up.";
  if (focusSkill) {
    command = `explain "${focusSkill.name}"`;
    output = focusSkill.projects.length
      ? `used in: ${focusSkill.projects.map((p) => PROJECTS[p]).join("  |  ")}`
      : "part of my everyday toolkit, not tied to one project.";
  } else if (project) {
    command = `filter --project "${PROJECT_CHIPS.find((p) => p.key === project)?.label}"`;
    output = `${litCount} skills lit from ${PROJECTS[project]}`;
  }

  return (
    <section id="skills" className="py-24 relative z-10 bg-black/20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Title — reuses the project's animated SectionHeading */}
        <SectionHeading title="Technical Arsenal" subtitle="Skills and Technologies" />

        {/* Project filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-4 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-sm text-gray-400 font-mono">Light up skills from:</span>
          {PROJECT_CHIPS.map(({ key, label }) => {
            const on = project === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={on}
                onClick={() => setProject(on ? null : key)}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold border transition duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer
                  ${
                    on
                      ? "bg-primary text-black border-primary shadow-[0_0_16px_rgba(57,255,20,0.7)]"
                      : "text-primary/80 border-primary/30 hover:border-primary hover:shadow-[0_0_10px_rgba(57,255,20,0.4)]"
                  }`}
              >
                {label}
              </button>
            );
          })}
          {project && (
            <button
              type="button"
              onClick={() => setProject(null)}
              className="text-sm text-gray-400 underline underline-offset-4 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded cursor-pointer"
            >
              Clear
            </button>
          )}
        </motion.div>

        {/* Terminal readout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="max-w-6xl mx-auto mb-10 rounded-xl border border-primary/20 bg-[#050807]/80 backdrop-blur-sm px-5 py-4 font-mono text-sm min-h-[84px]"
          aria-live="polite"
        >
          <div className="text-primary">
            <span className="text-primary/50">$ </span>
            {command}
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-primary motion-safe:animate-pulse" />
          </div>
          <div className="mt-2 text-gray-300">{output}</div>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {CATEGORIES.map(({ title, skills }, catIdx) => {
            const cardHasMatch =
              !project || skills.some((s) => s.projects.includes(project));
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: catIdx * 0.08 }}
                className={`rounded-2xl border p-6 transition duration-300 ${
                  cardHasMatch
                    ? "border-primary/20 bg-primary/5"
                    : "border-primary/10 bg-primary/[0.02] opacity-50"
                }`}
              >
                <h3 className="flex items-center gap-3 mb-5 font-bold uppercase tracking-widest text-white font-mono">
                  <span className="h-px w-6 bg-primary shadow-[0_0_6px_#39FF14]" />
                  {title}
                  <span className="ml-auto font-mono text-xs font-normal text-primary/60">
                    {skills.length}
                  </span>
                </h3>

                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => {
                    const isFocus = focus === skill.name;
                    const lit = project ? skill.projects.includes(project) : false;
                    const dim = project && !lit && !isFocus;

                    let look =
                      "text-gray-200 border-primary/25 hover:text-primary hover:border-primary hover:shadow-[0_0_12px_rgba(57,255,20,0.5)]";
                    if (lit)
                      look =
                        "text-primary/90 border-primary bg-primary/10 shadow-[0_0_14px_rgba(57,255,20,0.6)]";
                    if (dim)
                      look = "text-gray-500 border-primary/15 opacity-40";
                    if (isFocus)
                      look =
                        "text-white border-primary bg-primary/15 shadow-[0_0_18px_rgba(57,255,20,0.8)]";

                    return (
                      <button
                        key={skill.name}
                        type="button"
                        aria-pressed={pinned === skill.name}
                        onMouseEnter={() => setHovered(skill.name)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setHovered(skill.name)}
                        onBlur={() => setHovered(null)}
                        onClick={() =>
                          setPinned(pinned === skill.name ? null : skill.name)
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition duration-200
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 cursor-pointer ${look}`}
                      >
                        {skill.name}
                        {skill.projects.length > 0 && (
                          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_4px_#39FF14]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
