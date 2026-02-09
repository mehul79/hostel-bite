import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Clock, Heart, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Truck,
      title: 'Room Delivery',
      description: 'Get food delivered right to your room. No need to leave your desk while studying.',
    },
    {
      icon: Clock,
      title: 'Quick Pickup',
      description: 'Skip the queue. Order ahead and pick up when your food is ready.',
    },
    {
      icon: Heart,
      title: 'Support Local',
      description: 'Support shops run by students and locals in your hostel community.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container-wide">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground mb-8 animate-fade-in">
              <Utensils className="h-4 w-4" />
              Made for hostel life
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-in">
              Delicious food from{' '}
              <span className="text-primary">your hostel</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-in">
              Order food and beverages from shops right in your hostel. Quick delivery to your room or easy pickup. No minimum order.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              {isAuthenticated ? (
                <Button size="xl" variant="hero" asChild>
                  <Link to="/products">
                    Browse Menu
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="xl" variant="hero" asChild>
                    <Link to="/auth/register">
                      Get Started
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="xl" variant="hero-outline" asChild>
                    <Link to="/auth/login">I have an account</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            Why students love HostelBite
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-wide">
          <div className="rounded-2xl bg-primary p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to order?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join thousands of students already enjoying quick and easy food ordering in their hostels.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to={isAuthenticated ? '/products' : '/auth/register'}>
                {isAuthenticated ? 'Browse Menu' : 'Create Account'}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 HostelBite. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link to="#" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
