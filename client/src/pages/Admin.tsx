import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth, useLogout } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  BookOpen,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Mail,
  MailOpen,
  Star,
  Clock,
  CheckCircle2,
  LogOut,
  Download,
  Search,
  ArrowUp,
  ArrowDown,
  Upload,
  Copy,
  History,
  Settings,
} from "lucide-react";
import { calculateReadingTime, exportToJSON, validateJSON } from "@/utils/helpers";
import { useBulkSelect } from "@/hooks/useBulkSelect";
import { useActivityLog } from "@/hooks/useActivityLog";
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
import { useContacts, useBlogPosts, useTestimonials, useCaseStudies, useCourses } from "@/hooks/useLocalStorage";

type TabType = "overview" | "contacts" | "blog" | "testimonials" | "case-studies" | "courses";

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
}: { 
  title: string; 
  value: string | number; 
  icon: any;
}) {
  return (
    <Card className="glass-strong border-white/10 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-display font-bold mt-1">{value}</p>
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
  const { contacts, markRead } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");

  const unreadCount = contacts.filter(c => !c.isRead).length;
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportContacts = () => {
    const dataStr = JSON.stringify({ contacts, exportDate: new Date().toISOString() }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contacts-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: "Contacts exported successfully" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold">Contact Submissions</h2>
          <p className="text-muted-foreground">{unreadCount} unread • {filteredContacts.length} shown</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExportContacts}
          data-testid="button-export-contacts"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Search by name, email or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          data-testid="input-search-contacts"
          className="flex-1"
        />
        <Search className="w-5 h-5 text-muted-foreground absolute right-12 pointer-events-none" />
      </div>

      <div className="space-y-4">
        {filteredContacts.length === 0 ? (
          <Card className="glass-strong border-white/10 p-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? "No messages match your search." : "No contact submissions yet."}
            </p>
          </Card>
        ) : (
          filteredContacts.map((contact) => (
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
                    onClick={() => markRead(contact.id)}
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
  const { posts, addPost, updatePost, deletePost } = useBlogPosts();
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "title">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredPosts = posts
    .filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let compareValue = 0;
      if (sortBy === "date") {
        compareValue = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        compareValue = a.title.localeCompare(b.title);
      }
      return sortOrder === "asc" ? compareValue : -compareValue;
    });

  const handleCreatePost = (data: any) => {
    if (!data.title?.trim() || !data.content?.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }
    addPost({
      id: Date.now().toString(),
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      published: false,
      createdAt: new Date(),
    });
    setIsCreateOpen(false);
    toast({ title: "Post created successfully" });
  };

  const handleUpdatePost = (data: any) => {
    if (editingPost) {
      updatePost(editingPost.id, data);
      setEditingPost(null);
      toast({ title: "Post updated successfully" });
    }
  };

  const togglePublish = (post: any) => {
    updatePost(post.id, { published: !post.published });
  };

  const handleExportPosts = () => {
    const dataStr = JSON.stringify({ posts, exportDate: new Date().toISOString() }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blog-posts-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: "Blog posts exported successfully" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold">Blog Posts</h2>
          <p className="text-muted-foreground">{filteredPosts.length} of {posts.length} posts</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPosts}
            data-testid="button-export-posts"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
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
                onSubmit={handleCreatePost} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-testid="input-search-posts"
            className="flex-1"
          />
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "date" | "title")}
            className="px-3 py-2 rounded border border-input bg-background"
            data-testid="select-sort-by"
          >
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            data-testid="button-toggle-sort"
            title={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
          >
            {sortOrder === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="glass-strong border-white/10 p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? "No posts match your search." : "No blog posts yet. Create your first post!"}
            </p>
          </Card>
        ) : (
          filteredPosts.map((post: any) => (
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
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {calculateReadingTime(post.content)} min read
                    </span>
                  </div>
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
                        onSubmit={handleUpdatePost} 
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
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => {
                            deletePost(post.id);
                            toast({ title: "Post deleted successfully" });
                          }}
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
}: { 
  post?: any; 
  onSubmit: (data: any) => void;
}) {
  const [title, setTitle] = useState(post?.title || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [category, setCategory] = useState(post?.category || "tutorial");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, excerpt, content, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <Button type="submit" data-testid="button-submit-post">
        {post ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
}

function TestimonialsTab() {
  const { toast } = useToast();
  const { testimonials, add, update, remove } = useTestimonials();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreate = (data: any) => {
    add({
      id: Date.now().toString(),
      name: data.name,
      role: data.role,
      company: data.company,
      content: data.content,
      avatarUrl: null,
      rating: data.rating,
      featured: false,
      createdAt: new Date(),
    });
    setIsCreateOpen(false);
    toast({ title: "Testimonial created successfully" });
  };

  const toggleFeatured = (testimonial: any) => {
    update(testimonial.id, { featured: !testimonial.featured });
  };

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
            <TestimonialForm onSubmit={handleCreate} />
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
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => {
                            remove(testimonial.id);
                          }}
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
}: { 
  onSubmit: (data: any) => void;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, role, company, content, rating });
    setName("");
    setRole("");
    setCompany("");
    setContent("");
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />
      <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" />
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Testimonial" />
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full border rounded p-2">
        {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} stars</option>)}
      </select>
      <Button type="submit">Add Testimonial</Button>
    </form>
  );
}

function CaseStudiesTab() {
  const { studies, add, update, remove } = useCaseStudies();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreate = (data: any) => {
    add({
      id: Date.now().toString(),
      title: data.title,
      slug: data.title.toLowerCase().replace(/\s+/g, '-'),
      client: data.client,
      industry: data.industry,
      challenge: data.challenge,
      solution: data.solution,
      results: data.results,
      coverImage: null,
      featured: false,
      createdAt: new Date(),
    });
    setIsCreateOpen(false);
    toast({ title: "Case study created" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold">Case Studies</h2>
          <p className="text-muted-foreground">{studies.length} case studies</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />New Case Study</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Create Case Study</DialogTitle></DialogHeader>
            <CaseStudyForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {studies.map((study) => (
          <Card key={study.id} className="glass-strong border-white/10 p-6">
            <div className="space-y-3">
              <h3 className="font-semibold">{study.title}</h3>
              <p className="text-sm text-muted-foreground">{study.client} - {study.industry}</p>
              {study.featured && <Badge>Featured</Badge>}
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => update(study.id, { featured: !study.featured })}>
                  {study.featured ? "Unfeature" : "Feature"}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Delete?</AlertDialogTitle></AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => remove(study.id)} className="bg-destructive">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CaseStudyForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [industry, setIndustry] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solution, setSolution] = useState("");
  const [results, setResults] = useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit({ title, client, industry, challenge, solution, results });
    }} className="space-y-4">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <Input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Client" />
      <Input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Industry" />
      <Textarea value={challenge} onChange={(e) => setChallenge(e.target.value)} placeholder="Challenge" />
      <Textarea value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="Solution" />
      <Textarea value={results} onChange={(e) => setResults(e.target.value)} placeholder="Results" />
      <Button type="submit">Create Case Study</Button>
    </form>
  );
}

function CoursesTab() {
  const { courses, add, update, remove } = useCourses();
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreate = (data: any) => {
    add({
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      price: data.price,
      category: "course",
      icon: "Code2",
      features: data.features ? data.features.split(',') : [],
    });
    setIsCreateOpen(false);
    toast({ title: "Course created" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold">Courses</h2>
          <p className="text-muted-foreground">{courses.length} courses</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />New Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Course</DialogTitle></DialogHeader>
            <CourseForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.id} className="glass-strong border-white/10 p-6">
            <div className="space-y-3">
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
              <p className="font-bold text-purple">{course.price}</p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>Delete?</AlertDialogTitle></AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => remove(course.id)} className="bg-destructive">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CourseForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit({ title, description, price, features });
    }} className="space-y-4">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      <Input value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Features (comma-separated)" />
      <Button type="submit">Create Course</Button>
    </form>
  );
}

