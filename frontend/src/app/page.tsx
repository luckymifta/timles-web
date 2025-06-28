'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { getPageBySlug, type Page } from '@/lib/api';

export default function Home() {
  const [page, setPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const pageData = await getPageBySlug('home');
        setPage(pageData);
      } catch (error) {
        console.error('Error fetching home page:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, []);

  if (isLoading) {
    return (
      <main className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {page ? (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {page.title}
            </h1>
            <div className="prose prose-lg max-w-none">
              {page.Content && page.Content.length > 0 ? (
                page.Content.map((block, index) => {
                  if (block.type === 'paragraph' && Array.isArray(block.children)) {
                    return (
                      <p key={index} className="text-gray-700 mb-4">
                        {(block.children[0] as { text?: string })?.text || ''}
                      </p>
                    );
                  }
                  return null;
                })
              ) : (
                <p className="text-gray-700">No content available.</p>
              )}
            </div>
            <div className="mt-8">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Learn More About BRI
              </Button>
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Welcome to BRI Timor-Leste
            </h1>
            <p className="text-gray-700 mb-4">
              Page content not found. Please check your Strapi configuration.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Learn More
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}