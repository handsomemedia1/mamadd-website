"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, ChevronRight, Phone } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function HomeContent() {
    const { t } = useTranslation();

    return (
        <div>
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden">
                {/* Background pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23EC6E43' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
                <div className="absolute top-20 right-20 w-32 h-32 rounded-full animate-float opacity-20"
                    style={{ background: "var(--color-accent)", filter: "blur(40px)" }}
                />
                <div className="absolute bottom-32 left-16 w-24 h-24 rounded-full animate-float stagger-3 opacity-15"
                    style={{ background: "var(--color-primary)", filter: "blur(30px)" }}
                />

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="animate-fade-in-up">
                        <div
                            className="clay-badge inline-flex items-center gap-2 mb-6 px-4 py-2"
                            style={{ background: "var(--color-accent-light)", color: "var(--color-secondary)" }}
                        >
                            {t("home.badge")}
                        </div>
                        <h1
                            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            {t("home.heroTitle1")}{" "}
                            <span style={{ color: "var(--color-primary)" }}>{t("home.heroTitle2")}</span>,{" "}
                            <br className="hidden md:block" />
                            {t("home.heroTitle3")}{" "}
                            <span style={{ color: "var(--color-accent)" }}>{t("home.heroTitle4")}</span>
                        </h1>
                        <p className="text-lg mb-8 max-w-md leading-relaxed" style={{ color: "var(--color-text-light)" }}>
                            {t("home.heroDesc")}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/menu" className="clay-button clay-button-primary text-base px-8 py-3.5">
                                {t("home.viewMenu")} <ChevronRight size={18} className="inline ml-1" />
                            </Link>
                            <a
                                href="https://wa.me/31612988455?text=Hi%20Mama%20DD%27s%2C%20I%20would%20like%20to%20place%20an%20order!"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="clay-button clay-button-whatsapp text-base px-8 py-3.5"
                            >
                                {t("home.orderWhatsApp")}
                            </a>
                        </div>
                    </div>

                    <div className="hidden lg:flex justify-center animate-fade-in-up stagger-2">
                        <div className="relative">
                            <div
                                className="absolute inset-0 rounded-3xl animate-float"
                                style={{
                                    background: "radial-gradient(circle, var(--color-accent-light) 0%, transparent 70%)",
                                    filter: "blur(40px)",
                                    transform: "scale(1.1)",
                                }}
                            />
                            <div className="relative z-10 clay-card overflow-hidden rounded-3xl" style={{ width: 420, height: 420 }}>
                                <Image
                                    src="/food-spread.png"
                                    alt="Authentic West African food spread"
                                    width={420}
                                    height={420}
                                    priority
                                    className="object-cover w-full h-full"
                                    style={{ borderRadius: "var(--radius-clay)" }}
                                />
                            </div>
                            <div className="clay-card absolute -top-4 -right-4 p-4 animate-float">
                                <span className="text-3xl">🍗</span>
                            </div>
                            <div className="clay-card absolute -bottom-2 -left-6 p-4 animate-float stagger-2">
                                <span className="text-3xl">🥘</span>
                            </div>
                            <div className="clay-card absolute top-1/2 -right-10 p-3 animate-float stagger-4">
                                <span className="text-2xl">🌶️</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== HOW IT WORKS ===== */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                            {t("home.howTitle")}
                        </h2>
                        <p style={{ color: "var(--color-text-muted)" }}>{t("home.howSubtitle")}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "1", emoji: "📋", title: t("home.step1Title"), desc: t("home.step1Desc") },
                            { step: "2", emoji: "📱", title: t("home.step2Title"), desc: t("home.step2Desc") },
                            { step: "3", emoji: "🍽️", title: t("home.step3Title"), desc: t("home.step3Desc") },
                        ].map((item, i) => (
                            <div key={item.step} className={`clay-card p-8 text-center animate-fade-in-up stagger-${i + 1}`}>
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl"
                                    style={{ background: "var(--color-accent-light)" }}>
                                    {item.emoji}
                                </div>
                                <div className="text-xs font-bold mb-2 uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>
                                    {t("home.step")} {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== DELIVERY ZONE ===== */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="clay-card overflow-hidden" style={{ background: "linear-gradient(135deg, #1a3a2a 0%, #2d5a3d 50%, #1a3a2a 100%)", color: "white" }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch">
                            <div className="p-10 md:p-12 flex flex-col justify-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold mb-6 w-fit"
                                    style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                                    {t("home.deliveryBadge")}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                                    {t("home.deliveryTitle")}
                                </h2>
                                <p className="text-white/80 mb-6 leading-relaxed">
                                    {t("home.deliveryDesc")}{" "}
                                    <strong className="text-white">{t("home.deliveryRadius")}</strong>{" "}
                                    {t("home.deliveryDesc2")}
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        { icon: "📍", text: t("home.deliveryPoint1") },
                                        { icon: "💬", text: t("home.deliveryPoint2") },
                                        { icon: "🔥", text: t("home.deliveryPoint3") },
                                        { icon: "⏱️", text: t("home.deliveryPoint4") },
                                    ].map((item) => (
                                        <li key={item.icon} className="flex items-start gap-3 text-sm text-white/85">
                                            <span className="text-base mt-0.5">{item.icon}</span>
                                            <span>{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href={`https://wa.me/31612988455?text=${encodeURIComponent("Hi Mama DD! 👋 I'd like to order for delivery. Can you let me know the delivery charge to my address? 🍛")}`}
                                    target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all hover:scale-105 w-fit"
                                    style={{ background: "#25D366", color: "white", boxShadow: "0 4px 20px rgba(37,211,102,0.35)" }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    {t("home.deliveryCTA")}
                                </a>
                            </div>
                            <div className="relative flex items-center justify-center p-10 md:p-12" style={{ background: "rgba(0,0,0,0.2)", minHeight: "320px" }}>
                                <div className="relative flex items-center justify-center">
                                    <div className="absolute rounded-full" style={{ width: "260px", height: "260px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
                                    <div className="absolute rounded-full" style={{ width: "190px", height: "190px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)" }} />
                                    <div className="absolute rounded-full" style={{ width: "120px", height: "120px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)" }} />
                                    <div className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                                        style={{ background: "var(--color-primary)", boxShadow: "0 0 0 4px rgba(255,255,255,0.2), 0 8px 24px rgba(0,0,0,0.3)" }}>
                                        🍛
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-0 right-0 text-center text-xs font-semibold tracking-widest uppercase"
                                    style={{ color: "rgba(255,255,255,0.5)" }}>
                                    {t("home.deliveryLabel")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== ABOUT SNIPPET ===== */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="clay-card-warm p-10 md:p-14">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                            <div>
                                <div className="clay-badge inline-flex mb-4 px-4 py-2"
                                    style={{ background: "var(--color-accent-light)", color: "var(--color-secondary)" }}>
                                    {t("home.aboutBadge")}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                                    {t("home.aboutTitle1")}{" "}
                                    <span style={{ color: "var(--color-primary)" }}>{t("home.aboutTitle2")}</span>
                                </h2>
                                <p className="leading-relaxed mb-6" style={{ color: "var(--color-text-light)" }}>{t("home.aboutDesc")}</p>
                                <Link href="/about" className="clay-button clay-button-outline text-sm">
                                    {t("home.readStory")} <ChevronRight size={16} className="inline ml-1" />
                                </Link>
                            </div>
                            <div className="flex justify-center">
                                <div className="clay-card p-4 text-center overflow-hidden">
                                    <Image src="/mama-cooking.png" alt="Mama DD cooking authentic African food" width={260} height={260} className="mx-auto rounded-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== LOCATION & HOURS ===== */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>{t("home.findTitle")}</h2>
                        <p style={{ color: "var(--color-text-muted)" }}>{t("home.findSubtitle")}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="clay-card overflow-hidden" style={{ minHeight: "320px" }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.5!2d6.88!3d52.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDEzJzEyLjAiTiA2wrA1MicxMi4wIkU!5e0!3m2!1sen!2snl!4v1"
                                width="100%" height="100%"
                                style={{ border: 0, borderRadius: "var(--radius-clay)", minHeight: "320px" }}
                                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                                title="Mama DD's Location"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="clay-card p-6 flex items-start gap-4">
                                <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "var(--color-primary)15" }}>
                                    <MapPin size={20} style={{ color: "var(--color-primary)" }} />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>{t("home.address")}</h3>
                                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{t("home.addressValue")}</p>
                                </div>
                            </div>
                            <div className="clay-card p-6 flex items-start gap-4">
                                <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "var(--color-accent)15" }}>
                                    <Clock size={20} style={{ color: "var(--color-accent)" }} />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>{t("home.openingHours")}</h3>
                                    <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                                        <p>{t("home.tueThu")}</p>
                                        <p>{t("home.sat")}</p>
                                        <p className="text-xs mt-1 opacity-60">{t("home.closed")}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="clay-card p-6 flex items-start gap-4">
                                <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "var(--color-whatsapp)15" }}>
                                    <Phone size={20} style={{ color: "var(--color-whatsapp-dark)" }} />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>{t("home.contactLabel")}</h3>
                                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>+31 6 12988455</p>
                                    <a href="https://wa.me/31612988455" target="_blank" rel="noopener noreferrer"
                                        className="text-sm font-medium mt-1 inline-block" style={{ color: "var(--color-whatsapp-dark)" }}>
                                        {t("home.chatWhatsApp")}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== REVIEWS ===== */}
            <section className="py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 mb-12">
                    <div className="text-center">
                        <div className="clay-badge inline-flex items-center gap-2 mb-4 px-4 py-2" style={{ background: "#fef3c7", color: "#92400e" }}>
                            {t("home.reviewsBadge")}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>{t("home.reviewsTitle")}</h2>
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-center">
                                <div className="text-5xl font-bold" style={{ color: "var(--color-primary)" }}>4.9</div>
                                <div className="text-xl mt-1">⭐⭐⭐⭐⭐</div>
                                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Google · 19 reviews</p>
                            </div>
                            <div className="w-px h-14 bg-gray-200" />
                            <div className="text-center">
                                <div className="text-5xl font-bold" style={{ color: "var(--color-accent)" }}>4.7</div>
                                <div className="text-xl mt-1">⭐⭐⭐⭐⭐</div>
                                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Delivery · 30+ reviews</p>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
          @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          .marquee-left { animation: scroll-left 40s linear infinite; }
          .marquee-right { animation: scroll-right 45s linear infinite; }
          .marquee-wrap:hover .marquee-left, .marquee-wrap:hover .marquee-right { animation-play-state: paused; }
        `}</style>

                {(() => {
                    const row1 = [
                        { name: "Annewil Degeling", text: "The jollof rice was our favourite! The service was very nice and correct. Will definitely order again.", src: "Google" },
                        { name: "Kabobo", text: "For my first time eating jollof rice, it was pretty unforgettable. Would recommend 👍", src: "Google" },
                        { name: "Tofunmi Sanni", text: "It was easy to order from the available website. The meals are delicious — great balance between tasty and spicy.", src: "Delivery" },
                        { name: "Joella Sams", text: "The food was absolutely delicious! I look forward to ordering again 🙌🏾", src: "Google" },
                        { name: "Latoya", text: "Give it a try! I loved it, and she was so kind!", src: "Delivery" },
                        { name: "Leon", text: "Tasted fufu and jollof rice for the first time and it was amazing!", src: "Delivery" },
                        { name: "Meina Suck", text: "Amazing, flavorful food! The jollof and chicken was great. I absolutely loved the plantains.", src: "Delivery" },
                        { name: "Amber Rae", text: "Super nice people and delicious food. It took a little longer, but that's because it's fresh, of course :)", src: "Google" },
                        { name: "Muhammad R.", text: "My first time jollof rice — unforgettable experience 🍛🍛", src: "Delivery" },
                        { name: "Stacy", text: "The food was amazing 👏", src: "Delivery" },
                    ];
                    const row2 = [
                        { name: "Linsey ten Have", text: "The Egusi soup with fufu, fried plantain, and fish soup were excellent! A real treat and delicious flavors!", src: "Google" },
                        { name: "Mexxes", text: "They answered my call on Sunday, prepared and delivered my order. I will definitely order from them again.", src: "Google" },
                        { name: "Erchen", text: "Surprised to find authentic African food in Enschede! Fried bananas, grilled fish, egusi soup — all available.", src: "Google" },
                        { name: "Ashley Braaksma", text: "Delicious authentic food, reminds me of my mother's!", src: "Google" },
                        { name: "Abdulai S Bah", text: "Amazing food. Great taste and amazing service. It is really home made food. Check it out!", src: "Google" },
                        { name: "Shajnush Amir", text: "The food was really tasty and I loved the care and respect demonstrated by the staff.", src: "Google" },
                        { name: "Ayodeji S. Binuyo", text: "The food is great. The delivery service is perfect.", src: "Delivery" },
                        { name: "Tomas", text: "Great flavour, loved it! Will order again.", src: "Delivery" },
                        { name: "Nelson", text: "Heerlijke Jollof rijst! Asked for extra spicy — no problem. Definitely a recommendation :)", src: "Delivery" },
                        { name: "Nagi", text: "First time trying Jollof rice, amazing. And outstanding customer support.", src: "Google" },
                    ];
                    const ReviewCard = ({ name, text, src }: { name: string; text: string; src: string }) => (
                        <div className="clay-card p-5 flex-shrink-0 flex flex-col gap-3" style={{ width: "280px" }}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                                        style={{ background: "var(--color-primary)" }}>{name[0]}</div>
                                    <div>
                                        <p className="font-semibold text-sm leading-tight">{name}</p>
                                        <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>{src}</p>
                                    </div>
                                </div>
                                <span className="text-xs">⭐⭐⭐⭐⭐</span>
                            </div>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-light)" }}>&ldquo;{text}&rdquo;</p>
                        </div>
                    );
                    return (
                        <div className="marquee-wrap space-y-4">
                            <div className="overflow-hidden">
                                <div className="marquee-left flex gap-4" style={{ width: "max-content" }}>
                                    {[...row1, ...row1].map((r, i) => (<ReviewCard key={`r1-${i}`} {...r} />))}
                                </div>
                            </div>
                            <div className="overflow-hidden">
                                <div className="marquee-right flex gap-4" style={{ width: "max-content" }}>
                                    {[...row2, ...row2].map((r, i) => (<ReviewCard key={`r2-${i}`} {...r} />))}
                                </div>
                            </div>
                        </div>
                    );
                })()}
                <div className="text-center mt-10 px-6">
                    <a href="https://g.page/r/CTtHGmlvCpGoEBI/review" target="_blank" rel="noopener noreferrer"
                        className="clay-button clay-button-outline inline-flex items-center gap-2 px-6 py-3">
                        {t("home.leaveReview")}
                    </a>
                </div>
            </section>

            {/* ===== CTA BANNER ===== */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="clay-card p-10 md:p-14 text-center"
                        style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))" }}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" style={{ fontFamily: "var(--font-heading)" }}>
                            {t("home.ctaTitle")}
                        </h2>
                        <p className="text-white/80 mb-8 max-w-md mx-auto">{t("home.ctaDesc")}</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/menu" className="clay-button text-base px-8 py-3.5" style={{ background: "white", color: "var(--color-primary-dark)" }}>
                                {t("home.ctaMenu")}
                            </Link>
                            <a href="https://wa.me/31612988455?text=Hi%20Mama%20DD%27s%2C%20I%20would%20like%20to%20place%20an%20order!"
                                target="_blank" rel="noopener noreferrer"
                                className="clay-button clay-button-whatsapp text-base px-8 py-3.5">
                                {t("home.ctaWhatsApp")}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
