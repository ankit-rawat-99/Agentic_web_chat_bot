export type Course = {
  slug: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  instructor: string;
  rating: number;
  price: number;
  students: number;
  tagline: string;
  gradient: string;
};

export const CATEGORIES = [
  "All",
  "Agents",
  "LLMs",
  "Automation",
  "Frameworks",
  "AI Dev",
] as const;

export const courses: Course[] = [
  { slug: "ai-agents-fundamentals", title: "AI Agents Fundamentals", category: "Agents", difficulty: "Beginner", duration: "6 weeks", instructor: "Dr. Aisha Verma", rating: 4.8, price: 149, students: 2841, tagline: "Foundations of autonomous agents, tools & memory.", gradient: "from-blue-500 to-cyan-400" },
  { slug: "agentic-ai-bootcamp", title: "Agentic AI Bootcamp", category: "Agents", difficulty: "Advanced", duration: "10 weeks", instructor: "Marcus Chen", rating: 4.9, price: 399, students: 1523, tagline: "Ship production multi-agent systems end-to-end.", gradient: "from-violet-500 to-fuchsia-500" },
  { slug: "langchain-masterclass", title: "LangChain Masterclass", category: "Frameworks", difficulty: "Intermediate", duration: "5 weeks", instructor: "Priya Nair", rating: 4.7, price: 199, students: 3210, tagline: "Chains, agents, and retrieval with LangChain.", gradient: "from-emerald-500 to-teal-400" },
  { slug: "crewai-development", title: "CrewAI Development", category: "Frameworks", difficulty: "Intermediate", duration: "4 weeks", instructor: "Diego Ramirez", rating: 4.8, price: 179, students: 1120, tagline: "Design roles, tasks & crews with CrewAI.", gradient: "from-orange-500 to-rose-500" },
  { slug: "autogen-framework", title: "AutoGen Framework", category: "Frameworks", difficulty: "Advanced", duration: "5 weeks", instructor: "Elena Petrova", rating: 4.7, price: 249, students: 890, tagline: "Multi-agent conversations with Microsoft AutoGen.", gradient: "from-indigo-500 to-blue-500" },
  { slug: "rag-systems", title: "RAG Systems", category: "LLMs", difficulty: "Intermediate", duration: "6 weeks", instructor: "Dr. Aisha Verma", rating: 4.9, price: 229, students: 2650, tagline: "Retrieval-augmented generation at scale.", gradient: "from-cyan-500 to-blue-500" },
  { slug: "mcp-protocol", title: "MCP Protocol", category: "Agents", difficulty: "Advanced", duration: "3 weeks", instructor: "Marcus Chen", rating: 4.8, price: 129, students: 640, tagline: "Model Context Protocol from spec to shipping.", gradient: "from-purple-500 to-pink-500" },
  { slug: "prompt-engineering", title: "Prompt Engineering", category: "LLMs", difficulty: "Beginner", duration: "3 weeks", instructor: "Priya Nair", rating: 4.6, price: 79, students: 5210, tagline: "From zero-shot to reasoning-chain prompts.", gradient: "from-yellow-400 to-orange-500" },
  { slug: "ai-automation-python", title: "AI Automation with Python", category: "Automation", difficulty: "Intermediate", duration: "6 weeks", instructor: "Diego Ramirez", rating: 4.7, price: 179, students: 1980, tagline: "Automate workflows with Python & LLMs.", gradient: "from-lime-500 to-emerald-500" },
  { slug: "multi-agent-systems", title: "Multi-Agent Systems", category: "Agents", difficulty: "Advanced", duration: "8 weeks", instructor: "Elena Petrova", rating: 4.9, price: 349, students: 720, tagline: "Coordinate autonomous agents that collaborate.", gradient: "from-fuchsia-500 to-purple-600" },
  { slug: "llm-engineering", title: "LLM Engineering", category: "LLMs", difficulty: "Advanced", duration: "10 weeks", instructor: "Marcus Chen", rating: 4.9, price: 449, students: 1310, tagline: "Fine-tune, evaluate & deploy production LLMs.", gradient: "from-sky-500 to-indigo-600" },
  { slug: "ai-saas-development", title: "AI SaaS Development", category: "AI Dev", difficulty: "Intermediate", duration: "8 weeks", instructor: "Dr. Aisha Verma", rating: 4.8, price: 299, students: 1470, tagline: "Ship a real AI SaaS with billing & auth.", gradient: "from-teal-500 to-cyan-500" },
  { slug: "ai-chatbot-development", title: "AI Chatbot Development", category: "AI Dev", difficulty: "Beginner", duration: "4 weeks", instructor: "Priya Nair", rating: 4.7, price: 129, students: 3400, tagline: "Build chatbots for web, WhatsApp & Slack.", gradient: "from-green-500 to-emerald-500" },
  { slug: "ai-voice-agents", title: "AI Voice Agents", category: "Agents", difficulty: "Intermediate", duration: "5 weeks", instructor: "Diego Ramirez", rating: 4.8, price: 219, students: 980, tagline: "Real-time voice agents with LLMs & TTS.", gradient: "from-pink-500 to-red-500" },
  { slug: "ai-workflow-automation", title: "AI Workflow Automation", category: "Automation", difficulty: "Beginner", duration: "4 weeks", instructor: "Elena Petrova", rating: 4.6, price: 99, students: 2200, tagline: "n8n, Zapier + LLMs for zero-code workflows.", gradient: "from-amber-500 to-orange-600" },
];

