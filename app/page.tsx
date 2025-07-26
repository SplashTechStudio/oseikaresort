"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Wifi, Coffee, Utensils, Star, Quote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { BookingModal } from "@/components/booking-modal"
import { NewsletterSection } from "@/components/newsletter-section"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { HeroSlider } from "@/components/hero-slider"

const queryClient = new QueryClient()

function OsiekaResortContent() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const openMenu = () => {
    // Open PDF menu in new tab
    window.open("/menu.pdf", "_blank")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-emerald-700">Osieka Resort</div>
            <div className="hidden md:flex space-x-8">
              <Link href="#home" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-emerald-600 transition-colors">
                About
              </Link>
              <Link href="#restaurant" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Restaurant
              </Link>
              <Link href="#rooms" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Rooms
              </Link>
              <Link href="#drinks" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Drinks
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Contact
              </Link>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsBookingModalOpen(true)}>
              Book Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSlider onBookNow={() => setIsBookingModalOpen(true)} onSeeMenu={openMenu} />

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Osieka Resort – A Slice of Paradise</h2>
              <p className="text-lg text-gray-700 mb-6">
                Nestled in the heart of nature, Osieka Resort is more than just a place to stay—it's an experience.
                Whether you're here for a romantic escape, a family weekend, or a solo retreat, our resort blends luxury
                with tranquility to offer a truly memorable getaway.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Our team is committed to providing top-notch hospitality, fresh meals made with love, and rooms designed
                for your ultimate comfort.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-gray-700">Prime location surrounded by nature</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-gray-700">Friendly and professional staff</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-gray-700">Delicious locally-inspired dishes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-gray-700">Comfortable lodges with modern amenities</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/room3.jpg"
                alt="Resort Interior"
                width={800}
                height={600}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Section */}
      <section id="restaurant" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fresh, Local & Delicious</h2>
            <p className="text-xl text-gray-600">Food that Warms the Soul</p>
            <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
              Our in-house restaurant serves a carefully curated menu of local and continental dishes—freshly prepared
              with seasonal ingredients.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="relative w-[700px] h-[500px] overflow-hidden">
              <Image
                src="/food2.jpg"
                alt="Restaurant"
                width={700}
                height={500}
                className="rounded-lg shadow-lg object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Offer:</h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <Utensils className="w-5 h-5 text-emerald-600" />
                  <span>Breakfast, Lunch & Dinner</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Utensils className="w-5 h-5 text-emerald-600" />
                  <span>Locally-inspired meals and global favorites</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Utensils className="w-5 h-5 text-emerald-600" />
                  <span>Vegetarian & vegan options available</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Utensils className="w-5 h-5 text-emerald-600" />
                  <span>Outdoor and indoor dining settings</span>
                </li>
              </ul>

              <h4 className="text-xl font-bold text-gray-900 mb-4">Signature Dishes:</h4>
              <div className="space-y-3 mb-8">
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <h5 className="font-semibold text-emerald-800">Osieka Grilled Fish Platter</h5>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <h5 className="font-semibold text-emerald-800">Coconut Rice with Spicy Goat Meat</h5>
                </div>
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <h5 className="font-semibold text-emerald-800">Chef's Special Pepper Soup</h5>
                </div>
              </div>

              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={openMenu}>
                View Full Menu
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Comfort, Our Priority</h2>
            <p className="text-xl text-gray-600">Rest in Style</p>
            <p className="text-lg text-gray-700 mt-4 max-w-3xl mx-auto">
              Whether you want cozy or classy, Osieka's rooms are designed for relaxation. Each room offers a unique
              ambiance with modern comfort and scenic views.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="overflow-hidden">
              <Image
                src="/room.jpg"
                alt="Standard Room"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Standard Room</h3>
                <p className="text-gray-600 mb-4">Ideal for solo travelers</p>
                <Badge className="bg-emerald-100 text-emerald-800">From ₦25,000/night</Badge>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <Image
                src="/room2.jpg"
                alt="Deluxe Suite"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Deluxe Suite</h3>
                <p className="text-gray-600 mb-4">For couples and short stays</p>
                <Badge className="bg-emerald-100 text-emerald-800">From ₦45,000/night</Badge>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <Image
                src="/room3.jpg"
                alt="Family Lodge"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Family Lodge</h3>
                <p className="text-gray-600 mb-4">Spacious enough for groups</p>
                <Badge className="bg-emerald-100 text-emerald-800">From ₦65,000/night</Badge>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">All Rooms Include:</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="text-center">
                <Wifi className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <span className="text-gray-700">Free Wi-Fi</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-emerald-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs">AC</span>
                </div>
                <span className="text-gray-700">Air conditioning</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-emerald-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs">TV</span>
                </div>
                <span className="text-gray-700">Flat-screen TV</span>
              </div>
              <div className="text-center">
                <Coffee className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <span className="text-gray-700">Room service</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-emerald-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-xs">🚿</span>
                </div>
                <span className="text-gray-700">Private bathroom</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="space-x-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsBookingModalOpen(true)}>
                Check Availability
              </Button>
              <Button variant="outline" onClick={() => setIsBookingModalOpen(true)}>
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Drinks & Lounge Section */}
      <section id="drinks" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Sip & Unwind</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our bar and outdoor lounge offer the perfect setting to relax after a long day. Whether it's a cold
                beer, a glass of wine, or our signature cocktails—you'll find something to savor.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span>Local and international drinks</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span>Fresh juices & smoothies</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span>Mocktails and cocktails</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span>Nighttime bonfire experience (weekends)</span>
                </li>
              </ul>

              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={openMenu}>
                Explore Our Drink List
              </Button>
            </div>
            <div className="relative w-[800px] h-[600px] overflow-hidden">
              <Image
                src="/drinks2.jpg"
                alt="Bar & Lounge"
                width={800}
                height={600}
                className="rounded-lg shadow-xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
            <p className="text-xl text-gray-600">Experience Osieka Resort</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/food.jpg"
                alt="Resort Exterior"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/food2.jpg"
                alt="Gourmet Food"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/drinks.jpg"
                alt="Room Interior"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/drinks2.jpg"
                alt="Outdoor Dining"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/room.jpg"
                alt="Bar Area"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src="/room2.jpg"
                alt="Scenic View"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Google Reviews</h2>
            <p className="text-xl text-gray-600">What our guests say about us</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-emerald-600 mr-3" />
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Always a place to revisit, the rooms are spacious, environment is serene, the kitchen is both
                Continental and Africana, the power is provided by AEDC and Solar power powering the A/Cs, you will
                always want to come back again."
              </p>
              <div className="text-right">
                <p className="font-semibold">adamadamosi alao</p>
                <p className="text-sm text-gray-600">2 years ago</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-emerald-600 mr-3" />
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="w-4 h-4 text-gray-300" />
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">"It's ok"</p>
              <div className="text-right">
                <p className="font-semibold">andrawus ezekiel (Eazy1)</p>
                <p className="text-sm text-gray-600">Local Guide · a year ago</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Us Today</h2>
            <p className="text-xl text-gray-600">
              We're located in a peaceful area with easy road access. Open 7 days a week.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-700">Ayeromi, Ogori 263103, Kogi</p>
                    <Link
                      href="https://maps.app.goo.gl/uQTAcPXbbTwtY9929"
                      target="_blank"
                      className="text-emerald-600 hover:text-emerald-700 text-sm"
                    >
                      View on Google Maps
                    </Link>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-700">0807 453 8555</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-700">osiekaresort@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Opening Hours</h3>
                    <div className="text-gray-700">
                      <p>Restaurant: 7:00am – 10:00pm</p>
                      <p>Bar: 12:00pm – 12:00am</p>
                      <p>Check-in: 2:00pm | Check-out: 12:00pm</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-x-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700">Contact Us</Button>
                <Button
                  variant="outline"
                  onClick={() => window.open("https://maps.app.goo.gl/uQTAcPXbbTwtY9929", "_blank")}
                >
                  Get Directions
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">Osieka Resort</h3>
              <p className="text-gray-300">Where serene nature meets unmatched hospitality.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link href="#home" className="hover:text-emerald-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-emerald-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#restaurant" className="hover:text-emerald-400 transition-colors">
                    Restaurant
                  </Link>
                </li>
                <li>
                  <Link href="#rooms" className="hover:text-emerald-400 transition-colors">
                    Rooms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Room Booking</li>
                <li>Restaurant</li>
                <li>Bar & Lounge</li>
                <li>Event Hosting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <p>0807 453 8555</p>
                <p>osiekaresort@gmail.com</p>
                <p>Ayeromi, Ogori 263103, Kogi</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; Osieka Resort. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </div>
  )
}

export default function OsiekaResort() {
  return (
    <QueryClientProvider client={queryClient}>
      <OsiekaResortContent />
    </QueryClientProvider>
  )
}
