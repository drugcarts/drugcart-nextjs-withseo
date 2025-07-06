"use client";
import React from "react";
import FeedbackRating from "@/components/FeedbackRating";
import CustomerSaying from "@/components/home/CustomerSaying";
import FeedbackCard from "@/components/home/FeedbackCard";
import CustomerReviewCard from "@/components/productinfo/CustomerReviewCard";

const Feedback = () => {
  return (
    <section className="max-w-7xl mx-auto mt-3">
      <FeedbackRating />
      <CustomerReviewCard />
      <CustomerSaying />
      <FeedbackCard />
    </section>
  );
};

export default Feedback;
