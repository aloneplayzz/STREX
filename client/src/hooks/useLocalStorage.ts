import { useState, useEffect } from "react";

// Types for all data
export interface LocalStorageData {
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  courses: Course[];
  caseStudies: CaseStudy[];
  contacts: Contact[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  published: boolean;
  createdAt: Date | string;
  tags?: string[];
  favorite?: boolean;
  scheduledAt?: Date | string | null;
  views?: number;
  likes?: number;
  orderIndex?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string | null;
  rating: number;
  featured: boolean;
  createdAt: Date | string;
  favorite?: boolean;
  orderIndex?: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  icon: string;
  features: string[];
  tags?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  coverImage: string | null;
  featured: boolean;
  createdAt: Date | string;
  tags?: string[];
  favorite?: boolean;
  orderIndex?: number;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date | string;
}

// Hook to get all data from localStorage
export function useLocalStorageData() {
  const [data, setData] = useState<LocalStorageData>({
    blogPosts: [],
    testimonials: [],
    courses: [],
    caseStudies: [],
    contacts: [],
  });

  useEffect(() => {
    const stored = localStorage.getItem("stratiumex_data");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing localStorage data:", e);
      }
    }
  }, []);

  return data;
}

// Hook to save data to localStorage
export function useSaveToLocalStorage() {
  const saveData = (key: keyof LocalStorageData, items: any[]) => {
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : {
      blogPosts: [],
      testimonials: [],
      courses: [],
      caseStudies: [],
      contacts: [],
    };
    data[key] = items;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  return { saveData };
}

// Hook for blog posts
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("stratiumex_data");
    if (stored) {
      const data = JSON.parse(stored);
      setPosts(data.blogPosts || []);
    }
  }, []);

  const addPost = (post: BlogPost) => {
    const newPosts = [...posts, { ...post, id: post.id || Date.now().toString() }];
    setPosts(newPosts);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.blogPosts = newPosts;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  const updatePost = (id: string, updated: Partial<BlogPost>) => {
    const newPosts = posts.map(p => p.id === id ? { ...p, ...updated } : p);
    setPosts(newPosts);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.blogPosts = newPosts;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  const deletePost = (id: string) => {
    const newPosts = posts.filter(p => p.id !== id);
    setPosts(newPosts);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.blogPosts = newPosts;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  return { posts, addPost, updatePost, deletePost };
}

// Hook for testimonials
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("stratiumex_data");
    if (stored) {
      const data = JSON.parse(stored);
      setTestimonials(data.testimonials || []);
    }
  }, []);

  const add = (item: Testimonial) => {
    const newItems = [...testimonials, { ...item, id: item.id || Date.now().toString() }];
    setTestimonials(newItems);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.testimonials = newItems;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  const update = (id: string, updated: Partial<Testimonial>) => {
    const newItems = testimonials.map(i => i.id === id ? { ...i, ...updated } : i);
    setTestimonials(newItems);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.testimonials = newItems;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  const remove = (id: string) => {
    const newItems = testimonials.filter(i => i.id !== id);
    setTestimonials(newItems);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.testimonials = newItems;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  return { testimonials, add, update, remove };
}

// Hook for case studies
export function useCaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("stratiumex_data");
    if (stored) {
      const data = JSON.parse(stored);
      setStudies(data.caseStudies || []);
    }
  }, []);

  const add = (item: CaseStudy) => {
    const newItems = [...studies, { ...item, id: item.id || Date.now().toString() }];
    setStudies(newItems);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.caseStudies = newItems;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  const update = (id: string, updated: Partial<CaseStudy>) => {
    const newItems = studies.map(i => i.id === id ? { ...i, ...updated } : i);
    setStudies(newItems);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.caseStudies = newItems;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  const remove = (id: string) => {
    const newItems = studies.filter(i => i.id !== id);
    setStudies(newItems);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.caseStudies = newItems;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  return { studies, add, update, remove };
}

// Hook for courses
export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("stratiumex_data");
    if (stored) {
      const data = JSON.parse(stored);
      setCourses(data.courses || []);
    }
  }, []);

  const add = (item: Course) => {
    const newItems = [...courses, { ...item, id: item.id || Date.now().toString() }];
    setCourses(newItems);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.courses = newItems;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  const update = (id: string, updated: Partial<Course>) => {
    const newItems = courses.map(i => i.id === id ? { ...i, ...updated } : i);
    setCourses(newItems);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.courses = newItems;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  const remove = (id: string) => {
    const newItems = courses.filter(i => i.id !== id);
    setCourses(newItems);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.courses = newItems;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  return { courses, add, update, remove };
}

// Hook for contacts
export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("stratiumex_data");
    if (stored) {
      const data = JSON.parse(stored);
      setContacts(data.contacts || []);
    }
  }, []);

  const add = (item: Contact) => {
    const newItems = [...contacts, { ...item, id: item.id || Date.now().toString() }];
    setContacts(newItems);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.contacts = newItems;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  const markRead = (id: string) => {
    const newItems = contacts.map(c => c.id === id ? { ...c, isRead: true } : c);
    setContacts(newItems);
    const stored = localStorage.getItem("stratiumex_data");
    const data = stored ? JSON.parse(stored) : { blogPosts: [], testimonials: [], courses: [], caseStudies: [], contacts: [] };
    data.contacts = newItems;
    localStorage.setItem("stratiumex_data", JSON.stringify(data));
  };

  return { contacts, add, markRead };
}
