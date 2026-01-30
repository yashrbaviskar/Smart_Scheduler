"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { X, Plus, User, Calendar, Clock, GraduationCap, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface AvailabilitySlot {
  day: string
  startTime: string
  endTime: string
}

interface StudentProfile {
  fullName: string
  email: string
  phone: string
  location: string
  learningGoals: string
  availability: AvailabilitySlot[]
}

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
]

export default function StudentRegisterPage() {
  const [profile, setProfile] = useState<StudentProfile>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    learningGoals: "",
    availability: [],
  })

  const [newAvailability, setNewAvailability] = useState({
    day: "",
    startTime: "",
    endTime: "",
  })

  const addAvailabilitySlot = () => {
    if (newAvailability.day && newAvailability.startTime && newAvailability.endTime) {
      const slot = { ...newAvailability }
      if (
        !profile.availability.some(
          (a) => a.day === slot.day && a.startTime === slot.startTime && a.endTime === slot.endTime,
        )
      ) {
        setProfile((prev) => ({
          ...prev,
          availability: [...prev.availability, slot],
        }))
      }
      setNewAvailability({ day: "", startTime: "", endTime: "" })
    }
  }

  const removeAvailabilitySlot = (index: number) => {
    setProfile((prev) => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Student Profile Submitted:", profile)
    // Here you would typically send the data to your backend
    alert("Profile created successfully! Welcome to ClassSync!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ClassSync</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <div className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Student Profile</h1>
            {/* <p className="text-gray-600">
              Tell us about your learning goals to get matched with great teachers for offline classes
            </p> */}
          </div>

          <Card className="shadow-lg">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                <User className="h-5 w-5 text-blue-600" />
                Tell us about yourself
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => setProfile((prev) => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Enter your full name"
                        required
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                        required
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+91"
                        required
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                        Location (City) *
                      </Label>
                      <Input
                        id="location"
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., New York"
                        required
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  {/* <div className="space-y-2">
                    <Label htmlFor="learningGoals" className="text-sm font-medium text-gray-700">
                      Learning Goals & Preferences *
                    </Label>
                    <Textarea
                      id="learningGoals"
                      value={profile.learningGoals}
                      onChange={(e) => setProfile((prev) => ({ ...prev, learningGoals: e.target.value }))}
                      placeholder="Tell us about your learning goals, what subjects you want to learn, your current skill level, preferred learning style, any specific requirements, and what you hope to achieve. Our AI will analyze this to find the perfect teacher match..."
                      required
                      className="min-h-[120px] text-base"
                    />
                    <p className="text-xs text-gray-500">
                      💡 Our AI chatbot will analyze your goals to match you with the most suitable teachers and
                      subjects
                    </p>
                  </div> */}
                </div>

                {/* Availability */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Availability</h3>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-600" />
                    <Label className="text-sm font-medium text-gray-700">Your Availability *</Label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">
                    💡 Our AI will match your schedule with available teachers in your area
                  </p>

                  <div className="space-y-2 p-3 border rounded-lg bg-purple-50 min-h-[3rem]">
                    {profile.availability.map((slot, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-white rounded border">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">{slot.day}</span>
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">
                          {slot.startTime} - {slot.endTime}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAvailabilitySlot(index)}
                          className="ml-auto text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {profile.availability.length === 0 && (
                      <span className="text-gray-500 text-sm">Add your available time slots</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <Select
                      value={newAvailability.day}
                      onValueChange={(value) => setNewAvailability((prev) => ({ ...prev, day: value }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {DAYS_OF_WEEK.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={newAvailability.startTime}
                      onValueChange={(value) => setNewAvailability((prev) => ({ ...prev, startTime: value }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Start" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={newAvailability.endTime}
                      onValueChange={(value) => setNewAvailability((prev) => ({ ...prev, endTime: value }))}
                    >
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="End" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      type="button"
                      onClick={addAvailabilitySlot}
                      disabled={!newAvailability.day || !newAvailability.startTime || !newAvailability.endTime}
                      className="h-10 bg-purple-600 hover:bg-purple-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>

                {/* AI Integration Notice
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">AI-Powered Matching & Scheduling</h4>
                      <p className="text-sm text-gray-600 mb-2">Our intelligent system will analyze your profile to:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Find teachers in your area who match your learning needs and subjects</li>
                        <li>• Understand your learning goals and preferred subjects through your description</li>
                        <li>• Create personalized class schedules based on mutual availability</li>
                        <li>• Suggest optimal class formats and timing for your success</li>
                      </ul>
                    </div>
                  </div>
                </div> */}

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
                    disabled={
                      !profile.fullName.trim() ||
                      !profile.email.trim() ||
                      !profile.phone.trim() ||
                      !profile.location.trim() ||
                      !profile.learningGoals.trim()
                    }
                  >
                    Create My Student Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
