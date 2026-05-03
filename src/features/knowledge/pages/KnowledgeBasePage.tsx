import React, { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, BookOpen } from "lucide-react";
import { useKnowledgeEntries } from "../hooks/useKnowledgeEntries";
import { useCreateEntry, useUpdateEntry, useDeleteEntry } from "../hooks/useKnowledgeMutations";
import { KnowledgeEntryCard } from "../components/KnowledgeEntryCard";
import { KnowledgeForm } from "../components/KnowledgeForm";
import { Button } from "@/shared/components/ui/Button";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import type { KnowledgeEntry, CreateKnowledgeInput } from "../types/knowledge.types";

const KnowledgeBasePage = () => {
  const { data, isLoading } = useKnowledgeEntries();
  const { mutate: createEntry, isPending: isCreating } = useCreateEntry();
  const { mutate: updateEntry, isPending: isUpdating } = useUpdateEntry();
  const { mutate: deleteEntry } = useDeleteEntry();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenCreate = useCallback(() => {
    setEditingEntry(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEdit = useCallback((entry: KnowledgeEntry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    if (window.confirm("Are you sure you want to delete this knowledge base entry?")) {
      deleteEntry(id);
    }
  }, [deleteEntry]);

  const handleSubmit = useCallback((formData: CreateKnowledgeInput) => {
    if (editingEntry) {
      updateEntry({ _id: editingEntry._id, ...formData }, { onSuccess: () => setIsModalOpen(false) });
    } else {
      createEntry(formData, { onSuccess: () => setIsModalOpen(false) });
    }
  }, [createEntry, editingEntry, updateEntry]);

  const entries = useMemo(() => data?.data ?? [], [data?.data]);
  // The knowledge grid may grow to dozens of items, so keep search filtering tied only to entries/query changes.
  const filteredEntries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return entries.filter(entry =>
      entry.title.toLowerCase().includes(query) ||
      entry.content.toLowerCase().includes(query)
    );
  }, [entries, searchQuery]);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight text-[var(--text-primary)]">Knowledge Base</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Manage articles used by agents and AI for auto-replies.</p>
        </div>
        <Button className="gap-2 shrink-0" onClick={handleOpenCreate}>
          <Plus className="w-4 h-4" />
          Add Article
        </Button>
      </div>

      <div className="mb-8 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] text-[var(--text-primary)]"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="text-center py-20 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl shadow-sm">
          <BookOpen className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">No articles found</h3>
          <p className="text-[var(--text-secondary)] mb-6">Create your first knowledge base article to get started.</p>
          <Button onClick={handleOpenCreate}>Add Article</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEntries.map(entry => (
            <KnowledgeEntryCard 
              key={entry._id} 
              entry={entry} 
              onEdit={handleOpenEdit} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      <KnowledgeForm
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        isLoading={isCreating || isUpdating}
        initialData={editingEntry}
      />
    </motion.div>
  );
};

export default React.memo(KnowledgeBasePage);
