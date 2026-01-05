import Link from "next/link"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
    ArrowRight,
    BarChart3,
    Cpu,
    Github,
    LayoutDashboard,
    ShieldCheck,
    Zap,
    Users,
    CheckCircle2,
    Rocket,
    Globe,
    Star,
    Layers
} from "lucide-react"

export function HomePage() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 selection:bg-primary/20">
            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
                            <Icons.logo className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
                            ResourceIQ
                        </span>
                    </div>

                    <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                        <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
                        <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
                        <Link href="#analytics" className="hover:text-primary transition-colors">Analytics</Link>
                        <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href="/sign-in" className="hidden sm:block">
                            <Button variant="ghost" className="font-semibold px-6">Sign In</Button>
                        </Link>
                        <Link href="/sign-in">
                            <Button className="rounded-full px-8 h-11 font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] -z-10 opacity-20 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-pulse" />
                        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] animate-bounce duration-[10000ms]" />
                    </div>

                    <div className="container mx-auto px-6 text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 text-primary text-[13px] font-bold uppercase tracking-widest mb-10">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            AI-Powered Engineering Intelligence
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-10 text-neutral-900 dark:text-white">
                            Deploy <span className="text-primary italic">Smarter</span>. <br />
                            Scale <span className="underline decoration-primary/30 underline-offset-8">Faster</span>.
                        </h1>

                        <p className="max-w-2xl mx-auto text-xl lg:text-2xl text-neutral-500 dark:text-neutral-400 mb-12 leading-relaxed font-medium">
                            Optimize your engineering efforts with real-time analytics, intelligent task allocation, and predictive resource modeling.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                            <Link href="/sign-in">
                                <Button size="lg" className="h-16 px-10 text-xl font-black rounded-2xl shadow-2xl shadow-primary/30 gap-3 group transition-all hover:px-12">
                                    Get Started
                                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="#features">
                                <Button variant="outline" size="lg" className="h-16 px-10 text-xl font-bold rounded-2xl border-2 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all">
                                    View Systems
                                </Button>
                            </Link>
                        </div>

                        {/* Hero Mockup Area */}
                        <div className="mt-24 relative max-w-5xl mx-auto">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-indigo-500/20 rounded-[40px] blur-2xl opacity-50 transition-opacity" />
                            <div className="relative rounded-[32px] border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                                <div className="flex flex-col items-center gap-4 text-neutral-400">
                                    <LayoutDashboard className="h-20 w-20 stroke-[1px]" />
                                    <p className="text-sm font-medium uppercase tracking-widest italic opacity-50">Intelligent Platform Interface</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-32 relative bg-neutral-50/50 dark:bg-neutral-900/40">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div className="space-y-8 text-left">
                                <div className="h-1 bg-primary w-24 rounded-full" />
                                <h2 className="text-4xl lg:text-5xl font-black tracking-tighter leading-tight">
                                    Engineered for <br />
                                    Modern Teams
                                </h2>
                                <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg">
                                    Stop guessing. Start knowing. Our platform provides high-fidelity visibility into your
                                    development cycle, identifying bottlenecks before they impact your velocity.
                                </p>

                                <div className="grid gap-6 pt-4">
                                    <FeatureItem
                                        title="Predictive Allocation"
                                        desc="Assign tasks based on historical velocity and real-time workload."
                                    />
                                    <FeatureItem
                                        title="Deep Analytics"
                                        desc="Visualize team performance with board-ready interactive reports."
                                    />
                                    <FeatureItem
                                        title="GitHub Sync"
                                        desc="Auto-import PRs and activity for zero-touch time tracking."
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-indigo-500/20 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="relative rounded-[32px] border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                                    <div className="bg-primary/10 p-12 rounded-full transform group-hover:scale-110 transition-transform">
                                        <Rocket className="h-16 w-16 text-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-24 border-y border-neutral-100 dark:border-neutral-800">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                            <Stat value="40%" label="Velocity Increase" />
                            <Stat value="25k+" label="Tasks Analyzed" />
                            <Stat value="99.9%" label="Uptime Record" />
                            <Stat value="12min" label="Setup Time" />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-32">
                    <div className="container mx-auto px-6">
                        <div className="bg-neutral-900 dark:bg-white rounded-[40px] p-12 lg:p-24 text-center space-y-10 relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 h-full w-1/3 bg-primary/20 skew-x-12 translate-x-1/2 transition-transform duration-1000" />

                            <div className="relative z-10 space-y-6">
                                <h2 className="text-5xl lg:text-6xl font-black tracking-tighter text-white dark:text-neutral-900">
                                    Start your free tier today.
                                </h2>
                                <p className="text-neutral-400 dark:text-neutral-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                                    No credit card required. Experience the future of engineering management in less than 60 seconds.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                                    <Link href="/sign-in">
                                        <Button size="lg" className="h-16 px-12 text-xl font-bold rounded-2xl bg-white text-neutral-900 hover:bg-neutral-100 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800">
                                            Join Now
                                        </Button>
                                    </Link>
                                    <Button variant="ghost" className="text-white dark:text-neutral-900 hover:bg-white/10 dark:hover:bg-black/5 text-lg font-bold h-16 px-8 rounded-2xl">
                                        Contact Sales
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-20 border-t border-neutral-100 dark:border-neutral-900 bg-neutral-50/30 dark:bg-neutral-950">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                        <div className="space-y-6 col-span-1 md:col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-3">
                                <div className="bg-primary p-2 rounded-xl">
                                    <Icons.logo className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-2xl font-black uppercase tracking-tighter">ResourceIQ</span>
                            </div>
                            <p className="text-neutral-500 dark:text-neutral-400 text-lg font-medium leading-relaxed max-w-sm">
                                Empowering the next generation of software engineering leads with absolute precision.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-black uppercase tracking-widest text-[11px] mb-8 text-neutral-900 dark:text-white">Product</h4>
                            <ul className="space-y-4 text-neutral-500 dark:text-neutral-400 font-bold">
                                <li><Link href="#" className="hover:text-primary transition-colors">Overview</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Tools</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black uppercase tracking-widest text-[11px] mb-8 text-neutral-900 dark:text-white">Resources</h4>
                            <ul className="space-y-4 text-neutral-500 dark:text-neutral-400 font-bold">
                                <li><Link href="#" className="hover:text-primary transition-colors">Guides</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black uppercase tracking-widest text-[11px] mb-8 text-neutral-900 dark:text-white">Legal</h4>
                            <ul className="space-y-4 text-neutral-500 dark:text-neutral-400 font-bold">
                                <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-neutral-100 dark:border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-neutral-400 dark:text-neutral-500 text-sm font-bold tracking-tight">
                            © {new Date().getFullYear()} ResourceIQ. Built for high-performance teams.
                        </p>
                        <div className="flex items-center gap-8">
                            <span className="flex items-center gap-2 text-[13px] font-bold text-emerald-500">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                All Systems Operational
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function FeatureItem({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex gap-4 group">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 transition-colors group-hover:bg-primary/20">
                <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
            <div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-1">{title}</h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}

function Stat({ value, label }: { value: string, label: string }) {
    return (
        <div className="space-y-2">
            <div className="text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tighter">
                {value}
            </div>
            <div className="text-xs uppercase font-black tracking-[0.2em] text-neutral-400">{label}</div>
        </div>
    )
}
