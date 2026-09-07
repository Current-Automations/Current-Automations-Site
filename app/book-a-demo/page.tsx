import type { Metadata } from "next";
import { redirect } from "next/navigation";

// A bare redirect to Google Calendar. Indexing it would put a booking page we do
// not control into search results under our own domain.
export const metadata: Metadata = {
  title: { absolute: "Book a Demo | Current Automations" },
  description: "Book a free 30-minute walkthrough with Current Automations.",
  robots: { index: false, follow: false },
};

export default function BookADemoPage() {
  redirect("https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb");
}
