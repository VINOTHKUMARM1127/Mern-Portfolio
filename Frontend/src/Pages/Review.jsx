import { useEffect } from "react";
import { TbMessageStar } from "react-icons/tb";
import { motion, useReducedMotion } from "framer-motion";
import PageLayout from "../layouts/PageLayout";
import SectionHeader from "../components/ui/SectionHeader";
import ReviewForm from "../components/reviews/ReviewForm";

export default function Review() {
  const shouldReduceMotion = useReducedMotion();

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [shouldReduceMotion]);

  return (
    <PageLayout>
      <div className="pt-28 pb-20 relative overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Ambient atmospheric background glows */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-violet-600/10 via-cyan-500/10 to-transparent rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <SectionHeader
            badge="Share Feedback"
            badgeIcon={TbMessageStar}
            title="Leave a Review"
            subtitle="Thank you for taking the time to share your experience working with me. Your feedback is truly appreciated!"
          />

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.45,
              ease: "easeOut",
            }}
            className="w-full"
          >
            <ReviewForm />
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
