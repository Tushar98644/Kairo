'use client'

import { ShiftCard } from "@/components/card/shift-card";
import { ShoppingCart } from "lucide-react";

const MyPage = () => {
  const cardActions = [
    {
      label: "Post on Twitter",
      icon: ShoppingCart,
      onClick: () => alert("Posting to Twitter!"),
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <ShiftCard
        className="bg-card dark:bg-[#1A1A1A]"
        title="Screen Capture"
        titleIcon={
          <svg width="1em" height="1em" viewBox="0 0 54 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          </svg>
        }
        mainImageSrc="/basic-img.png"
        mainImageAlt="Basic image"
        bottomTitle="Share your work"
        bottomTitleIcon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 430 390" fill="#1185fd" aria-hidden="true" width="1em" height="1em">
          </svg>
        }
        bottomDescription={
          <>
            Share your image to build that audience. Inspired by{" "}
          </>
        }
        actions={cardActions}
      />
    </div>
  );
};

export default MyPage;