"use client";

import { useState } from "react";
import {
    AlarmClock, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Award, BadgeCheck, BadgePercent, Bell, Bike, Book, Briefcase, Calendar, Camera, Car,
    ChartLine, ChartPie, Check, CircleCheck, CircleX, Clock, Cloud, Code, Coffee, CreditCard, Crown, Download, Dumbbell, Flame, Gift, Globe, GraduationCap,
    Hand, Heart, House, Info, Laptop, Leaf, Lightbulb, Mail, MapPin, Megaphone, MessageCircle, Mic, Moon, Music, Package, PartyPopper, Phone, PiggyBank,
    Pizza, Plane, Play, Plus, Quote, Rocket, Scissors, Search, Send, Shield, ShoppingBag, ShoppingCart, Smartphone, Sparkles, Star, Store, Sun, Tag,
    Target, ThumbsUp, Timer, TrendingUp, Trophy, Truck, User, Users, Utensils, Wallet, Wifi, Wrench, X, Zap, type LucideIcon,
} from "lucide-react";
import { inputClass } from "@/app/tools/_components/tool-ui";
import { cn } from "@/lib/utils";

// shortcut: a hand-picked set keeps the bundle small; switch to lucide's dynamic imports if people want the full library
const ICONS: Record<string, LucideIcon> = {
    AlarmClock, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Award, BadgeCheck, BadgePercent, Bell, Bike, Book, Briefcase, Calendar, Camera, Car,
    ChartLine, ChartPie, Check, CircleCheck, CircleX, Clock, Cloud, Code, Coffee, CreditCard, Crown, Download, Dumbbell, Flame, Gift, Globe, GraduationCap,
    Hand, Heart, House, Info, Laptop, Leaf, Lightbulb, Mail, MapPin, Megaphone, MessageCircle, Mic, Moon, Music, Package, PartyPopper, Phone, PiggyBank,
    Pizza, Plane, Play, Plus, Quote, Rocket, Scissors, Search, Send, Shield, ShoppingBag, ShoppingCart, Smartphone, Sparkles, Star, Store, Sun, Tag,
    Target, ThumbsUp, Timer, TrendingUp, Trophy, Truck, User, Users, Utensils, Wallet, Wifi, Wrench, X, Zap,
};

/** Calls onPick with the clicked icon's SVG markup (still using currentColor) */
export default function IconPicker({ onPick }: { onPick: (svg: string) => void }) {
    const [query, setQuery] = useState("");
    const words = query.trim().toLowerCase();
    const names = Object.keys(ICONS).filter((n) => n.toLowerCase().includes(words));

    return (
        <div className="flex flex-col gap-2 p-2">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search icons" aria-label="Search icons" className={cn(inputClass, "h-10 text-sm")} />
            <div role="group" aria-label="Icons" className="grid max-h-56 grid-cols-8 gap-1 overflow-y-auto sm:grid-cols-12">
                {names.map((name) => {
                    const Icon = ICONS[name];
                    return (
                        <button
                            key={name}
                            type="button"
                            title={name}
                            aria-label={name}
                            onClick={(e) => {
                                const svg = e.currentTarget.querySelector("svg");
                                if (svg) onPick(svg.outerHTML);
                            }}
                            className="flex aspect-square items-center justify-center rounded-lg text-ink hover:bg-[#f4f3ef]"
                        >
                            <Icon className="size-6" aria-hidden />
                        </button>
                    );
                })}
                {!names.length && <p className="col-span-full p-3 text-center text-[13px] text-ink-faint">No icons match “{query}”.</p>}
            </div>
        </div>
    );
}
