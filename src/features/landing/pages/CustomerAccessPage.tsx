import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CircleHelp,
  HeartPulse,
  Landmark,
  LogOut,
  Mail,
  Palette,
  Phone,
  Search,
  ShieldCheck,
  Truck,
  User,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { env } from "@/config/env";
import { Button } from "@/shared/components/ui/Button";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggle";
import { TextField } from "@/shared/components/ui/TextField";
import { useIdentifyCustomer } from "@/features/demo/hooks/useLiveChat";

type CustomerAccessForm = {
  businessId: string;
  name: string;
  email: string;
  phone?: string;
};

type PublicBusiness = {
  _id: string;
  name: string;
  industry?: string;
  description?: string;
  isActive?: boolean;
};

type BusinessOption = {
  id: string;
  name: string;
  industry: string;
  description: string;
  featured?: boolean;
  icon: typeof Building2;
  badgeClass: string;
};

const demoBusinessId = import.meta.env.VITE_DEMO_BUSINESS_ID as string | undefined;

async function getPublicBusinesses(): Promise<PublicBusiness[]> {
  try {
    const apiBaseUrl = env.apiBaseUrl.replace(/\/+$/, "");
    const response = await fetch(`${apiBaseUrl}/api/v1/businesses/public`, {
      credentials: "include",
    });

    if (!response.ok) return [];

    const body = await response.json();
    const businesses = body?.data?.businesses ?? body?.businesses ?? [];
    return Array.isArray(businesses) ? businesses : [];
  } catch {
    return [];
  }
}

function mapPublicBusiness(business: PublicBusiness, index: number): BusinessOption {
  const icons = [Building2, HeartPulse, Truck, Landmark, Palette, ShieldCheck];
  const badgeClasses = [
    "bg-teal-50 text-teal-700",
    "bg-blue-50 text-blue-700",
    "bg-emerald-50 text-emerald-700",
    "bg-amber-50 text-amber-700",
    "bg-fuchsia-50 text-fuchsia-700",
    "bg-sky-50 text-sky-700",
  ];

  return {
    id: business._id,
    name: business.name,
    industry: business.industry ?? "Registered",
    description: business.description ?? "SupportFlow AI powered customer support workspace.",
    featured: index === 0,
    icon: icons[index % icons.length],
    badgeClass: badgeClasses[index % badgeClasses.length],
  };
}