export const services = [
  { title: "Corporate AI Training", desc: "Upskill engineering teams on Agentic AI, LLMs & production workflows." },
  { title: "AI Consulting", desc: "Strategy, architecture reviews and roadmaps for AI-native products." },
  { title: "Custom AI Agent Development", desc: "We design and ship bespoke agents integrated with your stack." },
  { title: "AI Automation Solutions", desc: "Automate research, sales, support and ops with LLM-powered workflows." },
  { title: "LLM Integration", desc: "Bring GPT, Claude, Llama & open-source models into your product." },
  { title: "Enterprise AI Solutions", desc: "Secure, scalable AI deployments with governance & observability." },
  { title: "AI Workshops", desc: "Hands-on private workshops for teams from beginners to advanced." },
];

export const projects = [
  { title: "AI Chatbot", desc: "Multi-turn support bot with memory + tools.", tag: "Chat" },
  { title: "Customer Support Agent", desc: "Autonomous ticket triage & response.", tag: "Agent" },
  { title: "Research Agent", desc: "Web research pipeline with structured outputs.", tag: "Agent" },
  { title: "Coding Assistant", desc: "IDE-native pair programmer with RAG on your repo.", tag: "Dev" },
  { title: "AI Email Agent", desc: "Drafts, triages and schedules on your behalf.", tag: "Agent" },
  { title: "AI Resume Builder", desc: "Tailors resumes to job descriptions with LLMs.", tag: "SaaS" },
  { title: "AI Content Generator", desc: "Blog + social pipeline with brand-tuned voice.", tag: "Content" },
  { title: "AI Sales Agent", desc: "Outbound prospecting + follow-up automation.", tag: "Agent" },
  { title: "AI Voice Assistant", desc: "Realtime voice agent for phone & web.", tag: "Voice" },
];

export const testimonials = [
  { name: "Sarah Kim", role: "ML Engineer @ Stripe", quote: "The Agentic AI Bootcamp took me from experimenting to shipping production multi-agent systems in weeks." },
  { name: "Rahul Mehta", role: "Founder, Nimbus AI", quote: "Best AI curriculum I've seen. The MCP + RAG modules alone were worth 10× the price." },
  { name: "Anna Novak", role: "AI Lead @ Siemens", quote: "We upskilled our entire team via corporate training. Practical, current, and production-focused." },
  { name: "David Ochieng", role: "Indie Developer", quote: "I launched my first AI SaaS after taking three courses here. The projects are gold." },
];

export const partners = ["OpenAI", "Anthropic", "LangChain", "Hugging Face", "NVIDIA", "Microsoft", "Meta AI", "Cohere"];

export const faqs = [
  { q: "Do I need a coding background?", a: "Beginner tracks require no prior experience. Advanced tracks assume Python basics." },
  { q: "Are courses self-paced?", a: "Yes — plus live sessions on the Pro plan and cohort-based bootcamps." },
  { q: "Do I get a certificate?", a: "Every course grants a verifiable certificate on completion." },
  { q: "Can I get a refund?", a: "7-day no-questions refund on any individual course." },
  { q: "Do you offer job placement?", a: "We provide portfolio reviews, referrals and interview prep for Pro members." },
];