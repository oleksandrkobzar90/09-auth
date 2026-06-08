"use client";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import css from "@/components/NotesPage/NotesPage.module.css";
import Link from "next/link";

interface NotesClientProps {
  initialSearch: string;
  initialPage: number;
  initialTag?: string;
}

const NotesClient = ({
  initialSearch,
  initialPage,
  initialTag,
}: NotesClientProps) => {
  const [search, setSearch] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const tag = initialTag;

  const normalizedTag = tag ?? "all";

  const { data, isSuccess } = useQuery({
    queryKey: ["notes", search, currentPage, normalizedTag],
    queryFn: () => fetchNotes(search, currentPage, tag),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const handleSearch = useDebouncedCallback((newQuery: string) => {
    setSearch(newQuery.trim());
    setCurrentPage(1);
  }, 1000);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            page={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <Link href={"/notes/action/create"} className={css.button}>
          Create note +
        </Link>
      </header>
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
};

export default NotesClient;
