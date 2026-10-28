import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { StoreCourse, Module, UserProgress } from '../types';
import { MODULES_DATA, STORE_COURSES } from '../data/coursesData';

const PROGRESS_ID = 'local-user';

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: ['les-1-1'],
  completedQuizzes: {},
  notes: {},
  userName: 'Ahmad Faiz bin Zulkifli',
  selectedLevel: 'level_1',
  enrolledCourses: ['course-tahap-1', 'course-prompt-crtf'],
};

interface DbResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useSupabaseCourses(): DbResult<StoreCourse[]> & {
  saveCourse: (course: StoreCourse) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  resetCourses: () => Promise<void>;
} {
  const [data, setData] = useState<StoreCourse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: rows, error: err } = await supabase
          .from('courses')
          .select('id, data')
          .order('created_at', { ascending: false });
        if (err) throw err;
        if (rows && rows.length > 0) {
          setData(rows.map((r: { id: string; data: StoreCourse }) => r.data as StoreCourse));
        } else {
          setData(STORE_COURSES);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load courses');
        setData(STORE_COURSES);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveCourse = useCallback(async (course: StoreCourse) => {
    const { error: err } = await supabase
      .from('courses')
      .upsert({ id: course.id, data: course, updated_at: new Date().toISOString() });
    if (err) console.error('Failed to save course:', err);
  }, []);

  const deleteCourse = useCallback(async (id: string) => {
    const { error: err } = await supabase.from('courses').delete().eq('id', id);
    if (err) console.error('Failed to delete course:', err);
  }, []);

  const resetCourses = useCallback(async () => {
    for (const course of STORE_COURSES) {
      await supabase
        .from('courses')
        .upsert({ id: course.id, data: course, updated_at: new Date().toISOString() });
    }
  }, []);

  return { data, loading, error, saveCourse, deleteCourse, resetCourses };
}

export function useSupabaseModules(): DbResult<Module[]> & {
  saveModule: (mod: Module) => Promise<void>;
  deleteModule: (id: string) => Promise<void>;
  resetModules: () => Promise<void>;
} {
  const [data, setData] = useState<Module[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: rows, error: err } = await supabase
          .from('modules')
          .select('id, data')
          .order('created_at', { ascending: true });
        if (err) throw err;
        if (rows && rows.length > 0) {
          setData(rows.map((r: { id: string; data: Module }) => r.data as Module));
        } else {
          setData(MODULES_DATA);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load modules');
        setData(MODULES_DATA);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveModule = useCallback(async (mod: Module) => {
    const { error: err } = await supabase
      .from('modules')
      .upsert({ id: mod.id, data: mod });
    if (err) console.error('Failed to save module:', err);
  }, []);

  const deleteModule = useCallback(async (id: string) => {
    const { error: err } = await supabase.from('modules').delete().eq('id', id);
    if (err) console.error('Failed to delete module:', err);
  }, []);

  const resetModules = useCallback(async () => {
    for (const mod of MODULES_DATA) {
      await supabase.from('modules').upsert({ id: mod.id, data: mod });
    }
  }, []);

  return { data, loading, error, saveModule, deleteModule, resetModules };
}

export function useSupabaseProgress(): DbResult<UserProgress> & {
  updateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
} {
  const [data, setData] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: row, error: err } = await supabase
          .from('user_progress')
          .select('data')
          .eq('id', PROGRESS_ID)
          .maybeSingle();
        if (err) throw err;
        if (row?.data) {
          setData(row.data as UserProgress);
        } else {
          setData(DEFAULT_PROGRESS);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load progress');
        setData(DEFAULT_PROGRESS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateProgress = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setData(prev => {
      if (!prev) return prev;
      const next = updater(prev);
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(async () => {
        const { error: err } = await supabase
          .from('user_progress')
          .upsert({ id: PROGRESS_ID, data: next, updated_at: new Date().toISOString() });
        if (err) console.error('Failed to save progress:', err);
      }, 800);
      return next;
    });
  }, []);

  return { data, loading, error, updateProgress };
}
