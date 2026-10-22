export interface ProjectData {
    id: string;
    repo: string;
    title: string;
    description: string;
    tech: string[];
    github: string;
    live?: string | null;
    stars: number;
    forks: number;
    badge: string;
    updatedAt?: string;
}

export interface CertificationData {
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialId?: string;
    skills?: string;
    pdf?: string | null;
    verifyUrl?: string | null;
    featured?: boolean;
}

export const siteConfig = {
    name: 'Anshu Aman',
    role: 'AI / Full-Stack Developer',
    github: {
        username: process.env.NEXT_PUBLIC_GITHUB_USERNAME || '09anshu',
        url: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/09anshu',
    },
    social: {
        github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/09anshu',
        linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/anshu-aman/',
        twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/09anshu',
        email: process.env.NEXT_PUBLIC_EMAIL || 'anshuaman83@gmail.com',
        resume: process.env.NEXT_PUBLIC_RESUME_URL || '/Anshu_Aman_resume.pdf',
    },
    featuredRepos: (
        process.env.NEXT_PUBLIC_FEATURED_REPOS ||
        'AI-Debate-Forge,Hybrid-Explainability-Combining-Grad-CAM-and-Text-Based-Summaries-for-Radiology-Al,BuildBazaar,Car-Damage-App,AI-Finance-Controller-B2B-Reconciliation-Agent,AI-Sprint-Delay-Predictor'
    )
        .split(',')
        .map((r) => r.trim())
        .filter(Boolean),

    // Curated rich metadata for the featured projects
    projects: [
        {
            id: 'debate-forge',
            repo: 'AI-Debate-Forge',
            title: 'DebateForge — Real-Time AI Debate Platform',
            description:
                'Autonomous multi-agent system where AI personas engage in structured real-time debates with cross-examination, adaptive rebuttals, and live evaluation.',
            tech: ['Python', 'FastAPI', 'Ollama', 'LangChain', 'React', 'WebSockets'],
            badge: 'Multi-Agent AI',
            github: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || '09anshu'}/AI-Debate-Forge`,
            live: null,
            stars: 0,
            forks: 0,
        },
        {
            id: 'chest-xray',
            repo: 'Hybrid-Explainability-Combining-Grad-CAM-and-Text-Based-Summaries-for-Radiology-Al',
            title: 'Hybrid Explainability for Chest X-Ray Analysis',
            description:
                'Medical AI diagnostics combining a DenseNet121 deep learning classifier with Grad-CAM++ saliency heatmaps and LLM radiology report generation.',
            tech: ['Python', 'PyTorch', 'DenseNet121', 'Grad-CAM++', 'LLM', 'FastAPI'],
            badge: 'Medical AI & XAI',
            github: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || '09anshu'}/Hybrid-Explainability-Combining-Grad-CAM-and-Text-Based-Summaries-for-Radiology-Al`,
            live: null,
            stars: 0,
            forks: 0,
        },
        {
            id: 'buildbazaar',
            repo: 'BuildBazaar',
            title: 'BuildBazaar — Full-Stack E-Commerce Platform',
            description:
                'Full-stack construction marketplace enabling contractors and suppliers to trade building materials, safety gear, and heavy equipment with real-time order tracking.',
            tech: ['React', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Tailwind CSS'],
            badge: 'Full-Stack Web',
            github: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || '09anshu'}/BuildBazaar`,
            live: null,
            stars: 0,
            forks: 0,
        },
        {
            id: 'car-damage',
            repo: 'Car-Damage-App',
            title: 'AI-Powered Vehicle Damage Assessment & Classification',
            description:
                'Computer vision pipeline utilizing deep neural networks to detect vehicular damage, assess impact severity, and automate insurance repair cost estimates.',
            tech: ['Next.js', 'FastAPI', 'PyTorch', 'YOLOv8', 'Computer Vision'],
            badge: 'Computer Vision',
            github: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || '09anshu'}/Car-Damage-App`,
            live: null,
            stars: 0,
            forks: 0,
        },
        {
            id: 'finance-controller',
            repo: 'AI-Finance-Controller-B2B-Reconciliation-Agent',
            title: 'AI Finance Controller & B2B Reconciliation Agent',
            description:
                'Autonomous financial operations agent performing 3-way reconciliation across purchase orders, goods receipts, and invoices with real-time discrepancy detection.',
            tech: ['Python', 'LangChain', 'FastAPI', 'Pandas', 'Financial AI'],
            badge: 'Autonomous FinTech',
            github: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || '09anshu'}/AI-Finance-Controller-B2B-Reconciliation-Agent`,
            live: null,
            stars: 0,
            forks: 0,
        },
        {
            id: 'sprint-delay',
            repo: 'AI-Sprint-Delay-Predictor',
            title: 'AI Sprint Delay Predictor',
            description:
                'Predictive SaaS platform utilizing machine learning algorithms on agile metrics to forecast sprint delivery risks and prevent project bottlenecks.',
            tech: ['React 19', 'Node.js', 'Flask', 'MongoDB', 'Scikit-Learn'],
            badge: 'Predictive ML & SaaS',
            github: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || '09anshu'}/AI-Sprint-Delay-Predictor`,
            live: process.env.NEXT_PUBLIC_PROJECT_AI_SPRINT_DELAY_LIVE || 'https://project-t6v4r.vercel.app',
            stars: 0,
            forks: 0,
        },
    ] as ProjectData[],

    // Authentic Certifications & Honors from resume
    certifications: [
        {
            id: 'sap-genai',
            title: 'SAP Certified - SAP Generative AI Developer',
            issuer: 'SAP',
            date: 'Mar 2026',
            skills: 'Business AI, SAP AI Core, Large Language Models (LLMs), SAP AI Launchpad',
            pdf: process.env.NEXT_PUBLIC_CERT_SAP_PDF || '/SAP.pdf',
            verifyUrl: 'https://www.credly.com/badges/b59e2198-8d8b-459a-a6c8-4dd4652c61c8',
            featured: true,
        },
        {
            id: 'redhat-containers',
            title: 'Red Hat Certified Specialist in Containers',
            issuer: 'Red Hat',
            date: 'Feb 2026',
            credentialId: '260-019-955',
            skills: 'Linux Containers, Container Images, Runtime Management, Podman',
            pdf: process.env.NEXT_PUBLIC_CERT_REDHAT_PDF || '/Redhat.pdf',
            verifyUrl: 'https://www.credly.com/badges/22c94f4d-2691-4a36-acb5-8d61b3f95d90',
            featured: true,
        },
        {
            id: 'oracle-oci-ai',
            title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
            issuer: 'Oracle University',
            date: 'Aug 13, 2025',
            credentialId: '101076908OCI25AICFA',
            skills: 'Oracle Cloud Infrastructure (OCI), AI Foundations, Machine Learning & Generative AI',
            pdf: process.env.NEXT_PUBLIC_CERT_ORACLE_PDF || '/Oracle.pdf',
            verifyUrl: null,
            featured: true,
        },
        {
            id: 'schneider-hackathon',
            title: 'Finalist — Schneider Electric Hackathon',
            issuer: 'Schneider Electric',
            date: '2025',
            skills: 'Energy Innovation, Sustainable Tech & Systems Automation',
            pdf: null,
            verifyUrl: null,
            featured: false,
        },
    ] as CertificationData[],
};
