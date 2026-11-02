import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  TbStarFilled,
  TbStar,
  TbLoader2,
  TbSend,
  TbAlertCircle,
  TbArrowLeft,
  TbRefresh,
  TbShieldCheck,
} from "react-icons/tb";
import { validateReviewSpam } from "../../utils/reviewSpamRules.js";

const RATING_LABELS = {
  0: "Select a rating (1 to 5 stars)",
  1: "1 Star · Poor",
  2: "2 Stars · Fair",
  3: "3 Stars · Good",
  4: "4 Stars · Very good",
  5: "5 Stars · Excellent",
};

const MAX_CHARS = 800;

export default function ReviewForm() {
  const shouldReduceMotion = useReducedMotion();
  const mountTime = useRef(Date.now());
  const isSubmittingRef = useRef(false);
  const isTouchRef = useRef(false);
  const abortControllerRef = useRef(null);
  const progressTimerRef = useRef(null);

  // Field refs for error scrolling & focus
  const nameInputRef = useRef(null);
  const roleInputRef = useRef(null);
  const ratingGroupRef = useRef(null);
  const quoteInputRef = useRef(null);
  const successHeadingRef = useRef(null);

  // Form inputs (rating starts with NO star selected: 0)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    quote: "",
    feedbackNotes_hp: "", // Autofill-safe honeypot
  });
  const [rating, setRating] = useState(0);

  // UI states
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitProgressText, setSubmitProgressText] = useState("Submitting review...");
  const [serverError, setServerError] = useState("");
  const [isTimeoutOrNetworkError, setIsTimeoutOrNetworkError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState(null);

  // Turnstile state
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState(false);
  const [turnstileEl, setTurnstileEl] = useState(null);
  const turnstileWidgetIdRef = useRef(null);

  // Character counter for quote
  const charCount = formData.quote.length;

  // Active rating text
  const activeRating = hoverRating || rating;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (progressTimerRef.current) {
        clearTimeout(progressTimerRef.current);
      }
    };
  }, []);

  // Initialize Cloudflare Turnstile if sitekey exists
  const siteKey =
    import.meta.env.VITE_TURNSTILE_SITE_KEY ||
    (import.meta.env.DEV ? "1x00000000000000000000AA" : "");

  useEffect(() => {
    if (!siteKey || !turnstileEl) return;

    let isMounted = true;

    function renderWidget() {
      if (
        window.turnstile &&
        turnstileEl &&
        turnstileWidgetIdRef.current === null
      ) {
        try {
          turnstileWidgetIdRef.current = window.turnstile.render(
            turnstileEl,
            {
              sitekey: siteKey,
              theme: "dark",
              callback: (token) => {
                if (isMounted) {
                  setTurnstileToken(token);
                  setTurnstileError(false);
                }
              },
              "expired-callback": () => {
                if (isMounted) setTurnstileToken("");
              },
              "error-callback": () => {
                if (isMounted) {
                  setTurnstileToken("");
                  setTurnstileError(true);
                }
              },
            }
          );
        } catch (e) {
          console.warn("Turnstile render note:", e);
          if (isMounted) setTurnstileError(true);
        }
      }
    }

    if (!window.turnstile) {
      const existingScript = document.querySelector(
        'script[src*="challenges.cloudflare.com/turnstile"]'
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (isMounted) renderWidget();
        };
        script.onerror = () => {
          if (isMounted) setTurnstileError(true);
        };
        document.head.appendChild(script);
      } else {
        existingScript.addEventListener("load", () => {
          if (isMounted) renderWidget();
        });
        existingScript.addEventListener("error", () => {
          if (isMounted) setTurnstileError(true);
        });
      }
    } else {
      renderWidget();
    }

    return () => {
      isMounted = false;
      if (
        window.turnstile &&
        turnstileWidgetIdRef.current !== null
      ) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
          turnstileWidgetIdRef.current = null;
        } catch {
          // Ignore cleanup errors
        }
      }
      setTurnstileToken("");
    };
  }, [siteKey, turnstileEl]);

  // Client-side validation matching server rules
  const validate = useCallback(() => {
    const errs = {};
    const trimmedName = formData.name.trim();
    const trimmedRole = formData.role.trim();
    const trimmedQuote = formData.quote.trim();

    if (!trimmedName) {
      errs.name = "Full name is required.";
    } else if (trimmedName.length < 2) {
      errs.name = "Name must be at least 2 characters.";
    } else if (trimmedName.length > 80) {
      errs.name = "Name must be under 80 characters.";
    }

    if (!trimmedRole) {
      errs.role = "Designation or company is required.";
    } else if (trimmedRole.length < 2) {
      errs.role = "Designation / Company must be at least 2 characters.";
    } else if (trimmedRole.length > 100) {
      errs.role = "Designation / Company must be under 100 characters.";
    }

    if (!rating || rating < 1 || rating > 5) {
      errs.rating = "Please select a rating between 1 and 5 stars.";
    }

    if (!trimmedQuote) {
      errs.quote = "Review text is required.";
    } else if (trimmedQuote.length < 10) {
      errs.quote = "Review must be at least 10 characters.";
    } else if (trimmedQuote.length > MAX_CHARS) {
      errs.quote = `Review cannot exceed ${MAX_CHARS} characters.`;
    }

    // Shared spam and link check (links checked ONLY in quote; crypto/forex accepted)
    const spamCheck = validateReviewSpam({
      name: trimmedName,
      role: trimmedRole,
      quote: trimmedQuote,
    });
    if (!spamCheck.isValid) {
      errs.quote = spamCheck.error;
    }

    return errs;
  }, [formData, rating]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) {
      setServerError("");
      setIsTimeoutOrNetworkError(false);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: "" }));
    }
    if (serverError) {
      setServerError("");
      setIsTimeoutOrNetworkError(false);
    }
  };

  // Keyboard navigation for accessible star radio group
  const handleRatingKeyDown = (e) => {
    let nextRating = rating || 0;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      nextRating = Math.min(5, (rating || 0) + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      nextRating = Math.max(1, (rating || 2) - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      nextRating = 1;
    } else if (e.key === "End") {
      e.preventDefault();
      nextRating = 5;
    }

    if (nextRating !== rating && nextRating >= 1) {
      handleRatingChange(nextRating);
      const button = ratingGroupRef.current?.querySelector(
        `button[data-star="${nextRating}"]`
      );
      button?.focus();
    }
  };

  // Scroll to and focus the first invalid field
  const focusFirstError = (errs) => {
    const firstField = Object.keys(errs)[0];
    let target = null;

    if (firstField === "name") target = nameInputRef.current;
    else if (firstField === "role") target = roleInputRef.current;
    else if (firstField === "rating") target = ratingGroupRef.current;
    else if (firstField === "quote") target = quoteInputRef.current;

    if (target) {
      target.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "center",
      });
      target.focus();
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    // Prevent double-submit with ref lock
    if (isSubmittingRef.current) return;

    // Check Turnstile token if Turnstile is active
    if (siteKey && !turnstileToken) {
      setServerError("Please complete the security verification below before submitting.");
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      focusFirstError(validationErrors);
      return;
    }

    // Acquire lock
    isSubmittingRef.current = true;
    setSubmitting(true);
    setServerError("");
    setIsTimeoutOrNetworkError(false);
    setSubmitProgressText("Submitting review...");

    // After 4 seconds, update the progress message if server is waking up
    progressTimerRef.current = setTimeout(() => {
      setSubmitProgressText("Still sending, the server is waking up...");
    }, 4000);

    const elapsedMs = Date.now() - mountTime.current;

    const payload = {
      name: formData.name.trim(),
      role: formData.role.trim(),
      rating,
      quote: formData.quote.trim(),
      feedbackNotes_hp: formData.feedbackNotes_hp,
      elapsedMs,
      turnstileToken,
    };

    // 15-second timeout with cancellation
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 15000);

    try {
      const res = await fetch("/api/submit-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (progressTimerRef.current) clearTimeout(progressTimerRef.current);

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review. Please try again.");
      }

      // Preserve submission details for the success summary
      setSubmittedSummary({
        name: formData.name.trim(),
        role: formData.role.trim(),
        rating,
      });

      setSuccess(true);

      // Reset form on success
      setFormData({
        name: "",
        role: "",
        quote: "",
        feedbackNotes_hp: "",
      });
      setRating(0);
      setErrors({});

      // Move focus to success heading for screen readers
      setTimeout(() => {
        successHeadingRef.current?.focus();
      }, 150);
    } catch (err) {
      clearTimeout(timeoutId);
      if (progressTimerRef.current) clearTimeout(progressTimerRef.current);

      if (err.name === "AbortError") {
        setServerError(
          "Request timed out after 15 seconds. Please check your connection and try again."
        );
        setIsTimeoutOrNetworkError(true);
      } else if (
        err.message?.includes("Failed to fetch") ||
        err.message?.includes("NetworkError") ||
        err.name === "TypeError"
      ) {
        setServerError(
          "Unable to connect to the server. Please check your network connection and try again."
        );
        setIsTimeoutOrNetworkError(true);
      } else {
        setServerError(
          err.message || "An unexpected error occurred. Please try again."
        );
        setIsTimeoutOrNetworkError(false);
      }
    } finally {
      // RESET WIDGET & CLEAR TOKEN AFTER EVERY ATTEMPT (success or failure)
      if (window.turnstile && turnstileWidgetIdRef.current !== null) {
        try {
          window.turnstile.reset(turnstileWidgetIdRef.current);
        } catch (resetErr) {
          console.warn("Turnstile reset notice:", resetErr);
        }
      }
      setTurnstileToken("");
      isSubmittingRef.current = false;
      setSubmitting(false);
    }
  };

  const isTurnstilePending = Boolean(siteKey) && !turnstileToken;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success-card"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.4 }}
            className="glass-card-premium p-6 sm:p-10 md:p-12 text-center border border-white/10 relative overflow-hidden"
          >
            {/* Soft atmospheric ambient glow */}
            <div
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Animated Drawn Checkmark SVG */}
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
              <svg
                className="w-10 h-10 text-emerald-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeInOut" }}
                />
                <motion.path
                  d="m8 12 3 3 5-5"
                  initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.35,
                    duration: shouldReduceMotion ? 0 : 0.35,
                    ease: "easeOut",
                  }}
                />
              </svg>
            </div>

            <h2
              ref={successHeadingRef}
              tabIndex={-1}
              className="text-2xl sm:text-3xl font-extrabold text-white mb-3 outline-none"
            >
              Thank You for Your Feedback!
            </h2>

            <p className="text-white/70 max-w-md mx-auto mb-6 text-sm sm:text-base leading-relaxed">
              Thank you! Your review is on its way and will appear after a quick check.
            </p>

            {/* Compact summary of what was submitted */}
            {submittedSummary && (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
                className="max-w-md mx-auto mb-8 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-left"
              >
                <p className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                  Submission Summary
                </p>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {star <= submittedSummary.rating ? (
                          <TbStarFilled size={18} />
                        ) : (
                          <TbStar size={18} className="text-white/20" />
                        )}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-white/90">
                    {RATING_LABELS[submittedSummary.rating]}
                  </span>
                </div>
                <p className="text-sm font-medium text-white">
                  {submittedSummary.name}
                  <span className="text-white/40 font-normal ml-2">
                    · {submittedSummary.role}
                  </span>
                </p>
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-lg shadow-violet-500/25 transition-all duration-300"
              >
                <TbArrowLeft size={18} /> Back to Portfolio
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSuccess(false);
                  setSubmittedSummary(null);
                  mountTime.current = Date.now();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 cursor-pointer"
              >
                Submit Another Review
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="review-form-card"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.3 }}
            className="glass-card-premium p-6 sm:p-8 md:p-10 border border-white/10 relative"
          >
            {/* Top decorative badge */}
            <div className="mb-6 pb-6 border-b border-white/5 flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold text-cyan-400">
                  Public Feedback Form
                </p>
                <p className="text-xs text-white/40 mt-0.5">
                  Your feedback helps me deliver better web experiences.
                </p>
              </div>
              <span className="text-xs text-amber-400/90 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 font-medium">
                Verified Reviews
              </span>
            </div>

            {/* Server Error Alert Banner */}
            {serverError && (
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-sm"
                role="alert"
                aria-live="polite"
              >
                <TbAlertCircle size={20} className="shrink-0 mt-0.5 text-red-400" />
                <div className="flex-1">
                  <p className="font-semibold text-red-200">Unable to submit review</p>
                  <p className="text-xs text-red-300/80 mt-0.5 leading-relaxed">
                    {serverError}
                  </p>
                  {isTimeoutOrNetworkError && (!siteKey || Boolean(turnstileToken)) && (
                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-red-500/30 hover:bg-red-500/40 border border-red-500/40 transition-colors cursor-pointer"
                    >
                      <TbRefresh size={14} /> Retry Submission
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Autofill-safe Honeypot field (hidden from real users, tricks spam bots) */}
              <div
                style={{
                  position: "absolute",
                  left: "-9999px",
                  top: "-9999px",
                  opacity: 0,
                  height: 0,
                  width: 0,
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              >
                <label htmlFor="feedbackNotes_hp">Do not fill this field</label>
                <input
                  id="feedbackNotes_hp"
                  type="text"
                  name="feedbackNotes_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.feedbackNotes_hp}
                  onChange={handleChange}
                />
              </div>

              {/* Shimmer/disabled container overlay during sending (no layout jump) */}
              <div
                className={`space-y-6 transition-opacity duration-200 ${
                  submitting ? "pointer-events-none opacity-50 select-none" : "opacity-100"
                }`}
              >
                {/* Name & Role grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label
                      htmlFor="review-name"
                      className="block text-sm font-medium text-white/80"
                    >
                      Full Name <span className="text-violet-400">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id="review-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      disabled={submitting}
                      className={`input transition-all ${
                        errors.name
                          ? "!border-red-500/80 !shadow-[0_0_0_2px_rgba(239,68,68,0.2)] animate-shake"
                          : ""
                      }`}
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        role="alert"
                        className="text-xs text-red-400 font-medium"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="review-role"
                      className="block text-sm font-medium text-white/80"
                    >
                      Designation / Company <span className="text-violet-400">*</span>
                    </label>
                    <input
                      ref={roleInputRef}
                      id="review-role"
                      type="text"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g. CEO at Acme, Product Lead at Zoho.com"
                      aria-invalid={!!errors.role}
                      aria-describedby={errors.role ? "role-error" : undefined}
                      disabled={submitting}
                      className={`input transition-all ${
                        errors.role
                          ? "!border-red-500/80 !shadow-[0_0_0_2px_rgba(239,68,68,0.2)] animate-shake"
                          : ""
                      }`}
                    />
                    {errors.role && (
                      <p
                        id="role-error"
                        role="alert"
                        className="text-xs text-red-400 font-medium"
                      >
                        {errors.role}
                      </p>
                    )}
                  </div>
                </div>

                {/* Star Rating Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      id="rating-group-label"
                      className="block text-sm font-medium text-white/80"
                    >
                      Rating <span className="text-violet-400">*</span>
                    </label>
                    <span className="text-xs font-semibold text-cyan-400 transition-colors">
                      {RATING_LABELS[activeRating]}
                    </span>
                  </div>

                  <div
                    ref={ratingGroupRef}
                    role="radiogroup"
                    aria-labelledby="rating-group-label"
                    aria-invalid={!!errors.rating}
                    aria-describedby={errors.rating ? "rating-error" : undefined}
                    tabIndex={0}
                    onKeyDown={handleRatingKeyDown}
                    className={`flex items-center gap-2 p-2 rounded-xl bg-white/[0.02] border transition-all ${
                      errors.rating
                        ? "border-red-500/80 shadow-[0_0_0_2px_rgba(239,68,68,0.2)] animate-shake"
                        : "border-white/5 focus-within:border-violet-500/50"
                    }`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => {
                      const isFilled = star <= activeRating;
                      const isCurrentSelected = rating === star;

                      return (
                        <button
                          key={star}
                          data-star={star}
                          type="button"
                          role="radio"
                          aria-checked={isCurrentSelected}
                          aria-label={`${star} star${star > 1 ? "s" : ""} - ${RATING_LABELS[star]}`}
                          tabIndex={isCurrentSelected || (rating === 0 && star === 1) ? 0 : -1}
                          disabled={submitting}
                          onClick={() => handleRatingChange(star)}
                          onTouchStart={() => {
                            isTouchRef.current = true;
                          }}
                          onMouseEnter={() => {
                            if (!isTouchRef.current) {
                              setHoverRating(star);
                            }
                          }}
                          onMouseLeave={() => {
                            setHoverRating(0);
                            isTouchRef.current = false;
                          }}
                          className="p-2 rounded-lg text-amber-400 transition-all duration-150 hover:bg-white/5 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 cursor-pointer disabled:cursor-not-allowed"
                        >
                          {isFilled ? (
                            <TbStarFilled size={30} />
                          ) : (
                            <TbStar size={30} className="text-white/25" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {errors.rating && (
                    <p
                      id="rating-error"
                      role="alert"
                      className="text-xs text-red-400 font-medium"
                    >
                      {errors.rating}
                    </p>
                  )}
                </div>

                {/* Review Quote Textarea */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="review-quote"
                      className="block text-sm font-medium text-white/80"
                    >
                      Your Review <span className="text-violet-400">*</span>
                    </label>
                    <span
                      className={`text-xs ${
                        charCount > MAX_CHARS
                          ? "text-red-400 font-bold"
                          : charCount >= 750
                          ? "text-amber-400"
                          : "text-white/40"
                      }`}
                    >
                      {charCount}/{MAX_CHARS}
                    </span>
                  </div>
                  <textarea
                    ref={quoteInputRef}
                    id="review-quote"
                    name="quote"
                    required
                    rows={5}
                    value={formData.quote}
                    onChange={handleChange}
                    placeholder="Share details about your experience working together, communication, delivery quality, or results..."
                    aria-invalid={!!errors.quote}
                    aria-describedby={errors.quote ? "quote-error" : undefined}
                    disabled={submitting}
                    className={`input resize-none leading-relaxed transition-all ${
                      errors.quote
                        ? "!border-red-500/80 !shadow-[0_0_0_2px_rgba(239,68,68,0.2)] animate-shake"
                        : ""
                    }`}
                  />
                  {errors.quote && (
                    <p
                      id="quote-error"
                      role="alert"
                      className="text-xs text-red-400 font-medium"
                    >
                      {errors.quote}
                    </p>
                  )}
                </div>

                {/* Cloudflare Turnstile Bot Challenge Container */}
                {siteKey && (
                  <div className="pt-1 flex flex-col items-center justify-center space-y-2">
                    <div ref={setTurnstileEl} />
                    {turnstileError && (
                      <p className="text-xs text-amber-400 text-center leading-relaxed">
                        Security verification widget could not load. Please check your network connection or disable ad-blockers and refresh the page.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Button with Disabled State until challenge solved */}
              <button
                type="submit"
                disabled={submitting || isTurnstilePending}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:from-violet-500 hover:to-cyan-500 active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? (
                  <>
                    <TbLoader2 size={20} className="animate-spin text-white" />
                    <span className="text-sm font-medium">{submitProgressText}</span>
                  </>
                ) : isTurnstilePending ? (
                  <>
                    <TbShieldCheck size={20} className="text-cyan-400" />
                    <span className="text-sm font-medium text-white/90">
                      Verifying you're human...
                    </span>
                  </>
                ) : (
                  <>
                    <span>Submit Review</span>
                    <TbSend size={19} />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-white/40 leading-relaxed">
                Reviews are moderated to prevent automated spam before being displayed.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
