import { Edit, Trash2, FileText } from "lucide-react";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import type { KnowledgeEntry } from "../types/knowledge.types";

interface KnowledgeEntryCardProps {
  entry: KnowledgeEntry;
  onEdit: (entry: KnowledgeEntry) => void;
  onDelete: (id: string) => void;
}

export function KnowledgeEntryCard({ entry, onEdit, onDelete }: KnowledgeEntryCardProps) {
  return (
    <Card className="flex flex-col h-full group hover:border-[var(--accent-primary)]/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-[var(--bg-elevated)] p-2 rounded-lg text-[var(--accent-primary)] group-hover:bg-[var(--accent-glow)] transition-colors">
          <FileText size={20} />
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onEdit(entry)}>
            <Edit size={14} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[var(--error)]/10" onClick={() => onDelete(entry._id)}>
            <Trash2 size={14} className="text-[var(--error)]" />
          </Button>
        </div>
      </div>
      
      <h3 className="font-semibold text-[var(--text-primary)] mb-2 line-clamp-1">{entry.title}</h3>
      <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-4 flex-1">
        {entry.content}
      </p>
      
      <div className="mt-auto pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={entry.isActive ? "status-open" : "status-closed"}>{entry.category ?? (entry.isActive ? "Active" : "Inactive")}</Badge>
        </div>
        <span className="text-xs text-[var(--text-muted)]">
          {entry.updatedAt ? new Date(entry.updatedAt).toLocaleDateString() : "Not synced"}
        </span>
      </div>
    </Card>
  );
}
