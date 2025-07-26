"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, User } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  const subscribeToNewsletter = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      const response = await fetch("/api/newsletter-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to subscribe to newsletter")
      }

      return response.json()
    },
    onSuccess: () => {
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setName("")
    },
    onError: () => {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email) {
      toast({
        title: "Missing Information",
        description: "Please enter both your name and email address.",
        variant: "destructive",
      })
      return
    }

    subscribeToNewsletter.mutate({ name, email })
  }

  return (
    <section className="py-20 bg-emerald-600">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Subscribe to our newsletter for exclusive offers, events, and updates from Osieka Resort.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 bg-white"
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-white"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto bg-white text-emerald-600 hover:bg-gray-100 px-8"
              disabled={subscribeToNewsletter.isPending}
            >
              {subscribeToNewsletter.isPending ? "Subscribing..." : "Subscribe to Newsletter"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
