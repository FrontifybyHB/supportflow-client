import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { TextField } from "@/shared/components/ui/TextField";
import type { CreateKnowledgeInput, KnowledgeEntry } from "../types/knowledge.types";

interface KnowledgeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateKnowledgeInput) => void;
  isLoading: boolean;
  initialData?: KnowledgeEntry | null;
}

export function KnowledgeForm({ isOpen, onClose, onSubmit, isLoading, initialData }: KnowledgeFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateKnowledgeInput>({
    defaultValues: {
      title: "",
      content: "",
      category: "",
      tags: [],
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          title: initialData.title,
          content: initialData.content,
          category: initialData.category,
          tags: initialData.tags || [],
        });
      } else {
        reset({ title: "", content: "", category: "", tags: [] });
      }
    }
  }, [isOpen, initialData, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Knowledge Entry" : "Create Knowledge Entry"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          label="Title"
          placeholder="e.g. How to reset password"
          error={errors.title?.message}
          {...register("title", { required: "Title is required" })}
        />
        
        <TextField
          label="Category"
          placeholder="e.g. Account Access"
          error={errors.category?.message}
          {...register("category", { required: "Category is required" })}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--text-secondary)]">Content</label>
          <textarea
            {...register("content", { required: "Content is required" })}
            rows={5}
            placeholder="Write the full documentation here..."
            className="w-full bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)]"
          />
          {errors.content && <p className="text-sm text-[var(--error)]">{errors.content.message}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-subtle)] mt-6">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isLoading}>
            {initialData ? "Save Changes" : "Create Entry"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
