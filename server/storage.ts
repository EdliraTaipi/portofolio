import { type Project, type InsertProject, type ContactMessage, type InsertContactMessage, projects, contactMessages } from "@shared/schema";
import { db } from "./db";
import { desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  getProjects(): Promise<Project[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<any | undefined> {
    // User functionality not implemented for portfolio
    return undefined;
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    // User functionality not implemented for portfolio
    return undefined;
  }

  async createUser(user: any): Promise<any> {
    // User functionality not implemented for portfolio
    return user;
  }

  async getProjects(): Promise<Project[]> {
    const projectList = await db.select().from(projects);
    return projectList;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [created] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return created;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    const messageList = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
    return messageList;
  }

  async initializeProjects() {
    // Check if projects already exist
    const existingProjects = await db.select().from(projects);
    if (existingProjects.length > 0) {
      return; // Projects already initialized
    }

    // Insert default projects
    const defaultProjects: InsertProject[] = [
      {
        title: "ConnectEd Digital Learning Platform Implementation",
        description: "Led comprehensive project management for Bridgewood Academy's digital transformation, coordinating stakeholders, timelines, and technology integration across multiple departments.",
        category: "Project Management",
        tags: ["Digital Transformation", "Stakeholder Management", "Technology Implementation"],
        details: "Managed end-to-end implementation of ConnectEd digital learning platform for Bridgewood Academy. Applied PRINCE2 and Agile methodologies to coordinate cross-functional teams including IT, academics, and administration. Key deliverables included stakeholder communication plans, risk assessment matrices, resource allocation frameworks, and change management strategies. Successfully delivered project on time and within budget, achieving 95% user adoption rate within first quarter. Project scope included LMS integration, teacher training programs, student onboarding processes, and performance monitoring systems.",
        subject: "Project Management & EdTech",
        icon: "calendar",
        bgColor: "from-indigo-100 to-indigo-200",
        iconColor: "text-indigo-600",
        categoryColor: "bg-indigo-100 text-indigo-800",
      },
      {
        title: "Eli Lilly Digital Marketing Campaign Project",
        description: "Coordinated multi-channel digital marketing campaign for pharmaceutical company, managing timeline, budget, compliance requirements, and cross-functional team collaboration.",
        category: "Project Management",
        tags: ["Campaign Management", "Budget Control", "Compliance"],
        details: "Led project management for Eli Lilly's digital marketing campaign targeting healthcare professionals. Utilized MS Project and Asana for timeline management, coordinated with regulatory affairs, creative teams, and digital agencies. Managed £150K budget allocation across multiple channels including LinkedIn, medical journals, and conference sponsorships. Implemented rigorous compliance checks for pharmaceutical advertising regulations. Applied risk management frameworks to identify and mitigate potential regulatory, timeline, and budget risks. Delivered campaign 2 weeks ahead of schedule with 12% under budget.",
        subject: "Project Management & Marketing",
        icon: "briefcase",
        bgColor: "from-cyan-100 to-cyan-200",
        iconColor: "text-cyan-600",
        categoryColor: "bg-cyan-100 text-cyan-800",
      },
      {
        title: "Strategic Leadership Development Framework",
        description: "Comprehensive leadership development plan for international organizations using Tesco case study, incorporating cultural intelligence and strategic skills assessment.",
        category: "Strategic Leadership",
        tags: ["Leadership Development", "Cultural Intelligence", "Strategic Planning"],
        details: "Developed a comprehensive strategic leadership development framework for Tesco's international operations. The project included STEEPV analysis (Social, Technological, Economic, Environmental, Political, Values factors), stakeholder mapping, and identification of key leadership competencies required for global expansion. Focus areas included cultural intelligence, digital transformation leadership, ethical decision-making, and change management capabilities. The framework addressed the dual tension between global strategy and local implementation, providing practical development pathways for leaders operating across diverse markets and cultures.",
        subject: "Strategic Management & Leadership",
        icon: "rocket",
        bgColor: "from-blue-100 to-blue-200",
        iconColor: "text-blue-600",
        categoryColor: "bg-blue-100 text-blue-800",
      },
      {
        title: "Amazon Leadership & Management Analysis",
        description: "Critical evaluation of Amazon's leadership practices using transformational, transactional, and situational leadership theories with mixed-methods research approach.",
        category: "Leadership Research",
        tags: ["Mixed Methods Research", "Leadership Theory", "Organizational Analysis"],
        details: "Conducted comprehensive research on Amazon's leadership effectiveness using both quantitative and qualitative methodologies. Applied the Multifactor Leadership Questionnaire (MLQ) for statistical analysis and semi-structured interviews for deeper insights. The study examined transformational leadership impact on innovation, transactional leadership effects on performance metrics, and situational leadership adaptation across different Amazon divisions (AWS, fulfillment centers). Research included analysis of cultural differences, employee engagement factors, and the balance between performance-driven culture and employee wellbeing in global operations.",
        subject: "Research Methods & Leadership",
        icon: "gem",
        bgColor: "from-purple-100 to-purple-200",
        iconColor: "text-purple-600",
        categoryColor: "bg-purple-100 text-purple-800",
      },
      {
        title: "Karelia Tobacco Strategic Communication Plan",
        description: "Strategic communication framework analyzing media influence, stakeholder management, and crisis communication for international tobacco company operations.",
        category: "Strategic Communication",
        tags: ["Media Strategy", "Stakeholder Management", "Crisis Communication"],
        details: "Developed a comprehensive strategic communication plan for Karelia Tobacco Company, analyzing domestic, national, and international media perceptions. The project examined the influence of pressure groups, political entities, and media ownership on public perception and policy development. Created innovative communication strategies to navigate complex regulatory environments while maintaining stakeholder relationships. The analysis included evaluation of media constraints, time-critical communication requirements, and methods for leveraging global news media to support organizational objectives despite challenging industry dynamics.",
        subject: "Strategic Communication",
        icon: "route",
        bgColor: "from-amber-100 to-amber-200",
        iconColor: "text-amber-600",
        categoryColor: "bg-amber-100 text-amber-800",
      },
      {
        title: "Unilever Cross-Border Strategy Development",
        description: "Analysis of collective strategy formation, cultural-ethical tensions, and strategic intelligence application in global consumer goods operations.",
        category: "Global Strategy",
        tags: ["Cross-Border Strategy", "Cultural Analysis", "Strategic Intelligence"],
        details: "Comprehensive analysis of Unilever's cross-border strategy development, focusing on collective strategy formation across diverse markets. The project examined political, social, ethical, and operational needs for common strategy implementation while addressing cultural and ethical tensions. Applied quantitative and qualitative research principles to understand consumer behavior across different regions. Evaluated strategic intelligence gathering and analysis methods, contributing original thinking to strategy formulation through innovative approaches to market adaptation and cultural sensitivity in global operations.",
        subject: "Strategy Development",
        icon: "leaf",
        bgColor: "from-emerald-100 to-emerald-200",
        iconColor: "text-emerald-600",
        categoryColor: "bg-emerald-100 text-emerald-800",
      },
      {
        title: "M&S Culture & Strategy Impact Analysis",
        description: "Deep analysis of cultural factors influencing international organizational strategy, including political structures, ethnographic factors, and stakeholder dynamics.",
        category: "Cultural Strategy",
        tags: ["Cultural Analysis", "International Strategy", "Stakeholder Management"],
        details: "Conducted comprehensive analysis of how culture impacts Marks & Spencer's international organizational strategy. Applied frameworks including Hofstede's cultural dimensions, CAGE analysis, PESTLE analysis, and Porter's models to understand the influence of political structures, religious factors, cultural norms, and ethnographic elements on strategic decision-making. Examined the role of globalization, business models, and institutional theory in policy development. The project provided insights into managing cultural differences, optimizing stakeholder relationships, and developing strategies that balance global consistency with local adaptation.",
        subject: "Culture & Strategy",
        icon: "graduation-cap",
        bgColor: "from-green-100 to-green-200",
        iconColor: "text-green-600",
        categoryColor: "bg-green-100 text-green-800",
      },
      {
        title: "Tesco Cross-Border Strategic Planning",
        description: "Strategic planning framework for global retail operations, including risk management, cultural constraints, and international market analysis.",
        category: "Strategic Planning",
        tags: ["International Planning", "Risk Management", "Market Analysis"],
        details: "Developed comprehensive strategic planning framework for Tesco's cross-border operations, analyzing constraints and opportunities in global retail markets. The project examined cultural, political, and social constraints affecting international expansion, evaluated contributions from participating organizations and partnerships. Applied strategic intelligence methodologies for market analysis and competitor assessment. Created innovative risk management approaches and funding strategies for unexpected operational activities. The framework addressed the balance between centralized strategy and local market adaptation in diverse international contexts.",
        subject: "Strategic Planning",
        icon: "shield-alt",
        bgColor: "from-red-100 to-red-200",
        iconColor: "text-red-600",
        categoryColor: "bg-red-100 text-red-800",
      },
    ];

    await db.insert(projects).values(defaultProjects);
  }
}

// Create instance and initialize projects
const databaseStorage = new DatabaseStorage();
databaseStorage.initializeProjects().catch(console.error);

export const storage = databaseStorage;