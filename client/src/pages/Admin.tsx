import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  BookOpen,
  TrendingUp,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Mail,
  MailOpen,
  Star,
  BarChart3,
  Clock,
  CheckCircle2,
} from "lucide-react";
import type { 
  Contact, 
  BlogPost, 
  Testimonial, 
  CaseStudy, 
  Course 
} from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type TabType = "overview" | "contacts" | "blog" | "testimonials" | "case-studies" | "courses";

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend 
}: { 
  title: string; 
  value: string | number; 
  icon: any;
  trend?: string;
}) {
  return (
    <Card className="glass-strong border-white/10 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-display font-bold mt-1">{value}</p>
          {trend && (
            <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 rounded-md bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}

function ContactsTab() {
  const { toast } = useToast();
  
  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('PATCH', `/api/contacts/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
  });

  if (isLoading) {
    return <div className="text-center py-12 text-muted-foreground">Loading contacts...</div>;
  }

  const unreadCount = contacts.filter(c => !c.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold">Contact Submissions</h2>
          <p className="text-muted-foreground">{unreadCount} unread messages</p>
        </div>
      </div>

      <div className="space-y-4">
        {contacts.length === 0 ? (
          <Card className="glass-strong border-white/10 p-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No contact submissions yet.</p>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card 
              key={contact.id} 
              className={`glass-strong border-white/10 p-6 ${!contact.isRead ? 'border-l-4 border-l-primary' : ''}`}
              data-testid={`contact-card-${contact.id}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    {contact.isRead ? (
                      <MailOpen className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <Mail className="w-5 h-5 text-primary" />
                    )}
                    <span className="font-semibold">{contact.name}</span>
                    <span className="text-sm text-muted-foreground">{contact.email}</span>
                    {!contact.isRead && <Badge variant="secondary">New</Badge>}
                  </div>
                  {contact.company && (
                    <p className="text-sm text-muted-foreground">Company: {contact.company}</p>
                  )}
                  <p className="font-medium">{contact.subject}</p>
                  <p className="text-muted-foreground">{contact.message}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : 'Unknown date'}
                  </p>
                </div>
                {!contact.isRead && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markReadMutation.mutate(contact.id)}
                    data-testid={`button-mark-read-${contact.id}`}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Mark as Read
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function BlogTab() {
  const { toast } = useToast();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('POST', '/api/blog', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setIsCreateOpen(false);
      toast({ title: "Post created successfully" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest('PATCH', `/api/blog/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      setEditingPost(null);
      toast({ title: "Post updated successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/blog/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog'] });
      toast({ title: "Post deleted successfully" });
    },
  });

  const togglePublish = (post: BlogPost) => {
    updateMutation.mutate({ id: post.id, data: { published: !post.published } });
  };

  if (isLoading) {
    return <div className="text-center py-12 text-muted-foreground">Loading posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold">Blog Posts</h2>
          <p className="text-muted-foreground">{posts.length} total posts</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-post">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Blog Post</DialogTitle>
            </DialogHeader>
            <BlogPostForm 
              onSubmit={(data) => createMutation.mutate(data)} 
              isSubmitting={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card className="glass-strong border-white/10 p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No blog posts yet. Create your first post!</p>
          </Card>
        ) : (
          posts.map((post) => (
            <Card 
              key={post.id} 
              className="glass-strong border-white/10 p-6"
              data-testid={`blog-card-${post.id}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-lg">{post.title}</span>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <p className="text-xs text-muted-foreground">
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => togglePublish(post)}
                    data-testid={`button-toggle-publish-${post.id}`}
                  >
                    {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setEditingPost(post)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Blog Post</DialogTitle>
                      </DialogHeader>
                      <BlogPostForm 
                        post={post}
                        onSubmit={(data) => updateMutation.mutate({ id: post.id, data })} 
                        isSubmitting={updateMutation.isPending}
                      />
                    </DialogContent>
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the blog post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => deleteMutation.mutate(post.id)}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function BlogPostForm({ 
  post, 
  onSubmit, 
  isSubmitting 
}: { 
  post?: BlogPost; 
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}) {
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [category, setCategory] = useState(post?.category || "tutorial");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, slug, excerpt, content, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Post title"
            data-testid="input-post-title"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Slug</label>
          <Input 
            value={slug} 
            onChange={(e) => setSlug(e.target.value)} 
            placeholder="post-url-slug"
            data-testid="input-post-slug"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Excerpt</label>
        <Textarea 
          value={excerpt} 
          onChange={(e) => setExcerpt(e.target.value)} 
          placeholder="Brief description..."
          data-testid="input-post-excerpt"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Content</label>
        <Textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Post content..."
          className="min-h-[200px]"
          data-testid="input-post-content"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Category</label>
        <Input 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          placeholder="tutorial"
          data-testid="input-post-category"
        />
      </div>
      <Button type="submit" disabled={isSubmitting} data-testid="button-submit-post">
        {isSubmitting ? "Saving..." : post ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
}

function TestimonialsTab() {
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('POST', '/api/testimonials', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      setIsCreateOpen(false);
      toast({ title: "Testimonial created successfully" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest('PATCH', `/api/testimonials/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({ title: "Testimonial updated successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/testimonials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({ title: "Testimonial deleted successfully" });
    },
  });

  const toggleFeatured = (testimonial: Testimonial) => {
    updateMutation.mutate({ id: testimonial.id, data: { featured: !testimonial.featured } });
  };

  if (isLoading) {
    return <div className="text-center py-12 text-muted-foreground">Loading testimonials...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold">Testimonials</h2>
          <p className="text-muted-foreground">{testimonials.length} testimonials</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-testimonial">
              <Plus className="w-4 h-4 mr-2" />
              New Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Testimonial</DialogTitle>
            </DialogHeader>
            <TestimonialForm 
              onSubmit={(data) => createMutation.mutate(data)} 
              isSubmitting={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.length === 0 ? (
          <Card className="glass-strong border-white/10 p-12 text-center col-span-2">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No testimonials yet. Add your first one!</p>
          </Card>
        ) : (
          testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="glass-strong border-white/10 p-6"
              data-testid={`testimonial-card-${testimonial.id}`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-lg font-bold">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  {testimonial.featured && (
                    <Badge className="bg-yellow-500/20 text-yellow-500">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFeatured(testimonial)}
                  >
                    {testimonial.featured ? "Unfeature" : "Feature"}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Testimonial?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => deleteMutation.mutate(testimonial.id)}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function TestimonialForm({ 
  onSubmit, 
  isSubmitting 
}: { 
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, role, company, content, rating });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="John Doe"
            data-testid="input-testimonial-name"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Role</label>
          <Input 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            placeholder="CEO"
            data-testid="input-testimonial-role"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Company</label>
        <Input 
          value={company} 
          onChange={(e) => setCompany(e.target.value)} 
          placeholder="Acme Inc."
          data-testid="input-testimonial-company"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Testimonial</label>
        <Textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="What they said..."
          data-testid="input-testimonial-content"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Rating (1-5)</label>
        <Input 
          type="number" 
          min={1} 
          max={5} 
          value={rating} 
          onChange={(e) => setRating(parseInt(e.target.value))} 
          data-testid="input-testimonial-rating"
        />
      </div>
      <Button type="submit" disabled={isSubmitting} data-testid="button-submit-testimonial">
        {isSubmitting ? "Saving..." : "Create Testimonial"}
      </Button>
    </form>
  );
}

function OverviewTab() {
  const { data: contacts = [] } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
  });
  
  const { data: posts = [] } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });
  
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });
  
  const { data: courses = [] } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
  });

  const { data: analytics } = useQuery<{
    totalPageViews: number;
    totalContacts: number;
    totalEnrollments: number;
    recentEvents: any[];
  }>({
    queryKey: ['/api/analytics/summary'],
  });

  const unreadContacts = contacts.filter(c => !c.isRead).length;
  const publishedPosts = posts.filter(p => p.published).length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your site.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Unread Messages" 
          value={unreadContacts} 
          icon={MessageSquare}
        />
        <StatCard 
          title="Published Posts" 
          value={publishedPosts} 
          icon={FileText}
        />
        <StatCard 
          title="Testimonials" 
          value={testimonials.length} 
          icon={Users}
        />
        <StatCard 
          title="Total Courses" 
          value={courses.length} 
          icon={BookOpen}
        />
      </div>

      {analytics && (
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard 
            title="Page Views" 
            value={analytics.totalPageViews} 
            icon={BarChart3}
            trend="+12% from last week"
          />
          <StatCard 
            title="Contact Submissions" 
            value={analytics.totalContacts} 
            icon={Mail}
          />
          <StatCard 
            title="Course Enrollments" 
            value={analytics.totalEnrollments} 
            icon={BookOpen}
          />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-strong border-white/10 p-6">
          <h3 className="font-display font-semibold mb-4">Recent Contact Submissions</h3>
          {contacts.slice(0, 5).map((contact) => (
            <div key={contact.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.subject}</p>
              </div>
              {!contact.isRead && <Badge variant="secondary">New</Badge>}
            </div>
          ))}
          {contacts.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No submissions yet</p>
          )}
        </Card>

        <Card className="glass-strong border-white/10 p-6">
          <h3 className="font-display font-semibold mb-4">Recent Blog Posts</h3>
          {posts.slice(0, 5).map((post) => (
            <div key={post.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-muted-foreground">{post.category}</p>
              </div>
              <Badge variant={post.published ? "default" : "secondary"}>
                {post.published ? "Published" : "Draft"}
              </Badge>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No posts yet</p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const { user, isLoading, isAuthenticated, isAdmin } = useAuth();

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
    { id: "contacts" as const, label: "Contacts", icon: MessageSquare },
    { id: "blog" as const, label: "Blog Posts", icon: FileText },
    { id: "testimonials" as const, label: "Testimonials", icon: Users },
    { id: "case-studies" as const, label: "Case Studies", icon: BookOpen },
    { id: "courses" as const, label: "Courses", icon: BookOpen },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="glass-strong border-white/10 p-8 max-w-md text-center">
          <LayoutDashboard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display font-bold text-2xl mb-2">Admin Access Required</h1>
          <p className="text-muted-foreground mb-6">
            Please log in with an admin account to access the dashboard.
          </p>
          <Link href="/">
            <Button data-testid="button-go-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="glass-strong border-white/10 p-8 max-w-md text-center">
          <LayoutDashboard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display font-bold text-2xl mb-2">Admin Only</h1>
          <p className="text-muted-foreground mb-6">
            You need admin privileges to access this area.
          </p>
          <Link href="/">
            <Button data-testid="button-go-home-admin">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-white/10 bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back-home">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-display font-bold text-xl">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your website content</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="w-64 shrink-0">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(tab.id)}
                  data-testid={`tab-${tab.id}`}
                >
                  <tab.icon className="w-4 h-4 mr-3" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <main className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "overview" && <OverviewTab />}
              {activeTab === "contacts" && <ContactsTab />}
              {activeTab === "blog" && <BlogTab />}
              {activeTab === "testimonials" && <TestimonialsTab />}
              {activeTab === "case-studies" && (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4" />
                  <p>Case Studies management coming soon</p>
                </div>
              )}
              {activeTab === "courses" && (
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4" />
                  <p>Courses management coming soon</p>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
