"use client";
import { useState } from "react";
import UploadForm from "@/components/upload-form";
import Feed from "@/components/feed";
import { LoginWindow } from "@/components/login-window";
import { useFarcasterIdentity } from "@/utils/use-farcaster-identity";
import type { FarcasterUser } from "@/utils/types/farcaster-user";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Nav } from "@/components/nav";

export default function Page({}: {
  searchParams: Record<string, string>;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const [channel, setChannel] = useState(
    "https://warpcast.com/~/channel/events",
  );

  const { farcasterUser, loading, startFarcasterSignerProcess, logout } =
    useFarcasterIdentity();

  return (
    <div className="flex flex-col min-h-screen w-full bg-white items-center sm:px-0 px-3 gap-6 mb-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <Nav setChannel={setChannel} />
        <Separator className="sm:w-[500px] w-sm" />
        <DialogTrigger asChild>
        </DialogTrigger>
        <Feed channel={channel} setChannel={setChannel} />
        <DialogContent className="sm:max-w-[425px] max-w-[375px]">
          {farcasterUser?.status === "approved" ? (
            <UploadForm farcasterUser={farcasterUser as FarcasterUser} />
          ) : (
            <LoginWindow
              farcasterUser={farcasterUser}
              loading={loading}
              startFarcasterSignerProcess={startFarcasterSignerProcess}
              logout={logout}
            ></LoginWindow>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
