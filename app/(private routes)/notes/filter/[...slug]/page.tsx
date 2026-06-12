import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import { fetchServerNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";
import { notFound } from "next/navigation";
import { tags } from "@/types/note";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const tag = slug?.[0];

  const isAll = tag === "all" || !tag;

  return {
    title: isAll ? "All notes" : `Filter by ${tag}`,
    description: isAll
      ? "Showing all notes without filters"
      : `Filtered notes by ${tag}`,
    openGraph: {
      title: isAll ? "All notes" : `Filter by ${tag}`,
      description: isAll
        ? "Showing all notes without filters"
        : `Filtered notes by ${tag}`,
      url: `/notes/${slug}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
      type: "article",
    },
  };
}

const NotesPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params;
  const { search, page } = await searchParams;

  const currentSearch = search ?? "";
  const currentPage = Number(page ?? 1);

  const tag = slug?.[0] === "all" ? undefined : slug?.[0];

  if (tag && !tags.includes(tag)) {
    notFound();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", currentSearch, currentPage, tag],
    queryFn: () => fetchServerNotes(currentSearch, currentPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        initialSearch={currentSearch}
        initialPage={currentPage}
        initialTag={tag}
      />
    </HydrationBoundary>
  );
};

export default NotesPage;
