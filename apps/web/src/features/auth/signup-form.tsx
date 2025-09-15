"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Icons } from "@/components/global/icons"; 

export function SignUpForm() {
  return (
    <SignUp.Root>
      <Clerk.Loading>
        {(isGlobalLoading) => (
          <SignUp.Step name="start">
            <div className="flex w-full flex-col items-center gap-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-medium tracking-tight">
                  Create your Kairo account
                </h2>
                <p className="mt-1 text-muted-foreground">
                  Start your creative journey with us.
                </p>
              </div>

              {/* Social Logins */}
              <div className="flex w-full flex-col gap-2">
                <Clerk.Connection name="google" asChild>
                  <Button variant="outline" disabled={isGlobalLoading}>
                    <Clerk.Loading scope="provider:google">
                      {(isLoading) =>
                        isLoading ? (
                          <Spinner />
                        ) : (
                          <>
                            <Icons.google />
                            <span className="ml-2">Continue with Google</span>
                          </>
                        )
                      }
                    </Clerk.Loading>
                  </Button>
                </Clerk.Connection>

                <Clerk.Connection name="github" asChild>
                  <Button variant="outline" disabled={isGlobalLoading}>
                    <Clerk.Loading scope="provider:github">
                      {(isLoading) =>
                        isLoading ? (
                          <Spinner />
                        ) : (
                          <>
                            <Icons.github />
                            <span className="ml-2">Continue with Github</span>
                          </>
                        )
                      }
                    </Clerk.Loading>
                  </Button>
                </Clerk.Connection>
              </div>
            </div>
          </SignUp.Step>
        )}
      </Clerk.Loading>
    </SignUp.Root>
  );
}