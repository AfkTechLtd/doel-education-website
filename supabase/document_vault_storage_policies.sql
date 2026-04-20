-- Document Vault storage setup
-- Phase 1 recommendation: use a single `documents` bucket.
-- Storage path convention used by the app:
-- students/{auth.uid()}/{documentId}/{fileName}

insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

create policy "Students can upload their own vault files"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'documents'
  and (storage.foldername(name))[1] = 'students'
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "Students can view their own vault files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'documents'
  and (storage.foldername(name))[1] = 'students'
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "Students can delete their own vault files"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'documents'
  and (storage.foldername(name))[1] = 'students'
  and (storage.foldername(name))[2] = auth.uid()::text
);
