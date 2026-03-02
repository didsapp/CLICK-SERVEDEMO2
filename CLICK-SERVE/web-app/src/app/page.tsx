import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Droplets,
  MapPin,
  ShieldCheck,
  Truck,
  Zap,
  Clock,
  CreditCard
} from "lucide-react"
import Link from "next/link"
import { BackgroundAnimation } from "@/components/layout/BackgroundAnimation"

export default function HomePage() {
  const stats = [
    { label: "₦1.2T Market", sub: "Annual diesel volume" },
    { label: "70% Delays", sub: "Delivery inefficiency" },
    { label: "4 Cities", sub: "Nationwide coverage" },
    { label: "20–30% Savings", sub: "Logistics optimization" },
  ]

  const features = [
    {
      title: "Transparent Pricing",
      icon: <Droplets className="h-10 w-10 text-primary" />,
      desc: "Get real-time market rates without hidden markups.",
    },
    {
      title: "Fast Delivery",
      icon: <Clock className="h-10 w-10 text-primary" />,
      desc: "Optimized logistics routes for same-day delivery.",
    },
    {
      title: "Credit Purchase",
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      desc: "Buy now, pay later options for verified businesses.",
    },
    {
      title: "GPS Tracking",
      icon: <Truck className="h-10 w-10 text-primary" />,
      desc: "Monitor your delivery in real-time from our app.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section with Premium Background */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden px-8">
          <BackgroundAnimation />

          <div className="container mx-auto relative z-10 w-full">
            <div className="max-w-4xl">
              <div className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-sm font-medium mb-6 border border-primary/30">
                <Zap className="h-4 w-4" />
                <span>Modern Diesel Logistics</span>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter text-white mb-6 leading-[0.9] glass-font uppercase">
                Powering Nigeria&apos;s <br />
                <span className="text-primary drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">Diesel Supply</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed backdrop-blur-[2px]">
                Connecting buyers with verified suppliers across Nigeria. Save transport costs using Click & Serve Trucks with end-to-end tracking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 text-lg font-semibold shadow-lg shadow-primary/20" asChild>
                  <Link href="/signup?role=buyer">Sign Up as Buyer</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold border-white/20 text-white bg-white/5 backdrop-blur-md hover:bg-white/10" asChild>
                  <Link href="/signup?role=supplier">Join as Supplier</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Subtle Mobile Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background z-[1] pointer-events-none" />
        </section>

        {/* Stats Bar */}
        <section className="bg-secondary py-16 px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="text-3xl lg:text-4xl font-black text-white uppercase tracking-wider drop-shadow-sm">{stat.label}</div>
                  <div className="text-secondary-foreground/60 text-sm font-medium">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-24 bg-muted/30 px-8">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">How it Works</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">Order diesel in three simple steps and enjoy a seamless supply chain experience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold font-mono">1</div>
                <h3 className="text-xl font-bold">Order</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">Select your city, diesel quantity, and choose from verified suppliers.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold font-mono">2</div>
                <h3 className="text-xl font-bold">Track</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">Monitor the truck&apos;s location in real-time as it heads to your location.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold font-mono">3</div>
                <h3 className="text-xl font-bold">Pay</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">Pay instantly or later via credit for businesses. Save up to 30% logistics costs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <Card key={i} className="border-none shadow-md hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-8 space-y-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Placeholder */}
        <section className="py-24 bg-secondary text-secondary-foreground overflow-hidden px-8 relative">
          <div className="container mx-auto flex flex-col items-center text-center relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12 drop-shadow-sm">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white/5 border-white/10 text-white p-10">
                <p className="text-lg leading-relaxed italic mb-6">&quot;Saved ₦500,000 in Lagos within the first month of switching to Click-Serve. The tracking is a game changer.&quot;</p>
                <div className="font-bold text-primary text-lg">— Tunde, Logistics Manager</div>
              </Card>
              <Card className="bg-white/5 border-white/10 text-white p-10">
                <p className="text-lg leading-relaxed italic mb-6">&quot;Finally, a reliable way to get diesel for our telecom towers. The credit Purchase option helps our cashflow significantly.&quot;</p>
                <div className="font-bold text-primary text-lg">— Sarah, Operations Lead</div>
              </Card>
            </div>
          </div>
          {/* Subtle Mobile Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-20 md:hidden pointer-events-none" />
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground px-8">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8 leading-[0.9] drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">Start Saving Today</h2>
            <p className="text-lg lg:text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed text-primary-foreground">
              Join thousands of businesses across Abuja, Lagos, Kano, and Port Harcourt already optimizing their diesel costs.
            </p>
            <Button size="lg" variant="secondary" className="h-16 px-10 text-xl font-bold shadow-2xl" asChild>
              <Link href="/signup" className="flex items-center">
                Get Started Now <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