export default function Admin() {
  const user = useAuth();
  const logout = useLogout();
  const [location, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const { toast } = useToast();
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showActivityLog, setShowActivityLog] = useState(false);

  const { contacts } = useContacts();
  const { posts } = useBlogPosts();
  const { testimonials } = useTestimonials();
  const { studies } = useCaseStudies();
  const { courses } = useCourses();
  const { activities, addActivity } = useActivityLog();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Cmd/Ctrl + K: Focus search
      if (isCtrl && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        searchInput?.focus();
      }

      // Cmd/Ctrl + N: New post
      if (isCtrl && e.key === 'n' && activeTab === 'blog') {
        e.preventDefault();
        const newBtn = document.querySelector('[data-testid="button-create-post"]') as HTMLButtonElement;
        newBtn?.click();
      }

      // Cmd/Ctrl + H: Show activity log
      if (isCtrl && e.key === 'h') {
        e.preventDefault();
        setShowActivityLog(!showActivityLog);
      }

      // Cmd/Ctrl + E: Export data
      if (isCtrl && e.key === 'e') {
        e.preventDefault();
        setShowBackupModal(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, showActivityLog]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-strong border-white/10 p-8 max-w-md">
          <p className="text-muted-foreground mb-4">Unauthorized. Please log in.</p>
          <Button onClick={() => setLocation("/login")}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-white/10 bg-gradient-to-r from-background to-surface/50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/")} data-testid="button-back">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{user?.email || user?.user?.email || 'Admin'}</span>
            <Button variant="ghost" size="icon" onClick={() => setShowActivityLog(!showActivityLog)} title="Cmd+H" data-testid="button-activity-log">
              <History className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowBackupModal(true)} title="Cmd+E" data-testid="button-backup">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={logout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {[
            { id: "overview" as TabType, label: "Overview", icon: LayoutDashboard },
            { id: "contacts" as TabType, label: "Contacts", icon: MessageSquare, count: contacts.filter(c => !c.isRead).length },
            { id: "blog" as TabType, label: "Blog", icon: FileText, count: posts.length },
            { id: "testimonials" as TabType, label: "Testimonials", icon: Users, count: testimonials.length },
            { id: "case-studies" as TabType, label: "Case Studies", icon: BookOpen, count: studies.length },
            { id: "courses" as TabType, label: "Courses", icon: BookOpen, count: courses.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid={`button-tab-${tab.id}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && <Badge>{tab.count}</Badge>}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Contacts" value={contacts.length} icon={MessageSquare} />
              <StatCard title="Blog Posts" value={posts.length} icon={FileText} />
              <StatCard title="Testimonials" value={testimonials.length} icon={Users} />
              <StatCard title="Case Studies" value={studies.length} icon={BookOpen} />
            </div>
          )}
          {activeTab === "contacts" && <ContactsTab />}
          {activeTab === "blog" && <BlogTab />}
          {activeTab === "testimonials" && <TestimonialsTab />}
          {activeTab === "case-studies" && <CaseStudiesTab />}
          {activeTab === "courses" && <CoursesTab />}
        </motion.div>
      </div>

      {/* Activity Log Modal */}
      <Dialog open={showActivityLog} onOpenChange={setShowActivityLog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Activity Log (Cmd+H)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {activities.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No activities yet</p>
            ) : (
              activities.map((activity) => (
                <div key={activity.id} className="flex gap-3 p-3 rounded border border-white/10">
                  <div className="flex-1">
                    <p className="font-sm"><Badge className="capitalize">{activity.type}</Badge></p>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Backup & Restore Modal */}
      <Dialog open={showBackupModal} onOpenChange={setShowBackupModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Backup & Restore (Cmd+E)</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Export All Data */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Download className="w-4 h-4" /> Export All Data
              </h3>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  const allData = {
                    contacts,
                    posts,
                    testimonials,
                    studies,
                    courses,
                    exportDate: new Date().toISOString(),
                  };
                  const dataStr = JSON.stringify(allData, null, 2);
                  const blob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `stratiumex-backup-${new Date().toISOString().split('T')[0]}.json`;
                  link.click();
                  URL.revokeObjectURL(url);
                  toast({ title: "Data exported successfully" });
                }}
                data-testid="button-export-all"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Complete Backup
              </Button>
            </div>

            {/* Import Data */}
            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Upload className="w-4 h-4" /> Restore from Backup
              </h3>
              <input 
                type="file" 
                accept=".json" 
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const content = event.target?.result as string;
                      const validation = validateJSON(content);
                      if (!validation.valid) {
                        toast({ 
                          title: "Invalid JSON", 
                          description: validation.error,
                          variant: "destructive"
                        });
                        return;
                      }
                      try {
                        const data = validation.data;
                        localStorage.setItem("stratiumex_data", JSON.stringify({
                          contacts: data.contacts || [],
                          blogPosts: data.posts || [],
                          testimonials: data.testimonials || [],
                          caseStudies: data.studies || [],
                          courses: data.courses || [],
                        }));
                        toast({ title: "Data restored successfully. Refresh the page." });
                        setShowBackupModal(false);
                        setTimeout(() => window.location.reload(), 1500);
                      } catch {
                        toast({ 
                          title: "Error", 
                          description: "Failed to restore data",
                          variant: "destructive"
                        });
                      }
                    };
                    reader.readAsText(file);
                  }
                }}
                className="w-full border rounded p-2"
                data-testid="input-restore-file"
              />
              <p className="text-xs text-muted-foreground">Select a .json backup file to restore</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
