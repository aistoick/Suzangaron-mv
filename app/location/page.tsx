import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LocationPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Our Location</h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Visit us in person or order online for delivery. We're here to serve you!
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          
          {/* MAP (LEFT) */}
          <Card className="overflow-hidden shadow-lg rounded-xl">
            <CardContent className="p-0">
              <div className="relative w-full aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841!2d-73.98823492346!3d40.74844097138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTcuNiJX!5e0!3m2!1sen!2sus!4v1234567890"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Suzangaron Market Location"
                />
              </div>
            </CardContent>
          </Card>

          {/* CONTACT INFO (RIGHT) */}
          <div className="flex flex-col gap-8">
            <Card className="shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-bold">Contact Information</h2>

                  <div className="flex flex-col gap-5">
                    <InfoItem
                      icon={<MapPin className="h-5 w-5 text-primary" />}
                      title="Address"
                      content={
                        <>
                          123 Market Street <br />
                          Suzangaron District <br />
                          City, State 12345
                        </>
                      }
                    />

                    <InfoItem
                      icon={<Phone className="h-5 w-5 text-primary" />}
                      title="Phone"
                      content={
                        <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                          +1 (234) 567-890
                        </a>
                      }
                    />

                    <InfoItem
                      icon={<Mail className="h-5 w-5 text-primary" />}
                      title="Email"
                      content={
                        <a href="mailto:info@suzangaronmarket.com" className="hover:text-primary transition-colors">
                          info@suzangaronmarket.com
                        </a>
                      }
                    />

                    <InfoItem
                      icon={<Clock className="h-5 w-5 text-primary" />}
                      title="Opening Hours"
                      content={
                        <div>
                          <p>Mon - Fri: 8:00 AM - 8:00 PM</p>
                          <p>Saturday: 9:00 AM - 9:00 PM</p>
                          <p>Sunday: 10:00 AM - 6:00 PM</p>
                        </div>
                      }
                    />
                  </div>

                  <div className="pt-4">
                    <Button size="lg" className="w-full" asChild>
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=40.748441,-73.987236"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground shadow-lg rounded-xl">
              <CardContent className="p-6">
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold">Visit Us Today!</h3>
                  <p className="text-primary-foreground/90 leading-relaxed">
                    Come experience the freshest products and friendly service at Suzangaron Market. 
                    We look forward to serving you!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ✅ THIS is the correct component syntax */
function InfoItem({ icon, title, content }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
        {icon}
      </div>
      <div className="flex flex-col gap-1 text-muted-foreground">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <div className="leading-relaxed">{content}</div>
      </div>
    </div>
  )
}
