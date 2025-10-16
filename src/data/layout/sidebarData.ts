import { 
  Gauge,
  TrendingUp,
  Cpu
} from 'lucide-react';

// Define interfaces locally since types/news was removed
export interface SidebarItem {
  label: string;
  active?: boolean;
  path?: string;
  children?: SidebarItem[];
}

interface FilterTab {
  label: string;
  count: number;
}

interface FloatingElement {
  type: string;
  value: string;
  x: number;
  y: number;
  icon?: any;
}

interface Article {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
}

// Hierarchical sidebar menu items
export const sidebarItems: SidebarItem[] = [
  { 
    label: 'Home', 
    path: '/',
  },
  { 
    label: 'Product',
    children: [
      // { label: 'Overview', path: '/product/overview' },
      // { label: 'Features', path: '/product/features' },
      { label: 'How It Works', path: '/product/how-it-works' },
      { label: 'Architecture', path: '/product/architecture' },
      { label: 'Agents', path: '/product/agents' },
      { label: 'Deployment', path: '/product/deployment' },
    ]
  },
  { 
    label: 'Roadmap', 
    path: '/roadmap',
  },
  { 
    label: 'Demo', 
    path: '/demo',
  },
  { 
    label: 'Resources',
    children: [
      { label: 'Blog', path: '/resources/blog' },
      { label: 'FAQ', path: '/resources/faq' },
      // { label: 'Whitepapers', path: '/resources/whitepapers' },
    ]
  },
  { 
    label: 'Company',
    children: [
      { label: 'About Us', path: '/company/about' },
      { label: 'Contact', path: '/company/contact' },
    ]
  },
];

// Filter tabs
export const filterTabs: FilterTab[] = [
  { label: 'All', count: 247 },
  { label: 'Industrial AI', count: 89 },
  { label: 'Process Control', count: 156 },
  { label: 'Research', count: 67 },
  { label: 'Product Updates', count: 43 },
  { label: 'Safety & Security', count: 28 },
  { label: 'Innovation', count: 91 },
  { label: 'Company News', count: 34 }
];

// Floating elements for the hero section
export const floatingElements: FloatingElement[] = [
  { type: 'PV', value: '247.8°C', x: 15, y: 25, icon: Gauge },
  { type: 'SP', value: '250.0°C', x: 75, y: 20, icon: TrendingUp },
  { type: 'OP', value: '67.3%', x: 25, y: 70, icon: Cpu },
  { type: 'equation', value: 'PID Control', x: 65, y: 65 },
];

// Sample articles
export const articles: Article[] = [
  {
    id: 1,
    title: "Introducing gpt-realtime and Realtime API updates",
    category: "Product",
    excerpt: "Revolutionary real-time conversational AI for industrial applications with ultra-low latency processing.",
    date: "Aug 28, 2025",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "ChatAPC-5: Our Most Advanced Industrial AI Model",
    category: "Release",
    excerpt: "Flagship model engineered specifically for complex industrial process control and optimization scenarios.",
    date: "Aug 25, 2025", 
    readTime: "8 min read"
  }
];

