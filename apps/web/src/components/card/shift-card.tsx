"use client";

import * as React from "react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Action {
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
}

interface ShiftCardProps
  extends Omit<MotionProps, "onAnimationStart" | "onAnimationComplete"> {
  className?: string;
  title: string;
  titleIcon: React.ReactNode;
  mainImageSrc: string;
  mainImageAlt: string;
  bottomTitle: string;
  bottomTitleIcon: React.ReactNode;
  bottomDescription: React.ReactNode;
  actions: Action[];
}

const ShiftCard = React.forwardRef<HTMLDivElement, ShiftCardProps>(
  (
    {
      className,
      title,
      titleIcon,
      mainImageSrc,
      mainImageAlt,
      bottomTitle,
      bottomTitleIcon,
      bottomDescription,
      actions,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setHovered] = React.useState(false);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);
    const handleTapStart = () => setHovered(true);
    const handleTapCancel = () => setHovered(false);
    const handleTap = () => setHovered(false);

    const contentMotionProps: MotionProps = {
      initial: { opacity: 0, height: 0 },
      animate: isHovered
        ? { opacity: 1, height: 220 }
        : { opacity: 1, height: 37 },
      transition: { duration: 0.3, delay: 0.1, ease: "circIn" },
    };

    return (
      <motion.div 
        ref={ref}
        className={cn(
          "rounded-2xl bg-white dark:bg-zinc-900 p-2 shadow-sm border border-zinc-200 dark:border-zinc-800",
          "hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300",
          className,
        )}
        {...props} 
      >
        <motion.div
          className={cn(
            "min-h-[240px] md:min-h-[340px] ",
            "group relative flex flex-col items-center justify-between overflow-hidden rounded-xl p-3",
            "hover:cursor-pointer bg-zinc-50 dark:bg-zinc-800/50",
            "border border-zinc-100 dark:border-zinc-800",
            "shadow-sm hover:shadow-md transition-all duration-300",
          )}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTapStart={handleTapStart}
          onTapCancel={handleTapCancel}
          onTap={handleTap}
        >
          {/* Header Section */}
          <div className="flex w-full flex-col relative">
            <div className="w-full">
              <div className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-inner">
                <h3 className="text-xs font-semibold p-4 flex items-center gap-2 text-zinc-900 dark:text-zinc-100 tracking-tight">
                  {titleIcon}
                  {title}
                </h3>
              </div>
              <AnimatePresence>
                {isHovered && (
                  <>
                    <motion.img
                      transition={{ duration: 0.3, ease: "circIn" }}
                      src={mainImageSrc}
                      layoutId="img"
                      width={78}
                      height={100}
                      alt={mainImageAlt}
                      className="rounded-lg absolute top-1.5 right-2 shadow-lg border border-zinc-200 dark:border-zinc-700"
                    />
                    <motion.div
                      className="h-[50px] w-[82px] absolute top-[4px] right-[6px] bg-transparent border-2 rounded-lg border-dashed border-zinc-400 dark:border-zinc-500 ml-auto mb-[6px]"
                      initial={{
                        opacity: 0,
                        scale: 1.6,
                        y: 0,
                        filter: "blur(4px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                        transition: { delay: 0.35, duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        y: 100,
                        filter: "blur(4px)",
                        transition: { delay: 0.0, duration: 0 },
                      }}
                    />
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Middle Content (Image) */}
          <div className="pb-9">
            <AnimatePresence>
              {!isHovered && (
                <motion.img
                  src={mainImageSrc}
                  layoutId="img"
                  width={300}
                  height={220}
                  alt={mainImageAlt}
                  className="rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 object-cover"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Content Section */}
          <motion.div
            key="shift-card-content"
            {...contentMotionProps}
            className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 rounded-xl"
          >
            <motion.div className="flex w-full flex-col gap-1">
              <div className="pb-0">
                <div className="flex w-full flex-col gap-1 bg-zinc-900 dark:bg-zinc-800 border-t border-zinc-700 rounded-t-xl px-4 pb-8 shadow-lg">
                  <div className="font-sans text-xs font-semibold text-white flex gap-1 pt-3 items-center tracking-tight">
                    {bottomTitleIcon}
                    <p>{bottomTitle}</p>
                  </div>
                  <div className="w-full text-pretty text-xs font-medium leading-relaxed text-zinc-300 pb-3 tracking-tight">
                    {bottomDescription}
                  </div>

                  <div className="bg-zinc-800/50 dark:bg-zinc-700/50 px-2 py-2 rounded-xl flex flex-col gap-2 border border-zinc-700 dark:border-zinc-600">
                    {actions.map((action, index) => (
                      <Button 
                        key={index} 
                        size="sm"
                        className={cn(
                          "w-full text-xs font-semibold flex items-center justify-center transition-all duration-300 tracking-tight",
                          "shadow-sm hover:shadow-md",
                          // Primary action (first button) - Rose gradient like Kokonut UI
                          index === 0 && "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 shadow-rose-500/20 hover:shadow-rose-500/30",
                          // Secondary actions - Zinc outline
                          index > 0 && "bg-transparent border border-zinc-600 text-zinc-300 hover:bg-zinc-700 hover:text-white hover:border-zinc-500"
                        )}
                        onClick={action.onClick}
                      >
                        <action.icon className="w-3 h-3 mr-1.5" />
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  },
);

ShiftCard.displayName = "ShiftCard";

export { ShiftCard };