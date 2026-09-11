import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useAuth } from "../lib/auth-context";
import { useRouter } from "@tanstack/react-router";
import { LogOut, ShieldCheck, ChefHat } from "lucide-react";

export interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}

export function SignOutDialog({ open, onOpenChange, onConfirm }: SignOutDialogProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirm = () => {
    setIsLoggingOut(true);
    if (onConfirm) {
      onConfirm();
    } else {
      logout();
      router.navigate({ to: "/" });
    }
    onOpenChange(false);
    setIsLoggingOut(false);
  };

  const userName = user?.name || "Learner";
  const userLang = user?.language || "Language";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md bg-[#fbf9f4] border border-[#e8e4dc] rounded-3xl p-6 sm:p-7 shadow-2xl animate-fade-up">
        <AlertDialogHeader className="sm:text-left text-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-11 rounded-2xl bg-[#d96b52]/10 text-[#d96b52] border border-[#d96b52]/20 flex items-center justify-center shrink-0">
              <LogOut className="size-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#d96b52] font-bold">
                Account Session
              </span>
              <AlertDialogTitle className="font-serif text-2xl font-bold text-[#163b2e] leading-tight">
                Step away from the kitchen?
              </AlertDialogTitle>
            </div>
          </div>

          <AlertDialogDescription className="text-sm text-[#556157] leading-relaxed pt-2">
            Are you sure you want to sign out,{" "}
            <strong className="text-[#163b2e]">{userName}</strong>?
          </AlertDialogDescription>

          <div className="rounded-2xl bg-[#f4f0e8] border border-[#e8e4dc] p-4 text-xs text-[#3b473e] space-y-2 mt-3">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="size-4 text-[#163b2e] shrink-0 mt-0.5" />
              <span className="leading-normal">
                Your <strong>{userLang}</strong> study streak, tasting progress, and pantry cards
                remain safely saved in the cloud.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <ChefHat className="size-4 text-[#163b2e] shrink-0 mt-0.5" />
              <span className="leading-normal">
                You can resume right where you left off at any time.
              </span>
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-5 sm:space-x-3 gap-2 sm:gap-0">
          <AlertDialogCancel
            disabled={isLoggingOut}
            className="rounded-full border border-[#e8e4dc] bg-white hover:bg-[#eae5da]/60 text-[#163b2e] font-semibold px-5 py-2.5 cursor-pointer h-auto"
          >
            Stay in the kitchen
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleConfirm();
            }}
            disabled={isLoggingOut}
            className="rounded-full bg-[#d96b52] hover:bg-[#c35941] text-white font-bold px-6 py-2.5 cursor-pointer shadow-xs border-0 h-auto inline-flex items-center justify-center gap-2"
          >
            <LogOut className="size-4" />
            <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
