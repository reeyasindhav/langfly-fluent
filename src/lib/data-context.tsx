import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./auth-context";

export interface RoadmapUnit {
  id: string;
  title: string;
  totalModules: number;
  completedModules: number;
  status: "locked" | "upcoming" | "in-progress" | "completed";
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  language: string;
  example?: string;
  status: "new" | "learning" | "review" | "mastered";
  dueInDays: number;
}

export interface Challenge {
  id: string;
  title: string;
  xp: number;
  completed: boolean;
  type: "recall" | "listen" | "speak" | "book";
}

export interface Tutor {
  id: string;
  name: string;
  language: string;
  level: string;
  rating: number;
  slots: string[];
  avatarColor: string;
}

export interface Booking {
  id: string;
  tutorId: string;
  tutorName: string;
  slot: string;
  status: "upcoming" | "completed";
}

export interface AppData {
  streak: number;
  longestStreak: number;
  xp: number;
  level: string;
  wordsKnown: number;
  speakingMinutes: number;
  recallRate: number;
  confidence: number;
  units: RoadmapUnit[];
  flashcards: Flashcard[];
  challenges: Challenge[];
  tutors: Tutor[];
  bookings: Booking[];
  weeklyActivity: number[];
}

interface DataContextValue {
  data: AppData;
  updateData: (patch: Partial<AppData> | ((prev: AppData) => AppData)) => void;
  completeChallenge: (id: string) => void;
  rateFlashcard: (id: string, rating: "again" | "good" | "easy") => void;
  bookSession: (tutorId: string, slot: string) => void;
  cancelBooking: (id: string) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

function makeInitialData(): AppData {
  return {
    streak: 12,
    longestStreak: 18,
    xp: 1240,
    level: "B1",
    wordsKnown: 1284,
    speakingMinutes: 192,
    recallRate: 94,
    confidence: 7.2,
    units: [
      {
        id: "u1",
        title: "Greetings & Small Talk",
        totalModules: 12,
        completedModules: 12,
        status: "completed",
      },
      {
        id: "u2",
        title: "Ordering & Dining Out",
        totalModules: 12,
        completedModules: 7,
        status: "in-progress",
      },
      {
        id: "u3",
        title: "Travel & Directions",
        totalModules: 14,
        completedModules: 0,
        status: "upcoming",
      },
      {
        id: "u4",
        title: "Workplace & Meetings",
        totalModules: 10,
        completedModules: 0,
        status: "locked",
      },
      {
        id: "u5",
        title: "Describing People & Places",
        totalModules: 12,
        completedModules: 0,
        status: "locked",
      },
      {
        id: "u6",
        title: "Opinions & Debates",
        totalModules: 10,
        completedModules: 0,
        status: "locked",
      },
    ],
    flashcards: [
      {
        id: "f1",
        front: "la bibliothèque",
        back: "the library",
        language: "French",
        example: "Je vais à la bibliothèque.",
        status: "review",
        dueInDays: 2,
      },
      {
        id: "f2",
        front: "el aeropuerto",
        back: "the airport",
        language: "Spanish",
        example: "El aeropuerto está lejos.",
        status: "learning",
        dueInDays: 0,
      },
      {
        id: "f3",
        front: "die Rechnung",
        back: "the bill / check",
        language: "German",
        example: "Die Rechnung, bitte.",
        status: "review",
        dueInDays: 1,
      },
      {
        id: "f4",
        front: "il tavolo",
        back: "the table",
        language: "Italian",
        example: "Il tavolo vicino alla finestra.",
        status: "mastered",
        dueInDays: 5,
      },
      {
        id: "f5",
        front: "pleuvoir",
        back: "to rain",
        language: "French",
        example: "Il va pleuvoir demain.",
        status: "new",
        dueInDays: 0,
      },
    ],
    challenges: [
      { id: "c1", title: "Recall 10 dining words", xp: 10, completed: true, type: "recall" },
      { id: "c2", title: "Read one news short", xp: 15, completed: true, type: "listen" },
      { id: "c3", title: "Book a 10-min speaking slot", xp: 25, completed: false, type: "book" },
      { id: "c4", title: "Speak for 2 minutes straight", xp: 20, completed: false, type: "speak" },
      { id: "c5", title: "Review 5 overdue cards", xp: 10, completed: false, type: "recall" },
    ],
    tutors: [
      {
        id: "t1",
        name: "Elena",
        language: "Spanish",
        level: "B1 friendly",
        rating: 4.9,
        slots: ["Today, 16:00", "Tomorrow, 10:30", "Tomorrow, 18:00"],
        avatarColor: "bg-coral",
      },
      {
        id: "t2",
        name: "Marco",
        language: "Italian",
        level: "A2–B2",
        rating: 4.8,
        slots: ["Today, 17:00", "Tomorrow, 09:00", "Fri, 11:00"],
        avatarColor: "bg-mint",
      },
      {
        id: "t3",
        name: "Sophie",
        language: "French",
        level: "A1–C1",
        rating: 5.0,
        slots: ["Today, 15:00", "Tomorrow, 14:00", "Sat, 10:00"],
        avatarColor: "bg-lemon",
      },
    ],
    bookings: [],
    weeklyActivity: [40, 55, 70, 60, 90, 100, 20],
  };
}

function storageKey(userId: string | null) {
  return userId ? `langfly_data_${userId}` : "langfly_data_guest";
}

export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [data, setData] = useState<AppData>(makeInitialData());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const key = storageKey(user?.id ?? null);
    const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as AppData;
        setData({ ...makeInitialData(), ...parsed });
      } catch {
        setData(makeInitialData());
      }
    } else {
      setData(makeInitialData());
    }
    setReady(true);
  }, [user?.id]);

  useEffect(() => {
    if (!ready) return;
    const key = storageKey(user?.id ?? null);
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [data, user?.id, ready]);

  const updateData = (patch: Partial<AppData> | ((prev: AppData) => AppData)) => {
    setData((prev) => (typeof patch === "function" ? patch(prev) : { ...prev, ...patch }));
  };

  const completeChallenge = (id: string) => {
    updateData((prev) => {
      const challenge = prev.challenges.find((c) => c.id === id);
      if (!challenge || challenge.completed) return prev;
      return {
        ...prev,
        xp: prev.xp + challenge.xp,
        challenges: prev.challenges.map((c) => (c.id === id ? { ...c, completed: true } : c)),
      };
    });
  };

  const rateFlashcard = (id: string, rating: "again" | "good" | "easy") => {
    updateData((prev) => {
      const xpGain = rating === "again" ? 0 : rating === "good" ? 5 : 10;
      const wordsKnown = rating === "easy" ? prev.wordsKnown + 1 : prev.wordsKnown;
      return {
        ...prev,
        xp: prev.xp + xpGain,
        wordsKnown,
        flashcards: prev.flashcards.map((f) =>
          f.id === id
            ? {
                ...f,
                status: rating === "again" ? "learning" : rating === "good" ? "review" : "mastered",
                dueInDays: rating === "again" ? 0 : rating === "good" ? 2 : 5,
              }
            : f,
        ),
      };
    });
  };

  const bookSession = (tutorId: string, slot: string) => {
    updateData((prev) => {
      const tutor = prev.tutors.find((t) => t.id === tutorId);
      if (!tutor) return prev;
      const booking: Booking = {
        id: `b_${Date.now()}`,
        tutorId,
        tutorName: tutor.name,
        slot,
        status: "upcoming",
      };
      return {
        ...prev,
        bookings: [booking, ...prev.bookings],
        tutors: prev.tutors.map((t) =>
          t.id === tutorId ? { ...t, slots: t.slots.filter((s) => s !== slot) } : t,
        ),
        xp: prev.xp + 25,
      };
    });
  };

  const cancelBooking = (id: string) => {
    updateData((prev) => {
      const booking = prev.bookings.find((b) => b.id === id);
      if (!booking) return prev;
      return {
        ...prev,
        bookings: prev.bookings.filter((b) => b.id !== id),
        tutors: prev.tutors.map((t) =>
          t.id === booking.tutorId ? { ...t, slots: [...t.slots, booking.slot] } : t,
        ),
      };
    });
  };

  return (
    <DataContext.Provider
      value={{ data, updateData, completeChallenge, rateFlashcard, bookSession, cancelBooking }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
