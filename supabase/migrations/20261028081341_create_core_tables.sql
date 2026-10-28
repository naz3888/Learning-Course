/*
# Create core tables for Akademi AI learning platform

1. New Tables
- `courses` — Stores all course catalog entries (store courses). JSONB column holds the full StoreCourse object to preserve the rich nested structure (instructor, skills, includes, lessons, etc.).
  - id (text, primary key) — same as StoreCourse.id (e.g. 'course-tahap-1')
  - data (jsonb, not null) — full StoreCourse object
  - created_at (timestamptz)
  - updated_at (timestamptz)
- `modules` — Stores curriculum modules (Modul 1, 2, etc.). JSONB holds the full Module object including nested lessons.
  - id (text, primary key) — same as Module.id (e.g. 'mod-1-1')
  - data (jsonb, not null) — full Module object
  - created_at (timestamptz)
- `user_progress` — Stores per-user learning progress (completed lessons, quiz scores, notes, enrolled courses, membership). Uses a pseudo-user key since the app has no Supabase auth.
  - id (text, primary key) — pseudo user identifier (e.g. 'local-user')
  - data (jsonb, not null) — full UserProgress object
  - updated_at (timestamptz)
- `forum_comments` — Stores ChatClub forum comments/replies.
  - id (uuid, primary key)
  - lesson_id (text, nullable) — associated lesson
  - author (text, not null)
  - role (text, not null) — 'Pelajar' | 'Tenaga Pengajar' | 'Moderator'
  - avatar (text, nullable)
  - content (text, not null)
  - category (text, not null)
  - likes (int, default 0)
  - is_pinned (boolean, default false)
  - parent_id (uuid, nullable) — for replies
  - created_at (timestamptz)

2. Security
- Enable RLS on all tables.
- Grant CRUD to anon + authenticated on all tables (single-tenant app, no Supabase auth sign-in screen — admin login is hardcoded in the frontend).
- Allow anon + authenticated full CRUD because the data is intentionally shared/public across all users of this learning platform.

3. Important Notes
- The app uses a hardcoded admin login (admin@akademiai.my / admin123) in the frontend, NOT Supabase Auth. So all policies use anon, authenticated.
- Courses and modules are stored as JSONB to preserve the complex nested TypeScript interfaces without flattening.
- user_progress uses a single row keyed by a pseudo user id, since there is no auth.users integration.
*/

CREATE TABLE IF NOT EXISTS courses (
  id text PRIMARY KEY,
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON courses TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_courses" ON courses;
CREATE POLICY "anon_select_courses" ON courses FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_courses" ON courses;
CREATE POLICY "anon_insert_courses" ON courses FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_courses" ON courses;
CREATE POLICY "anon_update_courses" ON courses FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_courses" ON courses;
CREATE POLICY "anon_delete_courses" ON courses FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS modules (
  id text PRIMARY KEY,
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE modules ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON modules TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_modules" ON modules;
CREATE POLICY "anon_select_modules" ON modules FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_modules" ON modules;
CREATE POLICY "anon_insert_modules" ON modules FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_modules" ON modules;
CREATE POLICY "anon_update_modules" ON modules FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_modules" ON modules;
CREATE POLICY "anon_delete_modules" ON modules FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS user_progress (
  id text PRIMARY KEY,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON user_progress TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_user_progress" ON user_progress;
CREATE POLICY "anon_select_user_progress" ON user_progress FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_user_progress" ON user_progress;
CREATE POLICY "anon_insert_user_progress" ON user_progress FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_user_progress" ON user_progress;
CREATE POLICY "anon_update_user_progress" ON user_progress FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_user_progress" ON user_progress;
CREATE POLICY "anon_delete_user_progress" ON user_progress FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS forum_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id text,
  author text NOT NULL,
  role text NOT NULL DEFAULT 'Pelajar',
  avatar text,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'Bincang Umum',
  likes integer NOT NULL DEFAULT 0,
  is_pinned boolean NOT NULL DEFAULT false,
  parent_id uuid,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON forum_comments TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_forum" ON forum_comments;
CREATE POLICY "anon_select_forum" ON forum_comments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_forum" ON forum_comments;
CREATE POLICY "anon_insert_forum" ON forum_comments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_forum" ON forum_comments;
CREATE POLICY "anon_update_forum" ON forum_comments FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_forum" ON forum_comments;
CREATE POLICY "anon_delete_forum" ON forum_comments FOR DELETE
  TO anon, authenticated USING (true);
