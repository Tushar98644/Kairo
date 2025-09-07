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
        ? { opacity: 1, height: 140 }
        : { opacity: 1, height: 38 },
      transition: { duration: 0.3, delay: 0.1, ease: "circIn" },
    };

    return (
      <motion.div ref={ref}
        className={cn(
          "rounded-[24px] bg-neutral-50 p-2 no-underline shadow-sm transition-colors hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-800/80 ",
          "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
          "shadow-[rgba(17,24,28,0.08)_0_0_0_1px,rgba(17,24,28,0.08)_0_1px_2px_-1px,rgba(17,24,28,0.04)_0_2px_4px]",
          "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]",
          className,
        )}
        {...props} >
        <motion.div
          ref={ref}
          className={cn(
            "min-h-[240px] w-[280px] md:min-h-[340px] md:w-[300px]",
            "group relative flex flex-col items-center justify-between overflow-hidden rounded-xl p-3 text-sm",
            "hover:cursor-pointer bg-card",
            "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
            "dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]",
            className,
          )}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTapStart={handleTapStart}
          onTapCancel={handleTapCancel}
          onTap={handleTap}
          {...props} >
          {/* Header Section */}
          <div className="flex w-full flex-col relative text-primary-foreground">
            <div className="w-full">
              <div className="bg-accent/90 rounded-md text-primary shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]">
                <h3 className="text-lg p-4 flex items-center gap-2">
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
                      className="rounded-sm absolute top-1.5 right-2 shadow-lg"
                    />
                    <motion.div
                      className="h-[50px] w-[82px] absolute top-[4px] right-[6px] bg-transparent border-[2px] rounded-br-sm rounded-sm border-neutral-800/80 dark:border-neutral-200/80 border-dashed ml-auto mb-[6px] dark:mb-[3px]"
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
          <div className="pb-10">
            <AnimatePresence>
              {!isHovered && (
                <motion.img
                  src={mainImageSrc}
                  layoutId="img"
                  width={300}
                  height={200}
                  alt={mainImageAlt}
                  className="rounded-sm border-2 border-white dark:border-black"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Content Section */}
          <motion.div
            key="shift-card-content"
            {...contentMotionProps}
            className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 rounded-xl" >
            <motion.div className="flex w-full flex-col gap-1">
              <div className="pb-0">
                <div className="flex w-full flex-col gap-1 bg-primary/90 border-t border-t-black/10 rounded-t-lg px-4 pb-8">
                  <div className="font-sans text-[14px] font-medium text-white dark:text-[#171717] flex gap-1 pt-2.5 items-center">
                    {bottomTitleIcon}
                    <p>{bottomTitle}</p>
                  </div>
                  <div className="w-full text-pretty font-sans text-[13px] leading-4 text-neutral-200 dark:text-[#171717] pb-2">
                    {bottomDescription}
                  </div>

                  <div className="bg-accent/80 dark:bg-accent px-1 py-1 rounded-xl flex flex-col gap-1">
                    {actions.map((action, index) => (
                      <Button key={index} onClick={action.onClick}>
                        <action.icon className="w-4 h-4 mr-2" />
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
