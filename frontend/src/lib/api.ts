import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Navigation Items
export const getNavigationItems = async () => {
  try {
    const response = await api.get('/navigation-items?sort=order:asc');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching navigation items:', error);
    return [];
  }
};

// Pages
export const getPages = async () => {
  try {
    const response = await api.get('/pages');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
};

export const getPageBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/pages?filters[slug][$eq]=${slug}`);
    return response.data.data[0] || null;
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    return null;
  }
};

// Site Settings
export const getSiteSettings = async () => {
  try {
    const response = await api.get('/site-setting');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
};

// Types
export interface NavigationItem {
  id: number;
  documentId: string;
  title: string;
  url: string;
  order: number;
  isActive: boolean;
}

export interface Page {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  Content: Record<string, unknown>[];
  metaDescription: string;
}

export interface SiteSettings {
  id: number;
  documentId: string;
  siteTitle: string;
  footerText: string;
}
