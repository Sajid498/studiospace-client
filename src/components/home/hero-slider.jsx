
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { ArrowRight, Search, MapPin } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    eyebrow: "YOUR CREATIVE JOURNEY STARTS HERE",
    title: "Find the space where ideas come alive.",
    description:
      "Discover inspiring photography studios, production spaces, and creative environments for your next big project.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 2,
    eyebrow: "MADE FOR CREATORS",
    title: "Your next production deserves a better space.",
    description:
      "From professional photography studios to fully equipped production spaces, find the perfect place to create.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: 3,
    eyebrow: "SHARE YOUR SPACE",
    title: "Turn your creative space into an opportunity.",
    description:
      "Own a studio? Connect with creators, showcase your space, and welcome your next production.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85",
  },
];

export default function HeroSlider() {
  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        speed={900}
        className="studio-hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative flex min-h-[650px] items-center bg-cover bg-center px-5 py-24 sm:min-h-[700px] lg:px-12"
              style={{
                backgroundImage: `url("${slide.image}")`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/20" />

              <div className="relative z-10 mx-auto w-full max-w-7xl">
                <div className="max-w-3xl text-white">
                  <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-orange-300 backdrop-blur-sm">
                    {slide.eyebrow}
                  </span>

                  <h1 className="mt-7 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-7xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                    {slide.description}
                  </p>

                  <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/studios"
                      className="inline-flex items-center justify-center gap-3 rounded-full bg-orange-500 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                    >
                      Explore Studios
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href="/add-studio"
                      className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
                    >
                      Host Your Space
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative z-20 mx-auto -mt-10 w-[calc(100%-2.5rem)] max-w-5xl rounded-2xl border border-border bg-background p-4 shadow-2xl sm:-mt-12 sm:p-6">
        <form
          action="/studios"
          method="GET"
          className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end"
        >
          <div>
            <label
              htmlFor="location"
              className="mb-2 flex items-center gap-2 text-sm font-semibold"
            >
              <MapPin className="h-4 w-4 text-orange-500" />
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Where do you want to create?"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-orange-500"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold"
            >
              Studio category
            </label>
            <select
              id="category"
              name="category"
              defaultValue=""
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-orange-500"
            >
              <option value="">All categories</option>
              <option value="Photo Studio">Photo Studio</option>
              <option value="Film Stage">Film Stage</option>
              <option value="Podcast Room">Podcast Room</option>
              <option value="Music Suite">Music Suite</option>
              <option value="Art Workshop">Art Workshop</option>
            </select>
          </div>

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            <Search className="h-4 w-4" />
            Search Spaces
          </button>
        </form>
      </div>
    </section>
  );
}
