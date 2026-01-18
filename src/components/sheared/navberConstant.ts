import { AppWindow, Banknote, type LucideIcon } from "lucide-react";
import React from "react";
import { FaRegCreditCard } from "react-icons/fa";
interface SubItem {
  name: string;
  href: string;
  // icon?: React.ComponentType<{ className?: string }>;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  description?: string;
}

interface NavItem {
  title: string;
  href: string;
  // icon?: React.ComponentType<{ className?: string }>;
  icon?: React.ComponentType<{ className?: string }>;
  subItems?: SubItem[];
}





export const navItems: NavItem[] = [
  {
    title: "Loans",
    href: "#",
    icon: Banknote,
    subItems: [
      { name: "Personal Loan", href: "/modules/general/personal-loan" },
      { name: "Finups Agrim", href: "/under-constructionl" },
      { name: "Home Loan", href: "/under-construction" },
      { name: "Car Loan", href: "/under-construction" },
      { name: "SME Loan", href: "/under-construction" },
    ],
  },
  {
    title: "Cards",
    href: "#",
    icon: FaRegCreditCard,
    subItems: [
      { name: "Credit Cards", href: "/under-construction" },
      { name: "Prepaid Cards", href: "/under-construction" },
      { name: "Travel Cards", href: "/under-construction" },
    ],
  },
  // {
  //   title: "Other Products",
  //   href: "#",
  //   icon: AppWindow,
  //   subItems: [
  //     { name: "Insurance", href: "/under-construction" },
  //     { name: "Investment", href: "/under-construction" },
  //     { name: "Savings Accounts", href: "/under-construction" },
  //   ],
  // },
  {
    title: "FinUps Islamic",
    href: "/finups-islamic",
    icon: AppWindow,
    subItems: [
      { name: "Islamic Banking", href: "/finups-islamic" },
      { name: "Shariah-Compliant Loans", href: "/under-construction" },
      { name: "Zakat Calculator", href: "/finups-islamic/tools/zakat-calculator" },
    ],
  },
  {
    title: "Blogs",
    href: "/blog/blogs",
    icon: AppWindow,
    subItems: [
      { name: "See Our Blogs", href: "/blog/blogs" },
    ],
  },
];






export const navItemsIslamic: NavItem[] = [
  {
    title: "Islamic Loans ",
    href: "#",
    icon: Banknote,
    subItems: [
      { name: "HPSM Personal Loan", href: "/modules/general/personal-loan" },
      { name: "HPSM Home Loan", href: "/under-construction" },
      { name: "HPSM Car Loan", href: "/under-construction" },
      { name: "Bai Muajjal", href: "/under-construction" },
    ],
  },
  {
    title: "FinUps Islamic",
    href: "/finups-islamic",
    icon: AppWindow,
    subItems: [
      { name: "Islamic Banking", href: "/finups-islamic" },
      { name: "Shariah-Compliant Loans", href: "/under-construction" },
      { name: "Zakat Calculator", href: "/finups-islamic/tools/zakat-calculator" },
    ],
  },
  {
    title: "Blogs",
    href: "/blog/blogs",
    icon: AppWindow,
    subItems: [
      { name: "See Our Blogs", href: "/blog/blogs" },
    ],
  },
];

