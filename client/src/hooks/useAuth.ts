import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import type { User } from "@shared/schema";

export function useAuth() {
  // Check for mock auth user first
  const mockUser = typeof window !== "undefined" ? localStorage.getItem("mockAuthUser") : null;
  const parsedMockUser = mockUser ? JSON.parse(mockUser) : null;

  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: getQueryFn<User | null>({ on401: "returnNull" }),
    retry: false,
    staleTime: 30000,
    enabled: !parsedMockUser,
  });

  const finalUser = parsedMockUser || user;

  return {
    user: finalUser,
    isLoading: parsedMockUser ? false : isLoading,
    isAuthenticated: !!finalUser,
    isAdmin: finalUser?.isAdmin ?? false,
  };
}

export function useLogout() {
  return () => {
    localStorage.removeItem("mockAuthUser");
    window.location.href = "/";
  };
}
