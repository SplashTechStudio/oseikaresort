"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, CalendarDays, Users, CreditCard, Mail, Phone, User, Home } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface BookingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  roomType: string
  numberOfRooms: string
  guests: string
  specialRequests: string
  totalAmount: number
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [paystackLoaded, setPaystackLoaded] = useState(false)
  const [bookingData, setBookingData] = useState<BookingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    roomType: "",
    numberOfRooms: "1",
    guests: "1",
    specialRequests: "",
    totalAmount: 0,
  })

  const roomPrices = {
    standard: 5000,
    vip: 7000,
    entire_resort: 200000,
  }

  // Load Paystack script
  useEffect(() => {
    const loadPaystackScript = () => {
      if (typeof window !== "undefined" && !(window as any).PaystackPop) {
        const script = document.createElement("script")
        script.src = "https://js.paystack.co/v1/inline.js"
        script.onload = () => setPaystackLoaded(true)
        script.onerror = () => {
          console.error("Failed to load Paystack script")
          toast({
            title: "Payment Error",
            description: "Failed to load payment system. Please refresh and try again.",
            variant: "destructive",
          })
        }
        document.head.appendChild(script)
      } else if ((window as any).PaystackPop) {
        setPaystackLoaded(true)
      }
    }

    if (isOpen) {
      loadPaystackScript()
    }
  }, [isOpen])

  const calculateTotal = () => {
    if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.roomType) return 0

    const checkIn = new Date(bookingData.checkIn)
    const checkOut = new Date(bookingData.checkOut)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    const roomPrice = roomPrices[bookingData.roomType as keyof typeof roomPrices] || 0

    if (bookingData.roomType === "entire_resort") {
      return nights * roomPrice
    }

    const numberOfRooms = Number.parseInt(bookingData.numberOfRooms) || 1
    return nights * roomPrice * numberOfRooms
  }

  const sendReservationEmail = useMutation({
    mutationFn: async (data: BookingData) => {
      const response = await fetch("/api/send-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to send reservation email")
      }

      return response.json()
    },
    onSuccess: () => {
      toast({
        title: "Reservation Confirmed!",
        description: "Your booking details have been sent to your email.",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send reservation email. Please try again.",
        variant: "destructive",
      })
    },
  })

  const sendWhatsAppMessage = () => {
    const message = `
Booking Confirmation:
Name: ${bookingData.firstName} ${bookingData.lastName}
Email: ${bookingData.email}
Phone: ${bookingData.phone}
Check-in: ${bookingData.checkIn}
Check-out: ${bookingData.checkOut}
Accommodation: ${getRoomTypeDisplay(bookingData.roomType)}
${bookingData.roomType !== "entire_resort" ? `Number of Rooms: ${bookingData.numberOfRooms}` : ''}
Guests: ${bookingData.guests}
${bookingData.specialRequests ? `Special Requests: ${bookingData.specialRequests}` : ''}
Total Amount: ₦${calculateTotal().toLocaleString()}
---
Please confirm your reservation manually.
    `.trim()

    const encodedMessage = encodeURIComponent(message)
    const whatsappNumber = "08074538555" // Replace with your business WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")

    // Send email as well
    sendReservationEmail.mutate({
      ...bookingData,
      totalAmount: calculateTotal(),
    })

    // Reset and close
    onClose()
    setStep(1)
    setBookingData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      roomType: "",
      numberOfRooms: "1",
      guests: "1",
      specialRequests: "",
      totalAmount: 0,
    })

    toast({
      title: "Reservation Sent",
      description: "Your booking details have been sent via WhatsApp for manual confirmation.",
    })
  }

  const initializePayment = () => {
    if (!paystackLoaded || !(window as any).PaystackPop) {
      toast({
        title: "Payment System Loading",
        description: "Please wait for the payment system to load and try again.",
        variant: "destructive",
      })
      return
    }

    const total = calculateTotal()

    if (total <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please check your booking details.",
        variant: "destructive",
      })
      return
    }

    try {
      const handler = (window as any).PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_your_public_key_here",
        email: bookingData.email,
        amount: total * 100,
        currency: "NGN",
        ref: `booking_${Date.now()}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Booking Details",
              variable_name: "booking_details",
              value: `${bookingData.numberOfRooms} ${bookingData.roomType} room(s) from ${bookingData.checkIn} to ${bookingData.checkOut}`,
            },
          ],
        },
        callback: (response: any) => {
          toast({
            title: "Payment Successful!",
            description: `Payment completed. Reference: ${response.reference}`,
          })

          sendReservationEmail.mutate({
            ...bookingData,
            totalAmount: total,
          })

          onClose()
          setStep(1)
          setBookingData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            checkIn: "",
            checkOut: "",
            roomType: "",
            numberOfRooms: "1",
            guests: "1",
            specialRequests: "",
            totalAmount: 0,
          })
        },
        onClose: () => {
          toast({
            title: "Payment Cancelled",
            description: "Payment was cancelled. Your booking is not confirmed.",
            variant: "destructive",
          })
        },
      })

      handler.openIframe()
    } catch (error) {
      console.error("Paystack initialization error:", error)
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleNext = () => {
    if (step === 1) {
      if (!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.phone) {
        toast({
          title: "Missing Information",
          description: "Please fill in all personal details.",
          variant: "destructive",
        })
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.roomType) {
        toast({
          title: "Missing Information",
          description: "Please fill in all booking details.",
          variant: "destructive",
        })
        return
      }

      const checkIn = new Date(bookingData.checkIn)
      const checkOut = new Date(bookingData.checkOut)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (checkIn < today) {
        toast({
          title: "Invalid Date",
          description: "Check-in date cannot be in the past.",
          variant: "destructive",
        })
        return
      }

      if (checkOut <= checkIn) {
        toast({
          title: "Invalid Date",
          description: "Check-out date must be after check-in date.",
          variant: "destructive",
        })
        return
      }
      setStep(3)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const getRoomTypeDisplay = (roomType: string) => {
    switch (roomType) {
      case "standard":
        return "Standard Room"
      case "vip":
        return "Deluxe Suite"
      case "entire_resort":
        return "Entire Resort"
      default:
        return roomType
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-emerald-600" />
            Book Your Stay - Step {step} of 3
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="pl-10"
                    value={bookingData.firstName}
                    onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="pl-10"
                    value={bookingData.lastName}
                    onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="pl-10"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0807 453 8555"
                  className="pl-10"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700">
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Booking Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="checkIn">Check-in Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="checkIn"
                    type="date"
                    className="pl-10"
                    value={bookingData.checkIn}
                    onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="checkOut">Check-out Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="checkOut"
                    type="date"
                    className="pl-10"
                    value={bookingData.checkOut}
                    onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="roomType">Room Type</Label>
              <Select
                value={bookingData.roomType}
                onValueChange={(value) => setBookingData({ ...bookingData, roomType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Room - ₦5,000/night</SelectItem>
                  <SelectItem value="vip">Deluxe Suite - ₦7,000/night</SelectItem>
                  <SelectItem value="entire_resort">Entire Resort - ₦200,000/night</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {bookingData.roomType !== "entire_resort" && (
              <div>
                <Label htmlFor="numberOfRooms">Number of Rooms</Label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Select
                    value={bookingData.numberOfRooms}
                    onValueChange={(value) => setBookingData({ ...bookingData, numberOfRooms: value })}
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Room</SelectItem>
                      <SelectItem value="2">2 Rooms</SelectItem>
                      <SelectItem value="3">3 Rooms</SelectItem>
                      <SelectItem value="4">4 Rooms</SelectItem>
                      <SelectItem value="5">5 Rooms</SelectItem>
                      <SelectItem value="6">6+ Rooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Select
                  value={bookingData.guests}
                  onValueChange={(value) => setBookingData({ ...bookingData, guests: value })}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="5">5 Guests</SelectItem>
                    <SelectItem value="6">6 Guests</SelectItem>
                    <SelectItem value="7">7 Guests</SelectItem>
                    <SelectItem value="8">8 Guests</SelectItem>
                    <SelectItem value="9">9 Guests</SelectItem>
                    <SelectItem value="10">10+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
              <Textarea
                id="specialRequests"
                placeholder="Any special requests or requirements..."
                value={bookingData.specialRequests}
                onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
              />
            </div>

            {bookingData.roomType && bookingData.checkIn && bookingData.checkOut && (
              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="text-sm text-emerald-800">
                  <strong>Price Preview:</strong> ₦{calculateTotal().toLocaleString()}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700">
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Booking Summary</h3>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Guest:</span>
                <span>
                  {bookingData.firstName} {bookingData.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span>{bookingData.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <span>{bookingData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span>{bookingData.checkIn}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span>{bookingData.checkOut}</span>
              </div>
              <div className="flex justify-between">
                <span>Accommodation:</span>
                <span>{getRoomTypeDisplay(bookingData.roomType)}</span>
              </div>
              {bookingData.roomType !== "entire_resort" && (
                <div className="flex justify-between">
                  <span>Number of Rooms:</span>
                  <span>{bookingData.numberOfRooms}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Guests:</span>
                <span>{bookingData.guests}</span>
              </div>
              {bookingData.specialRequests && (
                <div className="flex justify-between">
                  <span>Special Requests:</span>
                  <span className="text-right max-w-[200px]">{bookingData.specialRequests}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total Amount:</span>
                <span>₦{calculateTotal().toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={sendWhatsAppMessage}
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={sendReservationEmail.isPending}
                >
                  Confirm via WhatsApp
                </Button>
                {/* <Button
                  onClick={initializePayment}
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={sendReservationEmail.isPending || !paystackLoaded}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {!paystackLoaded ? "Loading Payment..." : "Pay Now"}
                </Button> */}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}