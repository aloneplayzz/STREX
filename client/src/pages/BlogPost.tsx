import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import type { BlogPost as BlogPostType } from "@shared/schema";

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function PostSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Skeleton className="h-8 w-24 mb-4" />
      <Skeleton className="h-12 w-full mb-4" />
      <Skeleton className="h-6 w-64 mb-8" />
      <Skeleton className="h-64 w-full mb-8 rounded-md" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const { toast } = useToast();
  useAnalytics();
  
  const { data: post, isLoading, error } = useQuery<BlogPostType>({
    queryKey: ["/api/blog", slug],
  });

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "";
    
    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
      });
    }
  };

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/blog">
            <Button data-testid="button-back-to-blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/blog">
              <Button variant="ghost" size="sm" data-testid="button-back-to-blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleShare("twitter")}
                data-testid="button-share-twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleShare("linkedin")}
                data-testid="button-share-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleShare("copy")}
                data-testid="button-share-copy"
              >
                <Link2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Category Badge */}
          <Badge variant="secondary" className="mb-4" data-testid="badge-category">
            {post.category}
          </Badge>

          {/* Title */}
          <h1 
            className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
            data-testid="text-post-title"
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative rounded-md overflow-hidden mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 border-l-4 border-primary pl-4">
            {post.excerpt}
          </p>

          {/* Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none"
            data-testid="text-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/10"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold mb-1">Share this article</h4>
              <p className="text-sm text-muted-foreground">Help others learn from this content</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleShare("twitter")}
                className="border-white/20"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleShare("linkedin")}
                className="border-white/20"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleShare("copy")}
                className="border-white/20"
              >
                <Link2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Back to Blog */}
        <div className="mt-8 text-center">
          <Link href="/blog">
            <Button variant="outline" className="border-white/20" data-testid="button-view-all-posts">
              <ArrowLeft className="w-4 h-4 mr-2" />
              View All Posts
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
