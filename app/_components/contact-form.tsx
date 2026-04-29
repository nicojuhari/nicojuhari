"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const WHATSAPP_URL = "https://wa.me/YOUR_NUMBER"
const WEB3FORMS_KEY = "8e14a520-e3cc-45e3-b53b-fa21f7a8f562"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${data.name} sent a message`,
          from_name: "Nicojuhari Contact Form",
          ...data,
        }),
      })
      const result = await response.json()
      if (result.success) {
        setSent(true)
        reset()
        setTimeout(() => setSent(false), 4000)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className="section container-sm" id="contact">
      <h2 className="text-3xl font-bold text-center mb-4">Contact me</h2>
      <p className="text-center text-muted-foreground mb-8">
        Let&apos;s work together on your next project.
      </p>

      <div className="flex justify-center mb-8">
        <Button
          className="h-11 px-6 text-base"
          render={<a href={WHATSAPP_URL} target="_blank" rel="nofollow noopener" />}
        >
          💬 Message me on WhatsApp
        </Button>
      </div>

      <div className="border rounded-xl p-6 bg-white">
        <p className="text-sm text-muted-foreground text-center mb-6">Or send me a message:</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Please tell me about your project"
              className="min-h-[120px] resize-none"
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="px-8"
              disabled={isSubmitting || sent}
            >
              {isSubmitting ? "Sending…" : "Send"}
            </Button>
          </div>
        </form>
        {sent && (
          <p className="mt-4 text-sm text-green-600 font-medium">
            Thank you for your message! I will contact you shortly.
          </p>
        )}
      </div>
    </section>
  )
}
