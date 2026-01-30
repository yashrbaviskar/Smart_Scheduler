import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  Calendar,
  Brain,
  Clock,
  BookOpen,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Instagram,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function HomePage() {
  // Check if Clerk is properly configured
  const isClerkConfigured =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== "your_clerk_publishable_key_here"

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">LinkCode</span>
          </Link>
          <div className="flex items-center gap-4">
            {/* Instagram Link */}
            <Link
              href="https://www.instagram.com/linkcode_technologies/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="hidden sm:inline">Follow Us</span>
            </Link>

            {/* Authentication Buttons - Only show if Clerk is configured */}
            {isClerkConfigured ? (
              <>
                <SignedOut>
                  <Button variant="ghost" asChild>
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </SignedOut>

                <SignedIn>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/chat" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      <span className="hidden sm:inline">Chat</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8",
                      },
                    }}
                  />
                </SignedIn>
              </>
            ) : (
              // Fallback buttons when Clerk is not configured
              <>
                <Button variant="ghost" disabled>
                  Sign In
                </Button>
                <Button asChild>
                  <Link href="/student/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Setup Notice - Show when Clerk is not configured */}
      {!isClerkConfigured && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-yellow-800 text-xs font-bold">!</span>
              </div>
              <p className="text-yellow-800 text-sm">
                <strong>Demo Mode:</strong> Authentication is disabled. Set up Clerk API keys to enable full
                functionality.
                <a
                  href="https://clerk.com"
                  target="_blank"
                  className="ml-2 underline hover:no-underline"
                  rel="noreferrer"
                >
                  Get started with Clerk →
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Zap className="h-3 w-3 mr-1" />
            AI-Powered Scheduling
          </Badge>

          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Smart Class Scheduling
            <span className="text-blue-600 block">Made Simple</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect students with teachers through intelligent matching based on skills, learning goals, and
            availability. Let AI handle the complex scheduling.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {isClerkConfigured ? (
              <>
                <SignedOut>
                  <Button size="lg" className="text-lg px-8 py-6" asChild>
                    <Link href="/sign-up">
                      <Users className="h-5 w-5 mr-2" />
                      Join as Student
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
                    <Link href="/sign-up">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      Teach on LinkCode
                    </Link>
                  </Button>
                </SignedOut>

                <SignedIn>
                  <Button size="lg" className="text-lg px-8 py-6" asChild>
                    <Link href="/student/register">
                      <Users className="h-5 w-5 mr-2" />
                      Complete Student Profile
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
                    <Link href="/teacher/register">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      Complete Teacher Profile
                    </Link>
                  </Button>
                </SignedIn>
              </>
            ) : (
              // Fallback buttons when Clerk is not configured
              <>
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                  <Link href="/student/register">
                    <Users className="h-5 w-5 mr-2" />
                    Join as Student
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
                  <Link href="/teacher/register">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Teach on LinkCode
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How LinkCode Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our AI-powered system makes scheduling effortless by matching the right students with the right teachers
              at the perfect time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Share Your Profile</CardTitle>
                <CardDescription>
                  Students tell us what they know and want to learn. Teachers share their expertise and availability.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Step 2 */}
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">AI Matching</CardTitle>
                <CardDescription>
                  Our intelligent system analyzes skills, learning goals, and schedules to find perfect matches.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Step 3 */}
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Auto Scheduling</CardTitle>
                <CardDescription>
                  Get automatically scheduled classes that work for everyone. No more back-and-forth coordination.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose LinkCode?</h2>
            <p className="text-lg text-gray-600">Everything you need for seamless educational scheduling</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Smart Matching</CardTitle>
                </div>
                <CardDescription>
                  AI-powered algorithm matches students and teachers based on skills and availability
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Flexible Scheduling</CardTitle>
                </div>
                <CardDescription>
                  Set your availability and let the system find the best time slots for everyone
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Community Driven</CardTitle>
                </div>
                <CardDescription>
                  Join a community of learners and educators passionate about knowledge sharing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <CardTitle className="text-lg">Progress Tracking</CardTitle>
                </div>
                <CardDescription>Monitor learning progress and adjust schedules based on performance</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">Quality Assurance</CardTitle>
                </div>
                <CardDescription>Rating system ensures high-quality teaching and learning experiences</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-indigo-600" />
                  </div>
                  <CardTitle className="text-lg">Real-time Updates</CardTitle>
                </div>
                <CardDescription>
                  Get instant notifications about schedule changes and new opportunities
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Learning Experience?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students and teachers who are already using LinkCode to make education more efficient
              and effective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isClerkConfigured ? (
                <>
                  <SignedOut>
                    <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                      <Link href="/sign-up">
                        Start Learning Today
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Link>
                    </Button>
                  </SignedOut>

                  <SignedIn>
                    <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                      <Link href="/dashboard">
                        Go to Dashboard
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Link>
                    </Button>
                  </SignedIn>
                </>
              ) : (
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                  <Link href="/student/register">
                    Start Learning Today
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">LinkCode</span>
              </Link>
              <p className="text-gray-400 mb-4">
                Making education accessible through intelligent scheduling and matching.
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-4">
                <Link
                  href="https://www.instagram.com/linkcode_technologies/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram className="h-5 w-5 text-white" />
                </Link>
                <span className="text-gray-400 text-sm">Follow us for updates!</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/student/register" className="hover:text-white">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/subjects" className="hover:text-white">
                    Browse Subjects
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Teachers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/teacher/register" className="hover:text-white">
                    Sign Up Teacher
                  </Link>
                </li>
                <li>
                  <Link href="/teacher/resources" className="hover:text-white">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/teacher/support" className="hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LinkCode. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
