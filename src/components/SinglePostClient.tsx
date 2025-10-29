"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaArrowUp,
  FaClock,
  FaUser,
} from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import AdSection from "@/components/AdSection";
import CallToAction from "@/components/CallToAction";
import RecentPosts from "@/components/post/RecentPost";
import { Post } from "@/types/post";

export default function ClientPostPage({ post }: { post: Post }) {
  const [showScroll, setShowScroll] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  return (
    <main className="relative flex flex-col max-w-5xl mx-auto min-h-screen px-4 lg:px-0">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[4px] bg-red-600 origin-left z-[60]"
        style={{ scaleX: progress }}
      />

      <section className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden rounded-2xl mt-8 shadow-lg">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover brightness-90 hover:brightness-100 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end px-6 pb-10">
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {post.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-200 text-sm">
            <div className="flex items-center gap-2">
              <FaUser />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock />
              <span>
                {Math.max(1, Math.ceil((post.content?.length ?? 0) / 1200))} min read
              </span>
            </div>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </section>

      <div className="flex justify-center mt-6">
        <Link href={`/search?category=${encodeURIComponent(post.category)}`}>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all"
          >
            {post.category}
          </Button>
        </Link>
      </div>

      <article
        className="prose dark:prose-invert max-w-none mt-12 leading-relaxed text-lg"
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />

      <section className="flex flex-col items-center justify-center mt-16 border-y py-6">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Share this article
        </h3>
        <div className="flex gap-6">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              post.title
            )}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-red-800 text-white rounded-full hover:bg-red-600 transition transform hover:scale-110"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-red-700 text-white rounded-full hover:bg-red-800 transition transform hover:scale-110"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              shareUrl
            )}&title=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-red-700 text-white rounded-full hover:bg-red-800 transition transform hover:scale-110"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </section>

      
      <section className="mt-16">
        <CallToAction />
      </section>

      <section className="mt-16">
        <RecentPosts limit={3} />
      </section>

      <section className="mt-16">
        <AdSection />
      </section>


      {showScroll && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-4 bg-red-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:bg-red-700 transition transform hover:scale-110"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.15 }}
        >
          <FaArrowUp size={22} />
        </motion.button>
      )}
    </main>
  );
}
