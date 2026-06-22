import {
    Home,
    BookOpen,
    Compass,
    PlusCircle,
    ShoppingBag,
    Users,
    Bot,
    LayoutDashboard,
    User,
  } from "lucide-react";
  
  export const navItems = [
    { name: "Home", href: "/", icon: Home, iconClass: "text-cyan-500 dark:text-cyan-300" },
    { name: "Learn", href: "/learn", icon: BookOpen, iconClass: "text-violet-500 dark:text-violet-300" },
    { name: "Explore", href: "/explore", icon: Compass, iconClass: "text-fuchsia-500 dark:text-fuchsia-300" },
    { name: "Create", href: "/create", icon: PlusCircle, iconClass: "text-sky-500 dark:text-sky-300" },
    { name: "Shop", href: "/shop", icon: ShoppingBag, iconClass: "text-purple-500 dark:text-purple-300" },
    { name: "Community", href: "/community", icon: Users, iconClass: "text-pink-500 dark:text-pink-300" },
    { name: "AI Tutor", href: "/ai-tutor", icon: Bot, iconClass: "text-violet-500 dark:text-violet-300" },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, iconClass: "text-cyan-500 dark:text-cyan-300" },
    { name: "Profile", href: "/profile", icon: User, iconClass: "text-purple-500 dark:text-purple-300" },
  ];
  
  export const bottomNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Learn", href: "/learn", icon: BookOpen },
    { name: "Explore", href: "/explore", icon: Compass },
    { name: "Create", href: "/create", icon: PlusCircle },
    { name: "Profile", href: "/profile", icon: User },
  ];
