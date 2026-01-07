"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import * as IconsList from "@/components/icons";
import { cn } from "@/lib/utils";

interface LoginFormProps extends React.ComponentProps<"div"> {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isLoading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({
  className,
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  error,
  onSubmit,
  ...props
}: LoginFormProps) {
  const LogoIcon =
    (IconsList as any).Icons?.logo || (IconsList as any).Icons || null;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 shadow-xl border-muted/40">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                {LogoIcon ? (
                  <LogoIcon className="h-10 w-10 text-primary mb-2" />
                ) : (
                  <div className="h-10 w-10 bg-primary rounded-full mb-2" />
                )}

                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-sm">
                  Login to your ResourceIQ account
                </p>
              </div>

              {error && (
                <div className="p-3 text-xs text-red-500 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-xs underline hover:text-primary"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Login"}
              </Button>
            </div>
          </form>

          <div className="bg-muted relative hidden md:flex items-center justify-center">
            <div className="text-muted-foreground text-sm italic p-8 text-center">
              ResourceIQ: Intelligent Task Allocation
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
