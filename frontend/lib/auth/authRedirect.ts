export function getRedirectPath(user?: { role?: string } | null) {
  if (!user) return "/login";

  switch (user.role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "USER":
      return "/profile";
    default:
      return "/";
  }
}