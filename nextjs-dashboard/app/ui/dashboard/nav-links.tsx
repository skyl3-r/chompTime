'use client';

import {
  UserGroupIcon,
  HomeIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";
import Link from 'next/link';
import { GrTasks } from "react-icons/gr";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Calendar', href: '/dashboard', icon: FaRegCalendarAlt },
  {
    name: 'Tasks',
    href: '/dashboard/tasks',
    icon: GrTasks,
  },
  { name: 'XP', href: '/dashboard/customers', icon: FaGamepad },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {'bg-sky-100 text-blue-600': pathname === link.href,},)}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
