import { ReactNode } from "react";

export interface PrimaryButtonProps {
  title: string;
  backgroundStyle: string;
  type?: "button" | "reset" | "submit" | undefined;
}

export interface SecondaryButtonProps {
  title: string;
  backgroundStyle: string;
}

export interface CategoriesMiniCard {
  title: string;
  backgroundStyle: string;
}

export interface howItWorksCardProp {
  step: string;
  heading: string;
  description: string;
}

export interface AuthContextType {
  isAuthenticating: boolean;
  setIsAuthenticating: (isAuthenticating: boolean) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface FormData {
  bio: string;
  address: string;
  idCard: File | null;
}

export interface YearRange {
  startYear: number | null;
  endYear: number | null;
}

export interface FiltersProps {
  location: string;
  sector: string;
  searchTerms: string[];
  businessLookingFor?: string[] | undefined;
  legalEntity?: string[];
  minInvestment: number;
  maxInvestment: number;
  yearRange: YearRange;
}

export interface Business {
  id: string;
  name: string;
  industry: string;
  district: string;
  State: string;
  InvestmentRangeEnd: number;
  type?: string; // assuming `type` should be a string describing the business type
  legalEntity?: string; // make optional if not all businesses will have this defined
  establishedDate?: string;
}

// types.ts
export interface User {
  id: string;
  name: string;
  status: string;
  profession: string;
  avatar: string;
}

export interface Message {
  content: string;
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  fromUser: string;
}

export interface Chat {
  users: User[];
  messages: Message[];
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}
export interface BlogContextType {
  blogs: BlogPost[];
  addBlog: (blog: BlogPost) => void;
  updateBlog: (id: number, updatedBlog: Partial<BlogPost>) => void;
  deleteBlog: (id: number) => void;
  currentBlog: BlogPost | null; // Include the currentBlog in the context type
  setCurrentBlog: (blog: BlogPost | null) => void; // Setter for currentBlog
}

export interface Investor {
  email: string;
  phone: string;
  id: string;
  name: string;
  buyerType: string;
  location: string;
  interests: string;
  background: string;
  additionalLocations: string;
  industries: string;
  financialInvestment: string;
}

export interface Notification {
  id: string;
  authorName: string;
  profileImage: string;
  message: string;
  date: string;
  time: string;
}

export type Bookmarkable = Business | Investor;
