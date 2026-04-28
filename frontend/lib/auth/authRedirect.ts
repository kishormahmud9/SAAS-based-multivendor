export function getRedirectPath(user?: { role?: string } | null) {
  if (!user) return "/login";

  const role = user.role?.toUpperCase();

  switch (role) {
    case "SUPER_ADMIN":
    case "ADMIN":
      return "/admin/dashboard";
    case "VENDOR":
      return "/vendor/dashboard";
    case "CUSTOMER":
    case "USER":
      return "/user/dashboard";
    default:
      return "/";
  }
}