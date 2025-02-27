import Pagination from '@/app/ui/tasks/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/tasks/table';
import { CreateTask } from '@/app/ui/tasks/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchTasksPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tasks',
}

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchTasksPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Tasks</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search tasks..." />
        <CreateTask />
      </div>
       <Suspense key={query + currentPage}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

// export default async function Page(props: {
//   searchParams?: Promise<{
//     query?: string;
//     page?: string;
//   }>;
// }) {
//   const searchParams = await props.searchParams;
//   const query = searchParams?.query || '';
//   const currentPage = Number(searchParams?.page) || 1;
//   const totalPages = await fetchTasksPages(query);

//   return (
//     <div className="w-full p-6 bg-blue-50 rounded-lg shadow-md">
//       {/* Header */}
//       <div className="flex w-full items-center justify-between bg-blue-500 text-white p-4 rounded-lg">
//         <h1 className="text-2xl font-bold">Tasks</h1>
//       </div>

//       {/* Search and Create Task Buttons */}
//       <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
//         <Search placeholder="Search tasks..." />
//         <CreateInvoice />
//       </div>

//       {/* Table */}
//       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
//         <div className="mt-4 overflow-hidden rounded-lg bg-white shadow-lg">
//           <Table query={query} currentPage={currentPage} />
//         </div>
//       </Suspense>

//       {/* Pagination */}
//       <div className="mt-5 flex w-full justify-center">
//         <Pagination totalPages={totalPages} />
//       </div>
//     </div>
//   );
// }
