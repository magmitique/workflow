'use client';

import { useState } from 'react';
import { Shield, Plus, Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '@/hooks/use-users';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DeleteConfirmDialog } from '@/components/admin/delete-confirm-dialog';
import { toast } from 'sonner';
import { PASSWORD_RULES } from '@apio/shared';
import type { User, UserRole } from '@apio/shared';

// ── Create / Edit Dialog ──

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  user?: User | null;
  currentUserId?: string;
}

function checkPasswordRules(value: string) {
  return PASSWORD_RULES.patterns.map((rule) => ({
    label: rule.label,
    valid: rule.regex.test(value),
  }));
}

function UserFormDialog({ open, onClose, user, currentUserId }: UserFormDialogProps) {
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const isEdit = !!user;
  const isSelf = isEdit && user.id === currentUserId;

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [role, setRole] = useState<UserRole>(user?.role ?? 'ADMIN');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function resetAndClose() {
    setName('');
    setEmail('');
    setRole('ADMIN');
    setPassword('');
    setError('');
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    try {
      // Vérification de la complexité du mot de passe
      const needsPassword = !isEdit || password.length > 0;
      if (needsPassword && password.length > 0) {
        const rules = checkPasswordRules(password);
        const failedRules = rules.filter((r) => !r.valid);
        if (password.length < PASSWORD_RULES.minLength || failedRules.length > 0) {
          setError('Le mot de passe ne respecte pas les critères de sécurité.');
          return;
        }
      }

      if (isEdit) {
        await updateMutation.mutateAsync({
          id: user.id,
          data: {
            name,
            email,
            ...(isSelf ? {} : { role }),
            ...(password ? { password } : {}),
          },
        });
        toast.success('Administrateur modifié');
      } else {
        if (!password) {
          setError('Le mot de passe est requis.');
          return;
        }
        await createMutation.mutateAsync({ name, email, role, password });
        toast.success('Administrateur créé');
      }
      resetAndClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) resetAndClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Modifier' : 'Nouvel'} administrateur</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Modifiez les informations de l'administrateur."
              : 'Créez un nouveau compte administrateur.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user-name">Nom</Label>
            <Input id="user-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-email">Email</Label>
            <Input
              id="user-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-role">Rôle</Label>
            <Select value={role} onValueChange={(v) => setRole(v as UserRole)} disabled={isSelf}>
              <SelectTrigger id="user-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              </SelectContent>
            </Select>
            {isSelf && (
              <p className="text-xs text-muted-foreground">
                Vous ne pouvez pas modifier votre propre rôle.
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-password">
              Mot de passe{isEdit ? ' (laisser vide pour ne pas changer)' : ''}
            </Label>
            <Input
              id="user-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!isEdit}
              autoComplete="new-password"
            />
            {password.length > 0 && (
              <ul className="space-y-0.5 text-xs">
                <li
                  className={
                    password.length >= PASSWORD_RULES.minLength
                      ? 'text-green-600'
                      : 'text-muted-foreground'
                  }
                >
                  {password.length >= PASSWORD_RULES.minLength ? '\u2713' : '\u2022'} Au moins{' '}
                  {PASSWORD_RULES.minLength} caractères
                </li>
                {checkPasswordRules(password).map((rule) => (
                  <li
                    key={rule.label}
                    className={rule.valid ? 'text-green-600' : 'text-muted-foreground'}
                  >
                    {rule.valid ? '\u2713' : '\u2022'} {rule.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={resetAndClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Enregistrement...' : isEdit ? 'Modifier' : 'Créer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Skeletons ──

function TableRowSkeleton() {
  return (
    <TableRow>
      {Array.from({ length: 5 }, (_, i) => (
        <TableCell key={i}>
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </TableCell>
      ))}
    </TableRow>
  );
}

// ── Page ──

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const { data: users, isLoading } = useUsers();
  const deleteMutation = useDeleteUser();

  const [formOpen, setFormOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openCreate() {
    setEditUser(null);
    setFormOpen(true);
  }

  function openEdit(user: User) {
    setEditUser(user);
    setFormOpen(true);
  }

  async function handleDelete() {
    if (!deleteId) return;
    deleteMutation.reset();
    try {
      await deleteMutation.mutateAsync(deleteId);
      toast.success('Administrateur supprimé');
      setDeleteId(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-6">
        <div>
          <h1 className="text-2xl font-bold">Administrateurs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gérez les comptes administrateurs du back-office.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="mr-2 size-4" />
          Ajouter
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Date de création</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 3 }, (_, i) => (
                  <TableRowSkeleton key={i} />
                ))}
              </TableBody>
            </Table>
          ) : users && users.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Date de création</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const isSelf = user.id === currentUser?.id;
                  return (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.name}
                        {isSelf && (
                          <Badge variant="secondary" className="ml-2">
                            Vous
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'SUPER_ADMIN' ? 'default' : 'outline'}>
                          {user.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(user)}>
                            <Pencil className="size-4" />
                            <span className="sr-only">Modifier</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={isSelf}
                            onClick={() => setDeleteId(user.id)}
                          >
                            <Trash2 className="size-4" />
                            <span className="sr-only">Supprimer</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Shield className="size-10 text-muted-foreground/30" />
              <p className="mt-3 text-sm font-medium">Aucun administrateur</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create / Edit dialog */}
      <UserFormDialog
        key={editUser?.id ?? 'create'}
        open={formOpen}
        onClose={() => setFormOpen(false)}
        user={editUser}
        currentUserId={currentUser?.id}
      />

      {/* Delete confirm */}
      <DeleteConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        mutation={deleteMutation}
        title="Supprimer cet administrateur ?"
        description="Cette action est irréversible. Le compte sera définitivement supprimé."
      />
    </div>
  );
}