export default function CustomerAccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const identifyCustomer = useIdentifyCustomer();
  const initialBusinessId = searchParams.get("businessId") ?? demoBusinessId ?? "";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessOption | null>(null);
  const [hasCustomerSession, setHasCustomerSession] = useState(() => Boolean(sessionStorage.getItem("supportflow.customer")));

  const publicBusinesses = useQuery({
    queryKey: ["public", "businesses"],
    queryFn: getPublicBusinesses,
    retry: false,
    staleTime: 60_000,
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<CustomerAccessForm>({
    defaultValues: {
      businessId: initialBusinessId,
      name: "",
      email: "",
      phone: "",
    },
  });

  const liveBusinesses = publicBusinesses.data?.filter((business) => business.isActive !== false).map(mapPublicBusiness);
  const businessOptions = liveBusinesses ?? [];
  const query = searchQuery.trim().toLowerCase();
  const filteredBusinesses = businessOptions.filter((business) => {
    if (!query) return true;
    return (
      business.name.toLowerCase().includes(query) ||
      business.industry.toLowerCase().includes(query) ||
      business.description.toLowerCase().includes(query) ||
      business.id.toLowerCase().includes(query)
    );
  });

  const businessIdField = register("businessId", {
    required: "Business ID is required",
    minLength: {
      value: 8,
      message: "Enter a valid business ID",
    },
  });

  const handleSelectBusiness = (business: BusinessOption) => {
    setSelectedBusiness(business);
    setValue("businessId", business.id, { shouldValidate: true });
  };

  const onSubmit = async (values: CustomerAccessForm) => {
    const payload = {
      businessId: values.businessId.trim(),
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone?.trim() || undefined,
    };

    const result = await identifyCustomer.mutateAsync(payload).catch(() => null);
    if (!result) return;

    sessionStorage.setItem(
      "supportflow.customer",
      JSON.stringify({
        businessId: payload.businessId,
        customerId: result.customerId,
        customerToken: result.customerToken,
        name: result.name || payload.name,
        email: payload.email,
        phone: payload.phone,
      }),
    );

    toast.success("Customer profile connected");
    navigate(`/demo?businessId=${encodeURIComponent(payload.businessId)}`);
  };

  const handleCustomerLogout = () => {
    sessionStorage.removeItem("supportflow.customer");
    setHasCustomerSession(false);
    toast.info("Customer session cleared");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-sans">
      <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--accent-primary)] text-[#07111f]">
              <Zap size={20} strokeWidth={2.5} />
            </span>
            <span className="hidden truncate font-display text-xl font-bold sm:inline">{env.appName}</span>
          </Link>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <Link to="/" className="inline-flex h-10 items-center gap-1.5 rounded-md px-2 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] sm:px-3">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Home</span>
            </Link>
            {hasCustomerSession && (
              <button
                type="button"
                onClick={handleCustomerLogout}
                className="inline-flex h-10 items-center gap-1.5 rounded-md border border-[var(--border-default)] px-2 text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] sm:px-3"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Customer logout</span>
              </button>
            )}
            <Link to="/login" className="inline-flex h-10 items-center rounded-md bg-[var(--accent-primary)] px-3 text-sm font-semibold text-[#07111f] hover:bg-[var(--accent-hover)] sm:px-4">
              Login
            </Link>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,var(--border-default)_1px,transparent_1px)] bg-[size:24px_24px] opacity-35" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <section className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Find your service provider</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--text-secondary)]">
              Choose a registered business, confirm your customer details, and connect to the right support workspace.
            </p>
            <div className="relative mx-auto mt-8 max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                className="h-14 w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] pl-12 pr-4 text-base text-[var(--text-primary)] shadow-sm outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20"
                placeholder="Search by business, industry, or ID..."
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
          </section>

          <section className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(340px,390px)] xl:items-start">
            <div className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
              {publicBusinesses.isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-44 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)]/70" />
                ))
              ) : filteredBusinesses.length > 0 ? (
                filteredBusinesses.map((business) => (
                  <BusinessCard
                    key={business.id}
                    business={business}
                    isSelected={selectedBusiness?.id === business.id}
                    onSelect={handleSelectBusiness}
                  />
                ))
              ) : (
                <div className="rounded-md border border-dashed border-[var(--border-default)] bg-[var(--bg-surface)]/80 p-8 text-center xl:min-h-[260px]">
                  <CircleHelp className="mx-auto text-[var(--text-muted)]" size={38} />
                  <p className="mt-4 font-semibold text-[var(--text-secondary)]">
                    {query ? "No businesses match your search." : "No public businesses are available from the backend yet."}
                  </p>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-muted)]">
                    You can still paste a real MongoDB business ID in the form to connect to the chat widget.
                  </p>
                </div>
              )}
            </div>

            <aside className="min-w-0 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-6 xl:sticky xl:top-24">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--accent-primary)]">Customer register/login</p>
                <h2 className="mt-2 font-display text-2xl font-bold">Continue with business ID</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  Selecting a business fills the ID. Your details are sent to the backend with that ID.
                </p>
              </div>

              {selectedBusiness && (
                <div className="mb-5 rounded-md border border-[var(--accent-primary)]/30 bg-[var(--accent-glow)] px-4 py-3 text-sm text-[var(--accent-primary)]">
                  Selected: <span className="font-bold">{selectedBusiness.name}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <TextField
                  icon={Building2}
                  label="Business ID"
                  placeholder="Paste business id"
                  error={errors.businessId?.message}
                  {...businessIdField}
                  onChange={(event) => {
                    void businessIdField.onChange(event);
                    setSelectedBusiness(businessOptions.find((business) => business.id === event.target.value) ?? null);
                  }}
                />
                <TextField
                  icon={User}
                  label="Full name"
                  placeholder="John Doe"
                  error={errors.name?.message}
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                <TextField
                  icon={Mail}
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  error={errors.email?.message}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                <TextField icon={Phone} label="Phone" placeholder="+1 555 123 4567" error={errors.phone?.message} {...register("phone")} />

                <Button type="submit" size="lg" className="w-full" isLoading={identifyCustomer.isPending}>
                  {!identifyCustomer.isPending && (
                    <>
                      Continue to chat
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </form>
            </aside>
          </section>

          {filteredBusinesses.length > 0 && (
            <div className="mt-12 flex flex-col items-center rounded-md border-2 border-dashed border-[var(--border-default)] bg-[var(--bg-surface)]/70 px-6 py-10 text-center">
              <CircleHelp className="text-[var(--text-muted)]" size={34} />
              <p className="mt-4 font-semibold text-[var(--text-secondary)]">Do not see your provider?</p>
              <button type="button" className="mt-3 text-sm font-bold text-[var(--accent-primary)] hover:text-[var(--accent-hover)]">
                Contact our support team
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function BusinessCard({
  business,
  isSelected,
  onSelect,
}: {
  business: BusinessOption;
  isSelected: boolean;
  onSelect: (business: BusinessOption) => void;
}) {
  const Icon = business.icon;

  if (business.featured) {
    return (
      <article className="relative flex min-h-[250px] min-w-0 flex-col overflow-hidden rounded-md bg-teal-700 p-5 text-white shadow-lg sm:p-6">
        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-4 flex items-start justify-between gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/20">
              <Icon size={23} />
            </span>
            <span className="max-w-[60%] rounded-md bg-white/20 px-2 py-1 text-right text-xs font-bold uppercase tracking-wide">Featured</span>
          </div>
          <h3 className="break-words font-display text-xl font-bold leading-tight sm:text-2xl">{business.name}</h3>
          <p className="mt-3 flex-1 break-words text-sm leading-6 text-teal-50">{business.description}</p>
          <div className="mt-5 flex flex-col gap-4 border-t border-white/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wide text-teal-100">Business ID</span>
              <span className="break-all font-mono text-sm font-bold">{business.id}</span>
            </div>
            <button
              type="button"
              onClick={() => onSelect(business)}
              className="w-full rounded-md bg-white px-4 py-2 text-sm font-bold text-teal-800 transition hover:bg-slate-100 sm:w-auto"
            >
              {isSelected ? "Selected" : "Select"}
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`flex min-h-[250px] min-w-0 flex-col rounded-md border bg-[var(--bg-surface)] p-5 shadow-sm transition hover:shadow-lg sm:p-6 ${isSelected ? "border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20" : "border-[var(--border-subtle)]"}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[var(--accent-glow)] text-[var(--accent-primary)]">
          <Icon size={23} />
        </span>
        <span className={`max-w-[62%] truncate rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wide ${business.badgeClass}`}>
          {business.industry}
        </span>
      </div>
      <h3 className="break-words font-display text-xl font-bold leading-tight text-[var(--text-primary)]">{business.name}</h3>
      <p className="mt-3 flex-1 break-words text-sm leading-6 text-[var(--text-secondary)]">{business.description}</p>
      <div className="mt-5 flex flex-col gap-4 border-t border-[var(--border-subtle)] pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <span className="block text-[10px] font-bold uppercase tracking-wide text-[var(--text-muted)]">Business ID</span>
          <span className="break-all font-mono text-sm font-bold text-[var(--accent-primary)]">{business.id}</span>
        </div>
        <button
          type="button"
          onClick={() => onSelect(business)}
          className="w-full rounded-md bg-[var(--accent-primary)] px-4 py-2 text-sm font-bold text-[#07111f] transition hover:bg-[var(--accent-hover)] sm:w-auto"
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>
    </article>
  );
}
