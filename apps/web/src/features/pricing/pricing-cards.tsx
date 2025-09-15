"use client";

import NumberFlow from "@number-flow/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ArrowRight, BadgeCheck } from "lucide-react";
import React, { useRef, useState } from "react";

const plans = [
    {
    id: "spark",
    name: "Spark",
    price: {
      monthly: "Free forever",
      yearly: "Free forever",
    },
    description:
      "For hobbyists and creators starting their journey. Bring your first ideas to life.",
    features: [
      "10,000 AI Words / month",
      "Standard AI Models",
      "5 AI Image Generations / month",
      "1 Project Workspace",
      "Community Support",
    ],
    cta: "Start for Free",
  },
  {
    id: "aura",
    name: "Aura",
    price: {
      monthly: 15,
      yearly: 12,
    },
    description:
      "For professionals and power users who need advanced tools and unlimited creation.",
    features: [
      "Unlimited AI Words",
      "Advanced AI Models (Kairo Pro)",
      "100 High-Quality Image Generations / month",
      "Multiple Project Workspaces",
      "Plagiarism Checker",
      "Priority Support",
    ],
    cta: "Upgrade to Aura",
    popular: true,
  },
  {
    id: "visionary",
    name: "Visionary",
    price: {
      monthly: "Let's Talk",
      yearly: "Let's Talk",
    },
    description:
      "For teams and businesses requiring custom solutions, collaboration, and dedicated support.",
    features: [
      "Everything in Aura, plus:",
      "Team Collaboration Tools",
      "Custom AI Model Training",
      "Dedicated Account Manager",
      "Advanced Security & SSO",
    ],
    cta: "Contact Sales",
  },
];

const PricingCard = ({ plan, frequency }: { plan: typeof plans[0], frequency: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <Card
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        // The `relative` class allows the badge to be positioned correctly
        "relative flex w-full flex-col justify-between text-left transition-all duration-300 ease-in-out hover:border-primary/60",
        // REMOVED `overflow-hidden` which was clipping the badge
        plan.popular ? "border-2 border-primary" : "border border-border"
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(168,85,247,.1), transparent 40%)`,
        }}
      />
      {plan.popular && (
        // The `z-10` ensures the badge is on top of other card content
        <Badge className="absolute top-0 right-4 z-10 -translate-y-1/2 rounded-full px-3 py-1 text-sm">
          Most Popular
        </Badge>
      )}
      <div>
        <CardHeader>
          <CardTitle className="font-medium text-xl">{plan.name}</CardTitle>
          <CardDescription className="pt-2 min-h-[7rem]">
            {plan.description}
            <div className="mt-4 flex items-baseline gap-1">
              {typeof plan.price[frequency as keyof typeof plan.price] === "number" ? (
                <>
                  <NumberFlow
                    className="text-4xl font-bold text-foreground"
                    value={plan.price[frequency as keyof typeof plan.price] as number}
                    format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
                  />
                  <span className="text-sm text-muted-foreground">/ month</span>
                </>
              ) : (
                <span className="text-2xl font-bold text-foreground">
                  {plan.price[frequency as keyof typeof plan.price]}
                </span>
              )}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {plan.features.map((feature, index) => (
            <div
              className="flex items-center gap-3 text-sm text-muted-foreground"
              key={index}
            >
              <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
              {feature}
            </div>
          ))}
        </CardContent>
      </div>
      <CardFooter>
        <Button
          className="w-full"
          variant={plan.popular ? "default" : "secondary"}
        >
          {plan.cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};


export const PricingCards = () => {
  const [frequency, setFrequency] = useState<string>("monthly");

  return (
    <div className="flex w-full flex-col items-center gap-8 text-center">
      <Tabs defaultValue={frequency} onValueChange={setFrequency}>
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">
            Yearly
            <Badge variant="secondary" className="ml-2 text-xs">20% off</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4 grid w-full max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} frequency={frequency} />
        ))}
      </div>
    </div>
  );
};