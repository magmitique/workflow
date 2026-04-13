'use client';

import type { UseMutationResult } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mutation: UseMutationResult<void, Error, string, unknown>;
  title: string;
  description: string;
}

export function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  mutation,
  title,
  description,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {mutation.isError && (
          <p className="text-sm text-destructive">
            Erreur lors de la suppression. Veuillez réessayer.
          </p>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={mutation.isPending}>
            {mutation.isPending ? 'Suppression...' : 'Supprimer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
